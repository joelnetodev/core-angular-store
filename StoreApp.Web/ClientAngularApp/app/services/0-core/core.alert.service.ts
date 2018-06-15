import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { NavigationStart, Router } from '@angular/router';


@Injectable()
export class CoreAlertService {
    private alert = new Subject<Alert>();
    private keepForOneCicle = false;

    constructor(private router: Router, ) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                
                if (!this.keepForOneCicle) {
                    this.keepForOneCicle = true;
                    this.alert.next();
                }
                else {
                    this.keepForOneCicle = false;
                }
            }
        });
    }

    getAlert(): Observable<any> {
        //Return an observable to subscribe a callback
        return this.alert.asObservable();
    }

    createSuccess(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Success, message);
        this.keepForOneCicle = keepForOneCicle;
    }

    createInfo(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Info, message);
        this.keepForOneCicle = keepForOneCicle;
    }

    createError(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Error, message);
        this.keepForOneCicle = keepForOneCicle;
    }

    private createAlert(type: AlertTypeEnum, message: string) {
        let alert = new Alert();
        alert.type = type;
        alert.message = message;

        //When an alert is created, the next method trigger the callbacks subscribed 
        this.alert.next(alert);
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