import { Component, OnInit } from '@angular/core';

import { CoreLoadService } from '../../../services/0-core/core.load.service';

@Component({
    selector: 'comp-load',
    templateUrl: 'load.component.html',
    styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit
{
    constructor(private loadServ: CoreLoadService) { }

    ngOnInit()
    {

    }

    isToShow(): boolean {
        return this.loadServ.getIsToShow();
    }
}