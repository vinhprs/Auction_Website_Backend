import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsEmail, Min } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  userNameorPassword: string;

  @Field()
  passWord: string; 
}

@InputType()
export class SignupUserInput {
  @Field()
  User_First_Name: string;

  @Field()
  User_Last_Name: string;

  @Field()
  User_Name: string;

  @Field()
  @IsEmail()
  Email: string;

  @Field()
  @MinLength(6)
  Password: string;

  @Field()
  PassWordConfirm: string;
}

@InputType()
export class ActiveOtpInput {
  @Field()
  otp: string;

  @Field()
  User_ID: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @MinLength(6)
  New_Password: string;

  @Field()
  otp: string;

  @Field()
  User_ID: string;
}

