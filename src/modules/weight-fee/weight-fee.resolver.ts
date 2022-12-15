import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WeightFeeService } from './weight-fee.service';
import { WeightFee } from './entities/weight-fee.entity';
import { CreateWeightFeeInput } from './dto/create-weight-fee.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => WeightFee)
export class WeightFeeResolver {
  constructor(
    private readonly weightFeeService: WeightFeeService
  ) {}

  @Mutation(() => WeightFee)
  async createWeightFee(
    @Args('createWeightFeeInput') createWeightFeeInput: CreateWeightFeeInput
  ) : Promise<WeightFee> {
    try {
      return await this.weightFeeService.create(createWeightFeeInput);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

}
