import { Controller, Get, Post, Body, Param, UseInterceptors } from '@nestjs/common';
import { ProductsService } from "./application/services/products.service"
import { CreateProductDTO } from './application/dtos/create-product.dto';
import {  CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('products')
export class ProductsController {
    constructor(
        private productServices: ProductsService,
    ) { }

    @Post()
    async create(@Body() productDto: CreateProductDTO) {
        return this.productServices.create(productDto)
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(5000)
    @Get(":id")
    async findById(@Param("id") id: string) {
        return this.productServices.findById(id)
    }
}
