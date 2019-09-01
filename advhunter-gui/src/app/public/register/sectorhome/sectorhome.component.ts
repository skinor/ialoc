import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sectorhome',
  templateUrl: './sectorhome.component.html',
  styleUrls: ['./sectorhome.component.css']
})
export class SectorhomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

  }

  next() {
        this.router.navigate(['/recherche-de-location/contact']);
      }

  previous() {
      this.router.navigate(['/recherche-de-location/interieur']);
    }

}
