import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ProductAuction } from '../../product-auction/entities/product-auction.entity';
import { Address } from '../../address/entities/address.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Order_ID: string;

  @Field(() => Float)
  @Column({type: 'decimal', precision: 10, scale: 2})
  Total_Price: number;

  @Field({nullable: true, defaultValue: false})
  @Column({nullable: true, default: false})
  Status: boolean;

  @ManyToOne(() => User, user => user.Order)
  @Field(() => User)
  @JoinColumn({name: "User_ID"})
  User_ID: User;

  @OneToOne(() => ProductAuction, productAuction => productAuction.Order)
  @Field(() => ProductAuction)
  @JoinColumn({name: "Product_Auction_ID"})
  Product_Auction_ID: ProductAuction;

  @OneToOne(() => Address)
  @Field(() => Address)
  @JoinColumn({name: "Address_ID", referencedColumnName: "Address_ID"})
  Address_ID!: Address;

  @ManyToOne(() => Payment, payment => payment.Order)
  @Field(() => Payment, {nullable: true, defaultValue: null})
  @JoinColumn({name: "Payment_ID"} )
  Payment_ID: Payment;
}
