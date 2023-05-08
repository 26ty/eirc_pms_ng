import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { HttpApiService } from './../../../api/http-api.service';
import Swal from 'sweetalert2'

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Component({
  selector: 'app-manufacture-order-sa',
  templateUrl: './manufacture-order-sa.component.html',
  styleUrls: ['./manufacture-order-sa.component.scss']
})
export class ManufactureOrderSaComponent implements OnInit {

  displayedColumns: string[] = [
    'code', 'salesman_name', 'order_name', 'creater_name', 'recipient_name', 'date_for_open', 'date_for_close', 'action_edit'
  ];
  moDataSource = new MatTableDataSource();
  totalCount!: number;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,
  ) { }

  userJson: any
  userAccountId: any//取得登入者
  ngOnInit(): void {
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log("userJson", this.userJson)
    /*取得AccountId*/
    this.userAccountId = this.userJson['account_id']
    console.log(this.userAccountId)
    this.getConfirmManufactureReturnList(this.userJson.account, this.userJson.bonita_user_id)
  }

  userMMReturnData: any
  MMRerurnTotal: any
  // //C2獲取使用者可執行的單 (單位主管審核)
  // getManufactureManufactureReturnList(account: any, userId: any): void {
  //   //console.log(account, userId)
  //   this.HttpApiService.getManufactureManufactureReturnList(account, userId).subscribe(res => {
  //     console.log("res", res)
  //     this.userMMReturnData = res
  //     console.log("C2筆數 (生管-製造-審核)", this.userMMReturnData.body.length)
  //     this.MMRerurnTotal = this.userMMReturnData.body.length
  //     console.log("(生管-製造-審核)", this.userMMReturnData.body)
  //     this.showData(this.userMMReturnData.body)
  //   })
  // }

  // userConfirmMReturnData: any
  // ConfirmMRerurnTotal: any
  //C2獲取使用者可執行的單 (確認單號開啟)
  getConfirmManufactureReturnList(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getConfirmManufactureReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.userMMReturnData = res
      console.log("C2筆數 (確認單號開啟)G業務", this.userMMReturnData.body.length)
      this.MMRerurnTotal = this.userMMReturnData.body.length
      console.log("C2 (確認單號開啟)G業務", this.userMMReturnData.body)
      this.showData(this.userMMReturnData.body)

    })
  }
  // 顯示資料
  showData(data: any) {
    console.log(data)
    this.moDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.moDataSource.sort = this.sort;
    this.moDataSource.paginator = this.paginator;
  }

}
