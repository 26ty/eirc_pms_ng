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
  selector: 'app-cr-sign-director',
  templateUrl: './cr-sign-director.component.html',
  styleUrls: ['./cr-sign-director.component.scss']
})
export class CrSignDirectorComponent implements OnInit {


  displayedColumns: string[] = ['create_time', 'code', 'demand_content', 'department', 'salesman_name', 'action_edit'];
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
    //this.getCustomerRequests();

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    //I 獲取使用者可執行的單 (業務副總簽核)
    this.getCrReturnList_I(this.userJson.account, this.userJson.bonita_user_id)
  }

  customerRequests: any;
  crDatas: any;

  userCrReturnData_I: any
  crRerurnTotal_I: any
  //I 獲取使用者可執行的單 (業務副總簽核)
  getCrReturnList_I(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getBusinessDirectorCrReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.userCrReturnData_I = res
      console.log("I筆數(業務副總簽核)", this.userCrReturnData_I.body.length)
      this.crRerurnTotal_I = this.userCrReturnData_I.body.length
      console.log("I(業務副總簽核)", this.userCrReturnData_I.body)

      this.showData(this.userCrReturnData_I.body)
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

