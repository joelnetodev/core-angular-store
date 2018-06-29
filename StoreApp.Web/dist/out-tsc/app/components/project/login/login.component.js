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
var core_user_service_1 = require("../../../services/0-core/core.user.service");
var core_http_service_1 = require("../../../services/0-core/core.http.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, httpServ, userServ) {
        this.router = router;
        this.httpServ = httpServ;
        this.userServ = userServ;
        this.username = "";
        this.password = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
        //this.menuServ.setModule(MenuModuleEnum.Login);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var login = { Username: this.username, Password: this.password };
        this.httpServ.httpPost('login', login).subscribe(function (x) {
            var user = x.valueOf();
            if (user) {
                _this.userServ.storeUser(user);
                _this.router.navigate(['/']);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'comp-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, core_http_service_1.CoreHttpService, core_user_service_1.CoreUserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map