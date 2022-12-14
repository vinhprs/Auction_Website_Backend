import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from '../currency/entities/currency.entity';
import { PaginationInput } from '../product/dto/create-product.input';
import { CurrencyLog } from './entities/currency-log.entity';

@Injectable()
export class CurrencyLogService {
  
  constructor(
    @InjectRepository(CurrencyLog)
    private readonly currencyLogRepository: Repository<CurrencyLog>
  ) {}

  async genCurrencyLog(currency: Currency, value: string) : Promise<CurrencyLog> {
    const { Total_Money } = currency;

    const newLog = new CurrencyLog();
    newLog.Total_Amount = Total_Money;
    newLog.Currency = currency;
    newLog.Currency_Log_Value = value;
    newLog.Time = new Date();

    return await this.currencyLogRepository.save(newLog);
  }

  async getLastCurrencyLog(User_ID: string)
  : Promise<CurrencyLog[]> {
    let currencyLog = await this.currencyLogRepository.find({
      relations: { Currency: true },
      order: {
        Time: 'DESC'
      }
    });
    
    const result = currencyLog.filter(cL => cL.Currency.User_ID.User_ID === User_ID);
    return result.slice(0, 5);
  }

  async getCurrencyLog() : Promise<CurrencyLog[]>
  {
    let currencyLog = await this.currencyLogRepository.find({
      relations: {
        Currency: true,
      },
      order: {
        Time: 'DESC'
      },
    });
    return currencyLog.slice(0, 50);
  }
}
