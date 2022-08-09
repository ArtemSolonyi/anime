import {Module} from '@nestjs/common';
import {SettingsService} from './settings.service';
import {SettingsController} from './settings.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Item} from "../items/entities/item";
import {User} from "../users/entities/user";
import {Setting} from "./entities/setting.entity";
import {MailModule} from "../sendMailer/mail.module";

@Module({
    imports:[TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Setting]),MailModule],
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingsModule {
}
