
import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../../../models/item';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'comp-items',
    templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {

    @Input()
    items: Item[] = new Array<Item>();

    constructor(private router: Router, private httpServ: CoreHttpService) {
    }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.httpServ.httpGet('items').subscribe(x => {
            this.items = x.valueOf() as Item[]
        });
    }

    remove(item: Item) {
        this.httpServ.httpPost('items/delete/' + item.id).subscribe(
            (x) => {
                this.items.splice(this.items.indexOf(item), 1);
            });
    }
}
