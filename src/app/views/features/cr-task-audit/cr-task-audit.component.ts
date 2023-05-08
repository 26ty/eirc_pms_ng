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
  selector: 'app-cr-task-audit',
  templateUrl: './cr-task-audit.component.html',
  styleUrls: ['./cr-task-audit.component.scss']
})
export class CrTaskAuditComponent implements OnInit {


  displayedColumns: string[] = ['code', 'subject', 'department', 'poster', 'action_edit'];
  crDataSource = new MatTableDataSource();
  totalCount!: number;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  userJson: any
  ngOnInit(): void {

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    //A1獲取使用者可執行的單 (任務直屬主管審核)
    this.getTaskFinishManagerReturnList(this.userJson.account, this.userJson.bonita_user_id)
  }

  customerRequests: any;
  crDatas: any;


  crTaskManagerRerurnData: any
  crTaskManagerRerurnTotal: any
  //A1獲取使用者可執行的單 (任務直屬主管審核)
  getTaskFinishManagerReturnList(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getTaskFinishManagerReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.crTaskManagerRerurnData = res
      console.log("筆數 (任務直屬主管審核)", this.crTaskManagerRerurnData.body.length)
      this.crTaskManagerRerurnTotal = this.crTaskManagerRerurnData.body.length
      console.log(" (任務直屬主管審核)", this.crTaskManagerRerurnData.body)

      this.showData(this.crTaskManagerRerurnData.body);

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
