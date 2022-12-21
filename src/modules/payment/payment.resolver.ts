import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { Request } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentInput } from './dto/createPayment.input';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    @Context('req') req: Request
  ) : Promise<Payment> {
    try {
      return this.paymentService.create(createPaymentInput, req);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
