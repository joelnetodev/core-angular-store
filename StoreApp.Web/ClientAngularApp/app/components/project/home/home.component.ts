import { Component, OnInit } from '@angular/core';

import { CoreAlertService } from '../../../services/0-core/core.alert.service';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { Product } from '../../../models/product';

@Component({
    selector: 'comp-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private alertServ: CoreAlertService, private httpServ: CoreHttpService) { }

    ngOnInit() {
        //this.menuServ.setModule(MenuModuleEnum.Home);
    }

    returnedId: number = 0;

    id: number = 0;

    product: Product = new Product();
    products: Product[] = new Array<Product>();   

    async getOne()
    {
        let response = await this.httpServ.httpGet('products/' + this.id).toPromise();
        this.product = response.valueOf() as Product;
    }

    async postOne()
    {
        let response = await this.httpServ.httpPost('products/', this.product).toPromise();

        this.alertServ.createSuccess('Product saved');
    }

    async getAll()
    {
        let response = await this.httpServ.httpGet('products/').toPromise();
        this.products = response.valueOf() as Product[];
    }


    onReturnProduct(obj: Object): void
    {
        this.product = obj as Product;
    }

    postItem() {
        this.httpServ.httpGet('items').subscribe();
    }
}
