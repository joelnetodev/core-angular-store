import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreSharedModule } from './core.shared.module';

import { AutoCompleteComponent } from '../../components/0-core/autocomplete/autocomplete.component';
import { AlertComponent } from '../../components/0-core/alert/alert.component';
import { AppComponent } from '../../components/0-core/app/app.component';
import { LoadComponent } from '../../components/0-core/load/load.component';


@NgModule({
    imports: [
        CoreSharedModule
    ],
    declarations: [
        AppComponent, AutoCompleteComponent, AlertComponent, LoadComponent
    ],
    exports: [
        AppComponent, AutoCompleteComponent, AlertComponent, LoadComponent
    ]
})
export class CoreComponentModule {
    constructor( @Optional() @SkipSelf() core: CoreComponentModule) {
        if (core) {
            throw new Error("CoreComponentModule can not be instantiated by injection");
        }
    }
}
