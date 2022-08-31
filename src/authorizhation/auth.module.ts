import {forwardRef, Module} from '@nestjs/common';
import {User} from "../users/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {TokenModule} from "../token/token.module";
import {MailModule} from "../sendMailer/mail.module";
import {Setting} from "../settings/entities/setting.entity";
import {Profile} from "../profile/entities/profile.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User]),
            TypeOrmModule.forFeature([Profile]),
        TypeOrmModule.forFeature([Setting])
        , forwardRef(() => TokenModule),forwardRef(()=>MailModule)],
    controllers: [AuthController],
    exports:[AuthService],
    providers: [AuthService]
})
export class AuthModule {
}
