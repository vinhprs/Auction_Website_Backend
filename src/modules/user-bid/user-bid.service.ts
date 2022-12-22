import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { getUserIdFromRequest } from 'src/utils/user-from-header.util';
import { MoreThan, Repository } from 'typeorm';
import { CurrencyService } from '../currency/currency.service';
import { ProductAuction } from '../product-auction/entities/product-auction.entity';
import { ProductAuctionService } from '../product-auction/product-auction.service';
import { UserBidLog } from '../user-bid-log/entities/user-bid-log.entity';
import { UserBidLogService } from '../user-bid-log/user-bid-log.service';
import { UserService } from '../user/user.service';
import { CreateUserBidInput, GetCurrentBidInput } from './dto/create-user-bid.input';
import { UserBid } from './entities/user-bid.entity';

@Injectable()
export class UserBidService {

  constructor(
    @InjectRepository(UserBid)
    private readonly userBidRepository: Repository<UserBid>,
    private readonly userService: UserService,
    private readonly productAuctionService: ProductAuctionService,
    private readonly currencyService: CurrencyService,
    private readonly userBidLogService: UserBidLogService
  ) {}

  async create(createUserBidInput: CreateUserBidInput, req: Request)
  : Promise<UserBid> {
    const { Price, Product_Auction_ID } =  createUserBidInput;
    const User_ID = getUserIdFromRequest(req);

    const existBid = await this.existBid(User_ID, Product_Auction_ID);

    if(!existBid) {
      return await this.createFirstBid(createUserBidInput, User_ID)
    }

    return await this.nextBid(createUserBidInput, existBid);

  }

  async existBid(User_ID: string, Product_Auction_ID: string)
  : Promise<UserBid> {
    const userBid = await this.userBidRepository.findOne({
      relations: {
        Product_Auction: true,
        User: true
      },
      where: {
        User: { User_ID },
        Product_Auction: { Product_Auction_ID }
      }
    });

    return userBid;
  }

  async createFirstBid(createUserBidInput: CreateUserBidInput, User_ID: string) 
  : Promise<UserBid> {
    const { Price, Product_Auction_ID } = createUserBidInput;
    const [ user, productAuction ] = await Promise.all([
      this.userService.getUserById(User_ID),
      this.productAuctionService.getProductAuctionById(Product_Auction_ID)
    ]);

    const newUserBid = new UserBid();
    newUserBid.Price = Price;
    newUserBid.Time = new Date();
    newUserBid.User = user;
    newUserBid.Product_Auction = productAuction;

    await Promise.all([
      this.userBidRepository.save(newUserBid),
      this.userBidFee(User_ID, productAuction),
      this.genUserBidLog(newUserBid)
    ]) 
    return newUserBid;
  }

  async nextBid(createUserBidInput: CreateUserBidInput, userBid: UserBid)
  : Promise<UserBid> {
    const { Price } = createUserBidInput;
    userBid.Price = Price;
    userBid.Time = new Date();

    await Promise.all([
      this.userBidRepository.save(userBid),
      this.genUserBidLog(userBid)
    ]) 
    return userBid;
  }

  async genUserBidLog(userBid: UserBid)
  : Promise<UserBidLog> {
    return await this.userBidLogService.genUserBidLog(userBid);
  }

  async userBidFee(User_ID: string, productAuction: ProductAuction) 
  : Promise<void>
  {
    const userCurrency = await this.currencyService.findUserCurrency(User_ID);

    const bidFee = +productAuction.Starting_Price * (5/100);
    userCurrency.Total_Money = +userCurrency.Total_Money - bidFee;
    
    await Promise.all([
      this.currencyService.changeCurrency(userCurrency),
      this.currencyService.genCurrencyLog(userCurrency, `-${bidFee.toFixed(2)} your bid for ${productAuction.Product_ID.Product_Name}`)
    ]);
  }

  async getCurrentBid(getCurrentBidInput: GetCurrentBidInput)
  : Promise<UserBid | null> {
    const { User_ID, Product_Auction_ID } = getCurrentBidInput;
    const result = await this.userBidRepository.findOne({
      where: {
        User: { User_ID },
        Product_Auction: { Product_Auction_ID }
      },
      relations: { Product_Auction: true }
    });
    if(!result) {
      throw new NotFoundException("Can not find current bid!")
    }
    return result;
  }

  async getUserBidding(User_ID: string)
  : Promise<UserBid[]> {
    const result = await this.userBidRepository.find({
      where: {
        User: { User_ID }
      },
      relations: { Product_Auction: true }
    });

    if(!result) {
      throw new NotFoundException("Can not find current bid!")
    }

    return result;
  }

  async getBidWinner(Product_Auction_ID: string)
  : Promise<UserBid> {
    const [ userBid, productAuction ] = await Promise.all([
      this.userBidRepository.find({
        relations: {
          Product_Auction: true,
          User: true
        },
        where: {
          Product_Auction: { 
            Product_Auction_ID,
            isSold: false
          },
        }
      }),
      this.productAuctionService.getProductAuctionById(Product_Auction_ID)
    ]);
    const result = userBid.filter(b => b.Price >= productAuction.Current_Price && Math.max() &&
                                        Math.min(b.Time.getTime()))[0];
    
    return result;
  }
}
