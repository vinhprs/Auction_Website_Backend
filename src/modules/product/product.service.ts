import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput, PaginationInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { Request } from 'express';
import { getUserIdFromRequest } from '../../utils/user-from-header.util';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Catalog } from '../catalog/entities/catalog.entity';
import { CatalogService } from '../catalog/catalog.service';
import { uploadFile, uploadFileSync } from '../common/services/handleUpload.service';
import { ProductImage } from '../product-image/entities/product-image.entity';
import { ProductImageService } from '../product-image/product-image.service';
import { resolve } from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userService: UserService,
    private readonly catalogService: CatalogService,
    private readonly productImageService: ProductImageService
  ) { }

  async create(createProductInput: CreateProductInput, req: Request): Promise<boolean> {
    const { Product_Name, Price, Weight, Quantity, User_Note,
      isActive, isBlocked, Product_Info, Product_Image } = createProductInput;
    // get User create product
    const userId = getUserIdFromRequest(req);
    const [user, catalog] = await Promise.all([
      this.userService.getUserById(userId),
      this.catalogService.getCatalogById(createProductInput.Catalog_ID)
    ])

    const newProduct = new Product()
    newProduct.Catalog_ID = catalog;
    newProduct.User_ID = user;
    newProduct.Product_Name = Product_Name;
    newProduct.Price = Price;
    newProduct.Weight = Weight;
    newProduct.Quantity = Quantity;
    newProduct.User_Note = User_Note;
    newProduct.isActive = isActive;
    newProduct.isBlocked = isBlocked;
    newProduct.Product_Info = Product_Info;
    await this.productRepository.save(newProduct);
    
    await Promise.all(Product_Image.map(async (img) => {
      const newProductImg = new ProductImage();
      newProductImg.Product_Image_Url = (await uploadFile(img, process.env.CLOUDINARY_PRODUCT_FOLDER)).url
      newProductImg.Product_ID = newProduct;
      await this.productImageService.create(newProductImg);
    }))
    return true;
  }

  async getAll(paginationInput: PaginationInput) : Promise<Product[]> {
    const { limit, offset } = paginationInput;
    const result = await this.productRepository.find({
      skip: offset,
      take : limit
    })
    return result;
  }

  async getProductByCatalogName(Catalog_Name: string)
  : Promise<Product[]> {
    const catalog = await this.catalogService.getCatalogByName(Catalog_Name);
    // sub catalog
    if(catalog.length <= 1) {
      return catalog[0] ? catalog[0].Product : [];
    }
    // remove parent element
    catalog.splice(0, 1);

    let result : Product[] = [];
    catalog.forEach(c => {
      result = result.concat(c.Product)
    })
    return result;
  }

  async getProductById(Product_ID: string) : Promise<Product> {
    const product = await this.productRepository.findOneBy({Product_ID});
    return product;
  } 

  async getImgByProduct(Product_ID: string) : Promise<ProductImage[]> {
    const result = await this.productRepository.findOne({
      where: {Product_ID},
      relations: { ProductImage: true }
    })
    return result.ProductImage;
  }
}