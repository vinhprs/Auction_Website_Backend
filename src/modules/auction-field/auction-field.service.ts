import { Injectable } from '@nestjs/common';
import { CreateAuctionFieldInput } from './dto/create-auction-field.input';
import { UpdateAuctionFieldInput } from './dto/update-auction-field.input';

@Injectable()
export class AuctionFieldService {
  create(createAuctionFieldInput: CreateAuctionFieldInput) {
    return 'This action adds a new auctionField';
  }

  findAll() {
    return `This action returns all auctionField`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auctionField`;
  }

  update(id: number, updateAuctionFieldInput: UpdateAuctionFieldInput) {
    return `This action updates a #${id} auctionField`;
  }

  remove(id: number) {
    return `This action removes a #${id} auctionField`;
  }
}
