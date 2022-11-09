import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@ObjectType()
@Entity()
export class ProductImage {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Product_Image_ID: string;

  // Product relationship: n-1
  @ManyToOne(() => Product, product => product.ProductImage)
  @Field(() => Product)
  @JoinColumn({name: "Product_ID"})
  Product_ID: Product;

  @Field()
  @Column()
  Product_Image_Url: string;
}
