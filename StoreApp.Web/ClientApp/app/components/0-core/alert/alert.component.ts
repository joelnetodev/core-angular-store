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
        //subscribe the 'next' method of alert array
        //Put a callback function that is executed everytime that an alert is created
        this.alertService.getAlert().subscribe((alert: Alert) =>
        {
            if (!alert)
            {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            // add alert to array
            this.alerts.push(alert);
        });
    }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert)
    {
        if (!alert)
        {
            return;
        }

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