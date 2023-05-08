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
  selector: 'app-cr-countersign-director-confirm',
  templateUrl: './cr-countersign-director-confirm.component.html',
  styleUrls: ['./cr-countersign-director-confirm.component.scss']
})
export class CrCountersignDirectorConfirmComponent implements OnInit {


  displayedColumns: string[] = ['create_time', 'code', 'demand_content', 'department', 'salesman_name', 'action_edit'];
  crDataSource = new MatTableDataSource();
  //totalCount!: number;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  userJson: any
  ngOnInit(): void {

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
    //this.getCustomerRequests();

    //E獲取使用者可執行的單 (會簽主管審核)
    this.getCrReturnList_E(this.userJson.account, this.userJson.bonita_user_id)
  }

  customerRequests: any;
  crDatas: any;

  //取得project資料---------------------------------------
  getCustomerRequests(): void {

    this.HttpApiService.getCustomerRequest_n(1, 20)
      .subscribe(customerRequests => {
        console.log(customerRequests)
        this.crDatas = customerRequests.body.customer_demand;
        this.showData(customerRequests.body.customer_demand);
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  userCrReturnData_E: any
  crRerurnTotal_E: any
  //E 獲取使用者可執行的單 (會簽主管指派各部門人員(可能1人或多人))
  getCrReturnList_E(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getCountersignCrReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.userCrReturnData_E = res
      console.log("E筆數(會簽主管審核)", this.userCrReturnData_E.body.length)
      this.crRerurnTotal_E = this.userCrReturnData_E.body.length
      console.log("E(會簽主管審核)", this.userCrReturnData_E.body)

      this.showData(this.userCrReturnData_E.body)
    })
  }


  // 顯示資料
  showData(data: any) {
    console.log(data)
    this.crDataSource.data = data;//將資料帶入
    //this.totalCount = data.length;//計算資料長度
    this.crDataSource.sort = this.sort;
    this.crDataSource.paginator = this.paginator;
  }



}
