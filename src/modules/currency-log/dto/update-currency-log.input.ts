import { CreateCurrencyLogInput } from './create-currency-log.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCurrencyLogInput extends PartialType(CreateCurrencyLogInput) {
  @Field(() => Int)
  id: number;
}
