import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
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
      );
  }
}
