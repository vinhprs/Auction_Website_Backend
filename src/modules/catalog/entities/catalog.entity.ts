import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Tree, TreeParent, TreeChildren, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@ObjectType()
@Entity()
@Tree("materialized-path")
export class Catalog {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Catalog_ID: string;

  @Field()
  @Column({unique: true})
  Catalog_Name: string;

  @Field({nullable: true, defaultValue: null})
  @Column({nullable: true, default: null})
  Catalog_Image_Url?: string;

  @Field(() => [Catalog],{nullable: true, defaultValue: null})
  @TreeChildren()
  children: Catalog [];

  @Field({nullable: true})
  @TreeParent()
  @JoinColumn({name: "Catalog_Id_Ref"})
  Catalog_Id_Ref: Catalog;

  @Field({nullable: true, defaultValue: false})
  isOpened: boolean;

  // Product relationship: 1-n
  @OneToMany(() => Product, product => product.Catalog_ID)
  Product: Product [];
}
