import * as nodemailer from 'nodemailer';
import {HttpCode, HttpException, HttpStatus} from "@nestjs/common";

export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'myanimlibrary@gmail.com',
            pass: 'rfrmnwpdtmprxtlm'
        }
    });

    public async activateAccount(email: string, tempKey: string, userId: number) {
        await this.sendMailTo(email, `<a href="https://localhost:3000/auth/confirmationEmail/active/${userId}/${tempKey}">Нажми</a>`)
    }

    public async sendCodeForConfirmationRecoveryPassword(email: string, code: number): Promise<HttpException> {
        const sendingCode = await this.sendMailTo(email, `<h3>Код для подтверждения восстановления пароля<string>${code}</string></h3>`)
        if (sendingCode) {
            throw new HttpException('Code was sending on your email success', HttpStatus.OK)
        } else {
            throw new HttpException('Code was sending on your email success', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private async sendMailTo(emailTo: string, htmlText: string): Promise<boolean> {
        const sending = await this.transporter.sendMail({
            to: `${emailTo}`, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `${htmlText}`, // html body
        })
        return !!sending;
    }


}