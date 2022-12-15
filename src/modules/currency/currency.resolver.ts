import { UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrencyService } from './currency.service';
import { Currency } from './entities/currency.entity';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Mutation(() => Currency)
  @UseGuards(JwtAuthGuard)
  async rechargeMoney(
    @Args('amount') amount: number,
    @Context('req') req: Request
  ) : Promise<Currency> {
    try {
      return await this.currencyService.rechargeMoney(amount, req);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => Currency)
  @UseGuards(JwtAuthGuard)
  async getCurrentByUser(
    @Args('User_ID') User_ID: string
  ) : Promise<Currency> {
    try {
      return await this.currencyService.findUserCurrency(User_ID);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
