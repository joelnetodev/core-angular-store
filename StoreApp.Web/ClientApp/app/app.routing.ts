import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RowComponent } from './components/row/row.component';
import { PermissionComponent } from './components/permission/permission.component';

//RouterModule for override the path to components.
//This allows to create routerLink on HTML to render components

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'row', component: RowComponent },
    { path: 'permission', component: PermissionComponent }
];
//Use hash to eneble refresh page, otherwise the reference of the page will be lost
export const routing = RouterModule.forRoot(routes, { useHash: true });