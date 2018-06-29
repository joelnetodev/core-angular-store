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
var CoreAlertService = /** @class */ (function () {
    function CoreAlertService() {
        this.alerts = new Array();
    }
    CoreAlertService.prototype.getAlerts = function () {
        //Return an observable to subscribe a callback
        return this.alerts;
    };
    CoreAlertService.prototype.verifyKeepForACicle = function () {
        this.alerts = this.alerts.filter(function (x) { return x.keepForOneCicle; });
        for (var _i = 0, _a = this.alerts; _i < _a.length; _i++) {
            var alert_1 = _a[_i];
            alert_1.keepForOneCicle = false;
        }
    };
    CoreAlertService.prototype.removeAlert = function (alert) {
        //Return an observable to subscribe a callback
        this.alerts = this.alerts.filter(function (x) { return x != alert; });
    };
    CoreAlertService.prototype.createSuccess = function (message, keepForOneCicle) {
        if (keepForOneCicle === void 0) { keepForOneCicle = false; }
        this.createAlert(AlertTypeEnum.Success, message, keepForOneCicle);
    };
    CoreAlertService.prototype.createInfo = function (message, keepForOneCicle) {
        if (keepForOneCicle === void 0) { keepForOneCicle = false; }
        this.createAlert(AlertTypeEnum.Info, message, keepForOneCicle);
    };
    CoreAlertService.prototype.createError = function (message, keepForOneCicle) {
        if (keepForOneCicle === void 0) { keepForOneCicle = false; }
        this.createAlert(AlertTypeEnum.Error, message, keepForOneCicle);
    };
    CoreAlertService.prototype.createAlert = function (type, message, keepForOneCicle) {
        var alert = new Alert();
        alert.type = type;
        alert.message = message;
        alert.keepForOneCicle = keepForOneCicle;
        //When an alert is created, the next method trigger the callbacks subscribed 
        this.alerts.push(alert);
    };
    CoreAlertService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CoreAlertService);
    return CoreAlertService;
}());
exports.CoreAlertService = CoreAlertService;
var Alert = /** @class */ (function () {
    function Alert() {
    }
    return Alert;
}());
exports.Alert = Alert;
var AlertTypeEnum;
(function (AlertTypeEnum) {
    AlertTypeEnum[AlertTypeEnum["Success"] = 0] = "Success";
    AlertTypeEnum[AlertTypeEnum["Error"] = 1] = "Error";
    AlertTypeEnum[AlertTypeEnum["Info"] = 2] = "Info";
    AlertTypeEnum[AlertTypeEnum["Warning"] = 3] = "Warning";
})(AlertTypeEnum = exports.AlertTypeEnum || (exports.AlertTypeEnum = {}));
//# sourceMappingURL=core.alert.service.js.map