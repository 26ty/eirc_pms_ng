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
  selector: 'app-task-return',
  templateUrl: './task-return.component.html',
  styleUrls: ['./task-return.component.scss']
})
export class TaskReturnComponent implements OnInit {
  //displayedColumns: string[] = ['p_name', 't_name', 'name', 'date_for_estimated_start', 'date_for_estimated_completion', 'action_edit'];
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

    //取得TM待回報專案任務列表
    this.getUserTmCaseList(this.userJson.account, this.userJson.bonita_user_id)
    //this.getUserTaskRequest()
  }


  userTmReturnCaseData: any
  tmCaseTotal: any
  /** 
  * @brief 取得TM待回報專案任務資料與筆數
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getUserTmCaseList(account: any, userId: any): void {
    this.HttpApiService.getUserTMCaseList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userTmReturnCaseData = res
      console.log("TM待回報專案任務筆數", this.userTmReturnCaseData.body.length)
      this.tmCaseTotal = this.userTmReturnCaseData.body.length
      console.log("TM待回報專案任務", this.userTmReturnCaseData.body)
      this.showData(this.userTmReturnCaseData.body)
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

  //--------------------------------------
  /** 
  * @brief 取得專案底下任務(all task)資料
  *
  * @param origin_id 專案任務id(屬於任務負責人)
  * @param userAccountId 使用者帳號
  * @return 回傳有無成功取得. */
  testtaskDatas: any;
  taskDatas: any[] = [];
  totaltask: any;
  getUserTaskRequest(): void {
    this.HttpApiService.getTaskRequestByOriginIdUserId(this.origin_id, this.userAccountId, 1)
      .subscribe(testtaskRequest => {
        console.log(testtaskRequest)
        this.testtaskDatas = testtaskRequest.body.task
        console.log(this.testtaskDatas)
        // for (var i in this.testtaskDatas) {
        //   if (this.testtaskDatas[i].account_id == this.account_id) {
        //     this.taskDatas.push(this.testtaskDatas[i])
        //   }
        // }
        // this.totaltask = testtaskRequest.body.total
        // console.log(this.totaltask / 20)
        // for (var j = 1; j <= (this.totaltask / 20); j++) {
        //   this.HttpApiService.getTaskListUserRequest((j + 1), 20)
        //     .subscribe(testtaskRequest => {
        //       this.testtaskDatas = testtaskRequest.body.task
        //       for (var i in this.testtaskDatas) {
        //         if (this.testtaskDatas[i].account_id == this.account_id) {
        //           this.taskDatas.push(this.testtaskDatas[i])
        //         }
        //       }
        //       this.dataSource_1.data = this.taskDatas;
        //     })
        // }
        // console.log(this.taskDatas)
        this.dataSource_1.data = this.testtaskDatas;
      },
        (err: any) => {
          console.log('err:', err);
        });
  }

}
