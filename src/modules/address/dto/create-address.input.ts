import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field(() => String)
  Address_Name: string;

  @Field(() => String)
  Address_District: string;

  @Field(() => Int)
  District_ID: number;

  @Field(() => String)
  Reciever_Name: string;

  @Field(() => String)
  Phone: string;
}
