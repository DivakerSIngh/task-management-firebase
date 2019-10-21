import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppServiceService } from 'app/services/app-service.service';
import { MatSnackBar } from '@angular/material';
import { customeFirebaseList } from 'app/common/collection';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.scss']
})
export class TaskdetailsComponent implements OnInit {

  taskStatusArray:any=[{key:'Not Started',value:'Not Started'},{key:'In Progress',value:'In Progress'},{key:'Completed',value:'Completed'}]
  frmTaskDetails = new FormGroup({
    $key: new FormControl(null),
    userid:new FormControl('', [Validators.required]),
    project: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    startdate: new FormControl(new Date(), [Validators.required, Validators.maxLength(50)]),
    enddate: new FormControl(new Date(), [Validators.required, Validators.maxLength(100)]),
    status: new FormControl('', [Validators.required]),
    completestatus: new FormControl(60, [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    hours: new FormControl(0, [Validators.required, Validators.maxLength(10)]),
    dtcreateddate: new FormControl(new Date().toJSON())
  })
  userId:any;
  taskArray:any=[];
  testaa:any=[]
  constructor(
    private authservice: AngularFireAuth, private route: Router,
   private appService:AppServiceService,private snackbar:MatSnackBar
    
    ) { }

  ngOnInit() {
    this.userId=localStorage.getItem('userid');
    this.getAll();
  }

  addupdatetask(){
    this.frmTaskDetails.value.userid=this.userId;
    this.appService.add(customeFirebaseList.task,this.frmTaskDetails.value).then((data)=>{
     
      this.frmTaskDetails.reset();
      this.frmTaskDetails.markAsUntouched();
    }).catch((data)=>{
      this.appService.openSnackBar(data.message);
    });
  }

  getAll(){
    
    this.appService.get(customeFirebaseList.task,this.userId).onSnapshot((querySnapshot)=>{
      this.taskArray=[];
       querySnapshot.forEach((doc) => {
         debugger
        let obj=doc.data();
        obj.$key=doc.id;
       this.taskArray.push(obj);
      });
    })
  }
  delete(id){
    debugger
    this.appService.delete(customeFirebaseList.task,id);

  }
  edit(id){
    //this.appService.update(customeFirebaseList.task,id);

  }

}
