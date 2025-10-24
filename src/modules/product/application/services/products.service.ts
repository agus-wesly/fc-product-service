import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class ProductsService {
    constructor(private productRepository: ProductRepository) {}
    async create(data: CreateProductDTO){
        const product = new Product(data.name, data.price, data.qty)
        return this.productRepository.save(product)
    }

    async findById(id: string){
        return id
    }
}
