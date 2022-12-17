import { Module } from '@nestjs/common';
import { UserBidService } from './user-bid.service';
import { UserBidResolver } from './user-bid.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBid } from './entities/user-bid.entity';
import { UserModule } from '../user/user.module';
import { ProductAuctionModule } from '../product-auction/product-auction.module';
import { UserBidLogModule } from '../user-bid-log/user-bid-log.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBid]),
    UserModule,
    ProductAuctionModule,
    UserBidLogModule,
    CurrencyModule
  ],
  providers: [UserBidResolver, UserBidService]
})
export class UserBidModule {}
