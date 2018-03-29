import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AlertService, AlertType } from './alert.service';

import { User } from '../../entities/user';

@Injectable()
export class BaseService {

    private keyUser: string = 'currentUser';
    private urlApi: string = '';

    constructor(private http: HttpClient, private alertService: AlertService)
    {
        this.urlApi = location.protocol + '//' + location.host + '/api/'
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

        return this.http.post(url, body, { headers: this.createHeader() }).toPromise()
    }

    public httpGet(pathUrl: string, httpParams?: HttpParams) {

        let url = this.urlApi + pathUrl;

        return this.http.get(url, { headers: this.createHeader(), params: httpParams }).toPromise()
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
        this.alertService.createAlert(AlertType.Success, message);
    }

    public createAlertInfo(message: string) {
        this.alertService.createAlert(AlertType.Info, message);
    }

    public createErrorInfo(message: string) {
        this.alertService.createAlert(AlertType.Error, message);
    }
    
}