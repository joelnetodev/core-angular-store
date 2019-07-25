import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CoreErrorService } from '../../../services/0-core/core.error.service';
import { CoreUserService } from '../../../services/0-core/core.user.service';

@Component({
    selector: 'comp-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

    url: string;
    status: string;
    message: string;

    isUserStored: boolean;

    constructor(private userServ: CoreUserService, private location: Location, private router: ActivatedRoute, private errorServ: CoreErrorService) {
    }

    ngOnInit(): void {

        this.isUserStored = this.userServ.isUserStored()

        this.url = this.errorServ.getUrl();
        this.status = this.errorServ.getStatus();
        this.message = this.errorServ.getMessage();

        this.errorServ.setDefaults();

    }
}
