import { Controller, Get, Post, Body, Param, Inject, NotFoundException } from '@nestjs/common';
import { ProductsService } from "./application/services/products.service"
import { CreateProductDTO } from './application/dtos/create-product.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
    constructor(
        private productServices: ProductsService,
        @Inject('ORDER_SERVICE') private client: ClientProxy,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    @Post()
    async create(@Body() productDto: CreateProductDTO) {
        const newProduct = await this.productServices.create(productDto)
        this.client.emit('product.created', newProduct)
        return newProduct
    }

    @Get(":id")
    async findById(@Param("id") id: string) {
        const cacheKey = `product-${id}`
        const productInCache = await this.cacheManager.get(cacheKey)
        if (!productInCache) {
            const product = await this.productServices.findById(id)
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            this.cacheManager.set(cacheKey, product)
            return product
        }
        return productInCache
    }
}
