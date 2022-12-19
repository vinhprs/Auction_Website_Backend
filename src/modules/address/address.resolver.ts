import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Request } from 'express';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Mutation(() => Address)
  async createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
    @Context('req') req: Request
  ) : Promise<Address> {
    try {
      return await this.addressService.create(createAddressInput, req);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

}
