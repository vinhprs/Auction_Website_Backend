import { Module } from '@nestjs/common';
import { CurrencyLogService } from './currency-log.service';
import { CurrencyLogResolver } from './currency-log.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyLog } from './entities/currency-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurrencyLog])
  ],
  providers: [CurrencyLogResolver, CurrencyLogService]
})
export class CurrencyLogModule {}
