import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreAlertService } from '../../../services/0-core/core.alert.service';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { UserRegister } from '../../../models/userRegister';
import { CoreMenuService, MenuModuleEnum } from '../../../services/0-core/core.menu.service';
import { RoleEnum } from '../../../models/Enums/roleEnum';

@Component({
    selector: 'comp-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    //Create string array of EnumItems
    roleEnum = RoleEnum;
    roles = Object.keys(this.roleEnum).filter(k => isNaN(Number(k)));
    
    user: UserRegister = new UserRegister();

    constructor(private router: Router, private httpServ: CoreHttpService, private alertServ: CoreAlertService, private menuServ: CoreMenuService) {
    }

    ngOnInit() {

        this.menuServ.setModule(MenuModuleEnum.Register);
    }

    createUser() {

        this.httpServ.httpPost('login/create', this.user).subscribe(x => {
            this.alertServ.createSuccess('User created.');
            this.user = new UserRegister(); 
        });
    }
}