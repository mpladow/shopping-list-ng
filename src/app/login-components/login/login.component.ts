import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
    FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loggingIn = false;
    formLogin = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });
    constructor(
        private authService: AuthService,
        private alertify: AlertifyService,
        private router: Router
    ) {}

    ngOnInit() {}

    login(e) {
        e.target.disabled = true;
        this.loggingIn = true;
        this.authService.login(this.formLogin.value).subscribe(
            (response) => {
                this.router.navigate(['/recipe-list']);
                e.target.disabled = false;
                this.loggingIn = false;
            },
            (error) => {
              let errorMessage = '';
              console.log(error.message);
              if (error.error.message === undefined){
                errorMessage = 'Unable to contact server. Please try again later.';
              } else {
                errorMessage = error.error.message;
              }
                this.alertify.error(errorMessage);
                e.target.disabled = false;
                this.loggingIn = false;
            }
        );
    }
    logout() {
        localStorage.removeItem('token');
        this.alertify.message('Logged out');
    }
    onTestClick() {
        this.alertify.message('Logged out');
    }
}
