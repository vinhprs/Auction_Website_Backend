import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserBid } from '../../user-bid/entities/user-bid.entity';

@ObjectType()
@Entity()
export class UserBidLog {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  User_Bid_Log_ID: string;

  @Field(() => Float)
  @Column({ type: 'decimal' })
  Price: number;

  @Field()
  @Column()
  Time: Date;

  @ManyToOne(() => UserBid)
  @Field(() => UserBid)
  @JoinColumn([
    { name: "User_BidUser_ID" ,referencedColumnName: 'User_ID' },
    { name: "Product_Auction_ID" ,referencedColumnName: 'Product_Auction_ID' }
  ])
  userBrid: UserBid;

}
