import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      // we want to check to see if the user has been logged in. The currect arguments do not provide this information
    return true;
    }

    this.alertify.error('You must re-enter your login details.');
    this.router.navigate(['/login']);
    return false;
  }
}
