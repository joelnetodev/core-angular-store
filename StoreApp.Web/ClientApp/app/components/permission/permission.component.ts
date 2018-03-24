import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'comp-permission',
    templateUrl: './permission.component.html'
})
export class PermissionComponent implements OnInit {

    constructor(private location: Location, private router: ActivatedRoute) {
    }

    url: string;

    ngOnInit() {
        this.url = this.router.snapshot.params['url'];
    }

    back()
    {
        this.location.back();
    }
}