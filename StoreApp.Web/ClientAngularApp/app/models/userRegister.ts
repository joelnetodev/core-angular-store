import { RoleEnum } from "./Enums/roleEnum";

/*
This is the main module of an Angular App
It contains the declarations of every others (Main or not) modules, or components or services
*/

export class UserRegister
{
    public name: string;
    public username: string;
    public password: number;
    public role: RoleEnum;

    constructor() {
        this.role = RoleEnum.Regular;
    }
}
