import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCatalogInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
