import {sign} from 'jsonwebtoken'
import {User} from "../users/entities/user";
import {Token} from "./entity/token";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";


export interface ITokens {
    accessToken: string,
    refreshToken: string
}
@Injectable()
export class TokenService {
    private user: User
    private _accessToken: string
    private _refreshToken: string

    constructor(@InjectRepository(Token) private tokenRepository?: Repository<Token>) {}

    public async groupingCreatedTokens(): Promise<void> {
        const payloadData = {userId: this.user.id}
        this._accessToken = await this._createToken(payloadData, "process.env.SECRET_KEY_ACCESS_JWT", "15m")
        this._refreshToken = await this._createToken(payloadData, "process.env.SECRET_KEY_REFRESH_JWT", '30d')

    }


    private async _createToken(payloadData: object, secretKey: string, timeExpire: string): Promise<string> {
        return sign(payloadData, secretKey, {expiresIn: timeExpire})
    }

    public getPairTokens(): ITokens {
        return {accessToken: this.accessToken, refreshToken: this._refreshToken}
    }

    public async saveCreatedTokens(): Promise<void> {
        let tokenEntity: Token = {
            userId: this.user.id,
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        }
        const createdTokenEntity = await this.tokenRepository.create(tokenEntity)
        const savedTokenEntity = await this.tokenRepository.save(createdTokenEntity)
    }

    public get accessToken() {
        return this._accessToken
    }

    public get refreshToken() {
        return this._refreshToken
    }

    public async updateTokens(user:User) {
        this.user = user
        await this.groupingCreatedTokens()
        this.tokenRepository
            .createQueryBuilder()
            .update(Token)
            .set({
                accessToken: this._accessToken,
                refreshToken: this._refreshToken
            })
            .where("id=:id",{id:user.id})


    }

    public async tokensForRegister(user: User) {
        this.user = user
        await this.groupingCreatedTokens()
        await this.saveCreatedTokens()
    }


}