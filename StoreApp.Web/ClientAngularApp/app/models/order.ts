import { Client } from "./client";
import { Product } from "./product";

/*
This is the main module of an Angular App
It contains the declarations of every others (Main or not) modules, or components or services
*/

export class Order {
    id: number;
    description: string;
    date: Date;
    client: Client;
    discount: number;
    isActive: boolean;
    products: ProductOrder[] = new Array<ProductOrder>();
}

export class ProductOrder {
    id: number;
    count: number;
    price: number;
    product: Product;
}
