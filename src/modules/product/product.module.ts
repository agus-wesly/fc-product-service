import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller'
import { ProductsService } from './application/services/products.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/entities/product.entity';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQConfig } from 'src/config/rabbitmq-options.constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductEntity]),
        ClientsModule.register([
            {
                name: "ORDER_SERVICE",
                ...rabbitMQConfig()
            }
        ])],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductModule { }
