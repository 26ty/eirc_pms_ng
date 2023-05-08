import { Component, OnInit , TemplateRef, ViewChild, ElementRef,  ViewEncapsulation} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface PeriodicElement {
  principal:string;
  source_demand:string;
  model:string;
  fixture_details:string;
  fixture_specifications:string;
  picture_day:string;
  delivery_data:string;
  completion_date:string;
  departure_day:string;
  current_status:string;
}

const ELEMENT_DATA:PeriodicElement[] = [
  {principal:'',source_demand:'專案代號：BA1000-0001', model:'BA1000M000000', fixture_details:'', fixture_specifications:'', picture_day:'', delivery_data:'2017/03/15', completion_date:'', departure_day:'2017/03/23', current_status:'更新專案任務'},
  {principal:'',source_demand:'專案代號：BA1000-0001', model:'BA1000M000000', fixture_details:'', fixture_specifications:'', picture_day:'', delivery_data:'2017/03/15', completion_date:'', departure_day:'2017/03/23', current_status:'更新專案任務'},
];

@Component({
  selector: 'app-fixture-schedule-query',
  templateUrl: './fixture-schedule-query.component.html',
  styleUrls: ['./fixture-schedule-query.component.scss']
})
export class FixtureScheduleQueryComponent implements OnInit {

  @ViewChild('openDialog') openDialog!: TemplateRef<any>;
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  displayedColumns:string[] = ['principal', 'source_demand', 'model', 'fixture_details', 'fixture_specifications', 'picture_day', 'delivery_data', 'completion_date', 'departure_day', 'current_status'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  // 開啟dialog
  // 新增
  openDetails() {
    const dialogRef = this.dialog.open(this.openDialog);
  }

}
