import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { Address } from '../address/entities/address.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUserByEmail(
    @Args("Email") Email: string 
  ) : Promise<User> {
    try {
      return await this.userService.getUserByEmail(Email);
    } catch(error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST );
    }
  }

  @Query(() => User)
  async getUserById(
    @Args("User_ID") User_ID: string 
  ) : Promise<User> {
    try {
      return await this.userService.getUserById(User_ID);
    } catch(error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST );
    }
  }

  @Mutation(() => User)
  async updateUserInfo(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context('req') req: Request
  ) : Promise<User> {
    try {
      return await this.userService.updateUserInfo(updateUserInput, req);
    } catch(error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST );
    }
  }
  
  @ResolveField(() => [Address])
  async Address(
    @Parent() user: User
  ) : Promise<Address[]> {
    try {
      const result = await this.userService.getUserAddress(user.User_ID);
      return result;
    } catch(error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST );
    }
  }

  @ResolveField(() => Address)
  async Default_Address_ID(
    @Parent() user: User
  ) : Promise<Address> {
    try {
      const result = await this.userService.userDefaultAddress(user.User_ID);
      return result;
    } catch(error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST );
    }
  }
}
