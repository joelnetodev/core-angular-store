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
var CoreErrorService = /** @class */ (function () {
    function CoreErrorService() {
    }
    CoreErrorService.prototype.getUrl = function () {
        return this.url;
    };
    CoreErrorService.prototype.getStatus = function () {
        return this.status;
    };
    CoreErrorService.prototype.getMessage = function () {
        return this.message;
    };
    CoreErrorService.prototype.setError = function (error) {
        this.url = error.url;
        this.status = error.statusText;
        this.message = error.error ? error.error : "No message to display.";
    };
    CoreErrorService.prototype.setDefaults = function () {
        this.url = "None";
        this.status = "None";
        this.message = "None.";
    };
    CoreErrorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CoreErrorService);
    return CoreErrorService;
}());
exports.CoreErrorService = CoreErrorService;
//# sourceMappingURL=core.error.service.js.map