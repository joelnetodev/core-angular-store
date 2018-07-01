import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CoreAlertService, AlertTypeEnum } from './core.alert.service';

import { UserLogged } from '../../models/user/userLogged';

@Injectable()
export class CoreUserService {

    private keyUser: string = 'currentUserLogged';

    constructor(){
    }

    public storeUser(user: UserLogged) {
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

    public getUser(): UserLogged {
        if (this.isUserStored()) {
            return JSON.parse(localStorage.getItem(this.keyUser)) as UserLogged;
        }
        return null;
    }
}