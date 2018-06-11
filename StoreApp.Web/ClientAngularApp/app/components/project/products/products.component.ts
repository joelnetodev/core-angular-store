import { Component, OnInit } from '@angular/core';

import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { Product, Item } from '../../../models/product';
import { CoreMenuService, MenuModuleEnum } from '../../../services/0-core/core.menu.service';

@Component({
    selector: 'comp-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

    products: Product[];

    constructor(private httpServ: CoreHttpService, private menuServ: CoreMenuService) { }

    ngOnInit() {

        this.menuServ.setModule(MenuModuleEnum.Products);

        this.httpServ.httpGet('products/row').subscribe(x => {
            this.products = x.valueOf() as Product[];
        });
       
    }
}
