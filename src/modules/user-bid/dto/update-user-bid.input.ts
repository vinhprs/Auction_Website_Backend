import { CreateUserBidInput } from './create-user-bid.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserBidInput extends PartialType(CreateUserBidInput) {
  @Field(() => Int)
  id: number;
}
