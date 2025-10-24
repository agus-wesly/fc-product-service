import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { ProductRepository } from '../../infrastructure/repositories/product.repository'
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(private productRepository: ProductRepository) {}
    async create(data: CreateProductDTO){
        const product = new Product(data.name, data.price, data.qty)
        this.productRepository.save(product)
    }

    async findById(id: string){
        return id
    }
}
