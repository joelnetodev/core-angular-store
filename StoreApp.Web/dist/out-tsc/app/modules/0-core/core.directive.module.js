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
var focus_directive_1 = require("../../directives/focus.directive");
var CoreDirectiveModule = /** @class */ (function () {
    function CoreDirectiveModule(core) {
        if (core) {
            throw new Error("CoreDirectiveModule can not be instantiated by injection");
        }
    }
    CoreDirectiveModule = __decorate([
        core_1.NgModule({
            imports: [
                core_shared_module_1.CoreSharedModule
            ],
            declarations: [
                focus_directive_1.FocusDirective
            ],
            exports: [
                focus_directive_1.FocusDirective
            ]
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [CoreDirectiveModule])
    ], CoreDirectiveModule);
    return CoreDirectiveModule;
}());
exports.CoreDirectiveModule = CoreDirectiveModule;
//# sourceMappingURL=core.directive.module.js.map