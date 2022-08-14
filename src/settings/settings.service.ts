import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    Redirect,
    UnprocessableEntityException
} from '@nestjs/common';
import {CreateSettingDto} from './dto/create-setting.dto';
import {UpdateSettingDto} from './dto/update-setting.dto';
import {ChangingNicknameDtoDto} from "../profile/dto/changing.nickname.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {EmailDto} from "../profile/dto/email.dto";
import {Setting} from "./entities/setting.entity";
import {MailService} from "../sendMailer/mail.service";
import {RecoveryPasswordDto} from "./dto/recovery.password.dto";
import {NewPasswordDto} from "./dto/new.password.dto";
import {RequestChangingEmailDto} from "../profile/dto/requestChangingEmailDto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        private jwtService: JwtService,
        private mailService: MailService,
        private config: ConfigService) {
    }
    public async changeNickname(body: ChangingNicknameDtoDto) {
        const candidate = await this.userRepository.findOneBy({nickname: body.nickname})
        if (candidate) {
            throw new UnprocessableEntityException("Username already exist")
        }
        const personRow = await this.userRepository.findOneBy({id: body.userId})
        personRow.nickname = body.nickname
        return await this.userRepository.save(personRow)
    }

    public async requestOnChangingEmail(body: RequestChangingEmailDto): Promise<HttpException> {
        const candidateEmail = await this.userRepository.findOneBy({email: body.email})
        if (candidateEmail) {
            throw new UnprocessableEntityException("Email already exist")
        }
        const secretTokenForLinkConfirmEmail = await this.jwtService.signAsync(
            {userId: body.userId, candidateEmail: body.email},
            {secret: this.config.get("SECRET_KEY_ACCESS_JWT"), expiresIn: '30d'})
        return await this.mailService.sendLetterToNewEmailForChangingEmail(body.email, secretTokenForLinkConfirmEmail)
    }

    public async changingEmail(payload: string): Promise<void> {
        const decodedPayload: { userId: number, candidateEmail: string } = await this.jwtService.verify(
            payload,
            {secret: this.config.get("SECRET_KEY_ACCESS_JWT")})
        const user = await this.userRepository.findOneBy({id: decodedPayload.userId})
        if (decodedPayload && user.email !== decodedPayload.candidateEmail) {
            user.email = decodedPayload.candidateEmail
            await this.userRepository.save(user)
            throw new HttpException("Email was successfully changed", HttpStatus.OK)
        } else {
            throw new HttpException("You don't have permission", HttpStatus.FORBIDDEN)
        }
    }

    public async requestForChangingForgotPasswordByEmail(body: EmailDto) {
        const user = await this.userRepository.findOneBy({email: body.email})
        if (!user) {
            throw new NotFoundException("Email not exist")
        }
        const generatedCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        await this.settingRepository.update(
            {userId: user.id},
            {passwordConfirmationCode: generatedCode})
        await this.mailService.sendCodeForConfirmationRecoveryPassword(user.email, generatedCode)
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
        if (!user) {
            throw new HttpException("Email not exist", HttpStatus.NOT_FOUND)
        }
        const settings = await this.settingRepository.findOneBy({userId: user.id})
        if (settings.accessToChangingPassword && settings.accessToChangingPassword) {
            user.password = await bcrypt.hash(body.newPassword, bcrypt.genSaltSync(5));
            await this.userRepository.save(user)
            settings.accessToChangingPassword = false
            await this.settingRepository.save(settings)
            throw new HttpException("Password has been successfully changed", HttpStatus.CREATED)
        } else {
            throw new HttpException("You don't have permission", HttpStatus.FORBIDDEN)
        }
    }

}
