import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	constructor(
		private router: Router,
		private authService: AuthService,
		private alertify: AlertifyService
	) {}

	ngOnInit() {}
	loggedIn() {
		// we need to ensure that this token a correct JWT token
		return this.authService.isLoggedIn();
	}
	logout() {
		localStorage.removeItem('token');
		console.log('logged out');
		this.alertify.success('You have been logged out.');
		this.router.navigate(['/login']);
	}
}
