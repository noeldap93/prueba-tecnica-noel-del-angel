import { inject, Inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { BehaviorSubject, map } from 'rxjs';
import { AUTH_STORAGE_KEY, AUTH_ROUTE } from '../constants';
import { ITokenData } from '../interfaces/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);

  accessToken$ = new BehaviorSubject<string | null>(this.getToken());
  tokenData$ = this.accessToken$.pipe(map(tokens => this.getTokenData(tokens)));
  isAdmin$ = this.tokenData$.pipe(map(tokenData => this.isAdmin(tokenData)));

  setToken(token: string) {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
    this.updateTokens();
  }

  getToken(): string | null {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    return token || null;
  }

  getTokenData(token = this.getToken()): ITokenData | null {
    return token ? jwtDecode(token) : null;
  }

  isAdmin(data = this.getTokenData()): boolean {
    return data?.admin || false;
  }

  updateTokens() {
    this.accessToken$.next(this.getToken());
  }

  // constructor() {
  //   // (window as any).$authService = this;
  //   // this.updateTokens();
  // }

  async logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.updateTokens();
    this.navigateToAuth();
  }
  
  navigateToAuth(){
    this.router.navigate([AUTH_ROUTE]);
  }
}
