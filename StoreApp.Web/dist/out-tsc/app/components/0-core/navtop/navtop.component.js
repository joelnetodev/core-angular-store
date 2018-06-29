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
var core_user_service_1 = require("../../../services/0-core/core.user.service");
var router_1 = require("@angular/router");
var menuEnum_1 = require("../../../models/Enums/menuEnum");
var roleEnum_1 = require("../../../models/Enums/roleEnum");
var NavTopComponent = /** @class */ (function () {
    function NavTopComponent(userServ, router, activatedRoute) {
        this.userServ = userServ;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.menuModuleEnum = menuEnum_1.MenuModuleEnum;
        this.menuItemEnum = menuEnum_1.MenuItemEnum;
    }
    NavTopComponent.prototype.ngOnInit = function () {
        this.module = this.activatedRoute.snapshot.data['module'];
        this.title = this.activatedRoute.snapshot.data['title'];
        if (this.userServ.isUserStored()) {
            this.userName = this.userServ.getUser().username;
            this.userRole = this.userServ.getUser().role;
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    NavTopComponent.prototype.getIsUserAdmin = function () {
        console.log(this.userRole.toString());
        console.log(roleEnum_1.RoleEnum.Admin.toString());
        var result = this.userRole.toString() == roleEnum_1.RoleEnum.Admin.toString();
        console.log(result);
        return result;
    };
    NavTopComponent.prototype.chooseModuleCSS = function (module) {
        if (module == this.module)
            return "nav-item active";
        return "nav-item";
    };
    NavTopComponent.prototype.chooseItemCSS = function (item) {
        if (item == this.item)
            return "nav-item active";
        return "nav-item";
    };
    NavTopComponent.prototype.onLogout = function () {
        this.userServ.removeUser();
        this.router.navigate(['/login']);
    };
    NavTopComponent = __decorate([
        core_1.Component({
            selector: 'comp-navtop',
            templateUrl: './navtop.component.html'
        }),
        __metadata("design:paramtypes", [core_user_service_1.CoreUserService, router_1.Router, router_1.ActivatedRoute])
    ], NavTopComponent);
    return NavTopComponent;
}());
exports.NavTopComponent = NavTopComponent;
//# sourceMappingURL=navtop.component.js.map