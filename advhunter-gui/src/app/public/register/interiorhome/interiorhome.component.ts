import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../auth/token-storage.service';
import {RegisterForm} from '../../../model/register';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {typebiens} from '../../../services/referentiel';
import {piecesType} from '../../../services/referentiel';
import {meubleType} from '../../../services/referentiel';
import {enviesType} from '../../../services/referentiel';
import {commoditesType} from '../../../services/referentiel';
import {otherPiecesType} from '../../../services/referentiel';
import {cuisineType} from '../../../services/referentiel';
import {chauffageType} from '../../../services/referentiel';
import {orientationType} from '../../../services/referentiel';


@Component({
  selector: 'app-interiorhome',
  templateUrl: './interiorhome.component.html',
  styleUrls: ['./interiorhome.component.css','./houseform.scss']
})
export class InteriorhomeComponent implements OnInit {

  activeHomeLabel = '';
  selectedPieces = piecesType;
  selectedMeuble = meubleType;
  selectedType = enviesType;
  selectedCommodities = commoditesType;
  selectedOtherPieces = otherPiecesType;
  selectedCusine = cuisineType;
  selectedChauffage = chauffageType;
  selectedOrientation = orientationType;

  priceFormControl:FormControl;

  surfaceFormControl:FormControl;


  nbPiecesHidden = false;
  form:  RegisterForm ;

  constructor(public router: Router,private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    let price = null;
    let surface = null;
    this.form = this.tokenStorage.getRegisterForm();
    this.activeHomeLabel = typebiens.filter(bien => bien.type === this.form.typebien)[0].label;
    if(this.form.typebien === 'studio') {
      if(this.form.budget != null && this.form.budget >= 100) {
        price = this.form.budget;
      }
      if(this.form.surface != null && this.form.surface >= 10 && this.form.surface <= 40) {
        surface = this.form.surface;
      }
      this.nbPiecesHidden = true;
      this.surfaceFormControl = new FormControl(surface, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*'),
        Validators.min(10),
        Validators.max(40)
      ]);
      this.priceFormControl = new FormControl(price, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*'),
        Validators.min(100)
      ]);
      this.form.budget = price;
      this.form.surface = surface;
      this.initPieceStudio();
    }else if (this.form.typebien === 'appartement'){
        if(this.form.budget != null && this.form.budget >= 100) {
        price = this.form.budget;
      }
      if(this.form.surface != null && this.form.surface >= 18 && this.form.surface <= 350) {
        surface = this.form.surface;
      }

        this.surfaceFormControl = new FormControl(surface, [
          Validators.required,
          Validators.pattern('^[1-9][0-9]*'),
          Validators.min(18),
          Validators.max(350)
      ]);
      this.priceFormControl = new FormControl(price, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*'),
        Validators.min(100)
      ]);
      this.form.budget = price;
      this.form.surface = surface;
      this.initPieceApptMaison();
    }else if (this.form.typebien === 'maison'){

        if(this.form.budget != null && this.form.budget >= 100) {
        price = this.form.budget;
        }
        if(this.form.surface != null && this.form.surface >= 30 && this.form.surface <= 350) {
          surface = this.form.surface;
        }

        this.surfaceFormControl = new FormControl(surface, [
          Validators.required,
          Validators.pattern('^[1-9][0-9]*'),
          Validators.min(30),
          Validators.max(400)
        ]);
        this.priceFormControl = new FormControl(price, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*'),
        Validators.min(100)
      ]);
      this.form.budget = price;
      this.form.surface = surface;
      this.initPieceApptMaison();
    }

    this.initView();
    this.onChanges();
    window.scrollTo(0, 0);

  }

  onChanges() {
    this.priceFormControl.valueChanges.subscribe(val => {
      if(this.priceFormControl.valid){
        this.form.budget = +val;
        this.tokenStorage.saveRegisterForm(this.form);
      }
    });

  this.surfaceFormControl.valueChanges.subscribe(val => {
        if(this.surfaceFormControl.valid){
          this.form.surface = +val;
          this.tokenStorage.saveRegisterForm(this.form);
        }
      });
  }

  initView() {
     this.selectedPieces.forEach(p => p.isChecked = this.form[p.key]);
     this.selectedMeuble.forEach(p => p.isChecked = this.form[p.key]);
     this.selectedType.forEach(p => p.isChecked = this.form[p.key]);
     this.selectedCommodities.forEach(p => p.isChecked = this.form[p.key]);
     this.selectedOtherPieces.forEach(p => p.isChecked = this.form[p.key]);
     this.selectedCusine.forEach(p => p.isChecked = this.form[p.key]);
     this.selectedChauffage.forEach(p => p.isChecked = this.form[p.key]);
     this.selectedOrientation.forEach(p => p.isChecked = this.form[p.key]);
  }

  initPieceStudio() {
    this.form.une_piece = true;
    this.form.deux_pieces = false;
    this.form.trois_pieces = false;
    this.form.quatre_pieces = false;
    this.form.plus_cinq_pieces = false;
    this.tokenStorage.saveRegisterForm(this.form);
  }

  initPieceApptMaison() {
    this.form.une_piece = false;
    this.tokenStorage.saveRegisterForm(this.form);
  }


  select(object) {
    object.isChecked = !object.isChecked;
    this.form[object.key] = object.isChecked;
    this.tokenStorage.saveRegisterForm(this.form);
  }


  next() {
      this.router.navigate(['/recherche-de-location/secteurgeo']);
    }

  previous() {
      this.router.navigate(['/recherche-de-location/typedelocation']);
    }
}
