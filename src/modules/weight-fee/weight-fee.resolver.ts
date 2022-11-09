import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WeightFeeService } from './weight-fee.service';
import { WeightFee } from './entities/weight-fee.entity';
import { CreateWeightFeeInput } from './dto/create-weight-fee.input';
import { UpdateWeightFeeInput } from './dto/update-weight-fee.input';

@Resolver(() => WeightFee)
export class WeightFeeResolver {
  constructor(private readonly weightFeeService: WeightFeeService) {}

  @Mutation(() => WeightFee)
  createWeightFee(@Args('createWeightFeeInput') createWeightFeeInput: CreateWeightFeeInput) {
    return this.weightFeeService.create(createWeightFeeInput);
  }

  @Query(() => [WeightFee], { name: 'weightFee' })
  findAll() {
    return this.weightFeeService.findAll();
  }

  @Query(() => WeightFee, { name: 'weightFee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.weightFeeService.findOne(id);
  }

  @Mutation(() => WeightFee)
  updateWeightFee(@Args('updateWeightFeeInput') updateWeightFeeInput: UpdateWeightFeeInput) {
    return this.weightFeeService.update(updateWeightFeeInput.id, updateWeightFeeInput);
  }

  @Mutation(() => WeightFee)
  removeWeightFee(@Args('id', { type: () => Int }) id: number) {
    return this.weightFeeService.remove(id);
  }
}
