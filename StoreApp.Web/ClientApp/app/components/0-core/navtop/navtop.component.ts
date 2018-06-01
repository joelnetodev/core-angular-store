import { Component, OnInit } from '@angular/core';
import { CoreBaseService } from '../../../services/0-core/core.base.service';
import { Router } from '@angular/router';

@Component({
    selector: 'comp-navtop',
    templateUrl: './navtop.component.html'
})
export class NavTopComponent implements OnInit {

    constructor(private baseService: CoreBaseService, private router: Router) { }

    ngOnInit() { }

    userName: string;

    isLogged(): boolean {
        if (this.baseService.isUserStored())
        {
            this.userName = this.baseService.getUser().userName;

            return true;
        }

        return false;
    }

    onLogout() {
        this.baseService.removeUser();
        this.router.navigate(['/login']);
    }
}
