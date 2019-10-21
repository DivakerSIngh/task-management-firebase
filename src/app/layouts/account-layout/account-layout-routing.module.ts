import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from 'app/signin/signin.component';
import { SignupComponent } from 'app/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo:'login'},
  { path: 'login',      component: SigninComponent },
  { path: 'signup',   component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountLayoutRoutingModule { }
