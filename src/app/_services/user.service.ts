import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, EditUser } from '../admin/models/user';
import { environment} from '../../environments/environment';


const API_URL = environment.API_URL;

let token: string | null = window.localStorage.getItem('auth-token');
let tokenKey: string = '';
if (token != null) {
  tokenKey = token;
}

const httpOptions = {
  headers: { Authorization: tokenKey, 'Content-Type': 'application/json'}
};



@Injectable({
  providedIn: 'root'
})
export class UserService   {


  constructor(private http: HttpClient) { }
  // 用戶
  userList(): Observable<any>{
    return this.http.get( API_URL + 'user', httpOptions);
  }

  createUser(users: Users): Observable<any> {
    return this.http.post( API_URL + 'user', users, httpOptions);
  }

  editUser(ID: string, editUser:EditUser): Observable<any>{
    return this.http.put( API_URL + `user/${ID}`, editUser, httpOptions);
  }

  deleteUser(ID: string): Observable<any>{
    return this.http.delete( API_URL + `user/${ID}`, httpOptions);
  }
}
