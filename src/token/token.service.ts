import {JwtPayload, sign} from 'jsonwebtoken'
import {User} from "../users/entities/user";
import {Token} from "./entity/token";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
import {AuthRefreshDto} from "../authorizhation/dto/auth.dto";

export interface ITokens {
    accessToken: string,
    refreshToken: string
}

@Injectable()
export class TokenService {
    private userId: number
    private _accessToken: string
    private _refreshToken: string

    constructor(@InjectRepository(Token) private tokenRepository?: Repository<Token>,
                private jwtService?: JwtService) {
    }

    public async groupingCreatedTokens(userId: number): Promise<void> {
        const payloadData = {userId: userId}

        this._accessToken = await this.createToken(payloadData, "process.env.SECRET_KEY_ACCESS_JWT", "15m")
        this._refreshToken = await this.createToken(payloadData, "process.env.SECRET_KEY_REFRESH_JWT", '30d')

    }

    public async createToken(payloadData: object, secretKey: string, timeExpire: string): Promise<string> {
        return this.jwtService.sign(payloadData, {secret: secretKey, expiresIn: timeExpire})
    }

    public getPairTokens(): ITokens {
        return {accessToken: this._accessToken, refreshToken: this._refreshToken}
    }

    public verify(token: string) {
        return this.jwtService.verify(token, {secret: 'process.env.SECRET_KEY_REFRESH_JWT'})
    }

    public async saveCreatedTokens(): Promise<void> {
        let tokenEntity: Token = {
            userId: this.userId,
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        }
        const createdTokenEntity = await this.tokenRepository.create(tokenEntity)
        await this.tokenRepository.save(createdTokenEntity)
    }

    public get accessToken() {
        return this._accessToken
    }

    public get refreshToken() {
        return this._refreshToken
    }

    public async updateTokens(userId: number) {
        await this.groupingCreatedTokens(userId)
        await this.tokenRepository.update({userId: userId}, {
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        })

    }

    public async tokensForRegister(userId: number) {
        this.userId = userId
        await this.groupingCreatedTokens(userId)
        await this.saveCreatedTokens()
    }


}