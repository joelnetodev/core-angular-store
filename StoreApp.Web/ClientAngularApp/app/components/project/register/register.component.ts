import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreAlertService } from '../../../services/0-core/core.alert.service';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { UserRegister } from '../../../models/user/userRegister';
import { RoleEnum } from '../../../models/enums/roleEnum';

@Component({
    selector: 'comp-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    //Create string array of EnumItems
    enumRole = RoleEnum;
    roles = Object.keys(this.enumRole).filter(k => isNaN(Number(k)));
    
    user: UserRegister = new UserRegister();

    constructor(private router: Router, private httpServ: CoreHttpService, private alertServ: CoreAlertService) {
    }

    ngOnInit() {
        //this.menuServ.setModule(MenuModuleEnum.Register);
    }

    createUser() {

        this.httpServ.httpPost('user/create', this.user).subscribe(x => {
            this.alertServ.createSuccess('User created.');
            this.user = new UserRegister(); 
        });
    }
}