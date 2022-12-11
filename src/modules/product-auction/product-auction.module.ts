import { Module } from '@nestjs/common';
import { ProductAuctionService } from './product-auction.service';
import { ProductAuctionResolver } from './product-auction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAuction } from './entities/product-auction.entity';
import { ProductModule } from '../product/product.module';
import { AuctionFieldModule } from '../auction-field/auction-field.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAuction]),
    ProductModule,
    AuctionFieldModule,
    UserModule
  ],
  providers: [ProductAuctionResolver, ProductAuctionService]
})
export class ProductAuctionModule {}
