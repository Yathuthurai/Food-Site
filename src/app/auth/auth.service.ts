import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

import { environment } from '../../environments/environment';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  // tslint:disable-next-line:typedef
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        // tslint:disable-next-line:object-literal-shorthand
        email: email,
        // tslint:disable-next-line:object-literal-shorthand
        password: password,
        returnSecureToken: true
      }
      )
      .pipe(catchError(this.handleError), tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  // tslint:disable-next-line:typedef
  login(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
    {
      // tslint:disable-next-line:object-literal-shorthand
      email: email,
      // tslint:disable-next-line:object-literal-shorthand
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
  }));
  }

  // tslint:disable-next-line:typedef
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        // tslint:disable-next-line:align
    const user = new User(email, userId, token, expirationDate);
          // tslint:disable-next-line:align
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
          // tslint:disable-next-line:align
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // tslint:disable-next-line:typedef
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  // tslint:disable-next-line:typedef
  logout() {
     this.user.next(null);
     this.router.navigate(['/auth']);
     localStorage.removeItem('userData');
     if (this.tokenExpirationTimer) {
       clearTimeout(this.tokenExpirationTimer);
     }
     this.tokenExpirationTimer = null;
  }

  // tslint:disable-next-line:typedef
  autoLogout(expirationTime: number) {
    console.log(expirationTime);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
 }

  // tslint:disable-next-line:typedef
  private handleError(errorRes: HttpErrorResponse) {
    // tslint:disable-next-line:prefer-const
    let errorMessage = 'An error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
