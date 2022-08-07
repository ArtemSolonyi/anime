import {forwardRef, Module} from '@nestjs/common';
import {User} from "../users/entities/user";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {TokenService} from "../token/token.service";
import {TokenModule} from "../token/token.module";



@Module({
    imports:[TypeOrmModule.forFeature([User]),forwardRef(()=>TokenModule)],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
