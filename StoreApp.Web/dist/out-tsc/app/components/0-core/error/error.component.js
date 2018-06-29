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
var core_error_service_1 = require("../../../services/0-core/core.error.service");
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(location, router, errorServ) {
        this.location = location;
        this.router = router;
        this.errorServ = errorServ;
    }
    ErrorComponent.prototype.ngOnInit = function () {
        this.url = this.errorServ.getUrl();
        this.status = this.errorServ.getStatus();
        this.message = this.errorServ.getMessage();
        this.errorServ.setDefaults();
    };
    ErrorComponent = __decorate([
        core_1.Component({
            selector: 'comp-error',
            templateUrl: './error.component.html'
        }),
        __metadata("design:paramtypes", [common_1.Location, router_1.ActivatedRoute, core_error_service_1.CoreErrorService])
    ], ErrorComponent);
    return ErrorComponent;
}());
exports.ErrorComponent = ErrorComponent;
//# sourceMappingURL=error.component.js.map