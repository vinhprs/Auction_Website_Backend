import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AddressModule } from './modules/address/address.module';
import { Address } from './modules/address/entities/address.entity';
import { ProductModule } from './modules/product/product.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { Product } from './modules/product/entities/product.entity';
import { Catalog } from './modules/catalog/entities/catalog.entity';
import { ProductImageModule } from './modules/product-image/product-image.module';
import { ProductImage } from './modules/product-image/entities/product-image.entity';
import { CurrencyModule } from './modules/currency/currency.module';
import { Currency } from './modules/currency/entities/currency.entity';
import { WeightFeeModule } from './modules/weight-fee/weight-fee.module';
import { DeliveryFeeModule } from './modules/delivery-fee/delivery-fee.module';
import { DeliveryFee } from './modules/delivery-fee/entities/delivery-fee.entity';
import { WeightFee } from './modules/weight-fee/entities/weight-fee.entity';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductAuctionModule } from './modules/product-auction/product-auction.module';
import { AuctionFieldModule } from './modules/auction-field/auction-field.module';
import { ProductAuctionLogModule } from './modules/product-auction-log/product-auction-log.module';
import { UserBidModule } from './modules/user-bid/user-bid.module';
import { UserBidLogModule } from './modules/user-bid-log/user-bid-log.module';
import { AuctionField } from './modules/auction-field/entities/auction-field.entity';
import { Order } from './modules/order/entities/order.entity';
import { Payment } from './modules/payment/entities/payment.entity';
import { ProductAuction } from './modules/product-auction/entities/product-auction.entity';
import { ProductAuctionLog } from './modules/product-auction-log/entities/product-auction-log.entity';
import { UserBid } from './modules/user-bid/entities/user-bid.entity';
import { UserBidLog } from './modules/user-bid-log/entities/user-bid-log.entity';
import { AuthModule } from './auth/auth.module';
import { CurrencyLogModule } from './modules/currency-log/currency-log.module';
import { CurrencyLog } from './modules/currency-log/entities/currency-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Address,
        Product,
        Catalog,
        ProductImage,
        Currency,
        CurrencyLog,
        DeliveryFee,
        WeightFee,
        AuctionField,
        Order,
        Payment,
        ProductAuction,
        ProductAuctionLog,
        UserBid,
        UserBidLog,
      ],
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: (({ req, res }) => ({ req, res })),
      installSubscriptionHandlers: true,
      cors: {
        credentials: true,
        origin: true
      }
    }),
    UserModule,
    AddressModule,
    ProductModule,
    CatalogModule,
    ProductImageModule,
    CurrencyModule,
    WeightFeeModule,
    DeliveryFeeModule,
    OrderModule,
    PaymentModule,
    ProductAuctionModule,
    AuctionFieldModule,
    ProductAuctionLogModule,
    UserBidModule,
    UserBidLogModule,
    AuthModule,
    CurrencyLogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
