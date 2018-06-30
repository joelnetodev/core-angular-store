import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable()
export class CoreLoadService
{
    private isToShow: boolean = false;

    constructor() {
    }

    getIsToShow(): boolean
    {
        return this.isToShow;
    }

    show() {
        this.isToShow = true;
    }

    hide() {
        this.isToShow = false;
    }
}