import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuctionFieldService } from './auction-field.service';
import { AuctionField } from './entities/auction-field.entity';
import { CreateAuctionFieldInput } from './dto/create-auction-field.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => AuctionField)
export class AuctionFieldResolver {
  constructor(private readonly auctionFieldService: AuctionFieldService) {}

  @Mutation(() => AuctionField)
  async createAuctionField(
    @Args('createAuctionFieldInput') createAuctionFieldInput: CreateAuctionFieldInput
  ) : Promise<AuctionField> {
    try {
      return await this.auctionFieldService.create(createAuctionFieldInput);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => [AuctionField])
  async getOperatingAuctionField() : Promise<AuctionField[]> {
    try {
      return await this.auctionFieldService.
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
