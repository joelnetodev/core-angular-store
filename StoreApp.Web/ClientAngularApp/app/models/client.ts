/*
This is the main module of an Angular App
It contains the declarations of every others (Main or not) modules, or components or services
*/

export class Client
{
    public id: number;
    public name: string;
    public number: string;
    public address: string;
    public city: string;
    public state: string;
    public isActive: boolean;
    public contacts: ClientContact[] = new Array<ClientContact>();
}

export class ClientContact {
    public id: number;
    public name: string;
    public phoneNumber: string;
    public email: string;
}
