import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { getUserIdFromRequest } from 'src/utils/user-from-header.util';
import { Repository } from 'typeorm';
import { CurrencyService } from '../currency/currency.service';
import { OrderService } from '../order/order.service';
import { UserService } from '../user/user.service';
import { CreatePaymentInput } from './dto/createPayment.input';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly userService: UserService,
    private readonly currencyService: CurrencyService,
    private readonly orderService: OrderService,
    private readonly currencyLogService: CurrencyService
  ) {}

  async create(createPaymentInput: CreatePaymentInput, req: Request)
  : Promise<Payment> {
    const { Order_ID, total, method } = createPaymentInput;
    const userId = getUserIdFromRequest(req);
    const [ user, userCurrency ] = await Promise.all([
      this.userService.getUserById(userId),
      this.currencyService.findUserCurrency(userId)
    ]);

    const newPayment = new Payment();
    newPayment.User_ID = user;
    newPayment.Total = total;
    newPayment.Payment_Method = method;
    // update user currency
    if(newPayment.Payment_Method.toLowerCase() == 'wallet') {
      userCurrency.Total_Money = +userCurrency.Total_Money - total;
    }

    await Promise.all([
      this.currencyService.changeCurrency(userCurrency),
      this.currencyLogService.genCurrencyLog(userCurrency, `-${total} paid for your order`),
      this.paymentRepository.save(newPayment),
    ]);
    await this.orderService.updateOrderStatus(Order_ID, newPayment);
    return newPayment;
  } 

  async getLastestPayment(Payment_ID: string)
  : Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { Payment_ID },
      relations: {
        User_ID: true
      }
    })
    return payment;
  }
}
