import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LaborHourExtraDialogComponent } from '../labor-hour-extra-dialog/labor-hour-extra-dialog.component';
import { LaborHourBreakDialogComponent } from '../labor-hour-break-dialog/labor-hour-break-dialog.component';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';


export interface projectDataListElement5 {
  sort: string;//性質
  date: string;//日期
  man_hour: string;//工時
  create_user: string;//建檔人
  project_id: string;//專案代號
  machine: string;//機台
  title: string;//主題
  action_delete: string;//刪除紐
}

const ElEMENT_DATA_5: projectDataListElement5[] = [
  { sort: '設計', date: '2021/05/28', man_hour: '3.0H', create_user: '吳紹安', project_id: '', machine: '', title: 'CRM問題處理', action_delete: '' },
  { sort: '資料整理', date: '2021/01/08', man_hour: '3.0H', create_user: '吳紹安', project_id: '', machine: '', title: '治具設計送審', action_delete: '' }
]



@Component({
  selector: 'app-labor-hour-dialog',
  templateUrl: './labor-hour-dialog.component.html',
  styleUrls: ['./labor-hour-dialog.component.scss']
})
export class LaborHourDialogComponent implements OnInit {

  @ViewChild('fileUploadDialog') fileUploadDialog!: TemplateRef<any>;

  displayedColumn5: string[] = ['title', 'action_copy', 'action_file', 'action_add', 'action_more_time'];
  datasSource5 = ElEMENT_DATA_5;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  fileItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    const dialogRef = this.dialog.open(this.fileUploadDialog);
    this.dialog.open(FileUploadDialogComponent, {
      data: {
      }
    });
  }

  l_id: any = ''

  //加班
  laborHourExtraView(item: any, item2: any) {
    this.dialog.open(LaborHourExtraDialogComponent, {
      data: {
        l_id: item,
        name: item2
      }
    });
  }

  //補休
  laborHourBreakView(item: any, item2: any) {
    this.dialog.open(LaborHourBreakDialogComponent, {
      data: {
        l_id: item,
        name: item2
      }
    });
  }

}
