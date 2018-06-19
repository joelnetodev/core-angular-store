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

    model: ProductModel = new ProductModel();
    items: Item[] = new Array<Item>();

    constructor(private route: ActivatedRoute, private router: Router, private httpServ: CoreHttpService, private alertServ: CoreAlertService) {
    }

    ngOnInit() {

        this.populateItems();

        if (this.route.snapshot.paramMap.has('id')) {

            let id = this.route.snapshot.paramMap.get('id');

            this.populateProduct(id);   
        } 
    }

    populateProduct(id) {
       

        this.httpServ.httpGet('products/' + id).subscribe(
            (x) => {
                this.model.product = x.valueOf() as Product;

                for (var i = 0; i < this.model.product.items.length; i++) {

                    let itemModel = new ItemModel();
                    itemModel.item = this.model.product.items[i];
                    this.model.items.push(itemModel);
                }
            });
    }

    populateItems() {
        this.httpServ.httpGet('items/active').subscribe(
            (x) => {
                this.items = x.valueOf() as Item[];
            });
    }


    save() {

        this.httpServ.httpPost('products', this.model.product).subscribe(
            (x) => {
                this.alertServ.createSuccess('Product saved.', true);
                this.router.navigate(["products"]);
            });
    }

    remove(itemModel: ItemModel) {
        this.model.items = this.model.items.filter(x => x != itemModel);
        this.model.product.items = this.model.product.items.filter(x => x != itemModel.item);
    }

    add() {
        let itemModel = new ItemModel();
        itemModel.isEditingItem = true;

        this.model.product.items.push(itemModel.item);
        this.model.items.push(itemModel);
    }

    onFocusOutCount(itemModel: ItemModel) {
        itemModel.isEditingCount = false;
    }

    onClickCount(itemModel: ItemModel) {
        itemModel.isEditingCount = true;
    }

    onFocusOutItem(itemModel: ItemModel) {
        let itemFound = this.items.find(x => x.id == itemModel.item.id);
        if (itemFound) {
            itemModel.item.name = itemFound.name;
        }
        itemModel.isEditingItem = false;
    }

    onClickItem(itemModel: ItemModel) {
        itemModel.isEditingItem = true;
    }
}

export class ProductModel {
    public product: Product = new Product();
    public items: ItemModel[] = new Array<ItemModel>();
}
export class ItemModel {
    public item: ProductItem = new ProductItem();
    public isEditingCount: boolean;
    public isEditingItem: boolean;
}
