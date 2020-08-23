import { environment } from './../../environments/environment';
import { AccountVM } from './../models/account';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl =  environment.apiUrl + 'account/'; 
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private alertify: AlertifyService) {}

  register(model: AccountVM) {
    console.log(model);
    console.log(`${this.baseUrl}register`);
    return this.http.post(`${this.baseUrl}register`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }
  login(model: AccountVM) {
    return this.http.post(`${this.baseUrl}authenticate`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }
  isLoggedIn() {
    // get token from local storage
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
