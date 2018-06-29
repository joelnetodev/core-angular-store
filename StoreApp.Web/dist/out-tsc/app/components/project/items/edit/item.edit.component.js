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
var item_1 = require("../../../../models/item");
var core_http_service_1 = require("../../../../services/0-core/core.http.service");
var core_alert_service_1 = require("../../../../services/0-core/core.alert.service");
var router_2 = require("@angular/router");
var ItemEditComponent = /** @class */ (function () {
    function ItemEditComponent(route, router, httpServ, alertServ) {
        this.route = route;
        this.router = router;
        this.httpServ = httpServ;
        this.alertServ = alertServ;
        this.title = "Add";
        this.item = new item_1.Item();
    }
    ItemEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.route.snapshot.paramMap.has('id'))
            return;
        var id = this.route.snapshot.paramMap.get('id');
        this.httpServ.httpGet('items/' + id).subscribe(function (x) {
            _this.item = x.valueOf();
        });
    };
    ItemEditComponent.prototype.save = function () {
        var _this = this;
        this.httpServ.httpPost('items', this.item).subscribe(function (x) {
            _this.alertServ.createSuccess('Item saved.', true);
            _this.router.navigate(["items"]);
        });
    };
    ItemEditComponent = __decorate([
        core_1.Component({
            selector: 'comp-item-edit',
            templateUrl: './item.edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_2.Router, core_http_service_1.CoreHttpService, core_alert_service_1.CoreAlertService])
    ], ItemEditComponent);
    return ItemEditComponent;
}());
exports.ItemEditComponent = ItemEditComponent;
//# sourceMappingURL=item.edit.component.js.map