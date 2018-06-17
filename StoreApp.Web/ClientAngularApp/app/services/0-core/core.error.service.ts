import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class CoreErrorService
{
    url: string;
    status: string;
    message: string;

    constructor() {
    }

    getUrl() {
        return this.url;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

    setError(error: HttpErrorResponse) {
        this.url = error.url;
        this.status = error.statusText;
        this.message = error.error ? error.error : "No messae to display.";
    }

    setDefaults() {
        this.url = "None";
        this.status = "None";
        this.message = "None.";
    }
}