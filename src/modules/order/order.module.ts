import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserBidModule } from '../user-bid/user-bid.module';
import { UserModule } from '../user/user.module';
import { ProductAuctionModule } from '../product-auction/product-auction.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => UserBidModule),
    UserModule,
    ProductAuctionModule,
    UserBidModule,
    CurrencyModule
  ],
  providers: [OrderResolver, OrderService],
  exports: [ OrderService ]
})
export class OrderModule {}
