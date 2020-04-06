import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { commonfunction } from 'app/services/common';
import { TaskDetail } from 'app/common/taskdetail';
import { ApiServiceClient } from 'app/services/apiserviceclient';
import { ApiUrl } from 'app/common/constant';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers:[]
})
export class TaskListComponent implements OnInit {
  frmTaskList :FormGroup;
  totalhours:number=0;
  params:any=[]
  frmSearchTask :FormGroup;
  pageEvent: PageEvent;
  projectsArray:any=commonfunction.projectsArray;
  items: FormArray;
  taskDetail:TaskDetail
  taskDetailList:TaskDetail[] =[] as TaskDetail[];
  pageSize:number=2;
  pageNumber:number=0;
  totalRecord:number=0;
  constructor(public datepipe: DatePipe,private formBuilder: FormBuilder,private apiClient:ApiServiceClient) { 
    this.frmTaskList = new FormGroup({   
      items: this.formBuilder.array([])
    })
    this.createForm();
  }
  
  createForm(){
        this.frmSearchTask= new FormGroup({
            project:new FormControl(''),
            fromdate:new FormControl(''),
            todate:new FormControl('')
        })
  }

  filter(){
    this.params=[];
    this.params.push({
      'pageNumber':this.pageNumber,
      'pageSize':this.pageSize,
      'project':this.frmSearchTask.value.project,
      'fromdate':this.datepipe.transform(this.frmSearchTask.value.fromdate, 'yyyy-MM-dd'),
      'todate':this.datepipe.transform(this.frmSearchTask.value.todate, 'yyyy-MM-dd'),
      })
      this.getAll(ApiUrl.search, this.params);
  }
  ngOnInit() {
    this.params=[];
    this.params.push({
    'pageNumber':this.pageNumber,
    'pageSize':this.pageSize
    
    })
    this.getAll(ApiUrl.getAllTask, this.params);
  }

  getAll(url,params){
    this.apiClient.get(url,params).subscribe(response=>{
      this.frmTaskList = new FormGroup({   
        items: this.formBuilder.array([])
      });
      this.items = this.frmTaskList.get('items') as FormArray;
      this.totalRecord=response.pages;
      this.totalhours=response.extra;
        for (let i = 0; i < response.result .length; i++) {
          this.items.push(this.createItem(response.result[i]));
        }
        this.items.push(this.createItem(new TaskDetail(),false));
    })
  }
edit(i){
  debugger
   this.items = this.frmTaskList.get('items') as FormArray;
  // this.items['controls'][i].enable();
  // this.items['controls'][i].value.isDisabled=false
 // let obj=this.items['controls'][i].value;
  let obj=(<FormGroup>this.items['controls'][i]).getRawValue()
  this.items.controls[i].patchValue({
    id:obj.id,
    project:obj.project,
    title:obj.title,
    date:obj.date,
    description:obj.description,
    hours:obj.hours,
    isDisabled:false,
    isPaid:false
  })
  this.items.controls[i].enable();
}
setPage(event){
this.pageSize=event.pageSize;
this.pageNumber=event.pageIndex;
this.params=[];
    this.params.push({
    'pageNumber':this.pageNumber,
    'pageSize':this.pageSize
    })
this.getAll(ApiUrl.getAllTask, this.params);
}


update(i){
  debugger
  this.items = this.frmTaskList.get('items') as FormArray;
let newObj= new TaskDetail();
newObj.userId=localStorage.getItem('userid');
newObj=this.items['controls'][i].value;

this.apiClient.put(ApiUrl.updateTask,newObj).subscribe(response=>{
  debugger
  this.items.controls[i].patchValue({
    id:response.result.id,
    project:response.result.project,
    title:response.result.title,
    date:response.result.date,
    description:response.result.description,
    hours:response.result.hours,
    isDisabled:true,
    isPaid:false
  })
  this.items.controls[i].disable();
})

}
bulkAddUpdate(){}
cancel(){}

createItem(taskDetail,isDisabled:boolean=true): FormGroup {
  
  return this.formBuilder.group({
    id:new FormControl(taskDetail.id),
    project: new FormControl({value: taskDetail.project,disabled: isDisabled}, [ Validators.maxLength(50)]),
    title:new FormControl({value:taskDetail.title,disabled: isDisabled},Validators.required),
    description: new FormControl({value:taskDetail.description,disabled: isDisabled}, [Validators.required, Validators.maxLength(50)]),
    date: new FormControl({value:taskDetail.date,disabled: isDisabled}, [Validators.required, Validators.maxLength(50)]),
    hours:new FormControl({value:taskDetail.hours,disabled: isDisabled}),
    isDisabled:new FormControl(isDisabled),
    isPaid:new FormControl(taskDetail.isPaid),
    userId:new FormControl(localStorage.getItem('userid'))
  });
}

addItem(index): void {
  
  this.items = this.frmTaskList.get('items') as FormArray;
  this.apiClient.post(ApiUrl.saveTask,this.items.value[index]).subscribe((response)=>{
    
    this.items.controls[index].patchValue({
      id:response.result.id,
      project:response.result.project,
      title:response.result.title,
      date:response.result.date,
      description:response.result.description,
      hours:response.result.hours,
      isDisabled:true,
      isPaid:false
    })
    this.items.controls[index].disable();
    this.items.push(this.createItem(new TaskDetail(),false));

  },err=>{
    this.items['controls'][index].value.isDisabled=false;

  })
  
}
  

}
