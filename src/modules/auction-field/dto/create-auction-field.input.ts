import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuctionFieldInput {
  @Field(() => Date)
  Start_Time: Date;

  @Field(() => Date)
  End_Time: Date;

  @Field(() => Int)
  Discount_Circle: number;

  @Field(() => Boolean, {defaultValue: false})
  isOperation: boolean;
}
