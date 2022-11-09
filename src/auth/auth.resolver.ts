import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from '../modules/user/user.service';
import { AuthService } from './auth.service';
import { SignupUserInput, LoginUserInput, ActiveOtpInput } from './dto/auth.input';
import { JwtPayload } from '../modules/common/entities/common.entity';
import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Mutation(() => JwtPayload)
  async signup(
    @Args('signupUserInput') signupUserInput: SignupUserInput,
    @Context("res") response: Response
  ) : Promise<JwtPayload> {
    const jwt = await this.authService.signup(signupUserInput);
    this.authService.setTokenForUserCookie(response, jwt);
    return jwt;
  }

  @Mutation(() => JwtPayload) 
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context('res') res: Response
  ) {
    try {
      const jwt = await this.authService.login(loginUserInput);
      this.authService.setTokenForUserCookie(res, jwt);
      return jwt;
    } catch(error) {
      throw new HttpException(error.message, error.status || HttpStatus.FORBIDDEN)
    }
  }

  @Mutation(() => Boolean)
  async activeOtp(
    @Args('activeOtpInput') activeOtpInput: ActiveOtpInput
  ) : Promise<boolean> {
    try {
      return await this.userService.activeOtp(activeOtpInput);
    } catch(error) {
      throw new HttpException(error.messages, error.status || HttpStatus.FORBIDDEN);
    }
  }

  @Mutation(() => Boolean) 
  async resendOtp(User_ID: string) : Promise<boolean> {
    try {
      return await this.authService.resendOtp(User_ID);
    } catch(error) {
      throw new HttpException(error.messages, error.status || HttpStatus.FORBIDDEN);
    }
  }
}
