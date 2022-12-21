import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field(() => [String])
  Order_ID: string[];

  @Field(() => Float)
  total: number;
}
