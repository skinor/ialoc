import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { AuthService } from '../../auth/auth.service';
import {ROUTES_LINK} from '../../services/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  info: any = {};
  isAuthenticated = false;
  HOMEPAGE = '/' + ROUTES_LINK.HOMEPAGE;
  CONCEPT = '/' + ROUTES_LINK.CONCEPT;
  PRODUCTS = '/' +ROUTES_LINK.PRODUCTS;
  SIGN_IN = '/'+ ROUTES_LINK.SIGN_IN;
  SIGN_UP = '/' + ROUTES_LINK.SIGN_UP;
  MY_ACCOUNT = '/' + ROUTES_LINK.MY_ACCOUNT + '/' + ROUTES_LINK.MY_ACCOUNT_DASHBOARD;

  constructor(private token: TokenStorageService,private authService: AuthService) { }

  ngOnInit() {
     this.authService.authStatusObv.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.token.signOut();
      window.location.reload();
    },
    (error) => {
      console.log('error logout');
    }
    );

  }
}
