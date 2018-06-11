import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { CoreUserService } from './services/0-core/core.user.service';
import { CoreAlertService } from './services/0-core/core.alert.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userServ: CoreUserService, private alertServ: CoreAlertService) { }

    //intercept is a overrided method to intercept requests
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.handleResponse(request, next);
    }

    private handleResponse(request: HttpRequest<any>, next: HttpHandler) {
        //To redirect pages when login is not authorized, a handle will get the response
        //and the router will navigate to login page

        return next.handle(request)
            .catch((response) => {

                if (response instanceof HttpErrorResponse)
                {
                    switch (response.status) {

                        //999 and 998 code is a generic error created to handle messages from server

                        case 401: this.userServ.removeUser(); this.router.navigate(['/login']); break;
                        case 403: this.router.navigate(['/permission']); break;
                        case 998: this.alertServ.createInfo(response.error); break;
                        case 999: this.alertServ.createWarning(response.error); break;
                        default:
                            console.log(response);
                            this.alertServ.createError('Something got wrong. Take a look at console info.');
                            break;
                    }
                }

                return Observable.throw(response);

            });
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