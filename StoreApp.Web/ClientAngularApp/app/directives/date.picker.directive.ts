import { Directive, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

declare var $: any;

//Class used to focus the element
@Directive({
    selector: '[di-datepicker]'
})
export class DatePickerDirective implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    @Output()
    onSelectDate = new EventEmitter<string>();

    ngOnInit() {
        
    }

    //Runs the code afterViewInit due to "Previous value: 'ng-untouched: true'. Current value: 'ng-untouched: false'" exception
    ngAfterViewInit() {  
        var onSelectDate = this.onSelectDate;

        $(this.elementRef.nativeElement).datepicker({
            onSelect: function (txt) {
                onSelectDate.emit(txt);
            }
        });
    }
}