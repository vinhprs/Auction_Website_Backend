import { HttpException, HttpStatus } from '@nestjs/common';
import * as sg from '@sendgrid/mail';

sg.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendVerifyEmail(
    to: string,
    randomCode: string
): Promise<boolean> {
    try {
        sg
            .send({
                from: process.env.SENDGRID_EMAIL,
                to,
                subject: "This is otp code to verify your account",
                html: `<strong>and easy to do anywhere, even with Node.js ${randomCode}</strong>`,
            })
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
        return true;
    } catch (error) {
        throw new HttpException(error.messages, HttpStatus.BAD_REQUEST)
    }
}

export async function sendResetPasswordEmail(
    to: string,
    randomCode: string
): Promise<boolean> {
    try {
        sg
            .send({
                from: process.env.SENDGRID_EMAIL,
                to,
                subject: "This is otp code to reset your password",
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            })
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
        return true;
    } catch (error) {
        throw new HttpException(error.messages, HttpStatus.BAD_REQUEST)
    }
}