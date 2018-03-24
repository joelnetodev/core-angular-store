import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { BaseService } from '../../services/base/base.service';

@Component({
    selector: 'comp-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    error: string;
    username: string = "";
    password: string = "";

    constructor(private userService: UserService, private router: Router, private baseServ: BaseService) {
    }

    ngOnInit() { this.baseServ.removeUser(); }

    async login()
    {
        let result = await this.userService.login(this.username, this.password);

        if (result === true)
        {
            this.router.navigate(['/']);
        }
        else
        {
            this.error = 'Username or password is incorrect';
        }
    }
}