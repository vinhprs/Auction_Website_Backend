import { Injectable } from '@nestjs/common';
import { CreateProductImageInput } from './dto/create-product-image.input';
import { UpdateProductImageInput } from './dto/update-product-image.input';

@Injectable()
export class ProductImageService {
  create(createProductImageInput: CreateProductImageInput) {
    return 'This action adds a new productImage';
  }

  findAll() {
    return `This action returns all productImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productImage`;
  }

  update(id: number, updateProductImageInput: UpdateProductImageInput) {
    return `This action updates a #${id} productImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productImage`;
  }
}
