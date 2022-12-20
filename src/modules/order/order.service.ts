import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { getUserIdFromRequest } from 'src/utils/user-from-header.util';
import { Repository } from 'typeorm';
import { ProductAuction } from '../product-auction/entities/product-auction.entity';
import { ProductAuctionService } from '../product-auction/product-auction.service';
import { UserBidService } from '../user-bid/user-bid.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly userBidService: UserBidService,
    private readonly productAuctionService: ProductAuctionService
  ) {}

  async orderProductAuction(Product_Auction_ID: string, req: Request)
  : Promise<Order> {
    const newOrder = new Order();
    const userId = getUserIdFromRequest(req);
    const [ productAuction, user, existBid ] = await Promise.all([
      this.productAuctionService.getProductAuctionById(Product_Auction_ID),
      this.userService.getUserById(userId),
      this.userBidService.existBid(userId, Product_Auction_ID)
    ]);

    if(productAuction.isSold === true) {
      throw new NotFoundException('This product is sold!')
    }

    if(!existBid) {
      return await this.firstOrder(newOrder, productAuction, user)
    }

    return await this.newOrder(newOrder, productAuction, user);
  }

  async firstOrder(newOrder: Order ,productAuction: ProductAuction, user: User)
  : Promise<Order> {
    await Promise.all([
      this.newOrder(newOrder, productAuction, user),
      this.userBidService.userBidFee(user.User_ID, productAuction)
    ]);

    return newOrder;
  }

  async newOrder(newOrder: Order, productAuction: ProductAuction, user: User)
  : Promise<Order> {
    newOrder.Total_Price = productAuction.Current_Price;
    newOrder.User_ID = user;
    newOrder.Product_Auction_ID = productAuction;
    newOrder.Address_ID = user.Default_Address_ID;
    await this.productAuctionService.updateSold(productAuction);

    return await this.orderRepository.save(newOrder)
  }
}
