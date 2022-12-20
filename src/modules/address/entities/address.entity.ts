import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../order/entities/order.entity';

@ObjectType()
@Entity()
export class Address {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Address_ID: string;

  @Field({nullable: true, defaultValue: null})
  @Column({ nullable: true, default: null })
  Reciever_Name: string;

  @Field(() => String)
  @Column()
  Phone: string;
  

  @Field()
  @Column()
  Address_Name: string;

  @Field()
  @Column()
  Address_District: string;

  @Field(() => Int, {nullable: true, defaultValue: null})
  @Column({type: 'int', nullable: true, default: null})
  District_ID: number;

  // // User relationship: n-1
  @ManyToOne(() => User, user => user.Address)
  @Field(() => User)
  @JoinColumn({name: "User_ID"})
  User_ID: User;
  
}
