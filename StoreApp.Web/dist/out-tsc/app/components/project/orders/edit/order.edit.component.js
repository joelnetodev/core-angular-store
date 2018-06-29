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
var product_1 = require("../../../../models/product");
var core_http_service_1 = require("../../../../services/0-core/core.http.service");
var core_alert_service_1 = require("../../../../services/0-core/core.alert.service");
var router_2 = require("@angular/router");
var ProductEditComponent = /** @class */ (function () {
    function ProductEditComponent(route, router, httpServ, alertServ) {
        this.route = route;
        this.router = router;
        this.httpServ = httpServ;
        this.alertServ = alertServ;
        this.model = new ProductModel();
        this.items = new Array();
    }
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpServ.httpGet('items/active').subscribe(function (x) {
            _this.items = x.valueOf();
            if (_this.route.snapshot.paramMap.has('id')) {
                var id = _this.route.snapshot.paramMap.get('id');
                _this.populateProduct(id);
            }
        });
    };
    ProductEditComponent.prototype.populateProduct = function (id) {
        var _this = this;
        this.httpServ.httpGet('products/' + id).subscribe(function (x) {
            _this.model.product = x.valueOf();
            for (var i = 0; i < _this.model.product.items.length; i++) {
                var itemModel = new ItemModel();
                itemModel.item = _this.model.product.items[i];
                _this.model.items.push(itemModel);
            }
        });
    };
    ProductEditComponent.prototype.save = function () {
        var _this = this;
        this.httpServ.httpPost('products', this.model.product).subscribe(function (x) {
            _this.alertServ.createSuccess('Product saved.', true);
            _this.router.navigate(["products"]);
        });
    };
    ProductEditComponent.prototype.remove = function (itemModel) {
        this.model.items = this.model.items.filter(function (x) { return x != itemModel; });
        this.model.product.items = this.model.product.items.filter(function (x) { return x != itemModel.item; });
    };
    ProductEditComponent.prototype.add = function () {
        var itemModel = new ItemModel();
        itemModel.isEditingItem = true;
        this.model.product.items.push(itemModel.item);
        this.model.items.push(itemModel);
    };
    ProductEditComponent.prototype.onFocusOutCount = function (itemModel) {
        itemModel.isEditingCount = false;
    };
    ProductEditComponent.prototype.onClickCount = function (itemModel) {
        itemModel.isEditingCount = true;
    };
    ProductEditComponent.prototype.onFocusOutItem = function (itemModel) {
        var itemFound = this.items.find(function (x) { return x.id == itemModel.item.id; });
        if (itemFound) {
            itemModel.item.name = itemFound.name;
        }
        itemModel.isEditingItem = false;
    };
    ProductEditComponent.prototype.onClickItem = function (itemModel) {
        itemModel.isEditingItem = true;
    };
    ProductEditComponent = __decorate([
        core_1.Component({
            selector: 'comp-order-edit',
            templateUrl: './order.edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_2.Router, core_http_service_1.CoreHttpService, core_alert_service_1.CoreAlertService])
    ], ProductEditComponent);
    return ProductEditComponent;
}());
exports.ProductEditComponent = ProductEditComponent;
var ProductModel = /** @class */ (function () {
    function ProductModel() {
        this.product = new product_1.Product();
        this.items = new Array();
    }
    return ProductModel;
}());
exports.ProductModel = ProductModel;
var ItemModel = /** @class */ (function () {
    function ItemModel() {
        this.item = new product_1.ProductItem();
    }
    return ItemModel;
}());
exports.ItemModel = ItemModel;
//# sourceMappingURL=order.edit.component.js.map