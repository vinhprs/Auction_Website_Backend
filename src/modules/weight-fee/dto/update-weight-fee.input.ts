import { CreateWeightFeeInput } from './create-weight-fee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWeightFeeInput extends PartialType(CreateWeightFeeInput) {
  @Field(() => Int)
  id: number;
}
