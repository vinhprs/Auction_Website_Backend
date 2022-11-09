import { CreateAuctionFieldInput } from './create-auction-field.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuctionFieldInput extends PartialType(CreateAuctionFieldInput) {
  @Field(() => Int)
  id: number;
}
