

import { HttpApiService } from './../../../api/http-api.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CrLaborHourDialogComponent } from './cr-labor-hour-dialog/cr-labor-hour-dialog.component';
import { CdInterviewDialogComponent } from './cd-interview-dialog/cd-interview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export interface Account {
  account_id: string;
  name: string;
  bonita_user_id: string;
  dep_name: string;
}

export interface AccountGroup {
  disabled?: boolean;
  name: string;
  account: Account[];
}

export const _filter = (opt: Account[], value: string): Account[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.name.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-cr-follow-work',
  templateUrl: './cr-follow-work.component.html',
  styleUrls: ['./cr-follow-work.component.scss']
})
export class CrFollowWorkComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  campaignOne: FormGroup;
  campaignTwo: FormGroup;

  toppings = new FormControl();
  toppingList: string[] = ['案件代號', '收件日期', '業務負責人', '問題描述', '任務負責人', '處理情形', '工時明細', '附件', '表單紀錄'];
  displayedColumns: string[] = ['code', 'date_for_recive', 'salesman_name', 'demand_content', 'project_represent', 'process', 'man_hour_detail', 'attachment', 'record'];


  stateForm: FormGroup = this._formBuilder.group({
    // testaccount: new FormControl(),
    stateGroup: '',
  });
  stateGroupOptions: Observable<AccountGroup[]>;

  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  // 定義table標題
  displayedColumnsObj: any[] = [
    { cn: '案件代號', en: 'code' },
    { cn: '收件日期', en: 'date_for_recive' },
    { cn: '業務負責人', en: 'salesman_name' },
    { cn: '問題描述', en: 'demand_content' },
    { cn: '任務負責人', en: 'project_represent' },
    { cn: '處理情形', en: 'process' },
    { cn: '工時明細', en: 'man_hour_detail' },
    { cn: '附件', en: 'attachment' },
    { cn: '表單紀錄', en: 'record' },
  ];

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;


  // table 資料
  dataSource = new MatTableDataSource<any>();

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    private httpApiService: HttpApiService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
  ) {

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }


  userJson: any
  ngOnInit(): void {

    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    this.getCustomerRequests();
    this.displayedColumns = this.displayedColumnsObj.map(i => i.en);

    this.getDepartmentList()
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value)),
    );

    this.setPaginator();
  }

  private _filterGroup(value: string): AccountGroup[] {
    if (value) {
      return this.accountgroup
        .map(group => ({ name: group.name, account: _filter(group.account, value) }))
        .filter(group => group.account.length > 0);
    }

    return this.accountgroup;
  }

  ngAfterViewInit() {
    // 設定資料排序
    this.dataSource.sort = this.sort;
  }

  // 設定分頁器參數
  setPaginator() {
    // 設定顯示筆數資訊文字
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `第 ${startIndex + 1} - ${endIndex} 筆、共 ${length} 筆`;
    };

    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }

  //顯示資料
  showData(data: any) {
    this.dataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCustomerRequests(): void {
    this.httpApiService.getCustomerRequestTask(this.userJson.account_id)
      .subscribe(customerRequests => {
        // 執行顯示資料
        console.log(customerRequests)
        this.showData(customerRequests.body.customer_demand);
      });
  }

  //上傳檔案
  fileItem() {
    //const dialogRef = this.dialog.open(this.fileUpdateDialog);
  }

  //客需單工時明細dialog
  customerLHView(item: any) {
    this.dialog.open(CrLaborHourDialogComponent, {
      data: {
        t_id: item
      }
    });
  }

  //客需單表單紀錄dialog
  customerInterView(item: any) {
    this.dialog.open(CdInterviewDialogComponent, {
      data: {
        c_id: item
      }
    });
  }

  userList: any
  //列出所有username
  getAllUserName(): void {
    this.httpApiService.getAccountRequest()
      .subscribe(userRequest => {
        this.userList = userRequest.body.accounts
        //console.log(this.userList)
        // this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
      })
    //console.log(this.userList)
  }

  accountgroup: AccountGroup[] = []
  getDepartmentList(): void {
    this.httpApiService.getDepartmentList()
      .subscribe(departmentRequest => {
        var departmentdatas: any = departmentRequest
        for (var i in departmentdatas.body.department) {
          this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "account": [] })
        }
        this.getAccountList()
      })
  }

  getAccountList(): void {
    this.httpApiService.getAccountList()
      .subscribe(AccountRequest => {
        var accountdatas: any = AccountRequest
        for (var i in accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(accountdatas.body.accounts[i])
            }
          }
        }
      })
    console.log(this.accountgroup)
  }

  account_name: any;
  changeaccount_id: any
  changeaccount(event: any): void {
    console.log(event)
    for (var i in this.userList) {
      if (this.userList[i].name == this.account_name) {
        this.changeaccount_id = this.userList[i].account_id
      }
    }
    console.log(this.changeaccount_id)
  }

}
