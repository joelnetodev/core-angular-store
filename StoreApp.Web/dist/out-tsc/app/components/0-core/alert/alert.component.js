"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_alert_service_1 = require("../../../services/0-core/core.alert.service");
var AlertComponent = /** @class */ (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        this.alertService.verifyKeepForACicle();
    };
    AlertComponent.prototype.getAlerts = function () {
        return this.alertService.getAlerts();
    };
    AlertComponent.prototype.removeAlert = function (alert) {
        this.alertService.removeAlert(alert);
    };
    AlertComponent.prototype.chooseTypeName = function (type) {
        if (!alert)
            return;
        switch (type) {
            case core_alert_service_1.AlertTypeEnum.Success:
                return 'Success';
            case core_alert_service_1.AlertTypeEnum.Error:
                return 'Error';
            case core_alert_service_1.AlertTypeEnum.Warning:
                return 'Warning';
            default:
                return 'Info';
        }
    };
    AlertComponent.prototype.chooseCSS = function (alert) {
        if (!alert)
            return;
        // return css class based on alert type
        switch (alert.type) {
            case core_alert_service_1.AlertTypeEnum.Success:
                return 'alert alert-success';
            case core_alert_service_1.AlertTypeEnum.Error:
                return 'alert alert-danger';
            case core_alert_service_1.AlertTypeEnum.Warning:
                return 'alert alert-warning';
            default:
                return 'alert alert-info';
        }
    };
    AlertComponent = __decorate([
        core_1.Component({
            selector: 'comp-alert',
            templateUrl: 'alert.component.html'
        }),
        __metadata("design:paramtypes", [core_alert_service_1.CoreAlertService])
    ], AlertComponent);
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=alert.component.js.map