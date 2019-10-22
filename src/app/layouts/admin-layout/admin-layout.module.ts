import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MapsComponent } from '../../maps/maps.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSliderModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule
} from '@angular/material';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AppServiceService } from 'app/services/app-service.service';
import { TaskdetailsComponent } from 'app/taskdetails/taskdetails.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSliderModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    MapsComponent,
    TaskdetailsComponent
  ],
  providers:[AppServiceService,AngularFireAuth,AngularFirestore]
})

export class AdminLayoutModule {}
