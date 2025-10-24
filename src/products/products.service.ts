import { Injectable } from '@nestjs/common';

interface Product {
    name: string;
    price: number;
    qty: number;
}

@Injectable()
export class ProductsService {
    async create(product: Product){
        console.log(product)
        return "creating product..."
    }
}
