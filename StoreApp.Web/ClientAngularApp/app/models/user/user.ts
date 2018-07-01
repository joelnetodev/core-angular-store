import { RoleEnum } from "../enums/roleEnum";

/*
This is the main module of an Angular App
It contains the declarations of every others (Main or not) modules, or components or services
*/

export class User
{
    public token: string;
    public username: string;
    public role: RoleEnum;
}
