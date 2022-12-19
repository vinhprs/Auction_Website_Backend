import { Module } from '@nestjs/common';
import { ProductAuctionService } from './product-auction.service';
import { ProductAuctionResolver } from './product-auction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAuction } from './entities/product-auction.entity';
import { ProductModule } from '../product/product.module';
import { AuctionFieldModule } from '../auction-field/auction-field.module';
import { UserModule } from '../user/user.module';
import { ProductAuctionLogModule } from '../product-auction-log/product-auction-log.module';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAuction]),
    ProductModule,
    AuctionFieldModule,
    UserModule,
    ProductAuctionLogModule,
    CatalogModule
  ],
  providers: [ProductAuctionResolver, ProductAuctionService],
  exports: [ ProductAuctionService ]
})
export class ProductAuctionModule {}
