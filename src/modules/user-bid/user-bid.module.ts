import { Module } from '@nestjs/common';
import { UserBidService } from './user-bid.service';
import { UserBidResolver } from './user-bid.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBid } from './entities/user-bid.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBid])
  ],
  providers: [UserBidResolver, UserBidService]
})
export class UserBidModule {}
