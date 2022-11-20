import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCatalogInput {
  @Field()
  Catalog_Name: string;

  @Field()
  Catalog_Image_Url: string;

  @Field({nullable: true, defaultValue: null})
  Catalog_Id_Ref: string;
}
