import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {ROUTES_LINK} from '../../services/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isAuthenticated = false;
  SIGN_UP = '/' + ROUTES_LINK.SIGN_UP;
  private emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailNotValid = false;
  email: string;


constructor(private authService: AuthService,public router: Router) { }

  ngOnInit() {
    this.authService.authStatusObv.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  register() {
    if(!this.emailRegExp.test(this.email) ) {
      this.isEmailNotValid = true;
    }else{
      this.router.navigate([this.SIGN_UP]);
    }
  }

   initBoxLogin() {
    if(this.isEmailNotValid)
      this.isEmailNotValid = false;
  }

}
