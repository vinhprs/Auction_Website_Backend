import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductAuctionInput {
  @Field(() => Int)
  Quantity: number;

  @Field(() => Float)
  Weight: number;

  @Field(() => Float)
  Starting_Price: number;

  @Field(() => Int)
  Discount_Rate: number;

  @Field(() => String)
  Product_ID: string;

  @Field(() => String)
  Auction_Field_ID: string;
  
}
