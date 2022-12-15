import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { forwardRef } from '@nestjs/common/utils';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CurrencyModule)
  ],
  providers: [UserResolver, UserService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
