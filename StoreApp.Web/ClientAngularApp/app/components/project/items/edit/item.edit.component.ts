import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from '../../../../models/item';
import { CoreHttpService } from '../../../../services/0-core/core.http.service';
import { CoreAlertService } from '../../../../services/0-core/core.alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'comp-item-edit',
    templateUrl: './item.edit.component.html'
})
export class ItemEditComponent implements OnInit {

    title = "Add"
    item: Item = new Item();

    constructor(private route: ActivatedRoute, private router: Router, private httpServ: CoreHttpService, private alertServ: CoreAlertService) {
    }

    ngOnInit() {
        //this.menuServ.setModule(MenuModuleEnum.Items);

        if (!this.route.snapshot.paramMap.has('id'))
            return;

        this.title = "Edit";

        let id = this.route.snapshot.paramMap.get('id');

        this.httpServ.httpGet('items/' + id).subscribe(
            (x) => {
                this.item = x.valueOf() as Item;
            });
    }

    save() {

        this.httpServ.httpPost('items', this.item).subscribe(
            (x) => {
                this.alertServ.createSuccess('Item saved.', true);
                this.router.navigate(["items"]);
            });
    }

}
