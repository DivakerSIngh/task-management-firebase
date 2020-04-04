import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
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
  MatPaginatorModule,
  MatDialogModule,
  MatCheckboxModule
} from '@angular/material';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AppServiceService } from 'app/services/app-service.service';
import { TaskdetailsComponent } from 'app/taskdetails/taskdetails.component';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { PopupsComponent } from 'app/components/popups/popups.component';
import { TaskListComponent } from 'app/task-list/task-list.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ApiServiceClient } from 'app/services/apiserviceclient';
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatCheckboxModule,
    MatInputModule,
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
    AngularFirestoreModule,
    MatDialogModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    MapsComponent,
    TaskdetailsComponent,
    PopupsComponent,TaskListComponent 
  ],
  providers:[AppServiceService,AngularFireAuth,AngularFirestore,HttpClient,ApiServiceClient,DatePipe],
  entryComponents:[PopupsComponent]
})

export class AdminLayoutModule {}
