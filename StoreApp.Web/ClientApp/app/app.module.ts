/*
This is the main module of an Angular App
It contains the declarations of every others (Main or not) modules, or components or services

The routing and the uthers Modules must be imported

A module is like a agglomerated of functionalities or of components/services.
If you want to separate and organize the app, Module should be used to group.
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';

import { CoreServiceModule } from './modules/0-core/core.service.module';
import { CoreSharedModule } from './modules/0-core/core.shared.module';
import { CoreCompModule } from './modules/0-core/core.comp.module';

import { AppComponent } from './components/0-core/app/app.component';
import { HomeComponent } from './components/project/home/home.component';
import { ProductsComponent } from './components/project/products/products.component';
import { RowComponent } from './components/project/products/row/row.component';
import { LoginComponent } from './components/project/login/login.component';
import { NavTopComponent } from './components/0-core/navtop/navtop.component';
import { PermissionComponent } from './components/0-core/permission/permission.component';

import { AppInterceptor } from './app.interceptor';

//NgModule to identify this class as a Module
//The MainModule are global, so global services should be declared here to others Modules could use.
@NgModule({
    //DECLARATIONS are private scope and should be used for templates (inside this Module only) 
    //Should be filled by Components, directives, etc
    declarations: [
        AppComponent,
        HomeComponent,
        ProductsComponent,
        RowComponent,
        LoginComponent,
        NavTopComponent,
        PermissionComponent
    ],

    //IMPORTS are used to reference other Modules to use their scopes, like Http, Route, etc.
    //Only MainModule should import BrowserModule, others created for the App should use CommonModule 
    imports: [
        BrowserModule,
        HttpClientModule,
        routing,
        CoreServiceModule,
        CoreSharedModule,
        CoreCompModule
    ],

    //PROVIDERS public scope and sould be used for SERVICES or something that will handle data
    //Angular does have a HTTP interecptor that will be provide by AppInterceptor that inherits from HttpInterceptor
    providers:
    [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        }
    ],
    //Only Main Module will bootstrap something, the others will be Lazyloaded
    bootstrap: [AppComponent]
})
export class AppModule { }
