import { Injectable } from '@nestjs/common';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';

@Injectable()
export class CatalogService {
  create(createCatalogInput: CreateCatalogInput) {
    return 'This action adds a new catalog';
  }

  findAll() {
    return `This action returns all catalog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalog`;
  }

  update(id: number, updateCatalogInput: UpdateCatalogInput) {
    return `This action updates a #${id} catalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalog`;
  }
}
