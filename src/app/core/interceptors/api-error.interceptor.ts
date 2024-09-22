import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { ToastService } from '@core/services/toast.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const resp = next.handle(request);
    if (!request.url.startsWith(environment.api)) return resp;
    return resp.pipe(
      catchError(error => {
        this.handleUnauthorized(error);
        const handledError = this.canHandleError(error);
        this.toastService.error(handledError);
        throw error;
      })
    );
  }

  canHandleError(error: any): string {
    console.log('Can handle?', error instanceof HttpErrorResponse, error.status, error.error)
    if (error?.error?.message) {
      const message = error.error.message;
      if (typeof message === 'string') return message;
      if (Array.isArray(message)) return 'Error: ' + message.join(', ');
    }
    return 'Unexpected server error, please try again later';
    // if (!(error instanceof HttpErrorResponse)) return null;
    // if (error.status < 400 && error.status <= 500) return null;
  }

  handleUnauthorized(error: any | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      console.log('UNAUTHORIZED executing logout');
      this.authService.logout();
    }
  }
}
