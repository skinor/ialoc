import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hunterchoice',
  templateUrl: './hunterchoice.component.html',
  styleUrls: ['./hunterchoice.component.css']
})
export class HunterchoiceComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

  }

  previous() {
      this.router.navigate(['/recherche-de-location/contact']);
    }

}
