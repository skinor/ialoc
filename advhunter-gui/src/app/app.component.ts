import { Component } from '@angular/core';

import { TokenStorageService } from './auth/token-storage.service';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  info: any;

  constructor(private token: TokenStorageService, private authService: AuthService) { }

  ngOnInit() {
    if(this.token.getToken()){
      this.authService.validate()
      .subscribe(st => this.authService.isAuthenticated(), (error) => this.token.signOut());
    }else{
      this.authService.isNotAuthenticated();
    }
  }
}
