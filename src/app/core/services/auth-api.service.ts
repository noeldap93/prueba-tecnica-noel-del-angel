import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  route = environment.api + '/auth';

  constructor(private http: HttpClient) { }

  login(body: { email: string, password: string }) {
    return this.http.post<IAuthResponse>(this.route + '/login', body);
  }

}
