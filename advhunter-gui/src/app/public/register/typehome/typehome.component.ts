import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterForm} from '../../../model/register';
import { TokenStorageService } from '../../../auth/token-storage.service';
import {typebiens} from '../../../services/referentiel';

@Component({
  selector: 'app-typehome',
  templateUrl: './typehome.component.html',
  styleUrls: ['./typehome.component.css']
})
export class TypehomeComponent implements OnInit {
  typebiens = typebiens;
  form: RegisterForm;
  labelType = '';
  typelocation = null;
  constructor(public router: Router,private tokenStorage: TokenStorageService) { }

  ngOnInit() {

    $(document).ready(function(){
          $('[data-toggle="wizard-radio"]').click(function(){
                    var wizard = $(this).closest('.wizard-card');
                    wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
                    $(this).addClass('active');
                    $(wizard).find('[type="radio"]').removeAttr('checked');
                    $(this).find('[type="radio"]').attr('checked','true');
                });
            });

    this.form = this.tokenStorage.getRegisterForm();

    if(this.form == null) {
      this.form = new RegisterForm();
    }else {
      this.typelocation = this.form.typebien;
      this.labelType = typebiens.filter(t => t.type === this.typelocation)[0].label;
    }
    window.scrollTo(0, 0);
  }

  choose(type) {
    this.labelType = type.label;
    this.typelocation = type.type;
  }

  next() {
    this.form.typebien = this.typelocation;
    this.tokenStorage.saveRegisterForm(this.form);
    this.router.navigate(['/recherche-de-location/interieur']);
  }
}
