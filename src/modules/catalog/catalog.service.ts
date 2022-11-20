import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { Catalog } from './entities/catalog.entity';
import { ggStorageCatalog } from '../../config/ggCloudStorage.config';
import { uploadFile } from '../common/services/handleUpload.service';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog) 
    private readonly catalogRepository: Repository<Catalog>
  ) {}

  async getPopulateCatalog() : Promise<Catalog []> {
    const populate =  await this.catalogRepository.find();
    return populate.slice(0, 6);
  }

  async createCatalog(createCatalogInput: CreateCatalogInput) 
  : Promise<Catalog> {
    const catalog_img_url = await uploadFile(createCatalogInput.image, ggStorageCatalog);
    const catalog: Catalog = this.catalogRepository.create({
      Catalog_Image_Url: catalog_img_url,
      ...createCatalogInput
    });

    return await this.catalogRepository.save(catalog);
  }
}
