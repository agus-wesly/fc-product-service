import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateProductDTO {
    @IsString({ message: "Name must be a string" })
    name: string;

    @IsNotEmpty()
    @IsInt({ message: "Price must be an integer" })
    price: number;

    @IsNotEmpty()
    @IsInt({ message: "Price must be an integer" })
    qty: number;
}
