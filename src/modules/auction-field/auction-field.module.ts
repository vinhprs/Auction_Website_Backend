import { Module } from '@nestjs/common';
import { AuctionFieldService } from './auction-field.service';
import { AuctionFieldResolver } from './auction-field.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionField } from './entities/auction-field.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuctionField])
 ],
  providers: [AuctionFieldResolver, AuctionFieldService]
})
export class AuctionFieldModule {}
