import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CoreLoadService
{
    private subject = new Subject<boolean>();

    constructor() {
    }

    getIsToShow(): Observable<any>
    {
        //Return an observable to subscribe a callback
        return this.subject.asObservable();
    }

    show() {
        this.subject.next(true);
    }

    hide() {
        this.subject.next(false);
    }
}