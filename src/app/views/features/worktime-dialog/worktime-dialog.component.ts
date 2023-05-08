import { Component, OnInit , TemplateRef, ViewChild, ElementRef,  ViewEncapsulation} from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

/*假資料假TABLE*/ 
export interface caseDetailElement {
  workTime: string;
  description: string;
  creatTime: string;
}

const ELEMENT_DATA: caseDetailElement[] = [
  {description: '	BP5100電氣圖面修改', workTime: '6', creatTime: '2021-07-18'},
  {description: '	BP5100電氣圖面修改', workTime: '21', creatTime: '2021-07-20'},
  {description: '	BP5100資料整理', workTime: '15', creatTime: '2021-07-22'},
  {description: '	BP5100資料整理', workTime: '10', creatTime: '2021-07-30'},
];

@Component({
  selector: 'app-worktime-dialog',
  templateUrl: './worktime-dialog.component.html',
  styleUrls: ['./worktime-dialog.component.scss']
})
export class WorktimeDialogComponent implements OnInit {

  displayedColumn: string[] = ['creatTime', 'workTime', 'description'];
  datasSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
