import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { getUserIdFromRequest } from 'src/utils/user-from-header.util';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { AddressModule } from './address.module';
import { CreateAddressInput } from './dto/create-address.input';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly userService: UserService
  ) {}

  async create(createAddressInput: CreateAddressInput, req: Request) {
    const { Address_District, District_ID, Address_Name, Reciever_Name,Phone } = createAddressInput;
    const userId = getUserIdFromRequest(req);
    const user = await this.userService.getUserById(userId);

    const address = new Address();
    address.User_ID = user;
    address.Address_District = Address_District;
    address.District_ID = District_ID;
    address.Address_Name = Address_Name;
    address.Reciever_Name = Reciever_Name;
    address.Phone = Phone;
    await this.addressRepository.save(address);

    if(!user.Default_Address_ID) {
      await this.userService.updateDefaultAddress(user, address);
    }

    return address;
  }


}
