import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreUserService } from '../../services/0-core/core.user.service';
import { CoreHttpService } from '../../services/0-core/core.http.service';
import { CoreAlertService } from '../../services/0-core/core.alert.service';
import { CoreErrorService } from '../../services/0-core/core.error.service';
import { CoreLoadService } from '../../services/0-core/core.load.service';
import { CoreModelValidatorService } from '../../services/0-core/core.model.validator.service';


//A module to keep the global services to not mess the AppModule organization
@NgModule({
    providers:
    [
        CoreAlertService,
        CoreUserService,
        CoreHttpService,
        CoreErrorService,
        CoreLoadService,
        CoreModelValidatorService
    ],
})
export class CoreServiceModule {
    constructor( @Optional() @SkipSelf() core: CoreServiceModule) {
        if (core) {
            throw new Error("CoreServiceModule can not be instantiated by injection");
        }
    }
}
