import { Injectable } from '@nestjs/common';
import { CreateUserBidLogInput } from './dto/create-user-bid-log.input';
import { UpdateUserBidLogInput } from './dto/update-user-bid-log.input';

@Injectable()
export class UserBidLogService {
  create(createUserBidLogInput: CreateUserBidLogInput) {
    return 'This action adds a new userBidLog';
  }

  findAll() {
    return `This action returns all userBidLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBidLog`;
  }

  update(id: number, updateUserBidLogInput: UpdateUserBidLogInput) {
    return `This action updates a #${id} userBidLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBidLog`;
  }
}
