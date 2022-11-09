import { CreateDeliveryFeeInput } from './create-delivery-fee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDeliveryFeeInput extends PartialType(CreateDeliveryFeeInput) {
  @Field(() => Int)
  id: number;
}
