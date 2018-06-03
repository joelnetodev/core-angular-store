import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CoreAlertService
{
    private subject = new Subject<Alert>();
    private keepAlertWhenNavigate = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAlertWhenNavigate) {
                    // only keep for a single route change
                    this.keepAlertWhenNavigate = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any>
    {
        //Return an observable to subscribe a callback
        return this.subject.asObservable();
    }

    createAlert(type: AlertType, message: string)
    {
        let alert = new Alert();
        alert.type = type;
        alert.message = message;

        //When an alert is created, the next method trigger the callbacks subscribed 
        this.subject.next(alert);
    }

    clear() {
        // clear alerts
        this.subject.next();
    }
}

export class Alert {
    type: AlertType;
    message: string;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}