import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreUserService } from '../../../services/0-core/core.user.service';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { User } from '../../../models/user';
import { CoreMenuService, MenuModuleEnum } from '../../../services/0-core/core.menu.service';

@Component({
    selector: 'comp-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    username: string = "";
    password: string = "";

    constructor(private router: Router, private httpServ: CoreHttpService, private userServ: CoreUserService, private menuServ: CoreMenuService) {
    }

    ngOnInit() {
        this.menuServ.setModule(MenuModuleEnum.Login);
    }

    login() {
        var login = { Username: this.username, Password: this.password };

        this.httpServ.httpPost('login', login).subscribe(x => {
            let user = x.valueOf() as User;

            if (user)
            {
                this.userServ.storeUser(user);
                this.router.navigate(['/']);
            }
        });
    }
}