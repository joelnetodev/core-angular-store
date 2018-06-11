import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CoreAlertService
{
    private subject = new Subject<Alert>();
    private keepForOneCicle = false;

    constructor(private router: Router) {
        //clear alert messages when route changes, unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (!this.keepForOneCicle) {
                    this.keepForOneCicle = true;
                    this.subject.next();
                }
                else {
                    this.keepForOneCicle = false;
                }
            }
        });
    }

    getAlert(): Observable<any>
    {
        //Return an observable to subscribe a callback
        return this.subject.asObservable();
    }

    createSuccess(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Success, message);
        this.keepForOneCicle = keepForOneCicle;
    }

    createInfo(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Info, message);
        this.keepForOneCicle = keepForOneCicle;
    }

    createWarning(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Warning, message);
        this.keepForOneCicle = keepForOneCicle;
    }

    createError(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Error, message);
        this.keepForOneCicle = keepForOneCicle;
    }

    private createAlert(type: AlertTypeEnum, message: string)
    {
        let alert = new Alert();
        alert.type = type;
        alert.message = message;

        //When an alert is created, the next method trigger the callbacks subscribed 
        this.subject.next(alert);
    }
}

export class Alert {
    type: AlertTypeEnum;
    message: string;
}

export enum AlertTypeEnum {
    Success,
    Error,
    Info,
    Warning
}