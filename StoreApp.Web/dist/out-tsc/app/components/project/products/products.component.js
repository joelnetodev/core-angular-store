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
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(router, httpServ) {
        this.router = router;
        this.httpServ = httpServ;
        this.productsModels = new Array();
    }
    ProductsComponent.prototype.ngOnInit = function () {
        this.getProducts();
    };
    ProductsComponent.prototype.getProducts = function () {
        var _this = this;
        this.httpServ.httpGet('products').subscribe(function (x) {
            var products = x.valueOf();
            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                var model = new ProductModel();
                model.product = product;
                model.itemsNamesFull = _this.getItemsNamesFull(product);
                _this.productsModels.push(model);
            }
        });
    };
    ProductsComponent.prototype.remove = function (productModel) {
        var _this = this;
        this.httpServ.httpPost('products/delete/' + productModel.product.id).subscribe(function (x) {
            _this.productsModels.splice(_this.productsModels.indexOf(productModel), 1);
        });
    };
    ProductsComponent.prototype.getItemsNamesFull = function (product) {
        var itemsName = "";
        for (var i = 0; i < product.items.length; i++) {
            itemsName += product.items[i].name;
            if (i != product.items.length - 1)
                itemsName += ", ";
        }
        return itemsName;
    };
    ProductsComponent.prototype.setDisplayed = function (productModel) {
        productModel.displayed = !productModel.displayed;
    };
    ProductsComponent.prototype.getArrowDirection = function (productModel) {
        return productModel.displayed ? "left" : "right";
    };
    ProductsComponent.prototype.getTitle = function (productModel) {
        return productModel.displayed ? "hide" : "show";
    };
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'comp-products',
            templateUrl: './products.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, core_http_service_1.CoreHttpService])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
var ProductModel = /** @class */ (function () {
    function ProductModel() {
    }
    ProductModel.prototype.getIsToHide = function () {
        return this.itemsNamesFull.length >= 20;
    };
    ProductModel.prototype.getItemsNames = function () {
        if (this.displayed || !this.getIsToHide())
            return this.itemsNamesFull;
        else {
            return this.itemsNamesFull.substr(0, 20) + "...";
        }
    };
    return ProductModel;
}());
exports.ProductModel = ProductModel;
//# sourceMappingURL=products.component.js.map