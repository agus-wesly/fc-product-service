import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller'
import { ProductsService } from './application/services/products.service'
import { ProductRepository } from './infrastructure/repositories/product.repository';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  exports: [ProductsService]
})
export class ProductModule {}
