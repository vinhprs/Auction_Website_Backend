import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { AuctionField } from '../../auction-field/entities/auction-field.entity';
import { User } from '../../user/entities/user.entity';
import { ProductAuctionLog } from '../../product-auction-log/entities/product-auction-log.entity';
import { UserBid } from '../../user-bid/entities/user-bid.entity';
import { Order } from '../../order/entities/order.entity';
import { Evaluate } from '../../evaluate/entities/evaluate.entity';

@ObjectType()
@Entity()
export class ProductAuction {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Product_Auction_ID: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Weight: number;


  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Starting_Price: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Discount_Rate: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Current_Price: number;

  @OneToOne(() => Product, product => product.Product_Auction, {
    eager: true
  })
  @Field(() => Product)
  @JoinColumn({name: "Product_ID"})
  Product_ID: Product;

  @ManyToOne(() => AuctionField, auctionField => auctionField.Product_Auction)
  @Field(() => AuctionField)
  @JoinColumn({name: "Auction_Field_ID"})
  Auction_Field_ID: AuctionField;

  @ManyToOne(() => User, user => user.Product_Auction, {
    eager: true
  })
  @Field(() => User, { nullable: true, defaultValue: null })
  @JoinColumn({name: "User_ID"})
  User_ID: User;

  @Field({defaultValue: false})
  @Column({ default: false})
  isSold: boolean

  @Field({nullable: true, defaultValue: null})
  status: string;

  @OneToMany(() => ProductAuctionLog, productAuctionLog => productAuctionLog.Product_Auction_ID)
  ProductAuctionLog: ProductAuctionLog [];

  @OneToMany(() => UserBid, userBid => userBid.Product_Auction_ID)
  User_Bid: UserBid [];

  @OneToOne(() => Order, order => order.Product_Auction_ID, {
    eager: true
  })
  Order: Order;

  @OneToOne(() => Evaluate, evaluate => evaluate.Product_Auction)
  Evaluate: Evaluate;

}

