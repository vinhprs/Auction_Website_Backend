import { Injectable } from '@nestjs/common';
import { CreateWeightFeeInput } from './dto/create-weight-fee.input';
import { UpdateWeightFeeInput } from './dto/update-weight-fee.input';

@Injectable()
export class WeightFeeService {
  create(createWeightFeeInput: CreateWeightFeeInput) {
    return 'This action adds a new weightFee';
  }

  findAll() {
    return `This action returns all weightFee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weightFee`;
  }

  update(id: number, updateWeightFeeInput: UpdateWeightFeeInput) {
    return `This action updates a #${id} weightFee`;
  }

  remove(id: number) {
    return `This action removes a #${id} weightFee`;
  }
}
