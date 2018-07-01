import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserRegister } from '../../../models/user/userRegister';
import { CoreHttpService } from '../../../services/0-core/core.http.service';
import { CoreAlertService } from '../../../services/0-core/core.alert.service';
import { Router } from '@angular/router';
import { RoleEnum } from '../../../models/enums/roleEnum';

@Component({
    selector: 'comp-user-edit',
    templateUrl: './user.edit.component.html'
})
export class UserEditComponent implements OnInit {

    user: UserRegister = new UserRegister();
    roleEnum: typeof RoleEnum = RoleEnum

    constructor(private httpServ: CoreHttpService, private alertServ: CoreAlertService) {
    }

    ngOnInit() {

        this.httpServ.httpGet('user').subscribe(
            (x) => {
                this.user = x.valueOf() as UserRegister;
            });
    }

    save() {
        this.httpServ.httpPost('user', this.user).subscribe(
            (x) => {
                this.alertServ.createSuccess('User saved.', true);
            });
    }

}
