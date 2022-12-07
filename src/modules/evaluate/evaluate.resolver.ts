import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EvaluateService } from './evaluate.service';
import { Evaluate } from './entities/evaluate.entity';
import { CreateEvaluateInput } from './dto/create-evaluate.input';

@Resolver(() => Evaluate)
export class EvaluateResolver {
  constructor(private readonly evaluateService: EvaluateService) {}

}
