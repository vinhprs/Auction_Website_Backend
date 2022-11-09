import { HttpException, HttpStatus } from '@nestjs/common';
import * as mailgun from 'mailgun-js';

export const mailGun = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
})

export async function sendVerifyEmail(
    to: string,
    randomCode: string
) : Promise<boolean> {
    try {
        mailGun.messages().send({
            from: process.env.MAILGUN_EMAIL,
            to,
            subject: "This is otp code to verify your account",
            template: "freshauc",
            'h:X-Mailgun-Variables': JSON.stringify({ randomCode })
        }, (error, body) => {
            if(error) throw new Error(error.message)
        })
        return true;
    } catch(error) {
        throw new HttpException(error.messages, HttpStatus.BAD_REQUEST)
    }
}

export async function sendResetPasswordEmail(
    to: string,
    randomCode: string
) : Promise<boolean> {
    try {
        mailGun.messages().send({
            from: process.env.MAILGUN_EMAIL,
            to,
            subject: "This is otp code to reset your password!",
            template: "resetpass",
            'h:X-Mailgun-Variables': JSON.stringify({ randomCode })
        }, (error, body) => {
            if(error) throw new Error(error.message)
        })
        return true;
    } catch(error) {
        throw new HttpException(error.messages, HttpStatus.BAD_REQUEST)
    }
}