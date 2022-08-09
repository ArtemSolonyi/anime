import {
    Injectable,
    UnauthorizedException, NestMiddleware
} from '@nestjs/common';
import {Request, Response} from "express"
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class isAuthorized implements NestMiddleware {
    constructor(private jwtService: JwtService,private config:ConfigService) {}
     use(request: Request, res: Response, next: (error?: unknown) => void): void {
        let token: string = request.headers.authorization
        try {
            const decodeTokenToPayload = this.jwtService.verify(token, {secret: this.config.get("SECRET_KEY_ACCESS_JWT")})
            request.body.userId = decodeTokenToPayload.userId
            if (decodeTokenToPayload.userId != undefined) {
                next()
            }
        }catch {
            throw new UnauthorizedException('Вы не авторизованы')
        }
    }
}