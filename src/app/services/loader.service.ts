import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

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
      this.status.next(value);
  }
}
