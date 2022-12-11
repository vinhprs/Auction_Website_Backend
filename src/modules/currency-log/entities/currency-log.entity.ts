import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from '../../currency/entities/currency.entity';

@ObjectType()
@Entity()
export class CurrencyLog {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  Currency_Log_ID: string;

  @Field()
  @Column({ length: 1000 })
  Currency_Log_Value: string;

  @Field(() => Float)
  @Column({type: 'decimal', precision: 10, scale: 2 })
  Total_Amount: number;

  @ManyToOne(() => Currency, currency => currency.Currency_Log)
  @Field(() => Currency)
  @JoinColumn({name: "Currency_ID"})
  Currency: Currency;

}
