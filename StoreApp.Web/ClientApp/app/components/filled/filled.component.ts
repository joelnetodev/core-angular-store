
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BaseService } from '../../services/base/base.service';


@Component({
    selector: 'comp-filled',
    templateUrl: './filled.component.html'
})
export class FilledComponent implements OnInit {

    @Input()
    url: string = "";

    @Input()
    propertyName: string = "";

    @Output()
    onReturnObject = new EventEmitter<Object>();

    textToSearch: string = "";

    constructor(private baseServ: BaseService) { }

    ngOnInit() { }

    async onTextChange() {

        let result = await this.baseServ.httpGet(this.url + "/" + this.textToSearch);   

        this.performResult(result);
    }

    performResult(obj: Object)
    {
        this.onReturnObject.emit(obj);

        let value = obj[this.propertyName];       
        this.textToSearch = value ? value : this.textToSearch;
    }
}
