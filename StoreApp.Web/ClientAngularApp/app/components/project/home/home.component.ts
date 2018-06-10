import { Component, OnInit } from '@angular/core';

import { CoreBaseService } from '../../../services/0-core/core.base.service';
import { Product } from '../../../entities/product';
import { CoreMenuService, MenuModuleEnum } from '../../../services/0-core/core.menu.service';

@Component({
    selector: 'comp-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private baseService: CoreBaseService, private menuServ: CoreMenuService) { }

    ngOnInit() {
        this.menuServ.setModule(MenuModuleEnum.Home);
    }

    returnedId: number = 0;

    id: number = 0;

    product: Product = new Product();
    products: Product[] = new Array<Product>();   

    async getOne()
    {
        let response = await this.baseService.httpGet('products/' + this.id).toPromise();
        this.product = response.valueOf() as Product;
    }

    async postOne()
    {
        let response = await this.baseService.httpPost('products/', this.product).toPromise();

        this.baseService.createAlertSuccess('Product saved');
    }

    async getAll()
    {
        let response = await this.baseService.httpGet('products/').toPromise();
        this.products = response.valueOf() as Product[];
    }


    onReturnProduct(obj: Object): void
    {
        this.product = obj as Product;
    }

    postItem() {
        this.baseService.httpGet('items').subscribe();
    }
}
