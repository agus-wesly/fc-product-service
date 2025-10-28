import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) { }

    async create(data: CreateProductDTO) {
        return this.productRepository.save({ id: crypto.randomUUID(), ...data, createdAt: new Date() })
    }

    async findById(id: string) {
        console.info("called in service")
        return this.productRepository.findOneBy({ id })
    }
}
