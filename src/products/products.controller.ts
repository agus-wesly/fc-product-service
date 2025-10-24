import { Controller, Post, Body } from '@nestjs/common';
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

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
    @Post()
    async create(@Body() productDto: ProductDTO): Promise<string>{
        console.log(productDto)
        return "creating product..."
    }

}
