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
  selector: 'app-pm-return',
  templateUrl: './pm-return.component.html',
  styleUrls: ['./pm-return.component.scss']
})
export class PmReturnComponent implements OnInit {


  displayedColumns: string[] = ['code', 'p_name', 'customer_name', 'status', 'date_for_start', 'action_edit'];
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

  getUserJson(): void {
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
  }
  ngOnInit(): void {
    this.getUserJson()
    // this.getProjectManagerRequsts()
    this.getUserCaseList(this.userJson.account, this.userJson.bonita_user_id)
  }

  userCaseData: any
  pmCaseTotal: any
  /** 
  * @brief 獲取使用者可執行的單(PM待回報專案)
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getUserCaseList(account: any, userId: any): void {
    console.log(account, userId)
    this.HttpApiService.getUserCaseList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userCaseData = res
      console.log("(PM)待回報筆數", this.userCaseData.body.length)
      this.pmCaseTotal = this.userCaseData.body.length
      console.log("(PM)待回報", this.userCaseData.body)
      this.showData(this.userCaseData.body)
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


  // projectManagerRequests: any;
  // projectDatas:any;

  // //取得個別user-------------------------------------
  // getAccountoneRequsts(a: string, i: any, j: any): void {
  //   this.HttpApiService.getAccountOneRequest_t(a).subscribe(Requests => {
  //     this.projectDatas[i][this.account_field[j]] = Requests.body.name
  //     //console.log(this.projectDatas[i][this.account_field[j]])
  //   })
  // }
  // account_field = ['customer_id', 'salesman_id', 'serviceman_id', 'projectman_id', 'creater']
  // name: any[] = []
  // //取得project資料---------------------------------------

  // getProjectManagerRequsts(): void {
  //   this.HttpApiService.getProjectRequest_t(1, 5).subscribe(projectManagerRequests => {
  //     this.projectDatas = projectManagerRequests.body.project;
  //     for (var i in projectManagerRequests.body.project) {
  //       for (var j in this.account_field) {
  //         //console.log(projectManagerRequests.body.project[i][`${account_field[j]}`])
  //         var a = (projectManagerRequests.body.project[i][`${this.account_field[j]}`])
  //         //var b = this.name.push(a)
  //         this.getAccountoneRequsts(a, i, j)
  //       }
  //     }
  //     //console.log(this.projectDatas)
  //     this.showData(this.projectDatas)
  //   });
  // }





}
