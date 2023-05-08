import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-case-dialog',
  templateUrl: './case-dialog.component.html',
  styleUrls: ['./case-dialog.component.scss']
})

export class CaseDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  caseListData: any[] = []

  ngOnInit(): void {

    console.log(this.data)
    for(let i in this.data){
      this.caseListData.push(this.data[i])
    }

    console.log(this.caseListData)
  }


}
