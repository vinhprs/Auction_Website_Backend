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

  @Field(() => Float, { nullable: true, defaultValue: 0.00  })
  @Column({type: 'decimal' , precision: 10, scale: 2, nullable: true, default: 0.00})
  Total_Money: number;

  @OneToOne(() => User, user => user.Currency)
  @Field(() => User)
  @JoinColumn({name: "User_ID"})
  User_ID: User;

  @OneToMany(() => CurrencyLog, cL => cL.Currency)
  Currency_Log: CurrencyLog [];
}
