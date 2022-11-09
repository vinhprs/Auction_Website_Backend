import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductAuctionLogInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
