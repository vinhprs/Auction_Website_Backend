import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWeightFeeInput } from './dto/create-weight-fee.input';
import { WeightFee } from './entities/weight-fee.entity';

@Injectable()
export class WeightFeeService {

  constructor(
    @InjectRepository(WeightFee)
    private readonly weightFeeRepository: Repository<WeightFee>
  ) {}

  async create(createWeightFeeInput: CreateWeightFeeInput)
  : Promise<WeightFee> {
    const newWeightFee = this.weightFeeRepository.create(createWeightFeeInput);

    return await this.weightFeeRepository.save(newWeightFee);
  }
}
