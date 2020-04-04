import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppServiceService } from 'app/services/app-service.service';
import { MatSnackBar } from '@angular/material';
import { auth } from 'firebase/app';
import { ApiServiceClient } from 'app/services/apiserviceclient';
import { ApiUrl } from 'app/common/constant';
import { LoaderService } from 'app/services/loader.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  userRef: any;
  error='';
  private _frmSignIn = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    password: new FormControl('', [Validators.required, Validators.maxLength(6)])
  });
  public get frmSignIn() {
    return this._frmSignIn;
  }
  public set frmSignIn(value) {
    this._frmSignIn = value;
  }
   constructor(private apiClient:ApiServiceClient,private loader: LoaderService,
    private authservice: AngularFireAuth, private route: Router,
   private appService:AppServiceService,private snackbar:MatSnackBar
    
    ) { }

  // ngOnInit() {
    
  //   this.userdetails = this.firebase.list('userdetails');
  // }

  ngOnInit() {
  }
  togglelogin() {
    document.querySelector('.cont').classList.toggle('s--signup');
  }
  signIn() {
    debugger
    let params=[];
    params.push({
    'email':this.frmSignIn.value.email,
    'password':this.frmSignIn.value.password
    })
    this.apiClient.get(ApiUrl.loginUser,params).subscribe((res)=>{
      this.loader.display(true);
      localStorage.setItem('userid',res.result.id);
      this.route.navigate(['/home/dashboard']);

    },err=>{
      this.loader.showNotification(JSON.parse(err.response).exceptionMessage, 'danger');
    })
  }


  signInFirebase() {
    debugger
    this.appService.doSignIn(this.frmSignIn.value.email, this.frmSignIn.value.password).then((res)=>{
      debugger
      localStorage.setItem('userid',res.user.uid);
      this.route.navigate(['/home/dashboard']);

    }).catch((res)=>{
      this.appService.openSnackBar(res.message);
    })
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.appService.googleLogin(provider);
  }
}
