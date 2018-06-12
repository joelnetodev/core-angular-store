import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { CoreUserService } from './services/0-core/core.user.service';
import { CoreAlertService } from './services/0-core/core.alert.service';
import { CoreErrorService } from './services/0-core/core.error.service';
import { CoreLoadService } from './services/0-core/core.load.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userServ: CoreUserService, private alertServ: CoreAlertService, private errorServ: CoreErrorService, private loadServ: CoreLoadService) { }

    //intercept is a overrided method to intercept requests
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadServ.show();
        return this.handleResponse(request, next);
    }

    private handleResponse(request: HttpRequest<any>, next: HttpHandler) {
        //To redirect pages when login is not authorized, a handle will get the response
        //and the router will navigate to login page

        return next.handle(request)
            .catch((response) => {

                if (response instanceof HttpErrorResponse) {
                    console.log(response);

                    //997 Info
                    //998 Error
                    //999 Critical

                    switch (response.status) {
                        case 401: this.userServ.removeUser(); this.router.navigate(['/login']); break;
                        case 403: this.router.navigate(['/permission']); break;
                        case 997: this.alertServ.createInfo(response.error); break;
                        case 998: this.alertServ.createError(response.error); break;
                        default: this.errorServ.setMessage(response.error); this.router.navigate(['/error']); break;
                        //default: console.log(response); break;
                    }
                }

                return Observable.throw(response);

            })
            .finally(() => this.loadServ.hide());
    }

    /*Seems to be more apropriated to let CoreBaseService responsible for httpRequests

    private adjustRequest(request: HttpRequest<any>): HttpRequest<any> {
        //the request will have the url changed
        //and if there is an user stored, a header with will setted with JWT token
        if (this.baseService.isUserStored()) {
            return request.clone(
                {
                    url: 'http://localhost:50001/api/' + request.url,
                    setHeaders: { Authorization: 'Bearer ' + this.baseService.getUser().token, 'Content-Type': 'application/json' }
                });
        }
        return request.clone(
            {
                url: 'http://localhost:50001/api/' + request.url,
                setHeaders: { 'Content-Type': 'application/json' }
            });
    }
    */
} 