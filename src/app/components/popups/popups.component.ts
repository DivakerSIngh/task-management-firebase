import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.scss']
})
export class PopupsComponent implements OnInit {
  header:string=''
  subheader:string=''
  items:any=[]
  constructor(public dialogRef: MatDialogRef<PopupsComponent>) {}

  ngOnInit() {
  }

}
