import { Component, OnInit } from '@angular/core';
import { CoreUserService } from '../../../services/0-core/core.user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuModuleEnum, MenuItemEnum } from '../../../models/Enums/menuEnum';

@Component({
    selector: 'comp-navtop',
    templateUrl: './navtop.component.html'
})
export class NavTopComponent implements OnInit {

    constructor(private userServ: CoreUserService, private router: Router, private activatedRoute: ActivatedRoute) { 
    }

    ngOnInit() { 
        this.module = this.activatedRoute.snapshot.data['module'];
        this.title = this.activatedRoute.snapshot.data['title'];
    }

    menuModuleEnum = MenuModuleEnum;
    menuItemEnum = MenuItemEnum;

    username: string;
    
    module: MenuModuleEnum;
    item: MenuItemEnum;

    title:string;
    

    isLogged(): boolean {
        if(this.userServ.isUserStored()){
            this.username = this.userServ.getUser().username;
            return true;
        }
        return false;
    }

    chooseModuleCSS(module: MenuModuleEnum): string {
        if (module == this.module)
            return "nav-item active";

        return "nav-item";
    }

    chooseItemCSS(item: MenuItemEnum): string {
        if (item == this.item)
            return "nav-item active";

        return "nav-item";
    }

    onLogout() {
        this.userServ.removeUser();
        this.router.navigate(['/login']);
    }
}
