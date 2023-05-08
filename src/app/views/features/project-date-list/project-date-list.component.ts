import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { HttpApiService } from './../../../api/http-api.service';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';


@Component({
  selector: 'app-project-date-list',
  templateUrl: './project-date-list.component.html',
  styleUrls: ['./project-date-list.component.scss']
})
export class ProjectDateListComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('scheduleDialog') scheduleDialog!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;

  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale
  projectManagerCol: string[] = ['status','code', 'p_name', 'projectman_name', 'customer_name', 'date_for_start', 'date_for_end','inner_id', 'date_for_pay', 'date_for_delivery'];
  projectManagerDataSource = new MatTableDataSource();

  
  //input value
  value = '';

  constructor(
    public dialog: MatDialog,
    private HttpApiService: HttpApiService
  ) { }

  ngOnInit(): void {
    this.getProjectManagerRequsts();
  }

  //專案代號option
  projectCode_option: any[] = [];
  /** 
  * @brief 搜尋資料
  *
  * @param event 事件*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectManagerDataSource.filter = filterValue.trim().toLowerCase();
  }

  projectManagerRequests: any;
  projectDatas: any;
  totalCount: number;
  inner_id:any
  newProjectDatas: any[] = [];

  /** 
  * @brief 取得All project資料
  * @return 回傳有無成功取得專案資料. */
  getProjectManagerRequsts(): void {
    //換成projectListUser
    this.HttpApiService.getProjectListRequest_t(1, 20).subscribe(projectManagerRequests => {
      this.projectDatas = projectManagerRequests.body.project;
      console.log("projectDatas",this.projectDatas)
      for(let i in this.projectDatas){
        console.log(this.projectDatas[i].inner_id)

        if (this.projectDatas[i].date_for_pay == "0001-01-01T00:00:00Z") {
          this.projectDatas[i].date_for_pay = ''
        }
        if (this.projectDatas[i].date_for_delivery == "0001-01-01T00:00:00Z") {
          this.projectDatas[i].date_for_delivery = ''
        }
      }
      for (let i in projectManagerRequests.body.project) {
        if (projectManagerRequests.body.project[i].status != '產銷建檔中') {
          if (projectManagerRequests.body.project[i].status == '待專案啟動') {
            projectManagerRequests.body.project[i].status = '建檔中'
            console.log(projectManagerRequests.body.project[i])
          }

          this.newProjectDatas.push(projectManagerRequests.body.project[i])
          this.projectCode_option.push(projectManagerRequests.body.project[i].code)

        }
      }
      console.log(this.newProjectDatas)
      console.log(this.projectCode_option)

      this.showData(this.newProjectDatas)

    },
      (err: any) => {
        console.log('err:', err);
      }
    );
  }

  account_id: string
  /** 
  * @brief 顯示資料
  *
  * @param data 專案資料
  * @return 回傳有無成功顯示專案資料. */
  showData(data: any) {
    this.projectManagerDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.projectManagerDataSource.sort = this.sort;
    this.projectManagerDataSource.paginator = this.paginator;

  }

  //搜尋input
  serchValue = new FormControl();
  serchOption: string[] = [];

  /** 
  * @brief 開啟該專案修改日期視窗
  *
  * @param item 儲存p_id參數傳送至視窗ts*/
  openSchedule(item: any) {
    this.dialog.open(ScheduleDialogComponent, {
      data: {
        p_id: item
      }
    });
  }

}
