import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrencyLogService } from './currency-log.service';
import { CurrencyLog } from './entities/currency-log.entity';
import { CreateCurrencyLogInput } from './dto/create-currency-log.input';
import { UpdateCurrencyLogInput } from './dto/update-currency-log.input';

@Resolver(() => CurrencyLog)
export class CurrencyLogResolver {
  constructor(private readonly currencyLogService: CurrencyLogService) {}

  @Mutation(() => CurrencyLog)
  createCurrencyLog(@Args('createCurrencyLogInput') createCurrencyLogInput: CreateCurrencyLogInput) {
    return this.currencyLogService.create(createCurrencyLogInput);
  }

  @Query(() => [CurrencyLog], { name: 'currencyLog' })
  findAll() {
    return this.currencyLogService.findAll();
  }

  @Query(() => CurrencyLog, { name: 'currencyLog' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.currencyLogService.findOne(id);
  }

  @Mutation(() => CurrencyLog)
  updateCurrencyLog(@Args('updateCurrencyLogInput') updateCurrencyLogInput: UpdateCurrencyLogInput) {
    return this.currencyLogService.update(updateCurrencyLogInput.id, updateCurrencyLogInput);
  }

  @Mutation(() => CurrencyLog)
  removeCurrencyLog(@Args('id', { type: () => Int }) id: number) {
    return this.currencyLogService.remove(id);
  }
}
