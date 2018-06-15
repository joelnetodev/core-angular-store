import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/project/home/home.component';
import { LoginComponent } from './components/project/login/login.component';
import { RegisterComponent } from './components/project/register/register.component';
import { ProductsComponent } from './components/project/products/products.component';
import { PermissionComponent } from './components/project/permission/permission.component';
import { ItemListComponent } from './components/project/items/list/item.list.component';
import { ItemEditComponent } from './components/project/items/edit/item.edit.component';
import { ErrorComponent } from './components/project/error/error.component';
import { MenuModuleEnum } from './models/Enums/menuEnum';

//RouterModule for override the path to components.
//This allows to create routerLink on HTML to render components

const routes: Routes = [
    { path: '', component: HomeComponent, data: { title: 'Home', module: MenuModuleEnum.Home }},
    { path: 'login', component: LoginComponent, data: { title: 'Login', module: MenuModuleEnum.Login } },
    { path: 'register', component: RegisterComponent, data: { title: 'Register', module: MenuModuleEnum.Register } },
    { path: 'permission', component: PermissionComponent, data: { title: 'Permission'} },
    { path: 'error', component: ErrorComponent, data: { title: 'Error' } },

    { path: 'products', component: ProductsComponent, data: { title: 'Products', module: MenuModuleEnum.Products } },

    { path: 'items', component: ItemListComponent, data: { title: 'Items', module: MenuModuleEnum.Items } },
    { path: 'items/edit', component: ItemEditComponent, data: { title: 'Items Add', module: MenuModuleEnum.Items } },
    { path: 'items/edit/:id', component: ItemEditComponent, data: { title: 'Items Edit', module: MenuModuleEnum.Items } }
];
//Use hash to eneble refresh page, otherwise the reference of the page will be lost
export const routing = RouterModule.forRoot(routes, { useHash: true });