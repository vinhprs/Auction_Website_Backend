import { InputType, Int, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../../common/entities/common.entity';

@InputType()
export class CreateCatalogInput {
  @Field()
  Catalog_Name: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;

  @Field({nullable: true, defaultValue: null})
  Catalog_Id_Ref: string;
}
