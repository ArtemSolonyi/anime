import {UserFactory} from "./userFactory";
import * as bcrypt from "bcryptjs";
import {User} from "../users/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
    BadRequestException,
    ConflictException, HttpException, HttpStatus,
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
import {Profile} from "../profile/entities/profile.entity";
import {JwtPayload} from "jsonwebtoken";


type IUser = Omit<AuthDto, "password">

interface IUserInfo {
    tokens: ITokens,
    user: IUser
}

export type UserId = { userId: number }

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Setting) private settingRepository: Repository<Setting>,
                @InjectRepository(Profile) private profileRepository: Repository<Profile>,
                private tokenService: TokenService,
                private config: ConfigService,
                private mailService: MailService) {
    }

    async registrationOfUser(body: AuthDto): Promise<ConflictException | HttpException> {
        const user = new UserFactory(body)
        await user.hashPassword()
        await this._checkForAvailableUser(user)
        const registeredUser = await this.userRepository.create(user)
        const savedUser = await this.userRepository.save(registeredUser)
        const tempKey = await this.tokenService.createToken(
            {userId: savedUser.id}, this.config.get("SECRET_KEY_REFRESH_JWT"), '30d')
        const setting = await this.settingRepository.create({
            userId: savedUser.id,
            emailIsActivated: false,
            tempKeyForActivationEmail: tempKey
        })
        await this.settingRepository.save(setting)
        await this.profileRepository.save({userId: savedUser.id})
        this.mailService.activateAccount(registeredUser.email, tempKey)
        throw new HttpException("Letter was sending to email", HttpStatus.OK)
    }

    async mailActivation(token: string): Promise<IUserInfo | PreconditionFailedException> {
        let userIdOrError = await this.tokenService.verify(token)
        let userId = 0;
        if(this.jwtUserId(userIdOrError)) {
            userId = userIdOrError.userId
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
            throw new NotFoundException('User not exist')
        }
    }

    async refresh(body: AuthRefreshDto): Promise<HttpException | ({ tokens: ITokens } & { user: { username: string ,role:string,email:string} })> {
        const data: HttpException | { userId: number } = await this.tokenService.verify(body.refreshToken)
        if (!this.isHttpException(data)) {
            await this.tokenService.updateTokens(data.userId)
            const user: User = await this.userRepository.findOneBy({id: data.userId})
            return {tokens: this.tokenService.getPairTokens(), user: {username: user.username,role:user.role,email:user.email}}
        } else {
            return data;
        }
    }

    private getInfoAboutUser(user: User): IUser {
        return {username: user.username, email: user.email, role: user.role}
    }

    private async _checkForAvailableUser(user: UserFactory): Promise<ConflictException | void> {
        const candidateUserWithUsername: User | null = await this.userRepository.findOneBy({username: user.username})
        const candidateUserWithEmail: User | null = await this.userRepository.findOneBy({email: user.email})
        if (candidateUserWithEmail) {
            throw new ConflictException("Email already exist")
        }
        if (candidateUserWithUsername) {
            throw new ConflictException("Username already exist")
        }

    }

    public jwtUserId(jwtUserId:  HttpException |{userId: number}): jwtUserId is UserId {
        return typeof (jwtUserId as {userId:number}).userId == 'number'
    }

    public isHttpException(HttpException: HttpException | { userId: number }): HttpException is HttpException {
        return (HttpException as HttpException).message !== undefined;
    }

}
