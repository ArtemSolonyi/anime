import {forwardRef, Module} from '@nestjs/common';
import {User} from "../users/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {TokenService} from "../token/token.service";
import {TokenModule} from "../token/token.module";
import {ProfileModule} from "../profile/profile.module";
import {Profile} from "../profile/entities/profile.entity";
import {MailModule} from "../sendMailer/mail.module";
import {MailService} from "../sendMailer/mail.service";
import {Setting} from "../settings/entities/setting.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Setting])
        , forwardRef(() => TokenModule),forwardRef(()=>MailModule)],
    controllers: [AuthController],
    exports:[AuthService],
    providers: [AuthService]
})
export class AuthModule {
}
