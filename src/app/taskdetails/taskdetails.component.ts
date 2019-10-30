import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppServiceService } from 'app/services/app-service.service';
import { MatSnackBar, PageEvent } from '@angular/material';
import { customeFirebaseList } from 'app/common/collection';
import { LoaderService } from 'app/services/loader.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.scss']
})
export class TaskdetailsComponent implements OnInit {

  taskStatusArray:any=[{key:'Not Started',value:'Not Started'},{key:'On Hold',value:'On Hold'},{key:'On Review',value:'On Review'},{key:'In Progress',value:'In Progress'},{key:'Completed',value:'Completed'}]
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
  buttonText:string='Add Task'
  userId:any;
  taskArray:any=[];
  testaa:any=[];
  length=0;
  pageIndex=0;
pageSize = 2;  // set default to 10
pageSizeOptions = [2, 3, 5];
event:any={length: 0, pageIndex: 0, pageSize: 3, previousPageIndex: 0}
  constructor(
    private authservice: AngularFireAuth, private route: Router,
   private appService:AppServiceService,private snackbar:MatSnackBar,
   private loader:LoaderService,
   private db: AngularFirestore
    
    ) { 
      this.loader.display(true);
    }

  ngOnInit() {
    this.userId=localStorage.getItem('userid');
    setTimeout(() => {
      this.getAll(this.event);
    }, 400);
   
  }

  addupdatetask(){
    debugger
    this.frmTaskDetails.value.userid=this.userId;
    if(this.frmTaskDetails.value.$key){
      this.appService.update(customeFirebaseList.task,this.frmTaskDetails.value.$key,this.frmTaskDetails.value).then((data)=>{
        this.frmTaskDetails.reset();
        this.frmTaskDetails.markAsUntouched();
      }).catch((data)=>{
        this.appService.openSnackBar(data.message);
      });
    }else{
      this.appService.add(customeFirebaseList.task,this.frmTaskDetails.value).then((data)=>{
        this.frmTaskDetails.reset();
        this.frmTaskDetails.markAsUntouched();
      }).catch((data)=>{
        this.appService.openSnackBar(data.message);
      });

    }

  }

  getAll(event?: PageEvent){
    
    this.appService.get(customeFirebaseList.task,this.userId).onSnapshot((querySnapshot)=>{
      this.loader.display(false);
      this.taskArray=[];
       querySnapshot.forEach((doc) => {
        let obj=doc.data();
        obj.$key=doc.id;
       this.taskArray.push(obj);
      });
      this.event.length=this.taskArray.length;
    })
  }
  delete(id){
    this.appService.delete(customeFirebaseList.task,id);
  }
  edit(item){
    this.frmTaskDetails.setValue({
$key:item.$key,
userid:item.userid,
project:item.project,
title:item.title,
startdate:new Date(item.startdate.seconds * 1000),
enddate:new Date(item.enddate.seconds * 1000),
status:item.status,
completestatus:item.completestatus,
description:item.description,
hours:item.hours,
dtcreateddate: new Date().toJSON()
    })

  }
  
  showNotification(message,type){

    this.loader.showNotification(message,type);
  }

}
