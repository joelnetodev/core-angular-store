import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreSharedModule } from './core.shared.module';

import { FocusDirective } from '../../directives/focus.directive';


@NgModule({
    imports: [
        CoreSharedModule
    ],
    declarations: [
        FocusDirective
    ],
    exports: [
        FocusDirective
    ]
})
export class CoreDirectiveModule {
    constructor(@Optional() @SkipSelf() core: CoreDirectiveModule) {
        if (core) {
            throw new Error("CoreDirectiveModule can not be instantiated by injection");
        }
    }
}
