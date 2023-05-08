import { HttpApiService } from './../../../api/http-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-person-today-list',
  templateUrl: './person-today-list.component.html',
  styleUrls: ['./person-today-list.component.scss']
})
export class PersonTodayListComponent implements OnInit {

  //displayedColumns: string[] = ['code','p_name', 't_name', 'date_for_estimated_start','date_for_estimated_completion','action_edit'];

  displayedColumns: string[] = ['status','code', 'p_name', 'customer_name',  'date_for_start', 'action_edit'];
  projectDataSource = new MatTableDataSource();
  totalCount!: number;

  displayedColumns_CR: string[] = ['create_time', 'code', 'demand_content', 'salesman_dep', 'salesman_name', 'action_edit'];
  crDataSource = new MatTableDataSource();
  totalCount_CR!: number;

  displayedColumns_CRtask: string[] = ['code', 'subject', 'department', 'poster', 'action_edit'];
  DataSource_CRtask = new MatTableDataSource();
  totalCount_CRtask!: number;

  taskReturnDisplayedColumns: string[] = ['p_code', 'p_name', 'code', 't_name', 'name', 'date_for_estimated_start', 'date_for_estimated_completion', 'bonita_task_id'];
  taskReturnDataSource = new MatTableDataSource();
  taskReturnTotalCount!: number;

  account_id: any
  origin_id = '1e6913f5-55be-413a-94a5-68f8cc67d5b2' //專案任務
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  userJson: any
  ngOnInit(): void {
    /*取得使用者資訊*/
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log("userJson", this.userJson)

    /*取得AccountId*/
    this.account_id = this.userJson['account_id']
    console.log(this.account_id)

    //this.getProjectManagerRequsts();
    //取得task資料
    // this.getTaskRequest();

    if (this.userJson != null) {
      //取得PM待回報專案列表
      this.getUserCaseList(this.userJson.account, this.userJson.bonita_user_id)

      //取得TM待回報專案任務列表
      this.getUserTmCaseList(this.userJson.account, this.userJson.bonita_user_id)

      //A1獲取使用者可執行的單 (業務經理審核)
      this.getCrReturnList_A1(this.userJson.account, this.userJson.bonita_user_id);

      //客需單帶回報任務
      this.getTaskFinishReturnList(this.userJson.account, this.userJson.bonita_user_id)
    }

  }

  //B2==========================================================================================================
  userCaseData: any
  pmCaseTotal: any
  //獲取使用者可執行的單
  getUserCaseList(account: any, userId: any): void {
    console.log(account, userId)
    this.HttpApiService.getUserCaseList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userCaseData = res
      console.log("(PM)待回報筆數", this.userCaseData.body.length)
      this.pmCaseTotal = this.userCaseData.body.length
      console.log("(PM)待回報", this.userCaseData.body)
      this.showData(this.projectDataSource, this.totalCount, this.userCaseData.body)
    })
  }

  //取得TM待回報專案任務筆數
  userTmReturnCaseData: any
  tmCaseTotal: any
  getUserTmCaseList(account: any, userId: any): void {
    this.HttpApiService.getUserTMCaseList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userTmReturnCaseData = res
      console.log("TM待回報專案任務筆數", this.userTmReturnCaseData.body.length)
      this.tmCaseTotal = this.userTmReturnCaseData.body.length
      console.log("TM待回報專案任務", this.userTmReturnCaseData.body)
      // for(let i in this.userTmReturnCaseData.body){
      //   this.userTmReturnCaseData.body.p
      // }
      this.showData(this.taskReturnDataSource, this.taskReturnTotalCount, this.userTmReturnCaseData.body)
    })
  }

  userCrReturnData_A1: any
  crRerurnTotal_A1: any
  //A1獲取使用者可執行的單 (業務經理審核)
  getCrReturnList_A1(account: any, userId: any): void {
    console.log(account, userId)
    this.HttpApiService.getCrReturnList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userCrReturnData_A1 = res
      console.log("客需單待審核筆數(業務經理審核)", this.userCrReturnData_A1.body.length)
      this.crRerurnTotal_A1 = this.userCrReturnData_A1.body.length
      console.log("客需單待審核(業務經理審核)", this.userCrReturnData_A1.body)

      this.showData(this.crDataSource, this.totalCount_CR, this.userCrReturnData_A1.body)
    })
  }

  crTaskRerurnData: any
  crTaskRerurnTotal: any
  //A1獲取使用者可執行的單 (任務完工送審)
  getTaskFinishReturnList(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getTaskFinishReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.crTaskRerurnData = res
      console.log("筆數 (任務完工送審)", this.crTaskRerurnData.body.length)
      this.crTaskRerurnTotal = this.crTaskRerurnData.body.length
      console.log(" (任務完工送審)", this.crTaskRerurnData.body)

      this.showData(this.DataSource_CRtask, this.totalCount_CRtask, this.crTaskRerurnData.body);

    })
  }

  // 顯示資料
  showData(dataSource: any, total: any, data: any) {
    console.log(data)
    dataSource.data = data;//將資料帶入
    total = data.length;//計算資料長度
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;
  }

  // //取得TM待回報專案任務筆數
  // userTmReturnCaseData: any
  // tmCaseTotal: any
  // getUserTmCaseList(account: any, userId: any): void {
  //   this.HttpApiService.getUserTMCaseList(account, userId).subscribe(res => {
  //     console.log("res", res)
  //     this.userTmReturnCaseData = res
  //     console.log("TM待回報專案任務筆數", this.userTmReturnCaseData.body.length)
  //     this.tmCaseTotal = this.userTmReturnCaseData.body.length
  //     console.log("TM待回報專案任務", this.userTmReturnCaseData.body)
  //     this.showData(this.userTmReturnCaseData.body)
  //   })
  // }

  // // 顯示資料
  // showData(data: any) {
  //   console.log(data)
  //   this.projectDataSource.data = data;//將資料帶入
  //   this.totalCount = data.length;//計算資料長度
  //   this.projectDataSource.sort = this.sort;
  //   this.projectDataSource.paginator = this.paginator;
  // }

  projectManagerRequests: any;
  projectDatas: any;

  //取得project資料---------------------------------------
  // getProjectManagerRequsts(): void {
  //   this.HttpApiService.getProjectRequest()
  //     .subscribe(projectManagerRequests => {
  //       console.log(projectManagerRequests)
  //       this.projectDatas = projectManagerRequests.result;
  //       this.showData(projectManagerRequests.result);
  //       console.log(this.projectDatas)
  //       /*this.projectManagerRequests = projectManagerRequests.object;//---一般寫法
  //       console.log(this.projectManagerRequests);*///console資料
  //       //console.log(this.B1B2DataSource);///console資料
  //     },
  //       (err: any) => {
  //         console.log('err:', err);
  //       }
  //     );
  // }

  // 顯示資料
  // showData(data: any) {
  //   console.log(data)
  //   this.projectDataSource.data = data;//將資料帶入
  //   this.totalCount = data.length;//計算資料長度
  //   this.projectDataSource.sort = this.sort;
  //   this.projectDataSource.paginator = this.paginator;
  // }

  //取得任務all task資料--------------------------------------
  // testtaskDatas: any;
  // taskDatas: any[] = [];
  // totaltask: any;
  // getTaskRequest(): void {
  //   this.HttpApiService.getTaskRequestByOriginIdUserId(this.origin_id,this.account_id,1)
  //     .subscribe(testtaskRequest => {
  //       console.log(testtaskRequest)
  //       this.testtaskDatas = testtaskRequest.body.task
  //       console.log(this.testtaskDatas[0].name)
  //       // this.totaltask = testtaskRequest.body.total
  //       // console.log(this.totaltask / 20)
  //       // for (var j = 1; j <= (this.totaltask / 20); j++) {
  //       //   this.HttpApiService.getTaskListUserRequest((j + 1), 20)
  //       //     .subscribe(testtaskRequest => {
  //       //       this.testtaskDatas = testtaskRequest.body.task
  //       //       for (var i in this.testtaskDatas) {
  //       //         if (this.testtaskDatas[i].account_id == this.account_id) {
  //       //           this.taskDatas.push(this.testtaskDatas[i])
  //       //         }
  //       //       }
  //       //       this.dataSource_1.data = this.taskDatas;
  //       //     })
  //       // }
  //       // console.log(this.taskDatas)
  //       this.projectDataSource.data = this.testtaskDatas;
  //     },
  //     (err: any) => {
  //       console.log('err:', err);
  //     });
  // }



}
