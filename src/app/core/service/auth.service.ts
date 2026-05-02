import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Token } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
}) 
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private TokenSubject: BehaviorSubject<Token>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.TokenSubject = new BehaviorSubject<Token>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  } 

  public get TokenValue(): Token {
    return this.TokenSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(
      `${environment.apiUrl}/authenticate`, {
        username, password,
      }).pipe(
        map((user) => {
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  // consommation de api login 

  logins(phone: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/login`, {
        phone, password,
      }).pipe(
        map((data : any) => {
          localStorage.setItem('currentUser', JSON.stringify(data.data));
          this.currentUserSubject.next(data.data);
          return data.data;
        })
      );
  }

  logout() {
    this.http.post<any>(
      `${environment.apiUrl}/logout`, {}).subscribe({
        next: (data) => { },
    });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sidebarmenu');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}
