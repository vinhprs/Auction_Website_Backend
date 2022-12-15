import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { getUserIdFromRequest } from '../../utils/user-from-header.util';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class CurrencyService {
  
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
    private readonly userService: UserService
  ) {}

  async create(req: Request) : Promise<Currency> {
    const userId = getUserIdFromRequest(req);
    const user = await this.userService.getUserById(userId);
    
    const newCurrency = new Currency();
    newCurrency.Total_Money = 0;
    newCurrency.User_ID = user;

    return await this.currencyRepository.save(newCurrency);
  }
}
