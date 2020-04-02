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
  params:any=[]
  frmSearchTask :FormGroup;
  pageEvent: PageEvent;
  projectsArray:any=commonfunction.projectsArray;
  items: FormArray;
  taskDetail:TaskDetail
  taskDetailList:TaskDetail[] =[] as TaskDetail[];
  pageSize:number=10;
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
    this.apiClient.getAll(url,params).subscribe(response=>{
      this.frmTaskList = new FormGroup({   
        items: this.formBuilder.array([])
      });
      this.items = this.frmTaskList.get('items') as FormArray;
      this.totalRecord=response.pages;
        for (let i = 0; i < response.result .length; i++) {
          this.items.push(this.createItem(response.result[i]));
        }
        this.items.push(this.createItem(new TaskDetail(),false));
    })
  }
edit(i){
  this.items = this.frmTaskList.get('items') as FormArray;
  this.items.controls[i].enable();
  this.items.controls[i].value.isDisabled.value=false
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
let newObj= new TaskDetail();
newObj=this.items.controls[i].value;
newObj.id=this.items.controls[i].value.id.value;
newObj.isPaid=this.items.controls[i].value.isPaid.value;
this.apiClient.update(ApiUrl.updateTask,newObj).subscribe(x=>{
})

}


createItem(taskDetail,isDisabled:boolean=true): FormGroup {
  return this.formBuilder.group({
    id:new FormControl({value:taskDetail.id}),
    project: new FormControl({value: taskDetail.project,disabled: isDisabled}, [ Validators.maxLength(50)]),
    title:new FormControl({value:taskDetail.title,disabled: isDisabled},Validators.required),
    description: new FormControl({value:taskDetail.description,disabled: isDisabled}, [Validators.required, Validators.maxLength(50)]),
    date: new FormControl({value:taskDetail.date,disabled: isDisabled}, [Validators.required, Validators.maxLength(50)]),
    hours:new FormControl({value:taskDetail.hours,disabled: isDisabled}),
    isDisabled:new FormControl({value:isDisabled}),
    isPaid:new FormControl({value:taskDetail.isPaid}),
  });
}

addItem(index): void {
  this.items = this.frmTaskList.get('items') as FormArray;
  this.apiClient.save(ApiUrl.saveTask,this.items.value[index]).subscribe(response=>{
    this.items.value[index].id=response.result.id;
    this.items.value[index].isDisabled=true;
     this.items = this.frmTaskList.get('items') as FormArray;
     this.items.push(this.createItem(new TaskDetail(),false));
  })
  
}
  

}
