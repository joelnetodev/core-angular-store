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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_alert_service_1 = require("../../../services/0-core/core.alert.service");
var core_http_service_1 = require("../../../services/0-core/core.http.service");
var product_1 = require("../../../models/product");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(alertServ, httpServ) {
        this.alertServ = alertServ;
        this.httpServ = httpServ;
        this.returnedId = 0;
        this.id = 0;
        this.product = new product_1.Product();
        this.products = new Array();
    }
    HomeComponent.prototype.ngOnInit = function () {
        //this.menuServ.setModule(MenuModuleEnum.Home);
    };
    HomeComponent.prototype.getOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpServ.httpGet('products/' + this.id).toPromise()];
                    case 1:
                        response = _a.sent();
                        this.product = response.valueOf();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.postOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpServ.httpPost('products/', this.product).toPromise()];
                    case 1:
                        response = _a.sent();
                        this.alertServ.createSuccess('Product saved');
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpServ.httpGet('products/').toPromise()];
                    case 1:
                        response = _a.sent();
                        this.products = response.valueOf();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.onReturnProduct = function (obj) {
        this.product = obj;
    };
    HomeComponent.prototype.postItem = function () {
        this.httpServ.httpGet('items').subscribe();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'comp-home',
            templateUrl: './home.component.html'
        }),
        __metadata("design:paramtypes", [core_alert_service_1.CoreAlertService, core_http_service_1.CoreHttpService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map