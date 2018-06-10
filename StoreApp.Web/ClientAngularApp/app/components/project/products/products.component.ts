import { Component, OnInit } from '@angular/core';

import { CoreBaseService } from '../../../services/0-core/core.base.service';
import { Product, Item } from '../../../entities/product';
import { CoreMenuService, MenuModuleEnum } from '../../../services/0-core/core.menu.service';

@Component({
    selector: 'comp-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

    products: Product[];

    constructor(private baseService: CoreBaseService, private menuServ: CoreMenuService) { }

    ngOnInit() {

        this.menuServ.setModule(MenuModuleEnum.Products);

        this.baseService.httpGet('products/row').subscribe(x => {
            this.products = x.valueOf() as Product[];
        });
       
    }
}
