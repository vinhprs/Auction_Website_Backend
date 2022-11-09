import { CreateProductImageInput } from './create-product-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductImageInput extends PartialType(CreateProductImageInput) {
  @Field(() => Int)
  id: number;
}
