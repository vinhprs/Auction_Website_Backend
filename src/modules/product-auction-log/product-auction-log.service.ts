import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAuctionService } from '../product-auction/product-auction.service';
import { CreateProductAuctionLogInput } from './dto/create-product-auction-log.input';
import { ProductAuctionLog } from './entities/product-auction-log.entity';

@Injectable()
export class ProductAuctionLogService {
  
  constructor(
    @InjectRepository(ProductAuctionLog)
    private readonly productAuctionLogRepository: Repository<ProductAuctionLog>,
    private readonly productAuctionService: ProductAuctionService
  ) {}

  async create(createProductAuctionLogInput: CreateProductAuctionLogInput)
  : Promise<ProductAuctionLog> {
    const { Price, Time, Product_Auction_ID } = createProductAuctionLogInput;
    const productAuctionRef = await this.productAuctionService.getProductAuctionById(Product_Auction_ID);

    const newLog = new ProductAuctionLog();
    newLog.Price = Price;
    newLog.Time = Time;
    newLog.Product_Auction_ID = productAuctionRef;

    return await this.productAuctionLogRepository.save(newLog);
  }

}
