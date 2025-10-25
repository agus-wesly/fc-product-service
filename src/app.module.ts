import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './config/app-options.constants';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ProductModule,
        DatabaseModule,
        RedisModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
