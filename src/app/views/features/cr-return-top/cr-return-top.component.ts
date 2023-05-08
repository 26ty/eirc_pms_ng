import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpApiService } from './../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';



@Component({
  selector: 'app-cr-return-top',
  templateUrl: './cr-return-top.component.html',
  styleUrls: ['./cr-return-top.component.scss']
})
export class CrReturnTopComponent implements OnInit {


  displayedColumns: string[] = ['create_time', 'code', 'demand_content', 'salesman_dep', 'salesman_name', 'action_edit'];
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
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    //A3獲取使用者可執行的單 (PM人選確認並負責RD部門勾選)
    this.getCrReturnList_A3(this.userJson.account, this.userJson.bonita_user_id);
  }

  userCrReturnData_A3: any
  crRerurnTotal_A3: any
  //A3獲取使用者可執行的單  (PM人選確認並負責RD部門勾選)
  getCrReturnList_A3(account: any, userId: any): void {
    console.log(account, userId)
    this.HttpApiService.getTopCrReturnList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userCrReturnData_A3 = res
      console.log("A3客需單待審核筆數 (PM人選確認並負責RD部門勾選)", this.userCrReturnData_A3.body.length)
      this.crRerurnTotal_A3 = this.userCrReturnData_A3.body.length
      console.log("A3客需單待審核 (PM人選確認並負責RD部門勾選)", this.userCrReturnData_A3.body)

      this.showData(this.userCrReturnData_A3.body)
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
