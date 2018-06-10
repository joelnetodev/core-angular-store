import { Injectable } from '@angular/core';


@Injectable()
export class CoreMenuService
{
    private module: MenuModuleEnum;
    private item: MenuItemEnum;

    constructor() {
        this.module = MenuModuleEnum.Home;
    }

    setModule(module: MenuModuleEnum){
        this.module = module;
    }

    setItem(item: MenuItemEnum) {
        this.item = item;
    }

    getModule() { return this.module; }
    getItem() { return this.item; }
}

export enum MenuModuleEnum {
    Home,
    Login,
    Register,
    Products,
    Items
}

export enum MenuItemEnum {
    Test
}