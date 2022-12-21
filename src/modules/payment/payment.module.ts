import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { UserModule } from '../user/user.module';
import { CurrencyModule } from '../currency/currency.module';
import { OrderModule } from '../order/order.module';
import { CurrencyLogModule } from '../currency-log/currency-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    UserModule,
    CurrencyModule,
    OrderModule,
    CurrencyLogModule
  ],
  providers: [PaymentResolver, PaymentService],
  exports: [ PaymentService ]
})
export class PaymentModule {}
