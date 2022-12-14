import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { TotalOrderResult } from '../../common/entities/common.entity';
import { getUserIdFromRequest } from '../../utils/user-from-header.util';
import { IsNull, Not, Repository } from 'typeorm';
import { Address } from '../address/entities/address.entity';
import { Payment } from '../payment/entities/payment.entity';
import { ProductAuction } from '../product-auction/entities/product-auction.entity';
import { ProductAuctionService } from '../product-auction/product-auction.service';
import { UserBid } from '../user-bid/entities/user-bid.entity';
import { UserBidService } from '../user-bid/user-bid.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Order } from './entities/order.entity';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => UserBidService))
    private readonly userBidService: UserBidService,
    private readonly productAuctionService: ProductAuctionService,
    private readonly currencyService: CurrencyService
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
      return await this.firstOrder(newOrder, productAuction, user, req)
    }

    return await this.newOrder(newOrder, productAuction, user);
  }

  async winnerBidGenOrder(productAuction: ProductAuction, userBid: UserBid)
  : Promise<Order> {
    const newOrder = new Order();
    newOrder.Product_Auction_ID = productAuction;
    newOrder.User_ID = userBid.User;
    newOrder.Total_Price = userBid.Price;
    newOrder.Address_ID = userBid.User.Default_Address_ID;

    await Promise.all([
      this.productAuctionService.updateSold(productAuction),
      this.orderRepository.save(newOrder)
    ]);
    return newOrder 
  }

  async firstOrder(newOrder: Order ,productAuction: ProductAuction, user: User, req: Request)
  : Promise<Order> {
    const bidInput = { 
      Product_Auction_ID: productAuction.Product_Auction_ID, 
      Price: productAuction.Current_Price 
    }
    await Promise.all([
      this.newOrder(newOrder, productAuction, user),
      this.userBidService.create(bidInput ,req),
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

  async getOrderById(Order_ID: string) : Promise<Order>
  {
    return await this.orderRepository.findOne({
      where: { Order_ID },
      relations: {
        User_ID: true,
        Address_ID: true,
        Product_Auction_ID: true
      }
    })
  }

  async updateOrderStatus(Order_ID: string[], payment: Payment)
  : Promise<void> {
    Order_ID.forEach(async (o) => {
      const order = await this.getOrderById(o);
      order.Status = true;
      order.Payment_ID = payment;
      await this.orderRepository.save(order);
      const userCurrency = await this.currencyService.
      findUserCurrency(order.Product_Auction_ID.User_ID.User_ID)
      userCurrency.Total_Money = +userCurrency.Total_Money + (+payment.Total * 0.95);
      await Promise.all([
        this.currencyService.changeCurrency(userCurrency),
        this.currencyService.genCurrencyLog(userCurrency, `Your product: ${order.Product_Auction_ID.Product_ID.Product_Name} is sold successfully +${userCurrency.Total_Money}`)
      ])
    })
  }

  async getUserOrder(User_ID: string)
  : Promise<Order[]> {
    const order = await this.orderRepository.find({
      where: {
        Status: false
      },
      relations: { 
        User_ID: true,
        Product_Auction_ID: true,
        Address_ID: true
      }
    });

    return order.filter(o => o.User_ID.User_ID === User_ID);
  }

  async userOrderTotal(User_ID: string)
  : Promise<TotalOrderResult> {
    const userOrder = await this.getUserOrder(User_ID);
    const result = new TotalOrderResult();
    result.total = 0.00;
    result.weight = 0.00;
    result.Address_ID = new Address();
    
    userOrder.forEach(o => {
      result.total += +o.Total_Price,
      result.weight += +o.Product_Auction_ID.Weight
      console.log(o.Address_ID)
      Object.assign(result.Address_ID, o.Address_ID)
    });

    return result;
  }

  async getOrderAddress(Oder_ID: string) : Promise<Address> {
    const order = await this.getOrderById(Oder_ID);

    return order.Address_ID;
  }

  async getProductOrdered(Order_ID: string)
  : Promise<ProductAuction> {
    const order = await this.getOrderById(Order_ID);
  
    return order.Product_Auction_ID;
  }

  async getUserOrderHistory(User_ID: string)
  : Promise<Order[]> {
    const order = await this.orderRepository.find({
      relations: { 
        User_ID: true,
        Payment_ID: true
      },
      where: {
        Status: true,
      }
    });
    const result = order.filter(o => o.User_ID.User_ID === User_ID && o.Payment_ID != null)
    return result;
  }

  
}
