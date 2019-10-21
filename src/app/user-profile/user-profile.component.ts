import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppServiceService } from 'app/services/app-service.service';
import { MatSnackBar } from '@angular/material';
import { customeFirebaseList, Collection } from 'app/common/collection';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  frmUserDetails = new FormGroup({
    $key: new FormControl(null),
    userid: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    firstname: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastname: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    fullname: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    company: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    mobile: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    skills: new FormControl('', [Validators.required]),
    profilepic: new FormControl('', [Validators.required]),
    about:new FormControl(''),
    dtcreateddate: new FormControl(new Date().toJSON())
  })


  constructor(
    private authservice: AngularFireAuth, private route: Router,
    private appService: AppServiceService

  ) { }

  ngOnInit() {
    debugger
    var userId = localStorage.getItem('userid');
    this.appService.get(customeFirebaseList.usersProfile, userId)
      // .then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     let data = doc.data();
      //     this.frmUserDetails.setValue({
      //       $key:doc.id,
      //       userid: data.userid,
      //       firstname: data.firstname,
      //       lastname: data.lastname,
      //       fullname: data.fullname,
      //       email: data.email,
      //       company: data.company,
      //       address: data.address,
      //       mobile: data.mobile,
      //       designation: data.designation,
      //       skills: data.skills,
      //       profilepic: data.profilepic,
      //       dtcreateddate: data.dtcreateddate
      //     });
      //     console.log(this.frmUserDetails.value)
      //   });
      // }
      // )
      // .catch((error) => {
      //   console.log("Error getting documents: ", error);
      // });

   
  }
  updateProfile(){
    this.appService.update(customeFirebaseList.usersProfile,this.frmUserDetails.value.$key,this.frmUserDetails.value).then(()=>{
    debugger

    }).catch(()=>{
      debugger


    })

  }

}
