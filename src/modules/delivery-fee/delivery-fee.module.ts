import { Module } from '@nestjs/common';
import { DeliveryFeeService } from './delivery-fee.service';
import { DeliveryFeeResolver } from './delivery-fee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryFee } from './entities/delivery-fee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryFee])
  ],
  providers: [DeliveryFeeResolver, DeliveryFeeService]
})
export class DeliveryFeeModule {}
