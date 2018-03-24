import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'

import { BaseService } from './services/base/base.service';
import { User } from './models/user';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private router: Router, private baseService: BaseService) { }

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
                    console.log('intercept enter in error');
                    if (response.status == 401)
                        this.router.navigate(['/login']);
                    else if (response.status == 403) {
                        console.log('intercept is 403');
                        this.router.navigate(['/permission']);
                    }
                    else {
                        return Observable.throw(response);
                    }
                }

            });
    }

    /*Seems to be more apropriated to let BaseService responsible for httpRequests

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