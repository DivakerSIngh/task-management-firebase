import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AccountLayoutComponent } from './layouts/account-layout/account-layout.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full',
  }, 
  {
    path: 'account',
    component: AccountLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/account-layout/account-layout.module#AccountLayoutModule'
    }]
  },
   {
    path: 'home',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
