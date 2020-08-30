import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit, isDevMode } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public showBackButton = true;
    public showDevIcon = false;
    public showSearchBar = false;
    constructor(
        private router: Router,
        private authService: AuthService,
        private alertify: AlertifyService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        if (isDevMode()) {
            this.showDevIcon = true;
        } else {
            this.showDevIcon = false;
        }
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.checkIfRootPage(event['url']);
            }
        });
    }
    loggedIn() {
        // we need to ensure that this token a correct JWT token
        return this.authService.isLoggedIn();
    }
    // MENU OPTIONS
    onNewRecipeClick() {
        this.router.navigate(['/admin-recipe-edit', { id: 0 }]);
    }
    logout() {
        localStorage.removeItem('token');
        this.alertify.success('You have been logged out.');
        this.router.navigate(['/login']);
    }
    checkIfRootPage(url) {
        if (url === '/main' || url === '/') {
            this.showBackButton = false;
            this.showSearchBar = true;
        } else {
            this.showBackButton = true;
            this.showSearchBar = false;
        }
    }
}
