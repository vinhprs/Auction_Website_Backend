import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ProductAuction } from '../../product-auction/entities/product-auction.entity';

@ObjectType()
@Entity()
export class UserBid {
  @PrimaryColumn()
  User_ID: string;
  @ManyToOne(() => User, user => user.User_Bid)
  @JoinColumn({name: "User_ID"})
  @Field(() => User,{nullable: true, defaultValue: null})
  User?: User;

  @PrimaryColumn()
  Product_Auction_ID: string;
  @ManyToOne(() => ProductAuction, productAuction => productAuction.User_Bid)
  @JoinColumn({name: "Product_Auction_ID"})
  @Field(() => ProductAuction ,{nullable: true, defaultValue: null})
  Product_Auction: ProductAuction;

  @Field(() => Float, {nullable: true, defaultValue: null})
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price?: number;

  @Field({nullable: true, defaultValue: null})
  @Column()
  Time?: Date;

}
