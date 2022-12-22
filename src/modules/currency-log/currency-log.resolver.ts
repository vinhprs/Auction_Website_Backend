import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrencyLogService } from './currency-log.service';
import { CurrencyLog } from './entities/currency-log.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginationInput } from '../product/dto/create-product.input';

@Resolver(() => CurrencyLog)
export class CurrencyLogResolver {
  constructor(private readonly currencyLogService: CurrencyLogService) {}

  @Query(() => [CurrencyLog])
  async getLastCurrencyLog(
    @Args('User_ID') User_ID: string
  ) : Promise<CurrencyLog[]> {
    try {
      return await this.currencyLogService.getLastCurrencyLog(User_ID);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => [CurrencyLog])
  async getCurrencyLog() : Promise<CurrencyLog[]>
  {
    try {
      return await this.currencyLogService.getCurrencyLog();
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
