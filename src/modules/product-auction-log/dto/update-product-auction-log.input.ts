import { CreateProductAuctionLogInput } from './create-product-auction-log.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductAuctionLogInput extends PartialType(CreateProductAuctionLogInput) {
  @Field(() => Int)
  id: number;
}
