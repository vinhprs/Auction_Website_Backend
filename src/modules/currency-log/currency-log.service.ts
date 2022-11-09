import { Injectable } from '@nestjs/common';
import { CreateCurrencyLogInput } from './dto/create-currency-log.input';
import { UpdateCurrencyLogInput } from './dto/update-currency-log.input';

@Injectable()
export class CurrencyLogService {
  create(createCurrencyLogInput: CreateCurrencyLogInput) {
    return 'This action adds a new currencyLog';
  }

  findAll() {
    return `This action returns all currencyLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currencyLog`;
  }

  update(id: number, updateCurrencyLogInput: UpdateCurrencyLogInput) {
    return `This action updates a #${id} currencyLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} currencyLog`;
  }
}
