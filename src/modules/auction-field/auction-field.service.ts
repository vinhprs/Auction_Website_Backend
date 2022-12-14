import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ProductAuction } from '../product-auction/entities/product-auction.entity';
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

  async getAuctionFieldById(Auction_Field_ID: string) 
  : Promise<AuctionField> {
    return await this.auctionFieldRepository.findOne({
      where: { Auction_Field_ID },
      relations: {
        Product_Auction: true
      }
    });
  }

  async getAvailableAuctionField() : Promise<AuctionField[]> {
    const now = new Date();
    // now.setHours(now.getHours() + 7);
    const result = await this.auctionFieldRepository.find({
      where: [
        {
          isOperation: false,
          Start_Time: MoreThan(now)
        }
      ]
    });
    return result;
  }

  async getOperatingAuctionField() : Promise<AuctionField[]> {
    const now = new Date();

    const result = await this.auctionFieldRepository.find({
      where: [
        {
          isOperation: true,
          End_Time: MoreThan(now)
        },
      ],
      relations: {
        Product_Auction: true
      }
    });
    return result;
  }

  async setOperation(auctionField: AuctionField) : Promise<AuctionField> {
    auctionField.isOperation = true;
    return await this.auctionFieldRepository.save(auctionField);
  }

  async stopOperating(auctionField: AuctionField) : Promise<AuctionField> {
    if(auctionField.isOperation) {
      auctionField.isOperation = false
    }

    return await this.auctionFieldRepository.save(auctionField);
  }

}
