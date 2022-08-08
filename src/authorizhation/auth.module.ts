import {forwardRef, Module} from '@nestjs/common';
import {User} from "../users/entities/user";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {TokenService} from "../token/token.service";
import {TokenModule} from "../token/token.module";
import {ProfileModule} from "../profile/profile.module";
import {Profile} from "../profile/profile.entity";
import {MailModule} from "../sendMailer/mail.module";
import {MailService} from "../sendMailer/mail.service";


@Module({
    imports: [TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Profile])
        , forwardRef(() => TokenModule),forwardRef(()=>MailModule)],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
