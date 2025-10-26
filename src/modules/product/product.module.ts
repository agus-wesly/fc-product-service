import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller'
import { ProductsService } from './application/services/products.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/entities/product.entity';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQConfig } from 'src/config/rabbitmq-options.constants';
import { OrderEventsListener } from './infrastructure/listeners/order-events.listener';
import { HandleOrderEventsService } from './application/services/handle-order-event.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([ProductEntity]),
        ClientsModule.register([
            {
                name: "ORDER_SERVICE",
                ...rabbitMQConfig()
            }
        ])],
    controllers: [ProductsController, OrderEventsListener],
    providers: [ProductsService, HandleOrderEventsService],
    exports: [ProductsService]
})
export class ProductModule { }
