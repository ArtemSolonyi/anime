import {HttpException, HttpStatus, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {CreateSettingDto} from './dto/create-setting.dto';
import {UpdateSettingDto} from './dto/update-setting.dto';
import {ChangingUsernameDto} from "../profile/dto/changing.nickname.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user";
import {Repository} from "typeorm";
import {EmailDto} from "../profile/dto/email.dto";
import {Setting} from "./entities/setting.entity";
import {MailService} from "../sendMailer/mail.service";
import {RecoveryPasswordDto} from "./dto/recovery.password.dto";
import {NewPasswordDto} from "./new.password.dto";

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        private mailService: MailService) {
    }

    public async changeNickname(body: ChangingUsernameDto) {
        const candidate = await this.userRepository.findOneBy({username: body.username})
        if (candidate) {
            throw new UnprocessableEntityException("Username already exist")
        }
        const personRow = await this.userRepository.findOneBy({id: body.userId})
        personRow.username = body.username
        return await this.userRepository.save(personRow)

    }

    public async requestForChangingForgotPasswordByEmail(body: EmailDto): Promise<HttpException> {
        const user = await this.userRepository.findOneBy({email: body.email})
        if (!user) {
            throw new NotFoundException("Email not exist")
        }
        const generatedCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        await this.settingRepository.update({userId: user.id}, {passwordConfirmationCode: generatedCode})
        return await this.mailService.sendCodeForConfirmationRecoveryPassword(user.email, generatedCode)
    }

    public async sendingCodeForConfirmChangingPassword(body: RecoveryPasswordDto): Promise<HttpException> {
        const user = await this.userRepository.findOneBy({email: body.email})

        if (user) {
            const userSettings = await this.settingRepository.findOneBy({userId: user.id})
            if (body.passwordConfirmationCode === userSettings.passwordConfirmationCode) {
                userSettings.accessToChangingPassword = true
                await this.settingRepository.save(userSettings)
                throw new HttpException("Code success confirm", HttpStatus.OK)
            } else {
                throw new HttpException("Code not coincide", HttpStatus.UNPROCESSABLE_ENTITY)
            }
        } else {
            throw new HttpException("Email not exist", HttpStatus.NOT_FOUND)
        }
    }

    public async changingForgotPasswordByEmailAndCode(body: NewPasswordDto): Promise<HttpException> {
        const user = await this.userRepository.findOneBy({email: body.email})
        if(!user){
            throw new HttpException("Email not exist",HttpStatus.NOT_FOUND)
        }
        const settings = await this.settingRepository.findOneBy({userId: user.id})
        if (settings.accessToChangingPassword && settings.accessToChangingPassword) {
            user.password = body.newPassword
            await this.userRepository.save(user)
            settings.accessToChangingPassword = false
            await this.settingRepository.save(settings)
            throw new HttpException("Password has been successfully changed", HttpStatus.CREATED)
        } else {
            throw new HttpException("You don't have permission", HttpStatus.FORBIDDEN)
        }
    }

    create(createSettingDto: CreateSettingDto) {
        return 'This action adds a new setting';
    }

    findAll() {
        return `This action returns all settings`;
    }

    findOne(id: number) {
        return `This action returns a #${id} setting`;
    }

    update(id: number, updateSettingDto: UpdateSettingDto) {
        return `This action updates a #${id} setting`;
    }

    remove(id: number) {
        return `This action removes a #${id} setting`;
    }
}
