import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    public data: string;
    public queryUpdatedEvent: Event;

    constructor() {}

    ngOnInit() {}
    onDataUpdated(event) {
        this.data = event;
    }
}
