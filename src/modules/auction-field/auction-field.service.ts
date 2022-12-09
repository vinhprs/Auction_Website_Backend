import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateAuctionFieldInput } from './dto/create-auction-field.input';
import { AuctionField } from './entities/auction-field.entity';

@Injectable()
export class AuctionFieldService {
  constructor(
    @InjectRepository(AuctionField)
    private readonly auctionFieldRepository: Repository<AuctionField>
  ) {}

  async create(createAuctionFieldInput: CreateAuctionFieldInput) 
  : Promise<AuctionField> {
    const { Start_Time, End_Time, Discount_Circle } = createAuctionFieldInput;
    
    const newAuctionField = this.auctionFieldRepository.create(createAuctionFieldInput);
    return await this.auctionFieldRepository.save(newAuctionField);
  }

  async getAll() : Promise<AuctionField[]> {
    return await this.auctionFieldRepository.find();
  }

  async getOperatingAuctionField() : Promise<AuctionField[]> {
    const result = await this.auctionFieldRepository.find({
      where: [
        {
          isOperation: false,
          Start_Time: MoreThan(new Date())
        }
      ]
    })
    return result;
  }

  async setOperation(auctionField: AuctionField) : Promise<AuctionField> {
    auctionField.isOperation = true;
    return await this.auctionFieldRepository.save(auctionField);
  }

}
