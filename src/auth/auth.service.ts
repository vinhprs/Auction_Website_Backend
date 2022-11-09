import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../modules/common/entities/common.entity';
import { UserService } from '../modules/user/user.service';
import { SignupUserInput, LoginUserInput } from './dto/auth.input';
import { randomOtp } from '../utils/random.util';
import { User } from '../modules/user/entities/user.entity';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { sendVerifyEmail, sendResetPasswordEmail } from '../utils/sendEmail.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) {}

  async signup (signupUserInput: SignupUserInput) : Promise<JwtPayload> {
    const isExistEmail = await this.userService.getUserByEmail(signupUserInput.Email);
    const isExistUsername = await this.userService.getUserByUsername(signupUserInput.User_Name);

    if(isExistEmail ) {
      throw new UnauthorizedException("This email is already taken")
    }
    if(isExistUsername) {
      throw new UnauthorizedException("This user name is already taken")
    }

    const randomCode: string = randomOtp(6);
    const user: User = await this.userService.singup(signupUserInput, randomCode);

    const [ email, token ] = await Promise.all([
      sendVerifyEmail(user.Email, randomCode),
      this.setJwt(user.User_ID)
    ]) 
    if(!email) {
      Logger.error("Send email fail for " + user.Email, "SignUp")
    }
    return token;
  }

  async login(loginUserInput: LoginUserInput) : Promise<JwtPayload> {
    const user: User = await this.userService.validateUserInput(loginUserInput);

    return this.setJwt(user.User_ID);
  }

  async forgotPassword(email: string) : Promise<boolean> {
    const user: User = await this.userService.getUserByEmail(email);
    if(!user || !user.isConfirmEmail) {
      throw new NotFoundException('Not found email!');
    }
    const randomCode = randomOtp(6);

    await Promise.all([
      this.userService.createOtpResetPassword(user, randomCode),
      sendResetPasswordEmail(email, randomCode)
    ])
    return true;
  }

  async setJwt(userId: string): Promise<JwtPayload> {
    const payload = {id: userId};

    const accessToken = sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: +process.env.ACCESS_TOKEN_AGE
    });
  
    const jwt: JwtPayload = new JwtPayload();
    jwt.userId = payload;
    jwt.accessToken = accessToken;

    return jwt;
  }

  async resendOtp(User_ID: string) : Promise<boolean> {
    const user = await this.userService.getUserById(User_ID);
    const randomCode = randomOtp(6);

    return await sendVerifyEmail(user.Email, randomCode);
  }

  getDateAfterSeconds(secs: number) {
    return new Date(Date.now() + secs * 1000);
  }

  setTokenForUserCookie(respone: Response, jwtPayLoad: JwtPayload) {
    try {
      const { accessToken } = jwtPayLoad;
      respone.cookie(process.env.ACCESS_TOKEN_KEY, accessToken, {
        expires: this.getDateAfterSeconds(+process.env.ACCESS_TOKEN_AGE),
        path: "/"
      })

    } catch(err) {
      console.log("TRY TO SET COOKIE_ERROR: ", err)
    }
  }
}
