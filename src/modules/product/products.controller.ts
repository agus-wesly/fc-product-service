import { Controller, Get, Post, Body, Param, UseInterceptors, Inject, NotFoundException } from '@nestjs/common';
import { ProductsService } from "./application/services/products.service"
import { CreateProductDTO } from './application/dtos/create-product.dto';
import {  CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
    constructor(
        private productServices: ProductsService,
        @Inject('ORDER_SERVICE') private client: ClientProxy,
    ) { }

    @Post()
    async create(@Body() productDto: CreateProductDTO) {
        const newProduct = await this.productServices.create(productDto)
        this.client.emit('product.created', newProduct)
        return newProduct
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(5000)
    @Get(":id")
    async findById(@Param("id") id: string) {
        const product = await this.productServices.findById(id)
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product
    }
}
