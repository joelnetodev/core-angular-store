import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CoreUserService } from './core.user.service';
import { CoreLoadService } from './core.load.service';


@Injectable()
export class CoreHttpService {

    private urlApi: string = '';

    constructor(private http: HttpClient, private userServ: CoreUserService, private loadServ: CoreLoadService)
    {
        //the orign is the first part, the domain: http://www.domain.com
        //and the path is / or /path/ that has been given by the server to your app 
        this.urlApi = location.origin + location.pathname + 'api/'
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
        if (this.userServ.isUserStored())
        {
            headers = headers.set('Authorization', 'Bearer ' + this.userServ.getUser().token);
        }

        return headers;
    }
  
}