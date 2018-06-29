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
var core_alert_service_1 = require("../../../services/0-core/core.alert.service");
var core_http_service_1 = require("../../../services/0-core/core.http.service");
var userRegister_1 = require("../../../models/userRegister");
var roleEnum_1 = require("../../../models/Enums/roleEnum");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, httpServ, alertServ) {
        this.router = router;
        this.httpServ = httpServ;
        this.alertServ = alertServ;
        //Create string array of EnumItems
        this.roleEnum = roleEnum_1.RoleEnum;
        this.roles = Object.keys(this.roleEnum).filter(function (k) { return isNaN(Number(k)); });
        this.user = new userRegister_1.UserRegister();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        //this.menuServ.setModule(MenuModuleEnum.Register);
    };
    RegisterComponent.prototype.createUser = function () {
        var _this = this;
        this.httpServ.httpPost('login/create', this.user).subscribe(function (x) {
            _this.alertServ.createSuccess('User created.');
            _this.user = new userRegister_1.UserRegister();
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'comp-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, core_http_service_1.CoreHttpService, core_alert_service_1.CoreAlertService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map