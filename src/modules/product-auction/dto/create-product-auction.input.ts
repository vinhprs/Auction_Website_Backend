import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductAuctionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
