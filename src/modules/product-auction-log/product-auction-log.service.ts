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
    private readonly productAuctionLogRepository: Repository<ProductAuctionLog>
  ) {}

  async create(newProductAuctionLog: ProductAuctionLog)
  : Promise<ProductAuctionLog> {
    
    return await this.productAuctionLogRepository.save(newProductAuctionLog);
  }

}
