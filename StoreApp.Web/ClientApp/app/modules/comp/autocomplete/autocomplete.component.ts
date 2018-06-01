
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BaseService } from '../../../services/base/base.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'comp-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css']
})
export class AutoCompleteComponent implements OnInit {

    //Input decorator means that a value will be expected through directive with [] in the component tag
    @Input()
    url: string;
    @Input()
    displayPropertyName;

    //Output decorator means that a value will be returned through directive with () in the component tag
    @Output()
    onReturnObject = new EventEmitter<Object>();

    textToSearch = new FormControl();

    resultsFromUrl = this.observableResults();

    constructor(private baseServ: BaseService)
    {    }

    ngOnInit() {
    }

    onSelectItem(itemSelected: Object)
    {
        this.resultsFromUrl = null;

        this.textToSearch.setValue(itemSelected[this.displayPropertyName]);
        this.onReturnObject.emit(itemSelected);

        this.resultsFromUrl = this.observableResults();
    }

    observableResults()
    {
        return Observable.of([])
            .merge(this.textToSearch.valueChanges)
            .filter((txt) => { return txt.length > 2 })
            .debounceTime(700)
            .map((txt) => { return this.url + "/" + txt; })
            .switchMap((path) => { return this.baseServ.httpGet(path); })
            .map((data) => { return data as Object[]; })
            .retry(2);
    }
}