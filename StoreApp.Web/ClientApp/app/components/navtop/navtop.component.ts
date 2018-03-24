import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { Router } from '@angular/router';

@Component({
    selector: 'comp-navtop',
    templateUrl: './navtop.component.html'
})
export class NavTopComponent implements OnInit {

    constructor(private baseService: BaseService, private router: Router) { }

    ngOnInit() { }

    login: string;

    isLogged(): boolean {
        if (this.baseService.isUserStored())
        {
            this.login = this.baseService.getUser().userName;

            return true;
        }

        return false;
    }

    logout() {
        this.baseService.removeUser();
        this.router.navigate(['/login']);
    }
}
