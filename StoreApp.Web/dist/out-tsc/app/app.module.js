"use strict";
/*
This is the main module of an Angular App
It contains the declarations of every others (Main or not) modules, or components or services

The routing and the uthers Modules must be imported

A module is like a agglomerated of functionalities or of components/services.
If you want to separate and organize the app, Module should be used to group.
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var app_routing_1 = require("./app.routing");
var core_service_module_1 = require("./modules/0-core/core.service.module");
var core_shared_module_1 = require("./modules/0-core/core.shared.module");
var core_component_module_1 = require("./modules/0-core/core.component.module");
var core_directive_module_1 = require("./modules/0-core/core.directive.module");
var home_component_1 = require("./components/project/home/home.component");
var login_component_1 = require("./components/project/login/login.component");
var register_component_1 = require("./components/project/register/register.component");
var products_component_1 = require("./components/project/products/products.component");
var product_edit_component_1 = require("./components/project/products/edit/product.edit.component");
var items_component_1 = require("./components/project/items/items.component");
var item_edit_component_1 = require("./components/project/items/edit/item.edit.component");
var clients_component_1 = require("./components/project/clients/clients.component");
var client_edit_component_1 = require("./components/project/clients/edit/client.edit.component");
var app_interceptor_1 = require("./app.interceptor");
var app_component_1 = require("./components/0-core/app/app.component");
//NgModule to identify this class as a Module
//The MainModule are global, so global services should be declared here to others Modules could use.
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            //DECLARATIONS are private scope and should be used for templates (inside this Module only) 
            //Should be filled by Components, directives, etc
            declarations: [
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                products_component_1.ProductsComponent,
                product_edit_component_1.ProductEditComponent,
                items_component_1.ItemsComponent,
                item_edit_component_1.ItemEditComponent,
                clients_component_1.ClientsComponent,
                client_edit_component_1.ClientEditComponent
            ],
            //IMPORTS are used to reference other Modules to use their scopes, like Http, Route, etc.
            //Only MainModule should import BrowserModule, others created for the App should use CommonModule 
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_1.routing,
                core_service_module_1.CoreServiceModule,
                core_shared_module_1.CoreSharedModule,
                core_component_module_1.CoreComponentModule,
                core_directive_module_1.CoreDirectiveModule
            ],
            //PROVIDERS public scope and sould be used for SERVICES or something that will handle data
            //Angular does have a HTTP interecptor that will be provide by AppInterceptor that inherits from HttpInterceptor
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: app_interceptor_1.AppInterceptor,
                    multi: true
                }
            ],
            //Only Main Module will bootstrap something, the others will be Lazyloaded
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map