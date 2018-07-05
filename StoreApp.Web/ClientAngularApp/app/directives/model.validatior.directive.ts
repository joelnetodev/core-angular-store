import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CoreModelValidatorService, ModelError } from '../services/0-core/core.model.validator.service';
import { Renderer2 } from '@angular/core';
import { Inject } from '@angular/core';

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

        let thisElement = this.elementRef.nativeElement;

        this.validServ.getModelErrors().subscribe(modelErrors => {

            //get element p after the input model
            let elementP = $(thisElement).next('p');

            for (let itemError of modelErrors) {

                if (itemError.key == this.key) {

                    //if model has no P element, it means there is no error
                    if (elementP.length == 0) {
                        let errorEl = document.createElement('p');
                        errorEl.innerHTML = itemError.value;
                        errorEl.style.color = "#cc0000 ";
                        thisElement.parentNode.insertBefore(errorEl, thisElement.nextSibling);
                        return;
                    }                    
                }
            }

            //if no key found, it means that inout model has no error, so remove the element
            if (elementP.length != 0) {
                elementP.remove();
            }
        })
    }
}