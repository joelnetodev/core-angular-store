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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var PermissionComponent = /** @class */ (function () {
    function PermissionComponent(location, router) {
        this.location = location;
        this.router = router;
    }
    PermissionComponent.prototype.ngOnInit = function () {
    };
    PermissionComponent = __decorate([
        core_1.Component({
            selector: 'comp-permission',
            templateUrl: './permission.component.html'
        }),
        __metadata("design:paramtypes", [common_1.Location, router_1.ActivatedRoute])
    ], PermissionComponent);
    return PermissionComponent;
}());
exports.PermissionComponent = PermissionComponent;
//# sourceMappingURL=permission.component.js.map