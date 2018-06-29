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
var ClientsComponent = /** @class */ (function () {
    function ClientsComponent(router, httpServ) {
        this.router = router;
        this.httpServ = httpServ;
        this.clients = new Array();
    }
    ClientsComponent.prototype.ngOnInit = function () {
        this.getClients();
    };
    ClientsComponent.prototype.getClients = function () {
        var _this = this;
        this.httpServ.httpGet('clients').subscribe(function (x) {
            _this.clients = x.valueOf();
        });
    };
    ClientsComponent.prototype.remove = function (client) {
        var _this = this;
        this.httpServ.httpPost('clients/delete/' + client.id).subscribe(function (x) {
            _this.clients.splice(_this.clients.indexOf(client), 1);
        });
    };
    ClientsComponent = __decorate([
        core_1.Component({
            selector: 'comp-clients',
            templateUrl: './clients.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, core_http_service_1.CoreHttpService])
    ], ClientsComponent);
    return ClientsComponent;
}());
exports.ClientsComponent = ClientsComponent;
//# sourceMappingURL=clients.component.js.map