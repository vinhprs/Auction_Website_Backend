import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    UserModule
  ],
  providers: [AddressResolver, AddressService]
})
export class AddressModule {}
