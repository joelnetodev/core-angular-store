import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AutoCompleteComponent } from './autocomplete/autocomplete.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AutoCompleteComponent, AlertComponent
    ],
    exports: [
        AutoCompleteComponent, AlertComponent
    ]
})
export class CompModule {
    constructor( @Optional() @SkipSelf() core: CompModule) {
        if (core) {
            throw new Error("CompModule can not be instantiated by injection");
        }
    }
}
