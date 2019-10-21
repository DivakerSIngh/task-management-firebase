import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppServiceService } from 'app/services/app-service.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Collection,customeFirebaseList } from 'app/common/collection';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  frmSignUp = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    dtactiondate: new FormControl(new Date().toJSON())
  })
  constructor(
    private authservice: AngularFireAuth, private route: Router,
    private appService: AppServiceService, private snackbar: MatSnackBar

  ) { }

  ngOnInit() {
  }

  signUp() {
    this.appService.doSignUp(this.frmSignUp.value.email, this.frmSignUp.value.password).then((item) => {
      Collection.userdetails.email=this.frmSignUp.value.email;
      Collection.userdetails.userid=item.user.uid;
      Collection.userdetails.fullname=this.frmSignUp.value.fullname;
      this.appService.add(customeFirebaseList.usersProfile,Collection.userdetails).then((data)=>{
        localStorage.setItem('userid',item.user.uid);
        this.route.navigate(['/home/dashboard']);
      }).catch((data)=>{
        this.appService.openSnackBar(data.message);
      });
     
    }).catch((error)=>{
      this.appService.openSnackBar(error.message);
    });
  }

}
