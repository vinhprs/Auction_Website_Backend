import { Module } from '@nestjs/common';
import { AuctionFieldModule } from '../modules/auction-field/auction-field.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [ AuctionFieldModule ],
  providers: [ TasksService],
  exports: [ TasksService ]
})
export class TasksModule {}
