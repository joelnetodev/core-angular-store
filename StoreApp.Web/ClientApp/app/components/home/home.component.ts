import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
    selector: 'comp-home',
    templateUrl: './home.component.html'
})


/*
Components are like controllers, they are transient and works
like ViewModels to the templates (MVVM).

The methods that call  also should be async and waits the return of the service
    or implements 'then' funcion to perform the answer of the service
*/
export class HomeComponent implements OnInit {

    constructor(private prodService: ProductService) { }

    ngOnInit() {
    }

    id: number = 0;

    product: Product = new Product();
    products: Product[] = new Array<Product>();   

    getOne()
    {
        this.prodService.getProduct(this.id)
            .then(x => this.product = x);
    }

    async postOne()
    {
        this.prodService.saveProduct(this.product);
    }

    async getAll()
    {
        let prods = await this.prodService.getProducts();
        this.products = prods;
    }
}
