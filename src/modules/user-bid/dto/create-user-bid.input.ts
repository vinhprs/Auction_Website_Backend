import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateUserBidInput {
  @Field(() => String)
  Product_Auction_ID: string;

  @Field(() => Float)
  Price: number;

}

@InputType()
export class GetCurrentBidInput {
  @Field(() => String)
  Product_Auction_ID: string;

  @Field(() => String)
  User_ID: string;

}
