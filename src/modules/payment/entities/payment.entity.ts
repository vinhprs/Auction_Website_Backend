import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class Payment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Payment_ID: string;

  @OneToMany(() => Order, order => order.Payment_ID)
  @Field(() => Order)
  @JoinColumn({name: "Order_ID"})
  Order: Order [];

  @Field(() => Float)
  @Column({type: 'decimal', precision: 10, scale: 2})
  Total: number;

  @Field(() => String)
  @Column()
  Payment_Method: string;

  @ManyToOne(() => User, user => user.Payment)
  @Field(() => User)
  @JoinColumn({name: "User_ID"})
  User_ID: User;

}
