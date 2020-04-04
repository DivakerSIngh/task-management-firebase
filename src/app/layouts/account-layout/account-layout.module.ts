import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { ApiServiceClient } from 'app/services/apiserviceclient';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SigninComponent,SignupComponent],
  imports: [
    HttpClientModule,
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
  providers:[AppServiceService,AngularFireAuth,AngularFirestore,HttpClient,ApiServiceClient,DatePipe]
})
export class AccountLayoutModule { }
