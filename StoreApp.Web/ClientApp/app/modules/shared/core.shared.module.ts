import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//A module to keep the global shared modules like Forms, Comon, and other that need to be
//imported for each component module
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    //EXPORTS allows the private objects to be seen by others modules
    exports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CoreSharedModule { }
