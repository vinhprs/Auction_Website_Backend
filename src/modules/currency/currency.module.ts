import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyResolver } from './currency.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Currency]),
    UserModule
  ],
  providers: [CurrencyResolver, CurrencyService]
})
export class CurrencyModule {}
