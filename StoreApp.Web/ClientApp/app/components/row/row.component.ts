import { Component, OnInit } from '@angular/core';

import { BaseService } from '../../services/base/base.service';
import { Product, Item } from '../../entities/product';

@Component({
    selector: 'comp-row',
    templateUrl: './row.component.html'
})
export class RowComponent implements OnInit {

    products: Product[];

    constructor(private baseService: BaseService) { }

    ngOnInit() {
        this.getProductsRow();
    }

    async getProductsRow() {
        this.products = await this.baseService.httpGet('products/row') as Product[];
    }

    addItem(product: Product) {
        product.items.push(this.createEmptyItem());
    }

    removeItem(product: Product, item: Item) {

        product.items.splice(product.items.indexOf(item), 1);
    }

    createEmptyItem(): Item {
        let item = new Item();
        item.id = 0;
        item.name = 'New Item';
        item.count = 0;

        return item;
    }
}
