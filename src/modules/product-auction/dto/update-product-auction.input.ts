import { CreateProductAuctionInput } from './create-product-auction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductAuctionInput extends PartialType(CreateProductAuctionInput) {
  @Field(() => Int)
  id: number;
}
