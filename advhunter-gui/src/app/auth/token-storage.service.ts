import { Injectable } from '@angular/core';
import {RegisterForm} from '../model/register';

const TOKEN_KEY = 'AdvToken';
const EMAIL_KEY = 'AdvMail';
const REGISTER_KEY = 'registerform';

const AUTHORITIES_KEY = 'AdvAuthorities';

@Injectable({
providedIn: 'root'
})
export class TokenStorageService {
private roles: Array<string> = [];
constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public getRegisterForm(){
    return JSON.parse(sessionStorage.getItem(REGISTER_KEY));
  }

  public saveRegisterForm(form:RegisterForm) {
    window.sessionStorage.removeItem(REGISTER_KEY);
    window.sessionStorage.setItem(REGISTER_KEY, JSON.stringify(form));
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
