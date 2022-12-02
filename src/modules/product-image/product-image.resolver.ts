import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductImageService } from './product-image.service';
import { ProductImage } from './entities/product-image.entity';
import { CreateProductImageInput } from './dto/create-product-image.input';
import { UpdateProductImageInput } from './dto/update-product-image.input';

@Resolver(() => ProductImage)
export class ProductImageResolver {
  constructor(private readonly productImageService: ProductImageService) {}

  // @Mutation(() => ProductImage)
  // createProductImage(@Args('createProductImageInput') createProductImageInput: CreateProductImageInput) {
  //   return this.productImageService.create(createProductImageInput);
  // }

}
