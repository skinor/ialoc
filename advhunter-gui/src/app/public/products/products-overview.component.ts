import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.css']
})
export class ProductsOverviewComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authStatusObv.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

}
