import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupUserInput, LoginUserInput, ActiveOtpInput, ResetPasswordInput } from '../../auth/dto/auth.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { sendVerifyEmail } from '../../utils/sendEmail.util';
import { randomOtp } from '../../utils/random.util';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { CurrencyService } from '../currency/currency.service';
import { UpdateUserInput } from './dto/update-user.input';
import { Request } from 'express';
import { getUserIdFromRequest } from 'src/utils/user-from-header.util';
import { Address } from '../address/entities/address.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => CurrencyService))
    private readonly currencyService: CurrencyService
  ) {}

  async getUserById(User_ID: string) : Promise<User> {
    return await this.userRepository.findOne({
      where: { User_ID },
      relations: {
        Product: true,
        Currency: true
      }
    });
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
    const { userNameorPassword, passWord  } = loginUserInput;
    const user: User = await this.getUserByEmail(userNameorPassword) || await this.getUserByUsername(userNameorPassword);

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

    await  this.currencyService.signupInit(user);
    return user;
  }

  async activeOtp(activeOtpInput: ActiveOtpInput) : Promise<boolean> {
    const user: User = await this.getUserById(activeOtpInput.User_ID);
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

    return await this.userRepository.save(user) ? true: false;
  }

  
  async resendOtp(User_ID: string) : Promise<boolean> {
    const user = await this.getUserById(User_ID);
    const randomCode = randomOtp(6);

    user.Otp = await bcrypt.hash(randomCode, 12)
    await this.userRepository.save(user);

    return await sendVerifyEmail(user.Email, randomCode);
  }

  async createOtpResetPassword(user: User, randomCode: string) 
  : Promise<User> {
    user.ResetPasswordOtp = await bcrypt.hash(randomCode, 12);

    return await this.userRepository.save(user);
  }

  async updateUserInfo(updateUserInput: UpdateUserInput, req: Request)
  : Promise<User> {
    const { User_First_Name, User_Last_Name, Phone, Shop_Name } = updateUserInput;
    const userId = getUserIdFromRequest(req);
    const user = await this.getUserById(userId);

    if(User_First_Name) {
      user.User_First_Name = User_First_Name
    }
    if(User_Last_Name) {
      user.User_Last_Name = User_Last_Name
    }
    if(Phone) {
      user.Phone = Phone;
    }
    if(Shop_Name) {
      user.Shop_Name = Shop_Name
    }

    return await this.userRepository.save(user)

  }

  async updateDefaultAddress(user: User ,address: Address)
  : Promise<void> {
    user.Default_Address_ID = address;

    await this.userRepository.save(user);
  }

}
