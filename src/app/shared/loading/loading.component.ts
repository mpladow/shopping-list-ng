import { LoadingScreenService } from './../../services/loading-screen.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    loadingSubscription: Subscription;

    constructor(private loadingScreenService: LoadingScreenService) {}

    ngOnInit() {
        this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe(
            (value: boolean) => {
                this.loading = value;
            }
        );
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }
}
