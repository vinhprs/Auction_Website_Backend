import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProductAuctionService } from './product-auction.service';
import { ProductAuction } from './entities/product-auction.entity';
import { CreateProductAuctionInput } from './dto/create-product-auction.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

@Resolver(() => ProductAuction)
export class ProductAuctionResolver {
  constructor(private readonly productAuctionService: ProductAuctionService) {}

  @Mutation(() => ProductAuction)
  async createProductAuction(
    @Args('CreateProductAuctionInput') createProductAuctionInput: CreateProductAuctionInput,
    @Context('req') req: Request
  ) {
    try {
      return await this.productAuctionService.create(createProductAuctionInput, req);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
