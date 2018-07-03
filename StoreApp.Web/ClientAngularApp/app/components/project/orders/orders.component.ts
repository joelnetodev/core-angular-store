

import { Component, OnInit, Input } from '@angular/core';

import { Order } from '../../../models/order';
import { CoreHttpService, ParamDictionary } from '../../../services/0-core/core.http.service';
import { Router } from '@angular/router';
import { Client } from '../../../models/client';

@Component({
    selector: 'comp-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

    orders: Order[] = new Array<Order>();
    clients: Client[] = new Array<Client>(); 

    clientId: string = '';
    startDate: string = '';
    endDate: string = '';

    constructor(private router: Router, private httpServ: CoreHttpService) {
    }

    ngOnInit() {
        this.fillClients();
        this.fillOrders();
    }

    fillClients() {
        this.httpServ.httpGet('clients/actives').subscribe(x => {
            this.clients = x.valueOf() as Client[];
        });
    }

    fillOrders() {
        this.httpServ.httpGet('orders' + this.getParams()).subscribe(x => {
            this.orders = x.valueOf() as Order[];
        });
    }

    getParams(): string {
        let params = '?clientId=' + this.clientId;
        params += '&startDate=' + this.startDate;
        params += '&endDate=' + this.endDate;
        
        return params;
    }

    onStartDateChange(value: string) {
        if (this.startDate == value)
            return;

        this.startDate = value;
        this.fillOrders();
    }

    onEndDateChange(value: string) {
        if (this.endDate == value)
            return;

        this.endDate = value;
        this.fillOrders();
    }

    remove(order: Order) {
        this.httpServ.httpPost('orders/delete/' + order.id).subscribe(
            (x) => {
                this.orders.splice(this.orders.indexOf(order), 1);
            });
    }

}
