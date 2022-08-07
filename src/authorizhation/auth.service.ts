import {UserFactory} from "./userFactory";

import * as bcrypt from "bcryptjs";
import {User} from "../users/entities/user";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from "@nestjs/common";
import {ITokens, TokenService} from "../token/token.service";
import {AuthDto, AuthLoginDto, AuthRefreshDto} from "./dto/auth.dto";
import {verify} from "jsonwebtoken";
import {JwtService} from "@nestjs/jwt";


type IUser = Omit<AuthDto, "password">

interface IRegisterUser {
    tokens: ITokens,
    user: IUser
}

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                private tokenService: TokenService,) {}

    async getRegisteredUser(body: AuthDto): Promise<ConflictException | IRegisterUser> {
        const user = new UserFactory(body)
        await user.hashPassword()
        if (await this._checkForAvailableUser(user)) {
            throw new ConflictException('User already exist')
        } else {
            const registeredUser = await this.userRepository.create(user)
            const savedUser = await this.userRepository.save(registeredUser)
            await this.tokenService.tokensForRegister(savedUser.id)
            return {tokens: this.tokenService.getPairTokens(), user: this.getInfoAboutUser(savedUser)}
        }
    }

    async login(body: AuthLoginDto) {
        const user = await this.userRepository.findOneBy({email: body.email})
        if (user) {
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

    async refresh(body:AuthRefreshDto){
        const userId:number = this.tokenService.verify(body.refreshToken)
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