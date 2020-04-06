import { Component} from '@angular/core';
import { LoaderService } from './services/loader.service';
import * as signalR from '@aspnet/signalr';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoader :boolean= false;
  connection:any;
  proxy:any;
  constructor(private loaderService:LoaderService) {
    
    
  }

  ngOnInit(){
//this.signalR();
//this.mySignalR();

    setTimeout(() => {
      this.showLoader = false;
    this
    .loaderService
    .status
    .subscribe((val : boolean) => {
      this.showLoader = val;
    });
    }, 500);
    
  }
  }
