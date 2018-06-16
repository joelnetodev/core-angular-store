import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductItem } from '../../../../models/product';
import { CoreHttpService } from '../../../../services/0-core/core.http.service';
import { CoreAlertService } from '../../../../services/0-core/core.alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'comp-product-edit',
    templateUrl: './product.edit.component.html'
})
export class ProductEditComponent implements OnInit {

    title = "Add"
    product: Product = new Product();

    constructor(private route: ActivatedRoute, private router: Router, private httpServ: CoreHttpService, private alertServ: CoreAlertService) {
    }

    ngOnInit() {
        //this.menuServ.setModule(MenuModuleEnum.Items);

        if (!this.route.snapshot.paramMap.has('id'))
            return;

        let id = this.route.snapshot.paramMap.get('id');

        this.httpServ.httpGet('products/' + id).subscribe(
            (x) => {
                this.product = x.valueOf() as Product;
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


    }

}
