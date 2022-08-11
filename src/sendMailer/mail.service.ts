import * as nodemailer from 'nodemailer';
import {HttpCode, HttpException, HttpStatus} from "@nestjs/common";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'myanimlibrary@gmail.com',
            pass: 'rfrmnwpdtmprxtlm'
        }
    });

    public async activateAccount(email: string, tempKey: string) {
        await this.sendMailTo(email, `<a href="https://localhost:3000/api/v1/auth/confirmationEmail/active/${tempKey}">Нажми</a>`)
    }

    public async sendLetterToNewEmailForChangingEmail(email: string, secretTokenForLinkConfirmEmail: string): Promise<HttpException> {
        const sendingLetterOnNewEmail = await this.sendMailTo(email,
            `<a href="https://localhost:3000/settings/change/email/${secretTokenForLinkConfirmEmail}">Подтвердить почту </a>`)
        if (sendingLetterOnNewEmail) {
            throw new HttpException('Letter was sending on your new email success', HttpStatus.OK)
        } else {
            throw new HttpException('Letter was sending on your email failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async sendCodeForConfirmationRecoveryPassword(email: string, code: number): Promise<HttpException> {
        const sendingCode = await this.sendMailTo(email, `<h3>Код для подтверждения восстановления пароля <string> ${code}</string></h3>`)
        if (sendingCode) {
            throw new HttpException('Code was sending on your email success', HttpStatus.OK)
        } else {
            throw new HttpException('Code was sending on your email failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private async sendMailTo(emailTo: string, htmlText: string): Promise<SMTPTransport.SentMessageInfo> {
        return await this.transporter.sendMail({
            to: `${emailTo}`, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `${htmlText}`, // html body
        })

    }


}