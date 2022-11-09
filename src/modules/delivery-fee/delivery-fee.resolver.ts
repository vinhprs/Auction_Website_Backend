import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeliveryFeeService } from './delivery-fee.service';
import { DeliveryFee } from './entities/delivery-fee.entity';
import { CreateDeliveryFeeInput } from './dto/create-delivery-fee.input';
import { UpdateDeliveryFeeInput } from './dto/update-delivery-fee.input';

@Resolver(() => DeliveryFee)
export class DeliveryFeeResolver {
  constructor(private readonly deliveryFeeService: DeliveryFeeService) {}

  @Mutation(() => DeliveryFee)
  createDeliveryFee(@Args('createDeliveryFeeInput') createDeliveryFeeInput: CreateDeliveryFeeInput) {
    return this.deliveryFeeService.create(createDeliveryFeeInput);
  }

  @Query(() => [DeliveryFee], { name: 'deliveryFee' })
  findAll() {
    return this.deliveryFeeService.findAll();
  }

  @Query(() => DeliveryFee, { name: 'deliveryFee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryFeeService.findOne(id);
  }

  @Mutation(() => DeliveryFee)
  updateDeliveryFee(@Args('updateDeliveryFeeInput') updateDeliveryFeeInput: UpdateDeliveryFeeInput) {
    return this.deliveryFeeService.update(updateDeliveryFeeInput.id, updateDeliveryFeeInput);
  }

  @Mutation(() => DeliveryFee)
  removeDeliveryFee(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryFeeService.remove(id);
  }
}
