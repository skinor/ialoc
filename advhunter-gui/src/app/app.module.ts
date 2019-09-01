import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {HomeModule} from './public/home.module';
import {PrivateModule} from './private/private.module';
import { HttpClientModule } from '@angular/common/http';
import {AuthInterceptor} from  './auth/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {CanActivateAuthguardService, CanDeactivateAuthguardService} from './auth/authguard.service';

export const httpInterceptorProviders = [
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];


const routes: Routes = [];
//{path : '', redirectTo : '', pathMatch: 'full'},
//{path: 'accueil', loadChildren : './public/home.module.ts#HomeModule'}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    PrivateModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
    ],
  providers: [httpInterceptorProviders,CanActivateAuthguardService, CanDeactivateAuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
