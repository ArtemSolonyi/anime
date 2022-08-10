import {UserFactory} from "./userFactory";
import * as bcrypt from "bcryptjs";
import {User} from "../users/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException, PreconditionFailedException,
    UnprocessableEntityException
} from "@nestjs/common";
import {ITokens, TokenService} from "../token/token.service";
import {AuthDto, AuthLoginDto, AuthRefreshDto} from "./dto/auth.dto";
import {MailService} from "../sendMailer/mail.service";
import {isEmail} from "./isEmail";
import {Setting} from "../settings/entities/setting.entity";
import {ConfigService} from "@nestjs/config";


type IUser = Omit<AuthDto, "password">

interface IUserInfo {
    tokens: ITokens,
    user: IUser
}

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Setting) private settingRepository: Repository<Setting>,
                private tokenService: TokenService,
                private config:ConfigService,
                private mailService: MailService) {
    }

    async getRegisteredUser(body: AuthDto): Promise<ConflictException | void> {
        const user = new UserFactory(body)
        await user.hashPassword()
        if (await this._checkForAvailableUser(user)) {
            throw new BadRequestException('User already exist')
        } else {
            const registeredUser = await this.userRepository.create(user)
            const savedUser = await this.userRepository.save(registeredUser)
            const tempKey = await this.tokenService.createToken({userId: savedUser.id}, this.config.get("SECRET_KEY_REFRESH_JWT"), '30d')
            const setting = await this.settingRepository.create({
                userId: savedUser.id,
                emailIsActivated: false,
                tempKeyForActivationEmail: tempKey
            })
            await this.settingRepository.save(setting)
            await this.mailService.activateAccount(registeredUser.email, tempKey)
        }
    }


    async mailActivation(token: string): Promise<IUserInfo | PreconditionFailedException> {
        let userId = this.tokenService.verify(token).userId
        await this.tokenService.tokensForRegister(userId)
        const user = await this.userRepository.findOneBy({id: userId})
        const setting = await this.settingRepository.findOneBy({userId: userId})
        if (setting && !setting.emailIsActivated) {
            if (setting.tempKeyForActivationEmail === token) {
                await this.settingRepository.update({id: setting.id}, {emailIsActivated: true})
                return {tokens: this.tokenService.getPairTokens(), user: this.getInfoAboutUser(user)}
            } else {
                throw new PreconditionFailedException("Failed activate mail")
            }
        } else throw new PreconditionFailedException("Email already activate")
    }

    async login(body: AuthLoginDto): Promise<(UnprocessableEntityException | NotFoundException) | IUserInfo> {
        let user;
        if (isEmail(body.login)) {
            user = await this.userRepository.createQueryBuilder('user')
                .addSelect('user.password')
                .where({email: body.login})
                .getOne()
        } else {
            user = await this.userRepository.createQueryBuilder('user')
                .addSelect('user.password')
                .where({username: body.login})
                .getOne()
        }
        if (user) {
            const userProfile = await this.settingRepository.findOneBy({userId: user.id})
            if (!userProfile.emailIsActivated) {
                throw new NotFoundException('Email not active')
            }
            const checkResemblanceDecodePassword = bcrypt.compareSync(body.password, user.password);

            if (checkResemblanceDecodePassword) {
                await this.tokenService.updateTokens(user.id)
                return {tokens: this.tokenService.getPairTokens(), user: this.getInfoAboutUser(user)}
            } else {
                throw new UnprocessableEntityException("Password doesn't resemblance")
            }
        } else {
            throw new NotFoundException('UserEntity not found')
        }
    }

    async refresh(body: AuthRefreshDto) {
        const userId: number = this.tokenService.verify(body.refreshToken)
        await this.tokenService.updateTokens(userId)
        return this.tokenService.getPairTokens()
    }

    private getInfoAboutUser(user: User): IUser {
        return {username: user.username, email: user.email, role: user.role}
    }

    private async _checkForAvailableUser(user: UserFactory): Promise<boolean> {
        const candidateUserWithUsername: User | null = await this.userRepository.findOneBy({username: user.username})
        const candidateUserWithEmail: User | null = await this.userRepository.findOneBy({email: user.email})
        return !!(candidateUserWithUsername || candidateUserWithEmail);
    }

}