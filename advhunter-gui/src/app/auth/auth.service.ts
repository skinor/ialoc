import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusSource = new BehaviorSubject<boolean>(false);
  authStatusObv = this.authStatusSource.asObservable();

  private loginUrl = 'http://localhost:8080/auth/connect';
  private signupUrl = 'http://localhost:8080/auth/register';
  private validateTokenUrl = 'http://localhost:8080/auth/validate';
  private logoutUrl = 'http://localhost:8080/auth/logout';


  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  logout() : Observable<any> {
    return this.http.get<any>(this.logoutUrl);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  validate(): Observable<any> {
    return this.http.get<any>(this.validateTokenUrl);
  }

  updateAuthStatus(isAuthenticated: boolean) {
    this.authStatusSource.next(isAuthenticated);
  }

  isAuthenticated() {
    this.authStatusSource.next(true);
  }

  isNotAuthenticated() {
    this.authStatusSource.next(false);
  }




}
