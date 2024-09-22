import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateUser, IUser, IUserCount } from '@core/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  route = environment.api + '/user';

  constructor(private http: HttpClient) { }

  getAll(query: string) {
    return this.http.get<IUser[]>(this.route+'/search', { params: { query } });
  }
  
  getCount() {
    return this.http.get<IUserCount>(this.route+'/count');
  }
  
  create(user:ICreateUser) {
    return this.http.post<IUser>(this.route, user);
  }
  
  update(id:number,user:ICreateUser) {
    return this.http.put<IUser>(this.route+`/${id}`, user);
  }

  delete(id:number) {
    return this.http.delete<IUser>(this.route+`/${id}`);
  }
  

}
