import { Module } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { EvaluateResolver } from './evaluate.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluate } from './entities/evaluate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluate])
  ],
  providers: [EvaluateResolver, EvaluateService]
})
export class EvaluateModule {}
