import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountLayoutRoutingModule } from './account-layout-routing.module';
import { SigninComponent } from 'app/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatSnackBarModule, MatInputModule, MatRippleModule, MatFormFieldModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { SignupComponent } from 'app/signup/signup.component';
import { AppServiceService } from 'app/services/app-service.service';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [SigninComponent,SignupComponent],
  imports: [
    AccountLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  AngularFireAuthModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFirestoreModule
    
  ],
  providers:[AppServiceService,AngularFireAuth,AngularFirestore]
})
export class AccountLayoutModule { }
