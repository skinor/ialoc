import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PublicComponent } from './public.component';
import { MainComponent } from './main/main.component';
import { ProductsOverviewComponent } from './products/products-overview.component';
import { ProductsComponent } from './products/products.component';
import { AboutOverviewComponent } from './about/about-overview.component';
import { AboutComponent } from './about/about.component';
import { BlogOverviewComponent } from './blog/blog-overview.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {CanDeactivateAuthguardService} from '../auth/authguard.service';
import {ROUTES_LINK} from '../services/routes';
import { TypehomeComponent } from './register/typehome/typehome.component';
import { InteriorhomeComponent } from './register/interiorhome/interiorhome.component';
import { SectorhomeComponent } from './register/sectorhome/sectorhome.component';
import { ContactformComponent } from './register/contactform/contactform.component';
import { HunterchoiceComponent } from './register/hunterchoice/hunterchoice.component';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';


const routes: Routes = [
  {path : '', redirectTo : '/' + ROUTES_LINK.HOMEPAGE, pathMatch: 'full'},
  {path : ROUTES_LINK.SIGN_UP, redirectTo : '/' + ROUTES_LINK.SIGN_UP + '/' + ROUTES_LINK.SIGN_UP_TYPE, pathMatch: 'full'},
  {path : ROUTES_LINK.SIGN_IN, component : LoginComponent, canActivate: [CanDeactivateAuthguardService]},
  {path : ROUTES_LINK.SIGN_UP, component : RegisterComponent,canActivate: [CanDeactivateAuthguardService],
            children : [
              {path : ROUTES_LINK.SIGN_UP_TYPE, component : TypehomeComponent},
              {path : ROUTES_LINK.SIGN_UP_INTERIOR, component : InteriorhomeComponent},
              {path : ROUTES_LINK.SIGN_UP_SECTOR, component : SectorhomeComponent},
              {path : ROUTES_LINK.SIGN_UP_CONTACT, component : ContactformComponent},
              {path : ROUTES_LINK.SIGN_UP_HUNTER, component : HunterchoiceComponent}
              ]
  },
  {path : '', component : PublicComponent,
          children  : [
            {path : ROUTES_LINK.HOMEPAGE, component : HomeComponent},
            {path : ROUTES_LINK.PRODUCTS, component : ProductsComponent},
            {path : ROUTES_LINK.CONCEPT, component : AboutComponent},
            {path : ROUTES_LINK.BLOG, component : BlogOverviewComponent}
          ]
  },
  //{path : '**', redirectTo : '/'+ROUTES_LINK.HOMEPAGE},
  ];



@NgModule({
  declarations: [
    PublicComponent,
    MainComponent,
    ProductsOverviewComponent,
    ProductsComponent,
    AboutOverviewComponent,
    AboutComponent,
    BlogOverviewComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TypehomeComponent,
    InteriorhomeComponent,
    SectorhomeComponent,
    ContactformComponent,
    HunterchoiceComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class HomeModule { }
