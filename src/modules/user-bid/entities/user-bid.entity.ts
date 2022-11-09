import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ProductAuction } from '../../product-auction/entities/product-auction.entity';

@ObjectType()
@Entity()
export class UserBid {
  @Field()
  @PrimaryColumn()
  User_ID: string;
  @ManyToOne(() => User, user => user.User_Bid)
  @JoinColumn({name: "User_ID"})
  User: User;

  @Field()
  @PrimaryColumn()
  Product_Auction_ID: string;
  @ManyToOne(() => ProductAuction, productAuction => productAuction.User_Bid)
  @JoinColumn({name: "Product_Auction_ID"})
  Product_Auction: ProductAuction;

  @Field(() => Float)
  @Column({ type: 'decimal' })
  Price: number;

  @Field()
  @Column()
  Time: Date;

}
