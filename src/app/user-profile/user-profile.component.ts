import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppServiceService } from 'app/services/app-service.service';
import { MatSnackBar } from '@angular/material';
import { customeFirebaseList, Collection } from 'app/common/collection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from 'app/services/loader.service';
import { ApiServiceClient } from 'app/services/apiserviceclient';
import { ApiUrl } from 'app/common/constant';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  frmUserDetails = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    organization: new FormControl('', [Validators.maxLength(100)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    mobileNo: new FormControl('', [Validators.maxLength(10)]),
    designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    skill: new FormControl(''),
    ratePerhours: new FormControl(''),
    about:new FormControl(''),
    // dtcreateddate: new FormControl(new Date().toJSON())
  })


  constructor(
    private authservice: AngularFireAuth, private route: Router,private apiclient:ApiServiceClient,
    private appService: AppServiceService,private loader:LoaderService

  ) { 
    this.loader.display(true);
  }

getuser(){
  debugger

  var userId = localStorage.getItem('userid');
  let param=[];
  param.push({'userId':userId})

this.apiclient.get(ApiUrl.getUser,param).subscribe(data=>{
  debugger
  this.frmUserDetails.patchValue({
    $key: data.result.id,
    id: data.result.id,
    name: data.result.name,
    email: data.result.email,
    organization: data.result.organization,
    address: data.result.address,
    mobileNo: data.result.mobileNo,
    designation: data.result.designation,
    skill: data.result.skill,
    about: data.result.about,
    ratePerhours: data.result.ratePerhours,
    
  });
 
});



}

  getUserDetailsFirebase(){
    debugger
    //this.loader.display(true);
    var userId = localStorage.getItem('userid');
    this.appService.get(customeFirebaseList.usersProfile, userId)
    .onSnapshot((querySnapshot)=>{  
      this.frmUserDetails.reset(); 
      this.loader.display(false);   
       querySnapshot.forEach((doc) => {
        let data=doc.data();
        this.frmUserDetails.setValue({
                $key:doc.id,
                id: data.userid,
                firstname: data.firstname,
                lastname: data.lastname,
                fullname: data.fullname,
                email: data.email,
                company: data.company,
                address: data.address,
                mobile: data.mobile,
                designation: data.designation,
                skills: data.skills,
                profilepic: data.profilepic,
                dtcreateddate: data.dtcreateddate,
                about:data.dtcreateddate,
              });
             
      });
    
    },(err)=>{
      
    })    
  }
  ngOnInit() {
    this.getuser();
  }
  updateProfile(){
    this.apiclient.put(ApiUrl.updateUser,this.frmUserDetails.value).subscribe(response=>{
    });
  }

  ngOnDestroy(){
    
  }

}
