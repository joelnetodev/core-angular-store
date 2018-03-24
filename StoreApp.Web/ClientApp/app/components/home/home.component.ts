import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product';

@Component({
    selector: 'comp-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private prodService: ProductService) { }

    ngOnInit() {
    }

    returnedId: number = 0;

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

    onReturnObject(obj: Object): void
    {
        this.product = obj as Product;
    }
}
