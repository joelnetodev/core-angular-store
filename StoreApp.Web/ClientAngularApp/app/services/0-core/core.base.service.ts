import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CoreAlertService, AlertTypeEnum } from './core.alert.service';

import { User } from '../../entities/user';

@Injectable()
export class CoreBaseService {

    private keyUser: string = 'currentUser';
    private urlApi: string = '';

    constructor(private http: HttpClient, private alertService: CoreAlertService)
    {
        //the orign is the first part, the domain: http://www.domain.com
        //and the path is / or /path/ that has been given by the server to your app 
        this.urlApi = location.origin + location.pathname + 'api/'
    }

    public storeUser(user: User) {
        localStorage.setItem(this.keyUser, JSON.stringify(user));
    }

    public removeUser() {
        localStorage.removeItem(this.keyUser);
    }

    public isUserStored() {
        if (localStorage.getItem(this.keyUser)) {
            return true;
        }

        return false;
    }

    public getUser(): User {
        if (this.isUserStored()) {
            return JSON.parse(localStorage.getItem(this.keyUser)) as User;
        }

        return null;
    }



    public httpPost(pathUrl: string, body?: any)
    {
        let url = this.urlApi + pathUrl;

        return this.http.post(url, body, { headers: this.createHeader() })
    }

    public httpGet(pathUrl: string, httpParams?: HttpParams) {

        let url = this.urlApi + pathUrl;

        return this.http.get(url, { headers: this.createHeader(), params: httpParams })
    }

    private createHeader(): HttpHeaders
    {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        if (this.isUserStored())
        {
            headers = headers.set('Authorization', 'Bearer ' + this.getUser().token);
        }

        return headers;
    }



    public createAlertSuccess(message: string) {
        this.alertService.createAlert(AlertTypeEnum.Success, message);
    }

    public createAlertInfo(message: string) {
        this.alertService.createAlert(AlertTypeEnum.Info, message);
    }

    public createAlertError(message: string) {
        this.alertService.createAlert(AlertTypeEnum.Error, message);
    }

    public createAlertWarning(message: string) {
        this.alertService.createAlert(AlertTypeEnum.Warning, message);
    }
  
}