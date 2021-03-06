import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AccountLayoutComponent } from './layouts/account-layout/account-layout.component';
import { MatProgressSpinnerModule } from '@angular/material';

import { ApiServiceClient } from './services/apiserviceclient';
import { HttpClient } from '@angular/common/http';
import { SignalRClient } from './services/signalrClient';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AccountLayoutComponent
  ],
  providers: [ApiServiceClient,SignalRClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
