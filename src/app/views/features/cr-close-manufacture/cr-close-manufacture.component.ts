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
  selector: 'app-cr-close-manufacture',
  templateUrl: './cr-close-manufacture.component.html',
  styleUrls: ['./cr-close-manufacture.component.scss']
})
export class CrCloseManufactureComponent implements OnInit {


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

    //N 獲取使用者可執行的單
    this.getCrReturnList_N(this.userJson.account, this.userJson.bonita_user_id)
  }

  customerRequests: any;
  crDatas: any;

  userCrReturnData_N: any
  crRerurnTotal_N: any
  //K 獲取使用者可執行的單
  getCrReturnList_N(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getPmCloseCrReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.userCrReturnData_N = res
      console.log("N筆數 ", this.userCrReturnData_N.body.length)
      this.crRerurnTotal_N = this.userCrReturnData_N.body.length
      console.log("N ", this.userCrReturnData_N.body)

      this.showData(this.userCrReturnData_N.body)
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


