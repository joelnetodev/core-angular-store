import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare var $: any;

//Class used to focus the element
@Directive({
    selector: '[di-datepicker]'
})
export class DatePickerDirective implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        
    }

    //Runs the code afterViewInit due to "Previous value: 'ng-untouched: true'. Current value: 'ng-untouched: false'" exception
    ngAfterViewInit() {  
        var element = this.elementRef.nativeElement;

        $(element).datepicker({
            onSelect: function (txt) {
                $(element).focus();
            }
        });
    }
}