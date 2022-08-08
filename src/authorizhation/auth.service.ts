import {UserFactory} from "./userFactory";

import * as bcrypt from "bcryptjs";
import {User} from "../users/entities/user";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
    BadGatewayException,
    ConflictException,
    HttpStatus,
    Injectable,
    NotFoundException, PreconditionFailedException, UnauthorizedException,
    UnprocessableEntityException
} from "@nestjs/common";
import {ITokens, TokenService} from "../token/token.service";
import {AuthDto, AuthLoginDto, AuthRefreshDto} from "./dto/auth.dto";
import {Profile} from "../profile/profile.entity";
import {MailService} from "../sendMailer/mail.service";


type IUser = Omit<AuthDto, "password">

interface IUserInfo {
    tokens: ITokens,
    user: IUser
}

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Profile) private profileRepository: Repository<Profile>,
                private tokenService: TokenService,
                private mailService: MailService) {
    }

    async getRegisteredUser(body: AuthDto): Promise<ConflictException | void> {
        const user = new UserFactory(body)
        await user.hashPassword()
        if (await this._checkForAvailableUser(user)) {
            throw new ConflictException('User already exist')
        } else {
            const registeredUser = await this.userRepository.create(user)
            const savedUser = await this.userRepository.save(registeredUser)
            const tempKey = await this.tokenService.createToken({email: "tempkey"}, "process.env.SECRET_KEY_REFRESH_JWT", '30d')
            const profile = await this.profileRepository.create({
                userId: savedUser.id,
                emailIsActivated: false,
                tempKeyForActivationEmail: tempKey
            })
            await this.profileRepository.save(profile)
            await this.mailService.activateAccount(registeredUser.email, tempKey, savedUser.id)
        }
    }


    async mailActivation(userId: number, token: string): Promise<IUserInfo | PreconditionFailedException> {
        await this.tokenService.tokensForRegister(userId)
        const user = await this.userRepository.findOneBy({id: userId})
        const profile = await this.profileRepository.findOneBy({userId: userId})
        if (profile) {
            if (profile.tempKeyForActivationEmail === token) {
                await this.profileRepository.update({id: profile.id}, {emailIsActivated: true})
                return {tokens: this.tokenService.getPairTokens(), user: this.getInfoAboutUser(user)}
            } else {
                throw new PreconditionFailedException("Failed activate mail")
            }
        } else throw new PreconditionFailedException("Failed activate mail")
    }

    async login(body: AuthLoginDto): Promise<(UnprocessableEntityException | NotFoundException) | IUserInfo> {
        const user = await this.userRepository.findOneBy({email: body.email})
        const userProfile = await this.profileRepository.findOneBy({userId:user.id})
        if (user && userProfile.emailIsActivated) {
            const checkResemblanceDecodePassword = bcrypt.compareSync(body.password, user.password);
            if (checkResemblanceDecodePassword) {
                await this.tokenService.updateTokens(user.id)
                return {tokens: this.tokenService.getPairTokens(), user: this.getInfoAboutUser(user)}
            } else {
                throw new UnprocessableEntityException("Password doesn't resemblance")
            }
        } else {
            throw new NotFoundException('User not found')
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