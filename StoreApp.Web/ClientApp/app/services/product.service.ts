import { Injectable } from '@angular/core';

import { BaseService } from './base/base.service';
import { Product } from '../entities/product';

/*Every service are singleton and needs Injecable

http.Get and http.Post are async, so we need to create
async methods with await (from this moment beyond, the rest of the
code will wait the response and perform the rest of the operation).

In component, the method also should be async and await the return of the service
*/
@Injectable()
export class ProductService
{
    constructor(private baseService: BaseService) { }

    async getProduct(id: number)
    {
        let response = await this.baseService.httpGet('products/' + id);

        return response.valueOf() as Product;
    }

    async getProducts()
    {
        let response = await this.baseService.httpGet('products');

        console.log(response);
        console.log(response.valueOf());

        return response.valueOf() as Product[];
    }

    async saveProduct(product: Product)
    {
        let response = await this.baseService.httpPost('products', product);
        this.baseService.createAlertSuccess('Salvo com sucesso');
    }
    
}