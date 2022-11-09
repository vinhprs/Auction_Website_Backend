import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserBidLogInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
