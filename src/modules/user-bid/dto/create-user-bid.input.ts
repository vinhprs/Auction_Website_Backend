import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserBidInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
