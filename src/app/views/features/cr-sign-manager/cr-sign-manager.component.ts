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
  selector: 'app-cr-sign-manager',
  templateUrl: './cr-sign-manager.component.html',
  styleUrls: ['./cr-sign-manager.component.scss']
})
export class CrSignManagerComponent implements OnInit {


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

    //H 獲取使用者可執行的單 (業務經理簽核)
    this.getCrReturnList_H(this.userJson.account, this.userJson.bonita_user_id)
  }

  customerRequests: any;
  crDatas: any;


  userCrReturnData_H: any
  crRerurnTotal_H: any
  //H 獲取使用者可執行的單 (業務經理簽核)
  getCrReturnList_H(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getBusinessManagerCrReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.userCrReturnData_H = res
      console.log("H筆數(業務經理簽核)", this.userCrReturnData_H.body.length)
      this.crRerurnTotal_H = this.userCrReturnData_H.body.length
      console.log("H(業務經理簽核)", this.userCrReturnData_H.body)

      this.showData(this.userCrReturnData_H.body)
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

