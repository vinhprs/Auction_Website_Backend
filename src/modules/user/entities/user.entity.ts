import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Address } from '../../address/entities/address.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { ProductAuction } from '../../product-auction/entities/product-auction.entity';
import { UserBid } from '../../user-bid/entities/user-bid.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Order } from '../../order/entities/order.entity';
import { Currency } from '../../currency/entities/currency.entity';


@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  User_ID: string;

  @Field()
  @Column()
  User_First_Name: string;

  @Field()
  @Column()
  User_Last_Name: string;

  @Field()
  @Column()
  User_Name: string;

  @Field()
  @Column()
  Email: string;

  @Field({nullable: true, defaultValue: null})
  @Column({nullable: true, default: null})
  Phone: string;

  @HideField()
  @Column()
  Password: string;

  @Field({ nullable: true, defaultValue: null })
  @Column({ nullable: true, default: null })
  Otp: string;

  @Field({nullable: true, defaultValue: null})
  @Column({nullable: true, default: null})
  User_Image_Url: string;

  @Field({nullable: true, defaultValue: false})
  @Column({nullable: true, default: false})
  isAdmin: boolean;

  @Field({nullable: true, defaultValue: true})
  @Column({nullable: true, default: true})
  isActive: boolean;

  @Field({nullable: true, defaultValue: false})
  @Column({nullable: true, default: false})
  isConfirmEmail: boolean;

  // Address relationship: 1-1
  @OneToOne(() => Address)
  @Field(() => Address, {nullable: true, defaultValue: null})
  @JoinColumn({name: "Default_Address_ID"})
  Default_Address_ID: Address

  // Address relationship: 1-n
  @OneToMany(() => Address, address => address.User_ID)
  Address: Address [];

  // Product relationship: 1-n
  @OneToMany(() => Product, product => product.User_ID)
  Product: Product [];

  // Product_Auction relationship: 1-n
  @OneToMany(() => ProductAuction, productAuction => productAuction.User_ID)
  Product_Auction: ProductAuction [];

  @OneToMany(() => UserBid, userBid => userBid.User_ID)
  User_Bid: UserBid [];

  @OneToMany(() => Payment, payment => payment.User_ID)
  Payment: Payment [];

  @OneToMany(() => Order, order => order.User_ID)
  Order: Order [];

  @OneToOne(() => Currency, currency => currency.User_ID)
  Currency: Currency;
}
