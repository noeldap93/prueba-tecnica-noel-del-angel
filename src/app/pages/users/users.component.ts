import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '@core/interfaces/user';
import { UserApiService } from '@core/services/user-api.service';
import { BehaviorSubject, debounceTime, delay, Observable, shareReplay, startWith, switchMap } from 'rxjs';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  query = ''
  query$ = new BehaviorSubject<string>(this.query);

  dataSource$: Observable<IUser[]> = this.query$.pipe(
    debounceTime(300), // evita que se hagan muchas peticiones en un tiempo corto
    switchMap(query => this.userApi.getAll(query)),
    // startWith([]),
    shareReplay(1),
  );

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  isAdmin$ = this.authService.isAdmin$;

  constructor(
    private userApi: UserApiService,
    private dialog: MatDialog,
    private authService: AuthService,
  ) {
  }

  setQuery($event: string = this.query) {
    this.query = $event;
    this.query$.next(this.query);
    console.log('setQuery', this.query);
  }

  editUser(user: IUser) {
    this.#openEditDialog(user);
  }

  createUser() {
    this.#openEditDialog();
  }


  #openEditDialog(user?: IUser) {
    const ref = this.dialog.open(EditComponent, {
      data: { user }
    });
    const sub = ref.afterClosed().subscribe(result => {
      if (result) this.setQuery();
      sub.unsubscribe();
    })
  }

  deleteUser(user?: IUser) {
    const ref = this.dialog.open(DeleteComponent, {
      data: user
    });
    const sub = ref.afterClosed().subscribe(result => {
      if (result) this.setQuery();
      sub.unsubscribe();
    })
  }
}
