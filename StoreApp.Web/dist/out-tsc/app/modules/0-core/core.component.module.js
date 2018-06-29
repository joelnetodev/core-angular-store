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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_shared_module_1 = require("./core.shared.module");
var autocomplete_component_1 = require("../../components/0-core/autocomplete/autocomplete.component");
var alert_component_1 = require("../../components/0-core/alert/alert.component");
var app_component_1 = require("../../components/0-core/app/app.component");
var load_component_1 = require("../../components/0-core/load/load.component");
var navtop_component_1 = require("../../components/0-core/navtop/navtop.component");
var permission_component_1 = require("../../components/0-core/permission/permission.component");
var error_component_1 = require("../../components/0-core/error/error.component");
var CoreComponentModule = /** @class */ (function () {
    function CoreComponentModule(core) {
        if (core) {
            throw new Error("CoreComponentModule can not be instantiated by injection");
        }
    }
    CoreComponentModule = __decorate([
        core_1.NgModule({
            imports: [
                core_shared_module_1.CoreSharedModule
            ],
            declarations: [
                app_component_1.AppComponent, autocomplete_component_1.AutoCompleteComponent, alert_component_1.AlertComponent, load_component_1.LoadComponent, navtop_component_1.NavTopComponent, permission_component_1.PermissionComponent, error_component_1.ErrorComponent
            ],
            exports: [
                app_component_1.AppComponent, autocomplete_component_1.AutoCompleteComponent, alert_component_1.AlertComponent, load_component_1.LoadComponent, navtop_component_1.NavTopComponent, permission_component_1.PermissionComponent, error_component_1.ErrorComponent
            ]
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [CoreComponentModule])
    ], CoreComponentModule);
    return CoreComponentModule;
}());
exports.CoreComponentModule = CoreComponentModule;
//# sourceMappingURL=core.component.module.js.map