import { Component, OnInit } from '@angular/core';

import { CoreBaseService } from '../../../services/0-core/core.base.service';
import { Product, Item } from '../../../entities/product';

@Component({
    selector: 'comp-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

    products: Product[];

    constructor(private baseService: CoreBaseService) { }

    ngOnInit() {
        this.baseService.httpGet('products/row').subscribe(x => {
            this.products = x.valueOf() as Product[];
        });
       
    }
}
