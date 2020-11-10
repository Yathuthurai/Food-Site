import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


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

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_RbkFZ2LB5mzGu1OUDZwLKQtcB0sF_vM',
      {
        // tslint:disable-next-line:object-literal-shorthand
        email: email,
        // tslint:disable-next-line:object-literal-shorthand
        password: password,
        returnSecureToken: true
      }
      )
      .pipe(catchError(errorRes => {
        // tslint:disable-next-line:prefer-const
        let errorMessage = 'An error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
        }
        return throwError(errorMessage);
      }));
  }

  // tslint:disable-next-line:typedef
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_RbkFZ2LB5mzGu1OUDZwLKQtcB0sF_vM',
    {
      // tslint:disable-next-line:object-literal-shorthand
      email: email,
      // tslint:disable-next-line:object-literal-shorthand
      password: password,
      returnSecureToken: true
    });
  }
}
