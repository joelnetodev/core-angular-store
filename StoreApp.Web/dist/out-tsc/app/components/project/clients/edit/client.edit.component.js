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
var client_1 = require("../../../../models/client");
var core_http_service_1 = require("../../../../services/0-core/core.http.service");
var core_alert_service_1 = require("../../../../services/0-core/core.alert.service");
var router_2 = require("@angular/router");
var ClientEditComponent = /** @class */ (function () {
    function ClientEditComponent(route, router, httpServ, alertServ) {
        this.route = route;
        this.router = router;
        this.httpServ = httpServ;
        this.alertServ = alertServ;
        this.client = new client_1.Client();
        this.currentContact = new client_1.ClientContact();
        this.modalTitle = "Add";
    }
    ClientEditComponent.prototype.ngOnInit = function () {
        if (this.route.snapshot.paramMap.has('id')) {
            var id = this.route.snapshot.paramMap.get('id');
            this.populateClient(id);
        }
    };
    ClientEditComponent.prototype.populateClient = function (id) {
        var _this = this;
        this.httpServ.httpGet('clients/' + id).subscribe(function (x) {
            _this.client = x.valueOf();
        });
    };
    ClientEditComponent.prototype.save = function () {
        var _this = this;
        this.httpServ.httpPost('clients', this.client).subscribe(function (x) {
            _this.alertServ.createSuccess('Client saved.', true);
            _this.router.navigate(["clients"]);
        });
    };
    ClientEditComponent.prototype.edit = function (contact) {
        this.currentContact = contact;
        this.modalTitle = "Edit";
    };
    ClientEditComponent.prototype.remove = function (contact) {
        this.client.contacts = this.client.contacts.filter(function (x) { return x != contact; });
    };
    ClientEditComponent.prototype.add = function () {
        this.currentContact = new client_1.ClientContact();
        this.modalTitle = "Add";
    };
    ClientEditComponent.prototype.saveContact = function () {
        if (this.modalTitle == "Add") {
            this.client.contacts.push(this.currentContact);
        }
    };
    ClientEditComponent.prototype.getIsEditingMode = function () {
        return this.modalTitle == "Edit";
    };
    ClientEditComponent = __decorate([
        core_1.Component({
            selector: 'comp-client-edit',
            templateUrl: './client.edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_2.Router, core_http_service_1.CoreHttpService, core_alert_service_1.CoreAlertService])
    ], ClientEditComponent);
    return ClientEditComponent;
}());
exports.ClientEditComponent = ClientEditComponent;
//# sourceMappingURL=client.edit.component.js.map