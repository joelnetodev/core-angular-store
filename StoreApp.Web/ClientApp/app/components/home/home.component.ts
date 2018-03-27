import { Component, OnInit } from '@angular/core';

import { BaseService } from '../../services/base/base.service';
import { Product } from '../../entities/product';

@Component({
    selector: 'comp-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private baseService: BaseService) { }

    ngOnInit() {
    }

    returnedId: number = 0;

    id: number = 0;

    product: Product = new Product();
    products: Product[] = new Array<Product>();   

    async getOne()
    {
        let response = await this.baseService.httpGet('products/' + this.id);
        this.product = response.valueOf() as Product;
    }

    async postOne()
    {
        let response = await this.baseService.httpPost('products', this.product);

        this.baseService.createAlertSuccess('Product saved');
    }

    async getAll()
    {
        let response = await this.baseService.httpGet('products');
        this.products = response.valueOf() as Product[];
    }


    onReturnProduct(obj: Object): void
    {
        this.product = obj as Product;
    }
}
