import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { getUserIdFromRequest } from '../../utils/user-from-header.util';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { forwardRef } from '@nestjs/common/utils';
import { Inject } from '@nestjs/common/decorators';
import { CurrencyLogService } from '../currency-log/currency-log.service';
import { CurrencyLog } from '../currency-log/entities/currency-log.entity';


@Injectable()
export class CurrencyService {
  
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly currencyLogService: CurrencyLogService
  ) {}

  async signupInit(user : User) : Promise<Currency> {
    
    const newCurrency = new Currency();
    newCurrency.Total_Money = 0;
    newCurrency.User_ID = user;

    return await this.currencyRepository.save(newCurrency);
  }

  async findUserCurrency(User_ID: string) : Promise<Currency> {
    let currency = await this.currencyRepository.find({relations: { User_ID: true }});
    const result = currency.filter(c => c.User_ID.User_ID === User_ID)[0];
    
    return result
  }

  async rechargeMoney(amount: number, req: Request) : Promise<Currency> {
    const userId = getUserIdFromRequest(req);

    const userCurrency = await this.findUserCurrency(userId);
    userCurrency.Total_Money = +userCurrency.Total_Money + (+amount);
    
    await Promise.all([
      this.currencyRepository.save(userCurrency),
      this.genCurrencyLog(userCurrency, `+${amount}`)
    ]);
    
    return userCurrency;
    
  }

  async changeCurrency(currency: Currency) : Promise<Currency>
  {
    return await this.currencyRepository.save(currency);
  }

  async genCurrencyLog(userCurrency: Currency, amount: string)
  : Promise<CurrencyLog> {
    return await this.currencyLogService.genCurrencyLog(userCurrency, amount);
  }
}
