
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

    @Input()
    url: string = "";
    @Input()
    displayPropertyName: string = "";

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
        this.resultsFromUrl = Observable.of([]);

        this.textToSearch.setValue(itemSelected[this.displayPropertyName]);
        this.onReturnObject.emit(itemSelected);

        this.resultsFromUrl = this.observableResults();
    }

    observableResults()
    {
        return Observable.of([])
            .merge(this.textToSearch.valueChanges)
            .filter((txt) => { return txt.length > 2 })
            .debounceTime(1000)
            .map((txt) => { return this.url + "/" + txt; })
            .switchMap((path) => { return this.baseServ.httpGet(path); })
            .map((data) => { return data as Object[]; })
            .retry(2);
    }
}