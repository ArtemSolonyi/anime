import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {SettingsService} from './settings.service';
import {CreateSettingDto} from './dto/create-setting.dto';
import {UpdateSettingDto} from './dto/update-setting.dto';
import {ChangingUsernameDto} from "../profile/dto/changing.nickname.dto";
import {EmailDto} from "../profile/dto/email.dto";
import {RecoveryPasswordDto} from "./dto/recovery.password.dto";
import {NewPasswordDto} from "./new.password.dto";



@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {
    }

    @Patch('/change/username')
    async changeNickname(@Body() body: ChangingUsernameDto) {
        return await this.settingsService.changeNickname(body)
    }

    @Patch('/request/forgot/password')
    async requestForChangingForgotPasswordByEmail(@Body() body: EmailDto) {
        return await this.settingsService.requestForChangingForgotPasswordByEmail(body)
    }

    @Patch('/sending/forgot/password')
    async sendingCodeForConfirmChangingPassword(@Body() body:RecoveryPasswordDto ) {
        return await this.settingsService.sendingCodeForConfirmChangingPassword(body)
    }
    @Patch('/changing/forgot/password')
    async changingForgotPasswordByEmailAndCode(@Body() body:NewPasswordDto ) {
        return await this.settingsService.changingForgotPasswordByEmailAndCode(body)
    }

    @Post()
    create(@Body() createSettingDto: CreateSettingDto) {
        return this.settingsService.create(createSettingDto);
    }

    @Get()
    findAll() {
        return this.settingsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.settingsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
        return this.settingsService.update(+id, updateSettingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.settingsService.remove(+id);
    }
}
