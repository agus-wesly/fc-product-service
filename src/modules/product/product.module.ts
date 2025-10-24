import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller'
import { ProductsService } from './application/services/products.service'

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductModule {}
