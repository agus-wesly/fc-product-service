import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../dtos/create-product.dto';

@Injectable()
export class ProductsService {
    async create(product: CreateProductDTO){
        console.log(product)
        return "creating product..."
    }

    async findById(id: string){
        return id
    }
}
