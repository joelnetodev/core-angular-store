import { Component, OnInit } from '@angular/core';

import { CoreAlertService, Alert, AlertTypeEnum } from '../../../services/0-core/core.alert.service';

@Component({
    selector: 'comp-alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit
{
    constructor(private alertService: CoreAlertService) { }

    ngOnInit()
    {
        this.alertService.verifyKeepForACicle();
    }

    getAlerts()
    {
        return this.alertService.getAlerts();
    }

    removeAlert(alert: Alert) {
        this.alertService.removeAlert(alert);
    }

    chooseTypeName(type: AlertTypeEnum) {
        if (!alert)
            return;

        switch (type) {
            case AlertTypeEnum.Success:
                return 'Success';
            case AlertTypeEnum.Error:
                return 'Error';
            case AlertTypeEnum.Warning:
                return 'Warning';
            default:
                return 'Info';
        }
    }

    chooseCSS(alert: Alert)
    {
        if (!alert)
            return;

        // return css class based on alert type
        switch (alert.type) {
            case AlertTypeEnum.Success:
                return 'alert alert-success';
            case AlertTypeEnum.Error:
                return 'alert alert-danger';
            case AlertTypeEnum.Warning:
                return 'alert alert-warning';
            default:
                return 'alert alert-info';
        }
    }
}