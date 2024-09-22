import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavModule } from '@core/components/nav/nav.module';
import { providedInterceptors } from '@core/interceptors';
import { MatSnackBarModule} from '@angular/material/snack-bar'
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavModule,
    MatSnackBarModule
  ],
  providers: [
    ...providedInterceptors
  ],
  bootstrap: [
    AppComponent, 
  ]
})
export class AppModule { }
