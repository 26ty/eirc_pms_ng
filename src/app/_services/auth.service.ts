import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const API_URL = environment.LOGIN_API_URL;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;



  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post( API_URL + 'login', {
      username,
      password
    }, httpOptions);

  }

  logined(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true )
    );
  }

  logout(): void {
    console.log(window.localStorage.getItem('auth-token'));
    this.isLoggedIn = false;
    window.localStorage.removeItem('auth-token');
    }
}
