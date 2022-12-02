import { Module } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { ProductImageResolver } from './product-image.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImage])
  ],
  providers: [ProductImageResolver, ProductImageService],
  exports: [ProductImageService]
})
export class ProductImageModule {}
