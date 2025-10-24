import { Controller, Post, Body } from '@nestjs/common';
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import {ProductsService} from "./products.service"

class ProductDTO {
    @IsString({message: "Name must be a string"})
    name: string;

    @IsNotEmpty()
    @IsNumber({allowNaN: false, allowInfinity: false})
    price: number;

    @IsNotEmpty()
    @IsNumber({allowNaN: false, allowInfinity: false})
    qty: number;
}

@Controller('products')
export class ProductsController {
    constructor(private productServices: ProductsService) {}

    @Post()
    async create(@Body() productDto: ProductDTO) {
        return this.productServices.create(productDto)
    }

}
