import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.formRegister.value).subscribe(
      () => {
        console.log('registration successful');
        this.alertify.success('Successfully registered. You may now log in.');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        this.alertify.error(error.error.message);
      }
    );
  }

  onSubmit() {
    // hit the register service
  }
}
