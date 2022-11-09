import { Injectable } from '@nestjs/common';
import { CreateUserBidInput } from './dto/create-user-bid.input';
import { UpdateUserBidInput } from './dto/update-user-bid.input';

@Injectable()
export class UserBidService {
  create(createUserBidInput: CreateUserBidInput) {
    return 'This action adds a new userBid';
  }

  findAll() {
    return `This action returns all userBid`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBid`;
  }

  update(id: number, updateUserBidInput: UpdateUserBidInput) {
    return `This action updates a #${id} userBid`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBid`;
  }
}
