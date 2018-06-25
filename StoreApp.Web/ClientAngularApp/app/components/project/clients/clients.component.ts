
import { Component, OnInit, Input } from '@angular/core';

import { Client } from '../../../models/client';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'comp-clients',
    templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

    clients: Client[] = new Array<Client>();

    constructor(private router: Router, private httpServ: CoreHttpService) {
    }

    ngOnInit() {
        this.getClients();
    }

    getClients() {
        this.httpServ.httpGet('clients').subscribe(x => {
            this.clients = x.valueOf() as Client[];
        });
    }

    remove(client: Client) {
        this.httpServ.httpPost('clients/delete/' + client.id).subscribe(
            (x) => {
                this.clients.splice(this.clients.indexOf(client), 1);
            });
    }
}
