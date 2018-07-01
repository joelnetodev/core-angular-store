import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../../models/product';
import { CoreHttpService } from '../../../../services/0-core/core.http.service';
import { CoreAlertService } from '../../../../services/0-core/core.alert.service';
import { Router } from '@angular/router';
import { Client } from '../../../../models/client';
import { Order, ProductOrder } from '../../../../models/order';

@Component({
    selector: 'comp-order-edit',
    templateUrl: './order.edit.component.html'
})
export class OrderEditComponent implements OnInit {

    model: OrderModel = new OrderModel();
    clients: Client[] = new Array<Client>();
    products: Product[] = new Array<Product>();

    constructor(private route: ActivatedRoute, private router: Router, private httpServ: CoreHttpService, private alertServ: CoreAlertService) {
    }

    ngOnInit() {

        this.httpServ.httpGet('clients/actives').subscribe(
            (x) => {
                this.clients = x.valueOf() as Client[];

                this.httpServ.httpGet('products/actives').subscribe(
                    (x) => {
                        this.products = x.valueOf() as Product[];

                        if (this.route.snapshot.paramMap.has('id')) {
                            let id = this.route.snapshot.paramMap.get('id');
                            this.populateOrder(id);
                        }
                    });
            });
    }

    populateOrder(id) {
       
        this.httpServ.httpGet('orders/' + id).subscribe(
            (x) => {
                this.model.order = x.valueOf() as Order;

                for (var i = 0; i < this.model.order.products.length; i++) {

                    let prodModel = new ProductModel();
                    prodModel.product = this.model.order.products[i];
                    this.model.products.push(prodModel);
                }
            });
    }

    getTotal(): number {
        let count: number = 0;
        let price: number = 0;

        for (var i = 0; i < this.model.order.products.length; i++) {
            count += this.model.order.products[i].count;
            price += this.model.order.products[i].price;
        }

        return (count * price) - this.model.order.discount;
    }

    onDateChange(value: string) {
        this.model.order.date = new Date(value);
    }

    save() {

        this.httpServ.httpPost('orders', this.model.order).subscribe(
            (x) => {
                this.alertServ.createSuccess('Order saved.', true);
                this.router.navigate(["orders"]);
            });
    }

    remove(prodModel: ProductModel) {
        this.model.order.products = this.model.order.products.filter(x => x != prodModel.product);
        this.model.products = this.model.products.filter(x => x != prodModel);
    }

    add() {
        let prodModel = new ProductModel();
        prodModel.isEditingProduct = true;

        this.model.order.products.push(prodModel.product);
        this.model.products.push(prodModel);
    }

    //onFocusOutCount(itemModel: ItemModel) {
    //    itemModel.isEditingCount = false;
    //}

    //onClickCount(itemModel: ItemModel) {
    //    itemModel.isEditingCount = true;
    //}

    //onFocusOutItem(itemModel: ItemModel) {
    //    let itemFound = this.items.find(x => x.id == itemModel.item.id);
    //    if (itemFound) {
    //        itemModel.item.name = itemFound.name;
    //    }
    //    itemModel.isEditingItem = false;
    //}

    //onClickItem(itemModel: ItemModel) {
    //    itemModel.isEditingItem = true;
    //}
}

export class OrderModel {
    public order: Order = new Order();
    public products: ProductModel[] = new Array<ProductModel>();
}
export class ProductModel {
    public product: ProductOrder = new ProductOrder();
    public isEditingProduct: boolean;
    public isEditingCount: boolean;
    public isEditingPrice: boolean;
}
