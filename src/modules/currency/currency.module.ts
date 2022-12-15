import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyResolver } from './currency.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { UserModule } from '../user/user.module';
import { forwardRef } from '@nestjs/common/utils';
import { CurrencyLogModule } from '../currency-log/currency-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Currency]),
    forwardRef(() => UserModule),
    CurrencyLogModule
  ],
  exports: [CurrencyService, TypeOrmModule],
  providers: [CurrencyResolver, CurrencyService]
})
export class CurrencyModule {}
