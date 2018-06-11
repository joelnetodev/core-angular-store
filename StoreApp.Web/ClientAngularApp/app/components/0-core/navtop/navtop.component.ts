import { Component, OnInit } from '@angular/core';
import { CoreUserService } from '../../../services/0-core/core.user.service';
import { Router } from '@angular/router';
import { CoreMenuService, MenuModuleEnum, MenuItemEnum } from '../../../services/0-core/core.menu.service';

@Component({
    selector: 'comp-navtop',
    templateUrl: './navtop.component.html'
})
export class NavTopComponent implements OnInit {

    constructor(private userServ: CoreUserService, private router: Router, private menuServ: CoreMenuService) { }

    ngOnInit() { }

    menuModuleEnum = MenuModuleEnum;
    menuItemEnum = MenuItemEnum;

    username: string;

    isLogged(): boolean {
        if (this.userServ.isUserStored()){
            this.username = this.userServ.getUser().username;
            return true;
        }
        return false;
    }

    chooseModuleCSS(module: MenuModuleEnum): string {
        if (module == this.menuServ.getModule())
            return "nav-item active";

        return "nav-item";
    }

    chooseItemCSS(item: MenuItemEnum): string {
        if (item == this.menuServ.getItem())
            return "nav-item active";

        return "nav-item";
    }

    onLogout() {
        this.userServ.removeUser();
        this.router.navigate(['/login']);
    }
}
