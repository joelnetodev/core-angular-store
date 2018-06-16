
import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../../models/product';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'comp-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

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
                let productM = new ProductModel();
                productM.product = product;
                productM.itemsNames = this.getItemsNames(product);
                productM.enableHide = this.getEnableHide(productM.itemsNames);

                this.productsModels.push(productM);
            }

        });
    }

    remove(productModel: ProductModel) {
        this.httpServ.httpPost('products/delete/' + productModel.product.id).subscribe(
            (x) => {
                this.productsModels.splice(this.productsModels.indexOf(productModel), 1);
            });
    }

    getItemsNames(product: Product): string {
        let itemsName = "";

        for (var i = 0; i < product.items.length; i++) {
            itemsName += itemsName;

            if (i != product.items.length - 1)
                itemsName += ",";
        }

        return itemsName;
    }

    getEnableHide(itemsNames: string) {
        return itemsNames.length > 50;
    }
}

export class ProductModel {
    public product: Product;
    public itemsNames: string;
    public enableHide: boolean;
    public display: boolean;
}
