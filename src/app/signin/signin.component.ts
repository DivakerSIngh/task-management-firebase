import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppServiceService } from 'app/services/app-service.service';
import { MatSnackBar } from '@angular/material';
import { auth } from 'firebase/app';
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
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  public get frmSignIn() {
    return this._frmSignIn;
  }
  public set frmSignIn(value) {
    this._frmSignIn = value;
  }
   constructor(
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
