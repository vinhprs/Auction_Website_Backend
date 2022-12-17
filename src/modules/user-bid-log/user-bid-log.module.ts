import { Module } from '@nestjs/common';
import { UserBidLogService } from './user-bid-log.service';
import { UserBidLogResolver } from './user-bid-log.resolver';
import { UserBidLog } from './entities/user-bid-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBidLog])
  ],
  providers: [UserBidLogResolver, UserBidLogService],
  exports: [ UserBidLogService ]
})
export class UserBidLogModule {}
