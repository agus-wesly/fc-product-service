import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from "./application/services/products.service"
import { CreateProductDTO } from './application/dtos/create-product.dto';


@Controller('products')
export class ProductsController {
    constructor(private productServices: ProductsService) {}

    @Post()
    async create(@Body() productDto: CreateProductDTO) {
        return this.productServices.create(productDto)
    }

    @Get(":id")
    async findById(@Param() id: string) {
        return this.productServices.findById(id)
    }

}
