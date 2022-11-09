import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../order/entities/order.entity';

@ObjectType()
@Entity()
export class Address {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Address_ID: string;

  @Field()
  @Column()
  Address_Name: string;

  @Field()
  @Column()
  Address_District: string;

  // // User relationship: n-1
  @ManyToOne(() => User, user => user.Address)
  @Field(() => User)
  @JoinColumn({name: "User_ID"})
  User_ID: User;
  
}
