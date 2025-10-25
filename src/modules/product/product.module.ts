import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller'
import { ProductsService } from './application/services/products.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductModule {}
