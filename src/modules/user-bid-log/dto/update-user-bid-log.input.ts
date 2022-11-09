import { CreateUserBidLogInput } from './create-user-bid-log.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserBidLogInput extends PartialType(CreateUserBidLogInput) {
  @Field(() => Int)
  id: number;
}
