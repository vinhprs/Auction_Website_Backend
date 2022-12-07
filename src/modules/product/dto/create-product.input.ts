import {Int, Field, Float, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../../common/entities/common.entity';
@InputType()
export class CreateProductInput {
  @Field(() => [GraphQLUpload], {nullable: true, defaultValue: null})
  Product_Image: Array<Promise<FileUpload>>

  @Field()
  Product_Name: string;

  @Field(() => Int)
  Quantity: number;

  @Field(() => Float)
  Weight: number;

  @Field(() => Float)
  Price: number;

  @Field({nullable: true, defaultValue: null})
  User_Note?: string;

  @Field({defaultValue: true})
  isActive: boolean;

  @Field({nullable: true, defaultValue: null})
  Product_Info?: string;

  @Field()
  Catalog_ID: string;
}

@InputType()
export class PaginationInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset:  number;
}

@InputType()
export class SearchProductInput extends PaginationInput {
  @Field(() => String)
  keywords: string;
}

@InputType()
export class GetProductByCatalog extends PaginationInput {
  @Field(() => String)
  Catalog_Name: string;
}