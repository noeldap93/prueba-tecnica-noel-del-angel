import { Provider } from '@angular/core'
import {AuthInterceptor} from './auth.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ApiErrorInterceptor } from './api-error.interceptor'

export const interceptors = [
  AuthInterceptor,
  ApiErrorInterceptor
]

export const providedInterceptors: Provider[] = interceptors.map(i => ({
    provide: HTTP_INTERCEPTORS,
    useClass: i,
    multi: true
}))