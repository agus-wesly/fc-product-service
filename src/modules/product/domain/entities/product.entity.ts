import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'decimal' })
    price: number;

    @Column({ type: 'int' })
    qty: number;

    @Column({ type: 'date' })
    createdAt: Date;
}
