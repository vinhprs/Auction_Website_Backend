import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEvaluateInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
