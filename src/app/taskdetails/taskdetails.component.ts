import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppServiceService } from 'app/services/app-service.service';
import { MatSnackBar, PageEvent, MatDialog, MatDialogRef } from '@angular/material';
import { customeFirebaseList } from 'app/common/collection';
import { LoaderService } from 'app/services/loader.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { stringify } from '@angular/compiler/src/util';
import { commonfunction } from 'app/services/common';
import { PopupsComponent } from 'app/components/popups/popups.component';
import { TaskDetail } from 'app/common/taskdetail';
import { ApiServiceClient } from 'app/services/apiserviceclient';
import { ApiUrl } from 'app/common/constant';


@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.scss']
})
export class TaskdetailsComponent implements OnInit {
  dialogRef: MatDialogRef<PopupsComponent>;
  taskStatusArray:any=commonfunction.taskStatusArray
  projectsArray:any=commonfunction.projectsArray
  frmTaskDetails = new FormGroup({
    $key: new FormControl(null),
    userid:new FormControl('', [Validators.required]),
    project: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    startdate: new FormControl(new Date(), [Validators.required, Validators.maxLength(50)]),
    enddate: new FormControl(new Date(), [Validators.required, Validators.maxLength(100)]),
    status: new FormControl('In Progress', [Validators.required]),
    completestatus: new FormControl(0, [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    hours: new FormControl(0, [Validators.required, Validators.maxLength(10)]),
    givenhours: new FormControl(0, [Validators.required, Validators.maxLength(1)]),
    dtcreateddate: new FormControl(new Date().toJSON()),
    isdeleted:new FormControl(0)
  })
  buttonText:string='Add Task'
  userId:any;
  taskArray:any=[];
  testaa:any=[];
  length=0;
  pageIndex=0;
pageSize = 2;  // set default to 10
pageSizeOptions = [2, 3, 5];
totalHours:number=0;
event:any={length: 0, pageIndex: 0, pageSize: 3, previousPageIndex: 0}
  constructor(
    private apiclinet:ApiServiceClient,
    private authservice: AngularFireAuth, private route: Router,
   private appService:AppServiceService,private snackbar:MatSnackBar,
   private loader:LoaderService,
   private db: AngularFirestore,
   public dialog: MatDialog
    
    ) { 
      //this.loader.display(true);
      
    }

  ngOnInit() {
    this.userId=localStorage.getItem('userid');
    setTimeout(() => {
      this.getAll(this.event);
    }, 400);
   
  }

  showDetails(item) {
  
      // const dialogRef = this.dialog.open(PopupsComponent, {
      //   width: '250px',
      //   data: {name: item.title, animal: item.title}
      // });

     
    this.dialogRef = this.dialog.open(PopupsComponent, {
      width:'auto'
    });
    this.dialogRef.componentInstance.header="Task Details"
    this.dialogRef.componentInstance.subheader=item.title;
    this.dialogRef.componentInstance.items=item.description.split(',');
   
    this.dialogRef.afterClosed().subscribe(result => {

    });

  }
  addupdatetask(){
    debugger
    this.frmTaskDetails.value.userid=this.userId;
    if(this.frmTaskDetails.value.$key){
     
      // this.frmTaskDetails.setValue({
      //   dtcreateddate:new Date().toJSON(),
      //   completestatus:0,
      //   enddate:new Date(),
      //   status:'In Progress',
      //   hours:8

      // })
      this.frmTaskDetails.value.enddate=new Date();


      this.appService.update(customeFirebaseList.task,this.frmTaskDetails.value.$key,this.frmTaskDetails.value).then((data)=>{
        this.frmTaskDetails.reset();
        this.loader.showNotification("task updated successfull","success");
        this.buttonText='Add Task';
        this.frmTaskDetails.markAsUntouched();
      }).catch((data)=>{
        this.loader.showNotification(data.message,"error");
      });
    }else{
      this.appService.add(customeFirebaseList.task,this.frmTaskDetails.value).then((data)=>{
        this.loader.showNotification("task added successfull","success");
        this.buttonText='Add Task';
        this.frmTaskDetails.reset();
        this.frmTaskDetails.markAsUntouched();
      }).catch((data)=>{
        this.loader.showNotification(data.message,"error");
      });

    }

  }

  getAll(event?: PageEvent){
    try {
      this.appService.get(customeFirebaseList.task,this.userId).onSnapshot((querySnapshot)=>{
        this.loader.display(false);
        debugger
        this.taskArray=[];
       
         querySnapshot.forEach((doc) => {
          let obj=doc.data();
          let dt=new Date(obj.startdate.seconds*1000);
          debugger
          // let taskobj=new TaskDetail();
          // taskobj.title=obj.title;
          // taskobj.project=obj.project;
          // taskobj.description=obj.description;
          // taskobj.hours=obj.givenhours;
          // taskobj.date=(dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate());
          // taskobj.isPaid=false;
          debugger
// this.apiclinet.save(ApiUrl.saveTask,taskobj).subscribe(x=>{


// })


          obj.$key=doc.id;
          if(!obj.hasOwnProperty('givenhours')){
            obj['givenhours']=0;
          }
          if(!obj.hasOwnProperty('isdeleted')){
            obj['isdeleted']=0;
          }
        
         this.taskArray.push(obj);
        });
        this.event.length=this.taskArray.length;

        this.taskArray.forEach(element => {
          this.totalHours=this.totalHours+  element.givenhours
        });
        
      })
    } catch (error) {
      debugger
    }
    
  }
  delete(id){
    this.appService.disabledRecord(customeFirebaseList.task,id,{'isdeleted':1});
  }
  edit(item){

    item.dtcreateddate=new Date().toJSON();
    item.completestatus=0;
    item.enddate=new Date();
    item.status='In Progress';
    item.hours=8;



    this.buttonText='Update Task';
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
givenhours:item.givenhours,
isdeleted:item.isdeleted,
dtcreateddate: new Date().toJSON()
    })

  }
  
  showNotification(message,type){

    this.loader.showNotification(message,type);
  }
  cancel(){
    this.frmTaskDetails.reset();
    this.frmTaskDetails.markAsUntouched();
    this.buttonText='Add Task';
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
