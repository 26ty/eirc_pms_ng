import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpApiService } from './../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-cr-task-return',
  templateUrl: './cr-task-return.component.html',
  styleUrls: ['./cr-task-return.component.scss']
})
export class CrTaskReturnComponent implements OnInit {


  displayedColumns: string[] = ['code', 'subject', 'department', 'poster', 'action_edit'];
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

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    //this.getCustomerRequests();
    this.getTaskFinishReturnList(this.userJson.account, this.userJson.bonita_user_id)
  }

  customerRequests: any;
  crDatas: any;

  //取得project資料---------------------------------------
  // getCustomerRequests(): void {
  //   this.HttpApiService.getCustomerRequest(1, 20)
  //     .subscribe(customerRequests => {
  //       console.log(customerRequests)
  //       this.crDatas = customerRequests.result;
  //       this.showData(customerRequests.result);

  //       /*this.projectManagerRequests = projectManagerRequests.object;//---一般寫法
  //       console.log(this.projectManagerRequests);*///console資料
  //       //console.log(this.B1B2DataSource);///console資料
  //     },
  //       (err: any) => {
  //         console.log('err:', err);
  //       }
  //     );
  // }

  crTaskRerurnData: any
  crTaskRerurnTotal: any
  //A1獲取使用者可執行的單 (任務完工送審)
  getTaskFinishReturnList(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getTaskFinishReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.crTaskRerurnData = res
      console.log("筆數 (任務完工送審)", this.crTaskRerurnData.body.length)
      this.crTaskRerurnTotal = this.crTaskRerurnData.body.length
      console.log(" (任務完工送審)", this.crTaskRerurnData.body)

      this.showData(this.crTaskRerurnData.body);

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
