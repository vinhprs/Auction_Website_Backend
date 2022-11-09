import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@ObjectType()
@Entity()
export class Catalog {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Catalog_ID: string;

  @Field()
  @Column()
  Catalog_Name: string;

  // Product relationship: 1-n
  @OneToMany(() => Product, product => product.Catalog_ID)
  Product: Product [];
}
