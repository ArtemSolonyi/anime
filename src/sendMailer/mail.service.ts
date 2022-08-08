import * as nodemailer from 'nodemailer';

export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'myanimlibrary@gmail.com',
            pass: 'rfrmnwpdtmprxtlm'
        }
    });
    public async activateAccount(email:string,tempKey:string,userId:number) {
        await this.sendMailTo(email, `<a href="https://localhost:3000/auth/confirmationEmail/active/${userId}/${tempKey}">Нажми</a>`)
    }

    private async sendMailTo(emailTo:string, htmlText:string) {
        await this.transporter.sendMail({
            to: `${emailTo}`, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `${htmlText}`, // html body
        })
    }


}