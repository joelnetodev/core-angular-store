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

    order: Order = new Order();
    clients: Client[] = new Array<Client>();
    products: Product[] = new Array<Product>();
    currentProduct: ProductOrder = new ProductOrder();
    modalTitle: string = "Add";

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
                this.order = x.valueOf() as Order;

                for (let item of this.order.products) {
                    if (!this.products.some(x => x.id == item.id)) {
                        let itemToAdd = new Product();
                        itemToAdd.id = item.id;
                        itemToAdd.name = item.name;
                        itemToAdd.price = item.price;
                        this.products.push(itemToAdd);
                    }
                }
            });
    }

    getTotal(): number {
        let total: number = 0;

        for (var i = 0; i < this.order.products.length; i++) {
            total += (this.order.products[i].count * this.order.products[i].price);
        }

        return total - this.order.discount;
    }

    onDateChange(value: string) {
        this.order.date = new Date(value);
    }

    save() {

        this.httpServ.httpPost('orders', this.order).subscribe(
            (x) => {
                this.alertServ.createSuccess('Order saved.', true);
                this.router.navigate(["orders"]);
            });
    }

    remove(item: ProductOrder) {
        this.order.products = this.order.products.filter(x => x != item);
    }

    edit(item: ProductOrder) {
        this.currentProduct = item;
        this.modalTitle = "Edit";
    }

    add() {
        this.currentProduct = new ProductOrder();
        this.modalTitle = "Add";
    }

    saveProduct() {
        if (this.modalTitle == "Add") {
            this.order.products.push(this.currentProduct);
        }
    }

    onProductSelect() {
        let product = this.products.find(x => x.id == this.currentProduct.id);
        this.currentProduct.name = product.name;
        this.currentProduct.price = product.price;
    }

    getIsEditingMode(): boolean {
        return this.modalTitle == "Edit";
    }
}
