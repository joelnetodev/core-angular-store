import { Injectable } from '@angular/core';

import { BaseService } from './base/base.service';
import { User } from '../entities/user';

@Injectable()
export class UserService {
    constructor(private baseService: BaseService) { }

    async login(username: string, password: string)
    {
        var login = { UserName: username, Password: password };

        let response = await this.baseService.httpPost('login', login).toPromise();

        let user = response.valueOf() as User;

        if (user)
        {
            this.baseService.storeUser(user);
            return true;
        }
        else
        {
            return false;
        }
    }
}