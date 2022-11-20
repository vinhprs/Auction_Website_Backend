import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatalogService } from './catalog.service';
import { Catalog } from './entities/catalog.entity';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Catalog)
export class CatalogResolver {
  constructor(private readonly catalogService: CatalogService) {}

  @Query(() => [Catalog])
  async getAllCatalog() : Promise<Catalog []> {
    try {
      return await this.catalogService.getAll();
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Mutation(() => Catalog)
  async createCatalog(
    @Args("createCatalogInput") createCatalogInput: CreateCatalogInput
  ){
    try {
      return await this.catalogService.createCatalog(createCatalogInput);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
