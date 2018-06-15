import { Injectable } from '@angular/core';


@Injectable()
export class CoreAlertService {

    private alerts = new Array<Alert>();
    
    constructor() {
    }

    getAlerts(): Alert[]{
        //Return an observable to subscribe a callback
        return this.alerts;
    }

    verifyKeepForACicle()
    {
        this.alerts = this.alerts.filter(x => x.keepForOneCicle);
        for (let alert of this.alerts) {
            alert.keepForOneCicle = false;
        }
    }

    removeAlert(alert: Alert) {
        //Return an observable to subscribe a callback
        this.alerts = this.alerts.filter(x => x != alert);
    }

    createSuccess(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Success, message, keepForOneCicle);
    }

    createInfo(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Info, message, keepForOneCicle);
    }

    createError(message: string, keepForOneCicle = false) {
        this.createAlert(AlertTypeEnum.Error, message, keepForOneCicle);
    }

    private createAlert(type: AlertTypeEnum, message: string, keepForOneCicle: boolean) {
        let alert = new Alert();
        alert.type = type;
        alert.message = message;
        alert.keepForOneCicle = keepForOneCicle;
        //When an alert is created, the next method trigger the callbacks subscribed 
        this.alerts.push(alert);

        console.log(this.alerts);
    }
}

export class Alert {
    type: AlertTypeEnum;
    message: string;
    keepForOneCicle: boolean;
}

export enum AlertTypeEnum {
    Success,
    Error,
    Info,
    Warning
}