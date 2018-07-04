import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreSharedModule } from './core.shared.module';

import { FocusDirective } from '../../directives/focus.directive';
import { DatePickerDirective } from '../../directives/date.picker.directive';
import { ModelValidatorDirective } from '../../directives/model.validatior.directive';

@NgModule({
    imports: [
        CoreSharedModule
    ],
    declarations: [
        FocusDirective, DatePickerDirective, ModelValidatorDirective
    ],
    exports: [
        FocusDirective, DatePickerDirective, ModelValidatorDirective
    ]
})
export class CoreDirectiveModule {
    constructor(@Optional() @SkipSelf() core: CoreDirectiveModule) {
        if (core) {
            throw new Error("CoreDirectiveModule can not be instantiated by injection");
        }
    }
}
