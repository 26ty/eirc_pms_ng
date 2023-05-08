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
  selector: 'app-cr-close-inform',
  templateUrl: './cr-close-inform.component.html',
  styleUrls: ['./cr-close-inform.component.scss']
})
export class CrCloseInformComponent implements OnInit {


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

    //M 獲取使用者可執行的單
    this.getCrReturnList_M(this.userJson.account, this.userJson.bonita_user_id)
  }

  customerRequests: any;
  crDatas: any;

  //取得project資料---------------------------------------
  // getCustomerRequests(): void {

  //   this.HttpApiService.getCustomerRequest_n(1, 20)
  //     .subscribe(customerRequests => {
  //       console.log(customerRequests)
  //       this.crDatas = customerRequests.body.customer_demand;
  //       this.showData(customerRequests.body.customer_demand);
  //     },
  //       (err: any) => {
  //         console.log('err:', err);
  //       }
  //     );
  // }


  userCrReturnData_M: any
  crRerurnTotal_M: any
  //M 獲取使用者可執行的單 
  getCrReturnList_M(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getCountersignCloseCrReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.userCrReturnData_M = res
      console.log("M筆數 ", this.userCrReturnData_M.body.length)
      this.crRerurnTotal_M = this.userCrReturnData_M.body.length
      console.log("M ", this.userCrReturnData_M.body)

      this.showData(this.userCrReturnData_M.body)
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


