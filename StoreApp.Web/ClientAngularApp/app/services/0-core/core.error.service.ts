import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';


@Injectable()
export class CoreErrorService
{
    private message: string;

    constructor() {
        this.setDefaultErrorMessage();
    }

    getMessage() {
        return this.message;
    }

    setMessage(message: string) {
        this.message = message;
    }

    setDefaultErrorMessage() {
        this.message = "No errors to show.";
    }
}