import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository {
    async save() {
        return "saving..."
        // logic to save into db
    }
}
