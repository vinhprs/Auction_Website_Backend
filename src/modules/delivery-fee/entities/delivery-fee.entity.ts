import { ObjectType, Field, Float} from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class DeliveryFee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Delivery_Fee_ID: string;

  @Field()
  @Column()
  Address_District: string;

  @Field(() => Float)
  @Column({ type: 'decimal' })
  Fee: number;
}
