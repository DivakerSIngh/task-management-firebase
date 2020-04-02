import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LoaderService {
/**
 *
 */
constructor(private router: Router) {
 
  this.router.events.subscribe(event => {
    if(event instanceof NavigationStart) {
     // this.display(true);
    }
    if(event instanceof NavigationEnd) {
      //this.display(false);
    }
  });
}

  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  display(value: boolean) {
    setTimeout(() => {
      this.status.next(value);
    }, 100);
      
  }



  showNotification(message,type){
    debugger
    //const type = ['','info','success','warning','danger'];
    let msg='Success : '
if(type=='danger'){
  msg='Error : '
}
    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: msg + message

    },{
        type:type,// type[color],
        timer: 4000,
        placement: { 
            from: 'top',
            align: 'right'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

}
