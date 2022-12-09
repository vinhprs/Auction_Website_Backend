import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductAuction } from '../../product-auction/entities/product-auction.entity';

@ObjectType()
@Entity()
export class AuctionField {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Auction_Field_ID: string;

  @Field()
  @Column({type: 'datetime'})
  Start_Time: Date;

  @Field()
  @Column({type: 'datetime'})
  End_Time: Date;

  @Field(() => Int)
  @Column({ type: 'int' })
  Discount_Circle: number;

  @Field({ defaultValue: false })
  @Column({ default: false })
  isOperation: boolean;

  @OneToMany(() => ProductAuction, productAuction => productAuction.Auction_Field_ID)
  Product_Auction: ProductAuction [];
}
