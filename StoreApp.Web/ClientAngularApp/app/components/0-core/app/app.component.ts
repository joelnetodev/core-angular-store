/*
This is the first/(main or not) component of an Angular App.
It will be displayed inside HTML files whrn use 'comp-main' tag
*/

import { Component } from '@angular/core';

/*
@Component indicates that this is a Component
The selector is the tag name in HTML files
Template is the HTML template that will be displayed when the selector is called
*/
@Component({
    selector: 'comp-app',
    templateUrl: './app.component.html'
})
export class AppComponent
{
  //Every component works like a ViewModel for the HTML template (the view)
  //the properties and methods could be used in HTML templates to display, store and process information
  
}
