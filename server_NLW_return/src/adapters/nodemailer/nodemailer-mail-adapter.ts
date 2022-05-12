import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d1b4c279da858c",
        pass: "071ea3829c5c91"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi.feedget.com>',
            to: 'Fabiano França <fabianofranca.ti@gmail.com>',
            subject,
            html: body,

        });

    }

}