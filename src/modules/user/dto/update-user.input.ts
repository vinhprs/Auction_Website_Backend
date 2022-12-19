import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true, defaultValue: null })
  User_First_Name: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  User_Last_Name: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  Phone: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  Shop_Name: string;
}
