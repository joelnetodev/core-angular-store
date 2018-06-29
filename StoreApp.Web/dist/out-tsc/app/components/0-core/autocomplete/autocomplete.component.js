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
var forms_1 = require("@angular/forms");
var AutoCompleteComponent = /** @class */ (function () {
    function AutoCompleteComponent(httpServ) {
        this.httpServ = httpServ;
        //Output decorator means that a value will be returned through directive with () in the component tag
        this.onReturnObject = new core_1.EventEmitter();
        this.textToSearch = new forms_1.FormControl();
        this.resultsFromUrl = this.observableResults();
    }
    AutoCompleteComponent.prototype.ngOnInit = function () {
    };
    AutoCompleteComponent.prototype.onSelectItem = function (itemSelected) {
        this.resultsFromUrl = null;
        this.textToSearch.setValue(itemSelected[this.displayPropertyName]);
        this.onReturnObject.emit(itemSelected);
        this.resultsFromUrl = this.observableResults();
    };
    AutoCompleteComponent.prototype.observableResults = function () {
        //return Observable.of([])
        //    .merge(this.textToSearch.valueChanges)
        //    .filter((txt) => { return txt.length > 2 })
        //    .debounceTime(700)
        //    .switchMap((path) => { return this.httpServ.httpGet(this.url + "/" + path); })
        //    .map((data) => { return data as Object[]; })
        //    .retry(2);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoCompleteComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoCompleteComponent.prototype, "displayPropertyName", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AutoCompleteComponent.prototype, "onReturnObject", void 0);
    AutoCompleteComponent = __decorate([
        core_1.Component({
            selector: 'comp-autocomplete',
            templateUrl: './autocomplete.component.html',
            styleUrls: ['./autocomplete.component.css']
        }),
        __metadata("design:paramtypes", [core_http_service_1.CoreHttpService])
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
}());
exports.AutoCompleteComponent = AutoCompleteComponent;
//# sourceMappingURL=autocomplete.component.js.map