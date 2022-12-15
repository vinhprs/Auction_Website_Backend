import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInput {
  @Field(() => Float)
  amount: number;
  
}
