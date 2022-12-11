import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductAuctionLogInput {
  
  @Field(() => Float)
  Price: number;
  
  @Field(() => Date)
  Time: Date;

  @Field(() => String)
  Product_Auction_ID: string;
}
