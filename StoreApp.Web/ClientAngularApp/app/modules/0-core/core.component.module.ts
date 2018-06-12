import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreSharedModule } from './core.shared.module';

import { PermissionComponent } from '../../components/0-core/permission/permission.component';
import { AutoCompleteComponent } from '../../components/0-core/autocomplete/autocomplete.component';
import { AlertComponent } from '../../components/0-core/alert/alert.component';
import { NavTopComponent } from '../../components/0-core/navtop/navtop.component';
import { AppComponent } from '../../components/0-core/app/app.component';
import { ErrorComponent } from '../../components/0-core/error/error.component';
import { LoadComponent } from '../../components/0-core/load/load.component';


@NgModule({
    imports: [
        CoreSharedModule
    ],
    declarations: [
        AppComponent, AutoCompleteComponent, AlertComponent, NavTopComponent, PermissionComponent, ErrorComponent, LoadComponent
    ],
    exports: [
        AppComponent, AutoCompleteComponent, AlertComponent, NavTopComponent, PermissionComponent, ErrorComponent, LoadComponent
    ]
})
export class CoreComponentModule {
    constructor( @Optional() @SkipSelf() core: CoreComponentModule) {
        if (core) {
            throw new Error("CoreComponentModule can not be instantiated by injection");
        }
    }
}
