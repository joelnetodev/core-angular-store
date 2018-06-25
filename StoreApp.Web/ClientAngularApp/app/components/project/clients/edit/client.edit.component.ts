import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Client, ClientContact } from '../../../../models/client';
import { CoreHttpService } from '../../../../services/0-core/core.http.service';
import { CoreAlertService } from '../../../../services/0-core/core.alert.service';
import { Router } from '@angular/router';
import { Item } from '../../../../models/item';

@Component({
    selector: 'comp-client-edit',
    templateUrl: './client.edit.component.html'
})
export class ClientEditComponent implements OnInit {

    client: Client = new Client();

    constructor(private route: ActivatedRoute, private router: Router, private httpServ: CoreHttpService, private alertServ: CoreAlertService) {
    }

    ngOnInit() {

        if (this.route.snapshot.paramMap.has('id')) {
            let id = this.route.snapshot.paramMap.get('id');
            this.populateClient(id);
        }
    }

    populateClient(id) {

        this.httpServ.httpGet('clients/' + id).subscribe(
            (x) => {
                this.client = x.valueOf() as Client;
            });
    }

    save() {

        this.httpServ.httpPost('clients', this.client).subscribe(
            (x) => {
                this.alertServ.createSuccess('Client saved.', true);
                this.router.navigate(["clients"]);
            });
    }

    //remove(itemModel: ItemModel) {
    //    this.model.items = this.model.items.filter(x => x != itemModel);
    //    this.model.product.items = this.model.product.items.filter(x => x != itemModel.item);
    //}

    //add() {
    //    let itemModel = new ItemModel();
    //    itemModel.isEditingItem = true;

    //    this.model.product.items.push(itemModel.item);
    //    this.model.items.push(itemModel);
    //}
}
