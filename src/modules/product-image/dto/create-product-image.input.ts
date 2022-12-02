import { InputType, Int, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Product } from '../../product/entities/product.entity';

@InputType()
export class CreateProductImageInput {
  @Field(() => GraphQLUpload, {nullable: true, defaultValue: null})
  Product_Image_Url?: string;

  @Field()
  Product_ID: string;
}
