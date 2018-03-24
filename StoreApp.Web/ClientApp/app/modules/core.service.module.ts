import { NgModule, Optional, SkipSelf } from '@angular/core';

import { BaseService } from '../services/base/base.service';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

//A module to keep the global services to not mess the AppModule organization
@NgModule({

    providers:
    [
        BaseService,
        UserService,
        ProductService
    ],
})
export class CoreServiceModule {
    constructor( @Optional() @SkipSelf() core: CoreServiceModule) {
        if (core) {
            throw new Error("CoreServiceModule can not be instantiated by injection");
        }
    }
}
