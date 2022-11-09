import { Module } from '@nestjs/common';
import { ProductAuctionService } from './product-auction.service';
import { ProductAuctionResolver } from './product-auction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAuction } from './entities/product-auction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAuction])
  ],
  providers: [ProductAuctionResolver, ProductAuctionService]
})
export class ProductAuctionModule {}
