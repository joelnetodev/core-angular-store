/*
This is the main module of an Angular App
It contains the declarations of every others (Main or not) modules, or components or services
*/

export class Product
{
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public isActive: boolean;
    public items: ProductItem[] = new Array<ProductItem>();
}

export class ProductItem {
    public id: number;
    public name: string;
    public count: number = 0;
}
