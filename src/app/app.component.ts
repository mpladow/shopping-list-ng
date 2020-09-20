import { Component } from '@angular/core';
import { fadeInAnimation } from './shared/route-animation/route-animation.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeInAnimation],
})
export class AppComponent {
    title = 'Shopping-List-NG';
    
    public getRouterOutletState(outlet) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
