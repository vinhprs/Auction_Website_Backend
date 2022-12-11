import { Module } from '@nestjs/common';
import { ProductAuctionLogService } from './product-auction-log.service';
import { ProductAuctionLogResolver } from './product-auction-log.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAuctionLog } from './entities/product-auction-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAuctionLog])
  ],
  providers: [ProductAuctionLogResolver, ProductAuctionLogService],
  exports: [ ProductAuctionLogService ]
})
export class ProductAuctionLogModule {}
