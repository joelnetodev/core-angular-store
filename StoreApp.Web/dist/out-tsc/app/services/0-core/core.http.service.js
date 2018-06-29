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
var http_1 = require("@angular/common/http");
var core_user_service_1 = require("./core.user.service");
var core_load_service_1 = require("./core.load.service");
var CoreHttpService = /** @class */ (function () {
    function CoreHttpService(http, userServ, loadServ) {
        this.http = http;
        this.userServ = userServ;
        this.loadServ = loadServ;
        this.urlApi = '';
        //the orign is the first part, the domain: http://www.domain.com
        //and the path is / or /path/ that has been given by the server to your app 
        this.urlApi = location.origin + location.pathname + 'api/';
    }
    CoreHttpService.prototype.httpPost = function (pathUrl, body) {
        var url = this.urlApi + pathUrl;
        return this.http.post(url, body, { headers: this.createHeader() });
    };
    CoreHttpService.prototype.httpGet = function (pathUrl, httpParams) {
        var url = this.urlApi + pathUrl;
        return this.http.get(url, { headers: this.createHeader(), params: httpParams });
    };
    CoreHttpService.prototype.createHeader = function () {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        if (this.userServ.isUserStored()) {
            headers = headers.set('Authorization', 'Bearer ' + this.userServ.getUser().token);
        }
        return headers;
    };
    CoreHttpService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, core_user_service_1.CoreUserService, core_load_service_1.CoreLoadService])
    ], CoreHttpService);
    return CoreHttpService;
}());
exports.CoreHttpService = CoreHttpService;
//# sourceMappingURL=core.http.service.js.map