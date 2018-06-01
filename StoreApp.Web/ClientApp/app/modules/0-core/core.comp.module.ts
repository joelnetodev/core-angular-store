import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AutoCompleteComponent } from '../../components/0-core/autocomplete/autocomplete.component';
import { AlertComponent } from '../../components/0-core/alert/alert.component';
import { CoreSharedModule } from './core.shared.module';


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
