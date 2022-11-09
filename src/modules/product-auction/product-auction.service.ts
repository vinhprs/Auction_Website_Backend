import { Injectable } from '@nestjs/common';
import { CreateProductAuctionInput } from './dto/create-product-auction.input';
import { UpdateProductAuctionInput } from './dto/update-product-auction.input';

@Injectable()
export class ProductAuctionService {
  create(createProductAuctionInput: CreateProductAuctionInput) {
    return 'This action adds a new productAuction';
  }

  findAll() {
    return `This action returns all productAuction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productAuction`;
  }

  update(id: number, updateProductAuctionInput: UpdateProductAuctionInput) {
    return `This action updates a #${id} productAuction`;
  }

  remove(id: number) {
    return `This action removes a #${id} productAuction`;
  }
}
