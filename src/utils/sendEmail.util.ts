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
                dynamicTemplateData: {
                    "OTP": randomCode
                },
                templateId: "d-a06ea697467b44e9bbe1441dafe88191"
            })
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error.message)
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
                dynamicTemplateData: {
                    "OTP": randomCode
                },
                templateId: "d-51d0aae25b904c8c8a9bf0ec4ac1d6c1"
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