import {JwtPayload, sign} from 'jsonwebtoken'
import {User} from "../users/entities/user.entity";
import {Token} from "./entities/token.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
import {AuthRefreshDto} from "../authorizhation/dto/auth.dto";
import {ConfigService} from "@nestjs/config";

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
                private jwtService?: JwtService,
                private config?: ConfigService) {
    }

    public async groupingCreatedTokens(userId: number): Promise<void> {
        
        const payloadData = {userId: userId}
        this._accessToken = await this.createToken(payloadData, this.config.get("SECRET_KEY_ACCESS_JWT"), "15m")
        this._refreshToken = await this.createToken(payloadData, this.config.get("SECRET_KEY_REFRESH_JWT"), '15d')

    }

    public async createToken(payloadData: object, secretKey: string, timeExpire: string): Promise<string> {
        return this.jwtService.sign(payloadData, {secret: secretKey, expiresIn: timeExpire})
    }

    public getPairTokens(): ITokens {
        return {accessToken: this._accessToken, refreshToken: this._refreshToken}
    }

    public verify(token: string):{ userId: number } | HttpException {
        try {
            return  this.jwtService.verify(token, {secret: this.config.get("SECRET_KEY_REFRESH_JWT")}) as {userId:number}
        } catch (e) {
            throw  new HttpException('tempKey no correct',HttpStatus.BAD_REQUEST);
        }

    }

    public async saveCreatedTokens(): Promise<void> {
        let tokenEntity = {
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