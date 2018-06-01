import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreBaseService } from '../../../services/0-core/core.base.service';
import { User } from '../../../entities/user';

@Component({
    selector: 'comp-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    username: string = "";
    password: string = "";

    constructor(private router: Router, private baseServ: CoreBaseService) {
    }

    ngOnInit() { }

    login() {
        var login = { UserName: this.username, Password: this.password };

        this.baseServ.httpPost('login', login).subscribe(x => {
            let user = x.valueOf() as User;

            if (user)
            {
                this.baseServ.storeUser(user);
                this.router.navigate(['/']);
            }
        });
    }
}