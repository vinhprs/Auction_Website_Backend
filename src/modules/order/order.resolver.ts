import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { Request } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

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
}
