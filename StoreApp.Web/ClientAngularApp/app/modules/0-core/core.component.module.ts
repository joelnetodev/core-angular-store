import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AutoCompleteComponent } from '../../components/0-core/autocomplete/autocomplete.component';
import { AlertComponent } from '../../components/0-core/alert/alert.component';
import { CoreSharedModule } from './core.shared.module';
import { NavTopComponent } from '../../components/0-core/navtop/navtop.component';
import { AppComponent } from '../../components/0-core/app/app.component';

@NgModule({
    imports: [
        CoreSharedModule
    ],
    declarations: [
        AppComponent, AutoCompleteComponent, AlertComponent, NavTopComponent
    ],
    exports: [
        AppComponent, AutoCompleteComponent, AlertComponent, NavTopComponent
    ]
})
export class CoreComponentModule {
    constructor( @Optional() @SkipSelf() core: CoreComponentModule) {
        if (core) {
            throw new Error("CoreComponentModule can not be instantiated by injection");
        }
    }
}
