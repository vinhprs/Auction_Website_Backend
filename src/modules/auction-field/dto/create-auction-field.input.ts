import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuctionFieldInput {
  @Field()
  Start_Time: Date;

  @Field()
  End_Time: Date;

  @Field(() => Int)
  Discount_Circle: number;

  @Field(() => Boolean, {defaultValue: false})
  isOperation: boolean;
}
