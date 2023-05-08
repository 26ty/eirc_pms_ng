import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpApiService } from './../../../api/http-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-pm-audit',
  templateUrl: './pm-audit.component.html',
  styleUrls: ['./pm-audit.component.scss']
})
export class PmAuditComponent implements OnInit {

  displayedColumns: string[] = ['code', 'p_name', 'projectman_name', 'status', 'date_for_start', 'action_edit'];
  projectDataSource = new MatTableDataSource();
  totalCount!: number;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private HttpApiService: HttpApiService,
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

    this.getUserPmAuditCaseList(this.userJson.account, this.userJson.bonita_user_id)
    //this.getProjectManagerRequsts();
  }

  userPmAuditCaseData: any
  pmAuditCaseTotal: any
  /** 
  * @brief 取得最高主管待完工PM單(待完工)
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getUserPmAuditCaseList(account: any, userId: any): void {
    this.HttpApiService.getUserAuditCaseList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userPmAuditCaseData = res
      console.log("(PM)最高主管待完工筆數", this.userPmAuditCaseData.body.length)
      this.pmAuditCaseTotal = this.userPmAuditCaseData.body.length
      console.log("(PM)最高主管待完工", this.userPmAuditCaseData.body)
      this.showData(this.userPmAuditCaseData.body)
    })
  }

  /** 
  * @brief 顯示表格資料
  *
  * @param data 表格資料
  * @return 回傳有無成功顯示. */
  showData(data: any) {
    //console.log(data)
    this.projectDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.projectDataSource.sort = this.sort;
    this.projectDataSource.paginator = this.paginator;
  }

  // projectManagerRequests: any;
  // projectDatas: any;
  // //取得project資料---------------------------------------
  // getProjectManagerRequsts(): void {
  //   this.HttpApiService.getProjectRequest()
  //     .subscribe(projectManagerRequests => {
  //       console.log(projectManagerRequests)
  //       this.projectDatas = projectManagerRequests.result;
  //       this.showData(projectManagerRequests.result);

  //       /*this.projectManagerRequests = projectManagerRequests.object;//---一般寫法
  //       console.log(this.projectManagerRequests);*///console資料
  //       //console.log(this.B1B2DataSource);///console資料
  //     },
  //       (err: any) => {
  //         console.log('err:', err);
  //       }
  //     );
  // }


}
