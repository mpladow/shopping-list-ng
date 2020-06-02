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
  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.formLogin.value).subscribe(
      (response) => {
        this.alertify.success('You have logged in successfully');
      },
      (error) => {
        this.alertify.error('error');
      }
    );
  }
  logout(){
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
  }
}
