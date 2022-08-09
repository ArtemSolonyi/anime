import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpStatus,
    HttpException,
    UnauthorizedException, NestMiddleware
} from '@nestjs/common';
import {Request, Response} from "express"
import {JwtService} from "@nestjs/jwt";


interface IJwtPayLoad {
    userId: string
}

@Injectable()
export class isAuthorized implements NestMiddleware {
    constructor(private jwtService: JwtService) {}
     use(request: Request, res: Response, next: (error?: unknown) => void): void {
        let token: string = request.headers.authorization
        try {
            const decodeTokenToPayload = this.jwtService.verify(token, {secret: 'process.env.SECRET_KEY_ACCESS_JWT'})
            request.body.userId = decodeTokenToPayload.userId
            if (decodeTokenToPayload.userId != undefined) {
                next()
            }
        }catch {
            throw new UnauthorizedException('Вы не авторизованы')
        }
    }
}