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
var core_http_service_1 = require("../../../services/0-core/core.http.service");
var router_1 = require("@angular/router");
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent(router, httpServ) {
        this.router = router;
        this.httpServ = httpServ;
        this.items = new Array();
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.getItems();
    };
    ItemsComponent.prototype.getItems = function () {
        var _this = this;
        this.httpServ.httpGet('items').subscribe(function (x) {
            _this.items = x.valueOf();
        });
    };
    ItemsComponent.prototype.remove = function (item) {
        var _this = this;
        this.httpServ.httpPost('items/delete/' + item.id).subscribe(function (x) {
            _this.items.splice(_this.items.indexOf(item), 1);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ItemsComponent.prototype, "items", void 0);
    ItemsComponent = __decorate([
        core_1.Component({
            selector: 'comp-items',
            templateUrl: './items.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, core_http_service_1.CoreHttpService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=items.component.js.map