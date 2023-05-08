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
  selector: 'app-cr-countersign-director',
  templateUrl: './cr-countersign-director.component.html',
  styleUrls: ['./cr-countersign-director.component.scss']
})
export class CrCountersignDirectorComponent implements OnInit {


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

    //C獲取使用者可執行的單 (會簽主管指派各部門人員(可能1人或多人))
    this.getCrReturnList_C(this.userJson.account, this.userJson.bonita_user_id)
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

  userCrReturnData_C: any
  crRerurnTotal_C: any
  //C 獲取使用者可執行的單 (會簽主管指派各部門人員(可能1人或多人))
  getCrReturnList_C(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getDispatchCrReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.userCrReturnData_C = res
      console.log("C筆數(會簽主管指派各部門人員(可能1人或多人))", this.userCrReturnData_C.body.length)
      this.crRerurnTotal_C = this.userCrReturnData_C.body.length
      console.log("C(會簽主管指派各部門人員(可能1人或多人))", this.userCrReturnData_C.body)

      this.showData(this.userCrReturnData_C.body)
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
