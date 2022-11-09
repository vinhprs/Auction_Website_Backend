import { Injectable } from '@nestjs/common';
import { CreateProductAuctionLogInput } from './dto/create-product-auction-log.input';
import { UpdateProductAuctionLogInput } from './dto/update-product-auction-log.input';

@Injectable()
export class ProductAuctionLogService {
  create(createProductAuctionLogInput: CreateProductAuctionLogInput) {
    return 'This action adds a new productAuctionLog';
  }

  findAll() {
    return `This action returns all productAuctionLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productAuctionLog`;
  }

  update(id: number, updateProductAuctionLogInput: UpdateProductAuctionLogInput) {
    return `This action updates a #${id} productAuctionLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} productAuctionLog`;
  }
}
