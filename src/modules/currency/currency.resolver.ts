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
  async recharge(
    @Context('req') req: Request
  ) : Promise<Currency> {
    try {
      return await this.currencyService.create( req);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

}
