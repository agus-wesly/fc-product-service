import { Injectable } from "@nestjs/common";
import { Product } from "../../domain/entities/product.entity";
import { DataSource } from 'typeorm';

@Injectable()
export class ProductRepository {
    constructor(private dataSource: DataSource) {}
    async save(product: Product) {
        console.log(this.dataSource)
        console.log(product)
        return "saving..."
        // logic to save into db
    }
}
