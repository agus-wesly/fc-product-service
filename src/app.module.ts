import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RedisModule } from './config/app-options.constants';

@Module({
    imports: [
        ProductModule,
        DatabaseModule,
        RedisModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
