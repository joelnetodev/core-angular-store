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
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var core_user_service_1 = require("./services/0-core/core.user.service");
var core_alert_service_1 = require("./services/0-core/core.alert.service");
var core_error_service_1 = require("./services/0-core/core.error.service");
var core_load_service_1 = require("./services/0-core/core.load.service");
var AppInterceptor = /** @class */ (function () {
    function AppInterceptor(router, userServ, alertServ, errorServ, loadServ) {
        this.router = router;
        this.userServ = userServ;
        this.alertServ = alertServ;
        this.errorServ = errorServ;
        this.loadServ = loadServ;
    }
    //intercept is a overrided method to intercept requests
    AppInterceptor.prototype.intercept = function (request, next) {
        this.loadServ.show();
        return this.handleResponse(request, next);
    };
    AppInterceptor.prototype.handleResponse = function (request, next) {
        //To redirect pages when login is not authorized, a handle will get the response
        //and the router will navigate to login page
        var _this = this;
        return next.handle(request).pipe(operators_1.catchError(function (response) {
            console.log(response);
            //997 Info
            //998 Error
            //999 Critical
            switch (response.status) {
                case 401:
                    _this.userServ.removeUser();
                    _this.router.navigate(['/login']);
                    break;
                case 403:
                    _this.router.navigate(['/permission']);
                    break;
                case 997:
                    _this.alertServ.createInfo(response.error);
                    break;
                case 998:
                    _this.alertServ.createError(response.error);
                    break;
                default:
                    _this.errorServ.setError(response);
                    _this.router.navigate(['/error']);
                    break;
            }
            return rxjs_1.throwError(response);
        }));
    };
    AppInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, core_user_service_1.CoreUserService, core_alert_service_1.CoreAlertService, core_error_service_1.CoreErrorService, core_load_service_1.CoreLoadService])
    ], AppInterceptor);
    return AppInterceptor;
}());
exports.AppInterceptor = AppInterceptor;
//# sourceMappingURL=app.interceptor.js.map