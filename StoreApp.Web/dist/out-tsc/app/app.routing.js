"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./components/project/home/home.component");
var login_component_1 = require("./components/project/login/login.component");
var register_component_1 = require("./components/project/register/register.component");
var products_component_1 = require("./components/project/products/products.component");
var product_edit_component_1 = require("./components/project/products/edit/product.edit.component");
var permission_component_1 = require("./components/0-core/permission/permission.component");
var items_component_1 = require("./components/project/items/items.component");
var item_edit_component_1 = require("./components/project/items/edit/item.edit.component");
var clients_component_1 = require("./components/project/clients/clients.component");
var client_edit_component_1 = require("./components/project/clients/edit/client.edit.component");
var error_component_1 = require("./components/0-core/error/error.component");
var menuEnum_1 = require("./models/Enums/menuEnum");
//RouterModule for override the path to components.
//This allows to create routerLink on HTML to render components
var routes = [
    { path: '', component: home_component_1.HomeComponent, data: { title: 'Home', module: menuEnum_1.MenuModuleEnum.Home } },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'permission', component: permission_component_1.PermissionComponent, data: { title: 'Access denied' } },
    { path: 'error', component: error_component_1.ErrorComponent },
    { path: 'products', component: products_component_1.ProductsComponent, data: { title: 'Products', module: menuEnum_1.MenuModuleEnum.Products } },
    { path: 'products/edit', component: product_edit_component_1.ProductEditComponent, data: { title: 'Product Add', module: menuEnum_1.MenuModuleEnum.Products } },
    { path: 'products/edit/:id', component: product_edit_component_1.ProductEditComponent, data: { title: 'Product Edit', module: menuEnum_1.MenuModuleEnum.Products } },
    { path: 'items', component: items_component_1.ItemsComponent, data: { title: 'Items', module: menuEnum_1.MenuModuleEnum.Items } },
    { path: 'items/edit', component: item_edit_component_1.ItemEditComponent, data: { title: 'Item Add', module: menuEnum_1.MenuModuleEnum.Items } },
    { path: 'items/edit/:id', component: item_edit_component_1.ItemEditComponent, data: { title: 'Item Edit', module: menuEnum_1.MenuModuleEnum.Items } },
    { path: 'clients', component: clients_component_1.ClientsComponent, data: { title: 'Clients', module: menuEnum_1.MenuModuleEnum.Clients } },
    { path: 'clients/edit', component: client_edit_component_1.ClientEditComponent, data: { title: 'Client Add', module: menuEnum_1.MenuModuleEnum.Clients } },
    { path: 'clients/edit/:id', component: client_edit_component_1.ClientEditComponent, data: { title: 'Client Edit', module: menuEnum_1.MenuModuleEnum.Clients } }
];
//Use hash to eneble refresh page, otherwise the reference of the page will be lost
exports.routing = router_1.RouterModule.forRoot(routes, { useHash: true });
//# sourceMappingURL=app.routing.js.map