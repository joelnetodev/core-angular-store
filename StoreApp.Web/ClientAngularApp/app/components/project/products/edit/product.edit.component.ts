import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductItem } from '../../../../models/product';
import { CoreHttpService } from '../../../../services/0-core/core.http.service';
import { CoreAlertService } from '../../../../services/0-core/core.alert.service';
import { Router } from '@angular/router';
import { Item } from '../../../../models/item';

@Component({
    selector: 'comp-product-edit',
    templateUrl: './product.edit.component.html'
})
export class ProductEditComponent implements OnInit {

    product: Product = new Product();
    items: Item[] = new Array<Item>();
    currentItem: ProductItem = new ProductItem();
    modalTitle: string = "Add";

    constructor(private route: ActivatedRoute, private router: Router, private httpServ: CoreHttpService, private alertServ: CoreAlertService) {
    }

    ngOnInit() {

        this.httpServ.httpGet('items/actives').subscribe(
            (x) => {
                this.items = x.valueOf() as Item[];

                if (this.route.snapshot.paramMap.has('id')) {

                    let id = this.route.snapshot.paramMap.get('id');

                    this.populateProduct(id);
                }
            });
    }

    populateProduct(id) {
       
        this.httpServ.httpGet('products/' + id).subscribe(
            (x) => {
                this.product = x.valueOf() as Product;

                for (let item of this.product.items) {
                    if (!this.items.some(x => x.id == item.id)) {
                        let itemToAdd = new Item();
                        itemToAdd.id = item.id;
                        itemToAdd.name = item.name;
                        this.items.push(itemToAdd);
                    }
                }
            });
    }

    save() {

        this.httpServ.httpPost('products', this.product).subscribe(
            (x) => {
                this.alertServ.createSuccess('Product saved.', true);
                this.router.navigate(["products"]);
            });
    }

    remove(item: ProductItem) {
        this.product.items = this.product.items.filter(x => x != item);
    }

    edit(item: ProductItem) {
        this.currentItem = item;
        this.modalTitle = "Edit";
    }

    add() {
        this.currentItem = new ProductItem();
        this.modalTitle = "Add";
    }

    saveItem() {
        if (this.modalTitle == "Add") {
            this.product.items.push(this.currentItem);
        }
    }

    onItemSelect() {
        this.currentItem.name = this.items.find(x => x.id == this.currentItem.id).name;
    }

    getIsEditingMode(): boolean {
        return this.modalTitle == "Edit";
    }
}
