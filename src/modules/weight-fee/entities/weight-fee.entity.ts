import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class WeightFee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Weight_Fee_ID: string;

  @Field(() => Float)
  @Column({ type: 'decimal' })
  Weight_From: number;

  @Field(() => Float)
  @Column({ type: 'decimal' })
  Weight_To: number;

  @Field(() => Float)
  @Column({ type: 'decimal' })
  Fee: number;
}
