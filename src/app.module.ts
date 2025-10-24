import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
    imports: [ProductModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
