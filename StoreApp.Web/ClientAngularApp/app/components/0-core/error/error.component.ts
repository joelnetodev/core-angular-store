import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CoreErrorService } from '../../../services/0-core/core.error.service';

@Component({
    selector: 'comp-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

    message: string;

    constructor(private location: Location, private router: ActivatedRoute, private errorServ: CoreErrorService) {
    }

    ngOnInit(): void {
        this.message = this.errorServ.getMessage();
    }
}
