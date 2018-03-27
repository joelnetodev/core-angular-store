
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BaseService } from '../../../services/base/base.service';


@Component({
    selector: 'comp-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css']
})
export class AutoCompleteComponent implements OnInit {

    @Input()
    url: string = "";
    @Input()
    displayPropertyName: string = "";

    @Output()
    onReturnObject = new EventEmitter<Object>();

    textToSearch: string = "";
    itemsFromUrl: Object[];

    constructor(private baseServ: BaseService) { }

    ngOnInit() { }

    async onTextChange() {

        this.itemsFromUrl = [];

        if (this.textToSearch.length < 2)
            return;

        this.itemsFromUrl = await this.baseServ.httpGet(this.url + "/" + this.textToSearch) as Object[];
    }

    onSelectItem(itemSelected: Object) {
        this.textToSearch = itemSelected[this.displayPropertyName];
        this.onReturnObject.emit(itemSelected);
        this.itemsFromUrl = [];
    }
}

