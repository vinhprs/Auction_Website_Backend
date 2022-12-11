import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductAuction } from '../../product-auction/entities/product-auction.entity';

@ObjectType()
@Entity()
export class ProductAuctionLog {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Product_Auction_Log_ID: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price: number;

  @Field()
  @Column()
  Time: Date;

  @ManyToOne(() => ProductAuction, productAuction => productAuction.ProductAuctionLog)
  @Field(() => ProductAuction)
  @JoinColumn({name: "Product_Auction_ID"})
  Product_Auction_ID: ProductAuction;

}
