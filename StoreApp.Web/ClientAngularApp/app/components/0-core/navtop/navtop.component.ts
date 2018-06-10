import { Component, OnInit } from '@angular/core';
import { CoreBaseService } from '../../../services/0-core/core.base.service';
import { Router } from '@angular/router';
import { CoreMenuService, MenuModuleEnum, MenuItemEnum } from '../../../services/0-core/core.menu.service';

@Component({
    selector: 'comp-navtop',
    templateUrl: './navtop.component.html'
})
export class NavTopComponent implements OnInit {

    constructor(private baseService: CoreBaseService, private router: Router, private menuServ: CoreMenuService) { }

    ngOnInit() { }

    menuModuleEnum = MenuModuleEnum;
    menuItemEnum = MenuItemEnum;

    userName: string;

    isLogged(): boolean {
        if (this.baseService.isUserStored()){
            this.userName = this.baseService.getUser().userName;
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
        this.baseService.removeUser();
        this.router.navigate(['/login']);
    }
}
