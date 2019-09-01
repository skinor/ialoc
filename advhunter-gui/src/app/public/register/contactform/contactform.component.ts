import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

  }

  next() {
      this.router.navigate(['/recherche-de-location/monchasseur']);
    }

  previous() {
      this.router.navigate(['/recherche-de-location/secteurgeo']);
    }

}
