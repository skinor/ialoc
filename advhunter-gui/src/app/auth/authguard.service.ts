import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class CanActivateAuthguardService implements CanActivate {

  constructor(private token: TokenStorageService, public authService: AuthService,public router: Router) { }

  canActivate(): Observable<boolean> {
    if(this.token.getToken()) {
      return this.authService.validate()
      .map(st => {
      this.authService.isAuthenticated();
      return true;
    }).catch(err => {
      this.router.navigate(['connexion']);
      return of(false)});
    }
    this.authService.isNotAuthenticated();
    this.router.navigate(['connexion']);
    return of(false);
  }
}


@Injectable()
export class CanDeactivateAuthguardService implements CanActivate {

  constructor(private token: TokenStorageService, public authService: AuthService,public router: Router) { }

  canActivate(): Observable<boolean> {
    if(this.token.getToken()) {
      return this.authService.validate()
      .map(st => {
      this.authService.isAuthenticated();
      this.router.navigate(['acceuil']);
      return false;
    }).catch(err => {
      this.authService.isNotAuthenticated();
      return of(true)});
    }
    this.authService.isNotAuthenticated();
    return of(true);
  }
}


