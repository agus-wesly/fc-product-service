import { IsString } from "class-validator"


export class OrderCreatedDTO {
    @IsString()
    id: string

    @IsString()
    productId: string
}
