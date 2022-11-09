import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDeliveryFeeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
