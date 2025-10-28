import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../../domain/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HandleOrderEventsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) { }

    async orderCreated(productId: string) {
        const product = await this.productRepository.findOneBy({ id: productId });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        if (product.qty > 0)
            product.qty--

        await this.productRepository.save(product)
    }
}
