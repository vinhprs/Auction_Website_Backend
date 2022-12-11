import { Module } from '@nestjs/common';
import { ProductAuctionLogService } from './product-auction-log.service';
import { ProductAuctionLogResolver } from './product-auction-log.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAuctionLog } from './entities/product-auction-log.entity';
import { ProductAuctionModule } from '../product-auction/product-auction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAuctionLog]),
    ProductAuctionModule
  ],
  providers: [ProductAuctionLogResolver, ProductAuctionLogService]
})
export class ProductAuctionLogModule {}
