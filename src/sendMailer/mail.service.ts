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

    public  activateAccount(email: string, tempKey: string) {
         this.sendMailTo(email, `<a href="https://api-v1-anime-library.herokuapp.com/api/v1/auth/confirmationEmail/active/${tempKey}">Активировать аккаунт</a>`).then(r => r)
    }

    public sendLetterToNewEmailForChangingEmail(email: string, secretTokenForLinkConfirmEmail: string): Promise<HttpException> {
        const sendingLetterOnNewEmail = this.sendMailTo(email,
            `<a href="https://api-v1-anime-library.herokuapp.com/api/v1/settings/change/email/${secretTokenForLinkConfirmEmail}">Подтвердить почту </a>`)
        if (sendingLetterOnNewEmail) {
            throw new HttpException('Letter was sending on your new email success', HttpStatus.OK)
        } else {
            throw new HttpException('Letter was sending on your email failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public sendCodeForConfirmationRecoveryPassword(email: string, code: number): Promise<HttpException> {
        const sendingCode = this.sendMailTo(email, `<h3>Код для подтверждения восстановления пароля <string> ${code}</string></h3>`)
        if (sendingCode) {
            throw new HttpException('Code was sending on your email success', HttpStatus.OK)
        } else {
            throw new HttpException('Code was sending on your email failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private sendMailTo(emailTo: string, htmlText: string): Promise<SMTPTransport.SentMessageInfo> {
        return this.transporter.sendMail({
            to: `${emailTo}`, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `${htmlText}`, // html body
        })

    }


}