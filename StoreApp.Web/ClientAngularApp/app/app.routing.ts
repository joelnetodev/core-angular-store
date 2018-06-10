import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/project/home/home.component';
import { LoginComponent } from './components/project/login/login.component';
import { RegisterComponent } from './components/project/register/register.component';
import { ProductsComponent } from './components/project/products/products.component';
import { PermissionComponent } from './components/project/permission/permission.component';

//RouterModule for override the path to components.
//This allows to create routerLink on HTML to render components

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'items', component: ProductsComponent },
    { path: 'permission', component: PermissionComponent }
];
//Use hash to eneble refresh page, otherwise the reference of the page will be lost
export const routing = RouterModule.forRoot(routes, { useHash: true });