import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CatalogService } from './catalog.service';
import { Catalog } from './entities/catalog.entity';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Catalog)
export class CatalogResolver {
  constructor(private readonly catalogService: CatalogService) {}

  @Query(() => [Catalog])
  async getPopulateCatalog() : Promise<Catalog []> {
    try {
      return await this.catalogService.getPopulateCatalog();
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => [Catalog]) 
  async getListCatalog() : Promise<Catalog []> {
    try {
      return await this.catalogService.getListCatalog();
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => [Catalog])
  async getSubCatalogByName(
    @Args('Catalog_Name') catalogName: string
  ) {
    try {
      const result = await this.catalogService.getCatalogByName(catalogName);
      // remove parent
      result.splice(0,1)
      return result ;
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Mutation(() => Catalog)
  async createCatalog(
    @Args("createCatalogInput") createCatalogInput : CreateCatalogInput
  ) : Promise<Catalog>{
    try {
      return await this.catalogService.createCatalog(createCatalogInput);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
