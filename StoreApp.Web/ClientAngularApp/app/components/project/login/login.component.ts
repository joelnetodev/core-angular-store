import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreUserService } from '../../../services/0-core/core.user.service';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { User } from '../../../models/user';

@Component({
    selector: 'comp-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string = "";
    password: string = "";

    constructor(private router: Router, private httpServ: CoreHttpService, private userServ: CoreUserService) {
    }

    ngOnInit() {
        //this.menuServ.setModule(MenuModuleEnum.Login);
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