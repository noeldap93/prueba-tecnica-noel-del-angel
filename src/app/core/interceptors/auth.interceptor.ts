import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken()
    console.log('AUTH INTERCEPTOR', token, request.url);
    if (!token 
      || !request.url.startsWith(environment.api)
      || request.url.startsWith(environment.api+'/auth/')
    ) {
      return next.handle(request);
    }
    console.log('Agregando header con token');
    const newHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    //clone request and change header
    let clone = request.clone({ headers: newHeaders });
    return next.handle(clone);
  }
}
