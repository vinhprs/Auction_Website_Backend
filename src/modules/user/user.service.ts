import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupUserInput, LoginUserInput, ActiveOtpInput, ResetPasswordInput } from '../../auth/dto/auth.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getUserById(User_ID: string) : Promise<User> {
    return await this.userRepository.findOneBy({ User_ID });
  }

  async getUserByEmail(Email: string) : Promise<User> {
    const user: User = await this.userRepository.findOneBy({ Email });

    return user;
  }

  async getUserByUsername(User_Name: string) : Promise<User> {
    const user: User = await this.userRepository.findOneBy({ User_Name });

    return user;
  }

  async validateUserInput(loginUserInput: LoginUserInput) : Promise<User> {
    const { email, userName, passWord  } = loginUserInput;
    let user : User;

    if(email) {
      user = await this.getUserByEmail(email);
    }

    if(userName) {
      user = await this.getUserByUsername(email);
    }

    if(!user) {
      throw new UnauthorizedException("This user is not registered");
    }
    const validPassword = await bcrypt.compare(passWord, user.Password);
    if(!validPassword) {
      throw new UnauthorizedException("Please enter a correct password!");
    }

    if(!user.isConfirmEmail) {
      throw new UnauthorizedException("Your email is not activated. Please check your email and verity OTP before login!");
    }
    return user;
  }

  async validateResetPasswordInput(resetPassWordInput : ResetPasswordInput) 
  : Promise<boolean> {
    const { User_ID, New_Password, otp } = resetPassWordInput;
    const user: User = await this.getUserById(User_ID);
    if(!user) {
      throw new NotFoundException('Not found user');
    }
    if(!user.ResetPasswordOtp) {
      return false;
    }
    const isMatch = await bcrypt.compare(otp, user.ResetPasswordOtp);
    if(!isMatch) {
      throw new UnauthorizedException("Incorrect Otp code");
    }
    user.ResetPasswordOtp = null;
    user.Password = await bcrypt.hash(New_Password, 12);
    
    return await this.userRepository.save(user) ? true: false;
  }
  
  async singup(signupUserInput: SignupUserInput, randomCode: string) 
  : Promise<User> {
    const user: User = this.userRepository.create(signupUserInput);
    [ user.Password, user.Otp ] = await Promise.all([
      bcrypt.hash(signupUserInput.Password, 12),
      bcrypt.hash(randomCode, 12)
    ]);
    
    await this.userRepository.save(user);
    return user;
  }

  async activeOtp(activeOtpInput: ActiveOtpInput) : Promise<boolean> {
    const user: User = await this.userRepository.findOneBy({ User_ID: activeOtpInput.User_ID });
    if(!user) {
      throw new NotFoundException("Not found user");
    }
    if(!user.Otp) {
      return false;
    }
    const isMatch = await bcrypt.compare(activeOtpInput.otp, user.Otp);
    if(!isMatch) {
      throw new UnauthorizedException("Your otp is incorrect");
    }
    user.Otp = null;
    user.isConfirmEmail = true;

    return this.userRepository.save(user) ? true: false;
  }

  async createOtpResetPassword(user: User, randomCode: string) 
  : Promise<User> {
    user.ResetPasswordOtp = await bcrypt.hash(randomCode, 12);

    return await this.userRepository.save(user);
  }

}
