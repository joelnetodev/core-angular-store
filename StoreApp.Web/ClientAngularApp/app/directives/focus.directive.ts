import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

//Class used to focus the element
@Directive({
    selector: '[di-focus]'
})
export class FocusDirective implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        
    }

    //Runs the code afterViewInit due to "Previous value: 'ng-untouched: true'. Current value: 'ng-untouched: false'" exception
    ngAfterViewInit() {        
            this.elementRef.nativeElement.focus();
    }
}