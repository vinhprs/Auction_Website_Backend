import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { ProductAuctionService } from './product-auction.service';
import { ProductAuction } from './entities/product-auction.entity';
import { CreateProductAuctionInput } from './dto/create-product-auction.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { Product } from '../product/entities/product.entity';
import { AuctionField } from '../auction-field/entities/auction-field.entity';
import { PaginationInput } from '../product/dto/create-product.input';

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

  @Query(() => [ProductAuction])
  async getAuctioningProductByCatalog(
    @Args('Catalog_Name') Catalog_Name: string
  ) : Promise<ProductAuction[]> {
    try {
      return await this.productAuctionService.getAuctioningProductByCatalog(Catalog_Name);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => [ProductAuction])
  async searchAuctioningProduct(
    @Args('Product_Name') Product_Name: string
  ) : Promise<ProductAuction[]> {
    try {
      return await this.productAuctionService.searchAuctioningProduct(Product_Name);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @ResolveField(() => [ProductAuction])
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

  @ResolveField(() => [AuctionField])
  async Auction_Field_ID(
    @Parent() productAuction: ProductAuction
  ) : Promise<AuctionField> {
    try {
      const { Product_Auction_ID } = productAuction;
      return await this.productAuctionService.getFieldAuctioning(Product_Auction_ID);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
