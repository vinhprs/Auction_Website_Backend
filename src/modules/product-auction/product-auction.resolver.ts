import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { ProductAuctionService } from './product-auction.service';
import { ProductAuction } from './entities/product-auction.entity';
import { CreateProductAuctionInput } from './dto/create-product-auction.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { Product } from '../product/entities/product.entity';

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

  @Query(() => [ProductAuction])
  async getAuctioningProduct() : Promise<ProductAuction[]> {
    try {
      return await this.productAuctionService.getAuctioningProduct();
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @ResolveField(() => [Product])
  async Product_ID(
    @Parent() productAuction: ProductAuction
  ) : Promise<Product> {
    try {
      const { Product_Auction_ID } = productAuction;
      return await this.productAuctionService.getProducByAuctioning(Product_Auction_ID);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
