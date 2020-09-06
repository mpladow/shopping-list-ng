import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnChanges {
    data: string;
    @Output()
    public dataUpdated: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {}
    ngOnChanges() {
        this.onChange(); 
    }
    onChange() {
    //     console.log(this.data);
    //   console.log(e.target.value);
        this.dataUpdated.emit(this.data);
    }
    onClear() {
        this.data = '';
        this.onChange();
    }
}
