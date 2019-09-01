import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { AuthLoginInfo } from '../../auth/login-info';
import { Router} from '@angular/router';
import {ROUTES_LINK} from '../../services/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  isEmailNotValid = false;
  isPasswordNotValid = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  private emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  HOMEPAGE = '/' + ROUTES_LINK.HOMEPAGE;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }


  connect() {
    this.isLoginFailed = false;
    if(!this.emailRegExp.test(this.form.email) && (!this.form.password ||this.form.password.length  < 6) ) {
      this.isEmailNotValid = true;
      this.isPasswordNotValid = true;
    }
    else if(!this.emailRegExp.test(this.form.email) ) {
      this.isEmailNotValid = true;
    } else if (!this.form.password ||this.form.password.length  < 6) {
      this.isPasswordNotValid = true;
    }else{
        this.isEmailNotValid = false;
        this.isPasswordNotValid = false;
        this.loginInfo = new AuthLoginInfo(this.form.email,this.form.password);
        this.authService.attemptAuth(this.loginInfo).subscribe(
          data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveEmail(data.username);
            //this.tokenStorage.saveAuthorities(data.authorities);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            //this.roles = this.tokenStorage.getAuthorities();
            this.authService.isAuthenticated();
            this.router.navigate(['/']);
          },
          error => {
            if(error.error.status == 401 ){
              this.errorMessage = 'Votre identifiant ou mot de passe est incorrect.';
            }else {
              this.errorMessage ='Une erreur est survenue ! Veuillez réessayer plus tard.';
            }
            this.isLoginFailed = true;
          }
        );
    }

  }


  initBoxLogin() {
    if(this.isEmailNotValid)
      this.isEmailNotValid = false;
  }

  initBoxPassword() {
      if(this.isPasswordNotValid)
      this.isPasswordNotValid = false;
    }

 reloadPage() {
    window.location.reload();
  }

}
