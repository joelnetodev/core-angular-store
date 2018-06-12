import { Component, OnInit } from '@angular/core';

import { CoreLoadService } from '../../../services/0-core/core.load.service';

@Component({
    selector: 'comp-load',
    templateUrl: 'load.component.html',
    styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit
{
    isToShow: boolean;

    constructor(private loadServ: CoreLoadService) { }

    ngOnInit()
    {
        //Subscribe the Observer with a callback that is executed everytime that an alert is created in service
        this.loadServ.getIsToShow().subscribe(x =>
        {
            this.isToShow = x;
        });
    }
}