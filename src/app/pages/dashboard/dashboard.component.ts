import { Component, inject } from '@angular/core';
import { UserApiService } from '@core/services/user-api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userApi = inject(UserApiService);
  userCount$ = this.userApi.getCount().pipe(
    map(res => res.count)
  );
}
