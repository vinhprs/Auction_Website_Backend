import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductImageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
