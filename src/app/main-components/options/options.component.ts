import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
    constructor(private router: Router, private alertify: AlertifyService) {}

    ngOnInit() {}
    onNewRecipeClick() {
        this.router.navigate(['/admin-recipe-edit', { id: 0 }]);
    }
    onSignOutClick() {
        localStorage.removeItem('token');
        this.alertify.success('You have been logged out.');
        this.router.navigate(['/login']);
    }
    onAdminCategoryListClick() {
        this.router.navigate(['/admin-category-list']);
    }
}
