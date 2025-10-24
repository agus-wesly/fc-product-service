import { Injectable } from "@nestjs/common";
import { Product } from "../../domain/entities/product.entity";


@Injectable()
export class ProductRepository {
    async save(product: Product) {
        console.log(product)
        // logic to save into db
    }
}
