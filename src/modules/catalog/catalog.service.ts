import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { Catalog } from './entities/catalog.entity';
import { uploadFile } from '../common/services/handleUpload.service';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog) 
    private readonly catalogRepository: Repository<Catalog>,
    private dataSource: DataSource
  ) {}

  async getCatalogById(Catalog_ID: string) : Promise<Catalog> {
    return await this.catalogRepository.findOneBy({Catalog_ID});
  }

  async getPopulateCatalog() : Promise<Catalog []> {
    const populate =  await this.catalogRepository.find();
    return populate.slice(0, 6);
  }

  async getListCatalog() : Promise<Catalog []> {
    const result = await this.dataSource.manager.getTreeRepository(Catalog).findTrees();

    return result;
  }


  async createCatalog(createCatalogInput: CreateCatalogInput) 
  : Promise<Catalog> {
    let catalog = null;

    if(createCatalogInput.Catalog_Id_Ref != null) {
      catalog = await this.catalogRepository.findOneBy({Catalog_ID: createCatalogInput.Catalog_Id_Ref});
    }
    const catalog_img_url  = await uploadFile(createCatalogInput.image, process.env.CLOUDINARY_CATALOG_FOLDER)

    const newCatalog: Catalog = this.catalogRepository.create({
      Catalog_Image_Url: catalog_img_url.url,     
      Catalog_Name: createCatalogInput.Catalog_Name,         
      Catalog_Id_Ref: catalog
    });

    return await this.catalogRepository.save(newCatalog);
  }
}
