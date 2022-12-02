import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Catalog } from '../../catalog/entities/catalog.entity';
import { ProductImage } from '../../product-image/entities/product-image.entity';
import { ProductAuction } from '../../product-auction/entities/product-auction.entity';

@ObjectType()
@Entity()
export class Product {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Product_ID: string;

  @Field()
  @Column()
  Product_Name: string;

  @Field()
  @Column()
  Quantity: number;

  @Field(() => Float)
  @Column({type: 'decimal'})
  Weight: number;

  @Field(() => Float)
  @Column({type: 'decimal'})
  Price: number;

  @Field({nullable: true, defaultValue: null})
  @Column({nullable: true, default: null})
  User_Note?: string;

  @Field({defaultValue: true})
  @Column({default: true})
  isActive: boolean;

  @Field({defaultValue: false})
  @Column({default: false})
  isBlocked: boolean;

  @Field({nullable: true, defaultValue: null})
  @Column({nullable: true, default: null, length: 2000})
  Product_Info?: string;

  // User relationship: n-1
  @ManyToOne(() => User, user => user.Product)
  @Field(() => User)
  @JoinColumn({name: "User_ID"})
  User_ID: User;

  // Catalog relationship: n-1
  @ManyToOne(() => Catalog, catalog => catalog.Product)
  @Field(() => Catalog)
  @JoinColumn({name: "Catalog_ID"})
  Catalog_ID: Catalog;

  @OneToMany(() => ProductImage, productImage => productImage.Product_ID)
  @Field(() => ProductImage ,{nullable: true, defaultValue: null})
  ProductImage: ProductImage [];

  @OneToOne(() => ProductAuction, pA => pA.Product_ID)
  Product_Auction: ProductAuction;
}
