import { Component, OnInit } from '@angular/core';

import { CoreAlertService, Alert, AlertType } from '../../../services/0-core/core.alert.service';

@Component({
    selector: 'comp-alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit
{
    alerts: Alert[] = [];

    constructor(private alertService: CoreAlertService) { }

    ngOnInit()
    {
        //Subscribe the Observer with a callback that is executed everytime that an alert is created in service
        this.alertService.getAlert().subscribe(x =>
        {
            let alert = x as Alert;
            if (!alert)
                return;

            this.alerts.push(alert);
        });
    }

    removeAlert(alert: Alert) {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }

    chooseCssClass(alert: Alert)
    {
        if (!alert)
            return;

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Warning:
                return 'alert alert-warning';
            default:
                return 'alert alert-info';
        }
    }
}