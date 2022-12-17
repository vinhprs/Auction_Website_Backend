import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserBidService } from './user-bid.service';
import { UserBid } from './entities/user-bid.entity';
import { CreateUserBidInput, GetCurrentBidInput } from './dto/create-user-bid.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

@Resolver(() => UserBid)
export class UserBidResolver {
  constructor(private readonly userBidService: UserBidService) {}

  @Mutation(() => UserBid)
  async createUserBid(
    @Args('createUserBidInput') createUserBidInput: CreateUserBidInput,
    @Context('req') req: Request
  ) : Promise<UserBid> {
    try {
      return await this.userBidService.create(createUserBidInput, req);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => UserBid)
  async getCurrentBid(
    @Args('getCurrentBidInput') getCurrentBidInput: GetCurrentBidInput
  ) : Promise<UserBid> {
    try {
      return await this.userBidService.getCurrentBid(getCurrentBidInput);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

}
