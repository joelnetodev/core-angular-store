
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BaseService } from '../../services/base/base.service';


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
    @Input()
    valuePropertyName: string = "";

    @Output()
    onReturnObject = new EventEmitter<Object>();

    textToSearch: string = "";

    resultsGet: Object[];

    itemsToShow: AutoCompleteItem[] = [];



    constructor(private baseServ: BaseService) { }

    ngOnInit() { }

    async onTextChange() {

        this.itemsToShow = [];

        if (this.textToSearch == "")
            return;

        this.resultsGet = await this.baseServ.httpGet(this.url + "/" + this.textToSearch) as Object[];   

        this.resultsGet.forEach((objItem) =>
        {
            let filledItem = new AutoCompleteItem();
            filledItem.id = objItem[this.valuePropertyName];
            filledItem.name = objItem[this.displayPropertyName];

            this.itemsToShow.push(filledItem);
        });

    }



    onSelectItem(itemSelected: AutoCompleteItem)
    {
        this.resultsGet.forEach((objItem) => {
            if (itemSelected.id == objItem[this.valuePropertyName])
            {
                this.textToSearch = objItem[this.displayPropertyName];
                this.onReturnObject.emit(objItem);
            }
        });

        this.itemsToShow = [];
    }
}

class AutoCompleteItem
{
    id: any;
    name: any;
}
