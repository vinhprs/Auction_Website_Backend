import { Module } from '@nestjs/common';
import { ProductAuctionModule } from '../modules/product-auction/product-auction.module';
import { AuctionFieldModule } from '../modules/auction-field/auction-field.module';
import { TasksService } from './tasks.service';
import { UserBidModule } from '../modules/user-bid/user-bid.module';
import { OrderModule } from 'src/modules/order/order.module';

@Module({
  imports: [ 
    AuctionFieldModule,
    ProductAuctionModule,
    UserBidModule,
  ],
  providers: [ TasksService],
  exports: [ TasksService ]
})
export class TasksModule {}
