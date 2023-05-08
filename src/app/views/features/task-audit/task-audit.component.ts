import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpApiService } from './../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-task-audit',
  templateUrl: './task-audit.component.html',
  styleUrls: ['./task-audit.component.scss']
})
export class TaskAuditComponent implements OnInit {

  displayedColumns: string[] = ['p_code', 'p_name', 'code', 't_name', 'name', 'date_for_estimated_start', 'date_for_estimated_completion', 'bonita_task_id'];
  projectDataSource = new MatTableDataSource();
  totalCount!: number;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  userJson: any
  ngOnInit(): void {
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    console.log(window.localStorage.getItem(TOKEN_KEY))
    //this.getProjectManagerRequsts();

    //取得TM待完工專案任務列表
    this.getUserTmAuditCaseList(this.userJson.account, this.userJson.bonita_user_id)
  }

  projectManagerRequests: any;
  projectDatas: any;

  userTmAuditCaseData: any
  tmAuditCaseTotal: any
  /** 
  * @brief 取得專案負責人(TM)待部門主管完工專案任務資料與筆數
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getUserTmAuditCaseList(account: any, userId: any): void {
    this.HttpApiService.getUserTMAuditCaseList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userTmAuditCaseData = res
      console.log("TM待完工專案任務筆數", this.userTmAuditCaseData.body.length)
      this.tmAuditCaseTotal = this.userTmAuditCaseData.body.length
      console.log("TM待完工專案任務", this.userTmAuditCaseData.body)
      this.showData(this.userTmAuditCaseData.body)
    })
  }

  /** 
  * @brief 顯示表格資料
  *
  * @param data 表格資料
  * @return 回傳有無成功顯示. */
  showData(data: any) {
    console.log(data)
    this.projectDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.projectDataSource.sort = this.sort;
    this.projectDataSource.paginator = this.paginator;
  }


}
