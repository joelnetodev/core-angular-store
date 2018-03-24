/*
This is the main TS file.
All Angular works because there is an initial call to register the Main Module (AppModule)
The AppModule contains the register of all others main components/modules/services

bootstrapModule register the main module
*/

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
