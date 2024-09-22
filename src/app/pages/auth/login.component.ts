import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthApiService } from '@core/services/auth-api.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  moreInfo= false;
  form: FormGroup = new FormGroup({
    email: new FormControl('admin@example.com', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('administrador', Validators.compose([Validators.required, Validators.minLength(8)])),
  });

  constructor(
    private authService: AuthService, 
    private authApi: AuthApiService,
    private router: Router,
  ) { }

  async submit() {
    if (!this.form.valid) return;
    // se solicito manejar todo con observables / rxjs
    let sub = this.authApi.login(this.form.value).pipe(
      tap(result => this.authService.setToken(result.access_token))
    ).subscribe(() => {
      this.router.navigate(['/']);
      sub.unsubscribe();
    });
  }
}