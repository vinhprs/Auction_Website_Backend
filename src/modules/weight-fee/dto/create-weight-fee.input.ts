import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateWeightFeeInput {

  @Field(() => Float)
  Weight_From: number;

  @Field(() => Float)
  Weight_To: number;

  @Field(() => Float)
  Fee: number;
}
