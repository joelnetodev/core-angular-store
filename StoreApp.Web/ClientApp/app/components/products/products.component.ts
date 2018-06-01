import { Component, OnInit } from '@angular/core';

import { BaseService } from '../../services/base/base.service';
import { Product, Item } from '../../entities/product';

@Component({
    selector: 'comp-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

    products: Product[];

    constructor(private baseService: BaseService) { }

    ngOnInit() {
        this.getProductsRow();
    }

    async getProductsRow() {
        this.products = await this.baseService.httpGet('products/row').toPromise() as Product[];
    }
}
