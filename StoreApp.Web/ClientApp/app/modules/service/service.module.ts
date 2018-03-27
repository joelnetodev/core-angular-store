import { NgModule, Optional, SkipSelf } from '@angular/core';

import { BaseService } from '../../services/base/base.service';
import { AlertService } from '../../services/base/alert.service';
import { UserService } from '../../services/user.service';

//A module to keep the global services to not mess the AppModule organization
@NgModule({
    providers:
    [
        AlertService,
        BaseService,
        UserService
    ],
})
export class ServiceModule {
    constructor( @Optional() @SkipSelf() core: ServiceModule) {
        if (core) {
            throw new Error("ServiceModule can not be instantiated by injection");
        }
    }
}
