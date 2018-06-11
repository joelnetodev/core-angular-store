import { Component, OnInit, Input } from '@angular/core';

import { Product, Item } from '../../../../models/product';

@Component({
    selector: 'comp-row',
    templateUrl: './row.component.html'
})
export class RowComponent implements OnInit {

    @Input()
    products: Product[];

    constructor() { }

    ngOnInit() {
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
