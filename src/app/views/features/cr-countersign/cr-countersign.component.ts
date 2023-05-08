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
  selector: 'app-cr-countersign',
  templateUrl: './cr-countersign.component.html',
  styleUrls: ['./cr-countersign.component.scss']
})
export class CrCountersignComponent implements OnInit {


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

    //C獲取使用者可執行的單 (會簽主管指派各部門人員(可能1人或多人))
    this.getCrReturnList_D(this.userJson.account, this.userJson.bonita_user_id)
  }

  customerRequests: any;
  crDatas: any;

  userCrReturnData_D: any
  crRerurnTotal_D: any
  //D 獲取使用者可執行的單 (會簽人員送交評估報告)
  getCrReturnList_D(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getEvaluationCrReturnList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userCrReturnData_D = res
      console.log("D筆數(會簽人員送交評估報告)", this.userCrReturnData_D.body.length)
      this.crRerurnTotal_D = this.userCrReturnData_D.body.length
      console.log("D(會簽人員送交評估報告)", this.userCrReturnData_D.body)

      this.showData(this.userCrReturnData_D.body)
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
