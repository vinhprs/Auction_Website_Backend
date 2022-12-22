import { forwardRef, Module } from '@nestjs/common';
import { UserBidService } from './user-bid.service';
import { UserBidResolver } from './user-bid.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBid } from './entities/user-bid.entity';
import { UserModule } from '../user/user.module';
import { ProductAuctionModule } from '../product-auction/product-auction.module';
import { UserBidLogModule } from '../user-bid-log/user-bid-log.module';
import { CurrencyModule } from '../currency/currency.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBid]),
    UserModule,
    ProductAuctionModule,
    UserBidLogModule,
    CurrencyModule,
    forwardRef(() => OrderModule)
  ],
  providers: [UserBidResolver, UserBidService],
  exports: [ UserBidService ]
})
export class UserBidModule {}
