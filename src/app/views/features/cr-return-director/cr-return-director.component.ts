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
  selector: 'app-cr-return-director',
  templateUrl: './cr-return-director.component.html',
  styleUrls: ['./cr-return-director.component.scss']
})
export class CrReturnDirectorComponent implements OnInit {


  displayedColumns: string[] = ['create_time', 'code', 'demand_content', 'salesman_dep', 'salesman_name', 'action_edit'];
  crDataSource = new MatTableDataSource();
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
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    //A2獲取使用者可執行的單(回覆簽核意見並指定專案經理)
    this.getCrReturnList_A2(this.userJson.account, this.userJson.bonita_user_id);
  }

  userCrReturnData_A2: any
  crRerurnTotal_A2: any
  //A2獲取使用者可執行的單(回覆簽核意見並指定專案經理)
  getCrReturnList_A2(account: any, userId: any): void {
    console.log(account, userId)
    this.HttpApiService.getDirectorCrReturnList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userCrReturnData_A2 = res
      console.log("客需單待審核筆數(回覆簽核意見並指定專案經理)", this.userCrReturnData_A2.body.length)
      this.crRerurnTotal_A2 = this.userCrReturnData_A2.body.length
      console.log("客需單待審核(回覆簽核意見並指定專案經理)", this.userCrReturnData_A2.body)

      this.showData(this.userCrReturnData_A2.body)
    })
  }

  // 顯示資料
  showData(data: any) {
    console.log(data)
    this.crDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.crDataSource.sort = this.sort;
    this.crDataSource.paginator = this.paginator;
  }





}
