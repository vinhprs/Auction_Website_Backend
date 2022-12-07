import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductAuction } from '../../product-auction/entities/product-auction.entity';

@ObjectType()
@Entity()
export class Evaluate {
  
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Evaluate_ID: string;

  @Field()
  @Column()
  Comment: string

  @Field(() => Int)
  @Column({type: 'int'})
  Rating: number

  @ManyToOne(() => User, user => user.Evaluating)
  @Field(() => User)
  @JoinColumn({name: "User_Evaluating_ID"})
  User_Evaluating: User;

  @ManyToOne(() => User, user => user.Evaluated)
  @Field(() => User)
  @JoinColumn({name: "User_Evaluated_ID"})
  User_Evaluated: User;

  @OneToOne(() => ProductAuction, productAuction => productAuction.Evaluate)
  @Field(() => ProductAuction)
  @JoinColumn({ name: "Product_Auction_ID"})
  Product_Auction: ProductAuction;

}
