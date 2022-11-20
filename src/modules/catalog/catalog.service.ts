import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';
import { Catalog } from './entities/catalog.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog) 
    private readonly catalogRepository: Repository<Catalog>
  ) {}

  async getAll() : Promise<Catalog []> {
    return await this.catalogRepository.find();
  }

  async createCatalog(createCatalogInput: CreateCatalogInput) 
  : Promise<Catalog> {
    const catalog: Catalog = this.catalogRepository.create(createCatalogInput);

    return await this.catalogRepository.save(catalog);
  }
}
