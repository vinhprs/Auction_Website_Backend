import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateUserBidInput {
  @Field(() => String)
  Product_Auction_ID: string;

  @Field(() => Float)
  Price: number;

}
