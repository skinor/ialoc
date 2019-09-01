import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import {CanActivateAuthguardService} from '../auth/authguard.service';
import {ROUTES_LINK} from '../services/routes';

const routes: Routes = [
    {path : ROUTES_LINK.MY_ACCOUNT, redirectTo : '/' + ROUTES_LINK.MY_ACCOUNT + '/' + ROUTES_LINK.MY_ACCOUNT_DASHBOARD, pathMatch: 'full'},

    {path : ROUTES_LINK.MY_ACCOUNT, component : DashboardComponent,
    children  : [
            {path : ROUTES_LINK.MY_ACCOUNT_DASHBOARD, component : MainComponent, canActivate: [CanActivateAuthguardService]}
    ]
  }
  ];



@NgModule({
  declarations: [
  DashboardComponent,
  MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PrivateModule { }
