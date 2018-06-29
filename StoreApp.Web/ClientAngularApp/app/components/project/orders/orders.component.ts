
import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../../models/product';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'comp-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

    productsModels: ProductModel[] = new Array<ProductModel>();

    constructor(private router: Router, private httpServ: CoreHttpService) {
    }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.httpServ.httpGet('products').subscribe(x => {
            let products = x.valueOf() as Product[];

            for (var i = 0; i < products.length; i++) {
                let product = products[i];
                let model = new ProductModel();
                model.product = product;
                model.itemsNamesFull = this.getItemsNamesFull(product);
                this.productsModels.push(model);
            }
        });
    }

    remove(productModel: ProductModel) {
        this.httpServ.httpPost('products/delete/' + productModel.product.id).subscribe(
            (x) => {
                this.productsModels.splice(this.productsModels.indexOf(productModel), 1);
            });
    }

    getItemsNamesFull(product: Product): string {
        let itemsName = "";

        for (var i = 0; i < product.items.length; i++) {
            itemsName += product.items[i].name;

            if (i != product.items.length - 1)
                itemsName += ", ";
        }

        return itemsName;
    }


    setDisplayed(productModel: ProductModel) {
        productModel.displayed = !productModel.displayed;
    }

    getArrowDirection(productModel: ProductModel):string {
        return productModel.displayed ? "left" : "right";
    }

    getTitle(productModel: ProductModel): string {
        return productModel.displayed ? "hide" : "show";
    }
}

export class ProductModel {
    public product: Product;
    public itemsNamesFull: string;
    public displayed: boolean;

    public getIsToHide(): boolean {
        return this.itemsNamesFull.length >= 20;
    }

    public getItemsNames(): string {
        if (this.displayed || !this.getIsToHide())
            return this.itemsNamesFull;
        else {
            return this.itemsNamesFull.substr(0, 20) + "...";
        }
    }
}
