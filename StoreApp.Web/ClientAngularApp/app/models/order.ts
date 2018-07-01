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
    client: Client = new Client();
    discount: number = 0;
    isActive: boolean;
    products: ProductOrder[] = new Array<ProductOrder>();
}

export class ProductOrder {
    id: number;
    count: number = 0;
    price: number = 0;
    product: Product = new Product();
}
