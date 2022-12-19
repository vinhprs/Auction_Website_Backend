import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CurrencyLog } from '../../currency-log/entities/currency-log.entity';

@ObjectType()
@Entity()
export class Currency {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Currency_ID: string;

  @Field(() => Float)
  @Column({type: 'decimal', precision: 10, scale: 2})
  Total_Money: number;

  @OneToOne(() => User, user => user.Currency)
  @Field(() => User, {nullable: true})
  @JoinColumn({name: "User_ID"})
  User_ID: User;

  @OneToMany(() => CurrencyLog, cL => cL.Currency, {
    cascade: true
  })
  Currency_Log: CurrencyLog [];
}
