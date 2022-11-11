import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { HttpException, HttpStatus } from '@nestjs/common';

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
}
