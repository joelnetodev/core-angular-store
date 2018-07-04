import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable()
export class CoreModelValidatorService
{
    private modelError = new Subject<ModelError[]>();

    constructor() {
    }

    getModelErrors(): Observable<ModelError[]>
    {
        return this.modelError as Observable<ModelError[]>;
    }

    setModelErrors(modelErrors: ModelError[]) {
        this.modelError.next(modelErrors);
    }
}

export class ModelError {
    key: string;
    value: string;
}