import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { ProductImage } from '../product-image/entities/product-image.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Boolean)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @Context('req') req: Request
    ) : Promise<boolean>{
    try {
      return await this.productService.create(createProductInput, req);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => [Product])
  async getAllProduct() : Promise<Product []> {
    try {
      return await this.productService.getAll();
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @ResolveField(() => [ProductImage])
  async Product_Image(@Parent() product: Product) : Promise<ProductImage[]> {
    try {
      return await this.productService.getImgByProduct(product.Product_ID);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

}
