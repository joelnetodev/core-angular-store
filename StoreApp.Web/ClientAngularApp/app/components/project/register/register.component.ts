import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreBaseService } from '../../../services/0-core/core.base.service';
import { UserRegister } from '../../../entities/userRegister';
import { CoreMenuService, MenuModuleEnum } from '../../../services/0-core/core.menu.service';
import { RoleEnum } from '../../../entities/Enums/roleEnum';

@Component({
    selector: 'comp-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    //Create string array of EnumItems
    roleEnum = RoleEnum;
    roles = Object.keys(this.roleEnum).filter(k => isNaN(Number(k)));
    
    user: UserRegister = new UserRegister();

    constructor(private router: Router, private baseServ: CoreBaseService, private menuServ: CoreMenuService) {
    }

    ngOnInit() {

        this.menuServ.setModule(MenuModuleEnum.Register);
    }

    createUser() {

        this.baseServ.httpPost('login/create', this.user).subscribe(x => {
            this.baseServ.createAlertSuccess('User created.');
            this.user = new UserRegister(); 
        });
    }
}