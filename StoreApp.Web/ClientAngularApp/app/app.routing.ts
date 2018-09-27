import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './components/project/user/user.edit.component';
import { HomeComponent } from './components/project/home/home.component';
import { LoginComponent } from './components/project/login/login.component';
import { RegisterComponent } from './components/project/register/register.component';
import { PermissionComponent } from './components/0-core/permission/permission.component';
import { ErrorComponent } from './components/0-core/error/error.component';

import { ProductsComponent } from './components/project/products/products.component';
import { ProductEditComponent } from './components/project/products/edit/product.edit.component';

import { ItemsComponent } from './components/project/items/items.component';
import { ItemEditComponent } from './components/project/items/edit/item.edit.component';

import { ClientsComponent } from './components/project/clients/clients.component';
import { ClientEditComponent } from './components/project/clients/edit/client.edit.component';

import { OrdersComponent } from './components/project/orders/orders.component';
import { OrderEditComponent } from './components/project/orders/edit/order.edit.component';

import { MenuModuleEnum } from './models/enums/menuEnum';

//RouterModule for override the path to components.
//This allows to create routerLink on HTML to render components

const routes: Routes = [
    { path: '', component: HomeComponent, data: { title: 'Home', module: MenuModuleEnum.Home } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'permission', component: PermissionComponent, data: { title: 'Access denied' } },
    { path: 'error', component: ErrorComponent, data: { title: 'Something got wrong!'} },
    { path: 'user', component: UserEditComponent, data: { title: 'User Edit', module: MenuModuleEnum.Users } },

    { path: 'products', component: ProductsComponent, data: { title: 'Products', module: MenuModuleEnum.Products } },
    { path: 'products/edit', component: ProductEditComponent, data: { title: 'Product Add', module: MenuModuleEnum.Products } },
    { path: 'products/edit/:id', component: ProductEditComponent, data: { title: 'Product Edit', module: MenuModuleEnum.Products } },

    { path: 'items', component: ItemsComponent, data: { title: 'Items', module: MenuModuleEnum.Items } },
    { path: 'items/edit', component: ItemEditComponent, data: { title: 'Item Add', module: MenuModuleEnum.Items } },
    { path: 'items/edit/:id', component: ItemEditComponent, data: { title: 'Item Edit', module: MenuModuleEnum.Items } },

    { path: 'clients', component: ClientsComponent, data: { title: 'Clients', module: MenuModuleEnum.Clients } },
    { path: 'clients/edit', component: ClientEditComponent, data: { title: 'Client Add', module: MenuModuleEnum.Clients } },
    { path: 'clients/edit/:id', component: ClientEditComponent, data: { title: 'Client Edit', module: MenuModuleEnum.Clients } },

    { path: 'orders', component: OrdersComponent, data: { title: 'Orders', module: MenuModuleEnum.Orders } },
    { path: 'orders/edit', component: OrderEditComponent, data: { title: 'Order Add', module: MenuModuleEnum.Orders } },
    { path: 'orders/edit/:id', component: OrderEditComponent, data: { title: 'Order Edit', module: MenuModuleEnum.Orders } }
];
//Use hash to eneble refresh page, otherwise the reference of the page will be lost
export const routing = RouterModule.forRoot(routes, { useHash: true });