import { Injectable } from '@nestjs/common';
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
        console.log("TODO : update the qty of productId")
    }
}
