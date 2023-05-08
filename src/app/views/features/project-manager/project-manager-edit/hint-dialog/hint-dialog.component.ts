import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-hint-dialog',
  templateUrl: './hint-dialog.component.html',
  styleUrls: ['./hint-dialog.component.scss']
})
export class HintDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private laborData:any
  ) { }

  name = this.laborData.name
  ngOnInit(): void {
    console.log(name)

  }

}
