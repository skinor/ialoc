import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-about-overview',
  templateUrl: './about-overview.component.html',
  styleUrls: ['./about-overview.component.css']
})
export class AboutOverviewComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authStatusObv.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

}
