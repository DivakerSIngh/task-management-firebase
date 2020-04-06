import { LoaderService } from "./loader.service";
import { environment } from "environments/environment";
import { Subject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

  declare var $: any;
  @Injectable({providedIn: 'root'})
  export class SignalRClient {
    connection:any;
    proxy:any;
    constructor(){
this.pushSignalR();
    }

    private Item : Subject<any> = new Subject<any>();
    getNotification() : Observable<any>{
      return this.Item.asObservable();
    }
  
    setNotification(data : any) {
      this.Item.next(data);
    }
    


    pushSignalR(){
        try {
          this.connection = $.hubConnection(environment.signalRHuburl);
          this.connection.logging = false;
          this.proxy = this.connection.createHubProxy('notificationHub');
          this.proxy.on('pushNewContent', (data: string) => {
              debugger
            this.setNotification(data);
            //this.loaderService.showNotification("signla r "+data,"success");
          });
          this.connection.start().done((data: any) => {
            console.log('Hub started');
          }).catch(error => {
            
            console.error('Hub Connection Error -> ' + error);
          });
          this.connection.disconnected(() => {
            window.setTimeout(() => {
              this.connection.start().done((data: any) => {
               
               console.log('Hub started');
              }).catch(error => {
                
                console.error('Hub Connection Error -> ' + error);
              })
            }, 5000);
           
          });
        } catch (err) {
          console.error("Error in setting up Socket Infrastructure" + JSON.stringify(err));
        }
      }
}
