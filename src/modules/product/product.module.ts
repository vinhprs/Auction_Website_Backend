import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UserModule } from '../user/user.module';
import { CatalogModule } from '../catalog/catalog.module';
import { ProductImageModule } from '../product-image/product-image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UserModule,
    CatalogModule,
    ProductImageModule
  ],
  providers: [ProductResolver, ProductService],
  exports: [ ProductService ]
})
export class ProductModule {}
