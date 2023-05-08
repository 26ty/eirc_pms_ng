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
  selector: 'app-pm-task-return',
  templateUrl: './pm-task-return.component.html',
  styleUrls: ['./pm-task-return.component.scss']
})
export class PmTaskReturnComponent implements OnInit {

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

  dataSource_1 = new MatTableDataSource();
  //name = '林中庸';
  //account_id = '8a7ca412-8536-4158-8989-63349c8072c6'//徐嘉欣
  //account_id = 'b57fc8f3-0444-42a7-b15d-7526284ea082';//林中庸
  //account_id = 'd65f3750-07cc-4f46-a62c-b2eb374ed8be' //吳
  origin_id = '1e6913f5-55be-413a-94a5-68f8cc67d5b2' //專案任務

  userJson: any
  userAccountId: any//取得登入者
  ngOnInit(): void {
    /*取得使用者資訊*/
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log("userJson", this.userJson)
    /*取得AccountId*/
    this.userAccountId = this.userJson['account_id']
    console.log(this.userAccountId)

    //取得PM會簽任務列表
    this.getUserPmCounterSignList(this.userJson.account, this.userJson.bonita_user_id)
    //this.getUserTaskRequest()
  }


  userPmCounterSignData: any
  tmCounterSignTotal: any
  /** 
  * @brief 取得PM會簽任務列表資料與筆數
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getUserPmCounterSignList(account: any, userId: any): void {
    this.HttpApiService.getUserCounterSignList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userPmCounterSignData = res
      console.log("PM會簽任務筆數", this.userPmCounterSignData.body.length)
      this.tmCounterSignTotal = this.userPmCounterSignData.body.length
      console.log("PM會簽任務", this.userPmCounterSignData.body)
      this.showData(this.userPmCounterSignData.body)
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
