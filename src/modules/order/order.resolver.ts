import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { Request } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Address } from '../address/entities/address.entity';
import { ProductAuction } from '../product-auction/entities/product-auction.entity';
import { TotalOrderResult } from '../../common/entities/common.entity';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async orderProductAuction(
    @Args('Product_Auction_ID') Product_Auction_ID: string,
    @Context('req') req: Request
  ) : Promise<Order> {
    try {
      return await this.orderService.orderProductAuction(Product_Auction_ID, req);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => [Order])
  async getUserOrder(
    @Args('User_ID') User_ID: string
  ) : Promise<Order[]> {
    try {
      return await this.orderService.getUserOrder(User_ID);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => TotalOrderResult)
  async userOrderTotal(
    @Args('User_ID') User_ID: string
  ) : Promise<TotalOrderResult> {
    try {
      return await this.orderService.userOrderTotal(User_ID);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @ResolveField(() => Address)
  async Address_ID(
    @Parent() order: Order
  ) : Promise<Address> {
    try {
      const { Order_ID } = order;
      return await this.orderService.getOrderAddress(Order_ID);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @ResolveField(() => ProductAuction)
  async Product_Auction_ID(
    @Parent() order: Order
  ) : Promise<ProductAuction> {
    try {
      const { Order_ID } = order;
      return await this.orderService.getProductOrdered(Order_ID);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
