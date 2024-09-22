import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  auth$ = this.authService.tokenData$;

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
