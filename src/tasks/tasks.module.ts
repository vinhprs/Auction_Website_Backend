import { Module } from '@nestjs/common';
import { ProductAuctionModule } from '../modules/product-auction/product-auction.module';
import { AuctionFieldModule } from '../modules/auction-field/auction-field.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [ AuctionFieldModule, ProductAuctionModule ],
  providers: [ TasksService],
  exports: [ TasksService ]
})
export class TasksModule {}
