import { Module } from '@nestjs/common';
import { WeightFeeService } from './weight-fee.service';
import { WeightFeeResolver } from './weight-fee.resolver';
import { WeightFee } from './entities/weight-fee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeightFee])
  ],
  providers: [WeightFeeResolver, WeightFeeService]
})
export class WeightFeeModule {}
