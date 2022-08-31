import {Module} from '@nestjs/common';
import {SettingsService} from './settings.service';
import {SettingsController} from './settings.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Setting} from "./entities/setting.entity";
import {MailModule} from "../sendMailer/mail.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "../authorizhation/auth.module";
import {Profile} from "../profile/entities/profile.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Setting])
        , MailModule,
        JwtModule,
        AuthModule],
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingsModule {
}
