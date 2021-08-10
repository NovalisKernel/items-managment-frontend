import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') as string)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject?.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next((null as unknown) as User);
    this.router.navigate(['/account/login']);
  }

  register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      username,
      email,
      password,
    });
  }
}
