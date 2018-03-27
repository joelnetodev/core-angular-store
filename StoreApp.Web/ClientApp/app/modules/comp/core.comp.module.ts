import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CoreSharedModule } from '../shared/core.shared.module';

import { AutoCompleteComponent } from './autocomplete/autocomplete.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
    imports: [
        CoreSharedModule
    ],
    declarations: [
        AutoCompleteComponent, AlertComponent
    ],
    exports: [
        AutoCompleteComponent, AlertComponent
    ]
})
export class CoreCompModule {
    constructor( @Optional() @SkipSelf() core: CoreCompModule) {
        if (core) {
            throw new Error("CoreCompModule can not be instantiated by injection");
        }
    }
}
