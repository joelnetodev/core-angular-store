import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CoreModelValidatorService, ModelError } from '../services/0-core/core.model.validator.service';

declare var $: any;

//Class used to focus the element
@Directive({
    selector: '[di-model-validator]'
})
export class ModelValidatorDirective implements OnInit {

    constructor(private elementRef: ElementRef, private validServ: CoreModelValidatorService) {
    }

    @Input()
    key: string = "";

    ngOnInit() {
        
    }

    ngAfterViewInit() {
        this.validServ.getModelErrors().subscribe(modelErrors => {

            for (let itemError of modelErrors) {

                if (itemError.key == this.key) {
                    this.elementRef.nativeElement.style.backgroundColor = '#F8D7DA';
                    break;
                }
            }
        })
    }
}