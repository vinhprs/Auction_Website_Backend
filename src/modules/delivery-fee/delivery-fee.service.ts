import { Injectable } from '@nestjs/common';
import { CreateDeliveryFeeInput } from './dto/create-delivery-fee.input';
import { UpdateDeliveryFeeInput } from './dto/update-delivery-fee.input';

@Injectable()
export class DeliveryFeeService {
  create(createDeliveryFeeInput: CreateDeliveryFeeInput) {
    return 'This action adds a new deliveryFee';
  }

  findAll() {
    return `This action returns all deliveryFee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryFee`;
  }

  update(id: number, updateDeliveryFeeInput: UpdateDeliveryFeeInput) {
    return `This action updates a #${id} deliveryFee`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryFee`;
  }
}
