import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrencyLogService } from './currency-log.service';
import { CurrencyLog } from './entities/currency-log.entity';
import { CreateCurrencyLogInput } from './dto/create-currency-log.input';

@Resolver(() => CurrencyLog)
export class CurrencyLogResolver {
  constructor(private readonly currencyLogService: CurrencyLogService) {}

  
}
