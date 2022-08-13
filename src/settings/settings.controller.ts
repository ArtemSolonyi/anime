import {Controller, Get, Post, Body, Patch, Param, Delete, Redirect} from '@nestjs/common';
import {SettingsService} from './settings.service';
import {CreateSettingDto} from './dto/create-setting.dto';
import {UpdateSettingDto} from './dto/update-setting.dto';
import {ChangingNicknameDtoDto} from "../profile/dto/changing.nickname.dto";
import {EmailDto} from "../profile/dto/email.dto";
import {RecoveryPasswordDto} from "./dto/recovery.password.dto";
import {NewPasswordDto} from "./dto/new.password.dto";
import {RequestChangingEmailDto} from "../profile/dto/requestChangingEmailDto";


@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {
    }

    @Patch('/change/nickname')
    async changeNickname(@Body() body: ChangingNicknameDtoDto) {
        return await this.settingsService.changeNickname(body)
    }

    @Patch('/change/email')
    async requestOnChangingEmail(@Body() body: RequestChangingEmailDto) {
        return await this.settingsService.requestOnChangingEmail(body)
    }

    @Get('/change/email/:secretTokenFromLinkConfirmedEmail')
    async async(@Param("secretTokenFromLinkConfirmedEmail") secretTokenFromLinkConfirmedEmail:string) {
        return await this.settingsService.changingEmail(secretTokenFromLinkConfirmedEmail)
    }

    @Patch('/request/forgot/password')
    async requestForChangingForgotPasswordByEmail(@Body() body: EmailDto) {
        return await this.settingsService.requestForChangingForgotPasswordByEmail(body)
    }

    @Patch('/sending/forgot/password')
    async sendingCodeForConfirmChangingPassword(@Body() body: RecoveryPasswordDto) {
        return await this.settingsService.sendingCodeForConfirmChangingPassword(body)
    }

    @Patch('/changing/forgot/password')
    async changingForgotPasswordByEmailAndCode(@Body() body: NewPasswordDto) {
        return await this.settingsService.changingForgotPasswordByEmailAndCode(body)
    }



}
