import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Directive({
    selector: '[di-focus]'
})

export class FocusDirective implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.elementRef.nativeElement.focus();
    }
}