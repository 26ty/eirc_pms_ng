import { ProjectManagerRequest } from './../../../shared/models/model';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { HttpApiService } from './../../../api/http-api.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';

//import { FuncService } from './../../../func/func.service';

//部門
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
  selector: 'app-project-audit-form',
  templateUrl: './project-audit-form.component.html',
  styleUrls: ['./project-audit-form.component.scss']
})
export class ProjectAuditFormComponent implements OnInit {


  stateForm: FormGroup = this._formBuilder.group({
    // testaccount: new FormControl(),
    stateGroup: '',
  });
  stateGroupOptions: Observable<AccountGroup[]>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  user_id: any;
  userid = ''
  projectManagerRequests: any;
  projectDatas: any;
  //專案負責人option
  projectman_option: any[] = [];
  //input value
  value = '';
  //status value
  status_value = '';

  //宣告dataSource
  B1B2DataSource = new MatTableDataSource();
  //宣告陣列欄位名稱
  displayedColumns: string[] = ['projectman_name', 'code', 'date_for_start', 'action_edit', 'action_view'];
  // 被選擇的資料
  selectedItem: any;
  // MatPaginator Inputs
  totalCount!: number;
  // MatPaginator Output
  pageEvent!: PageEvent;
  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);
  // 時間格式
  formatStr = 'YYYY-MM-d hh:mm:ss';
  // 年分
  year: any;

  addForm: FormGroup;
  texttest: any;

  constructor(
    private fb: FormBuilder,
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,
    private _formBuilder: FormBuilder,
    //private FuncService: FerchService,
  ) {
    // this.stateForm = this._formBuilder.group({
    //   testaccount: new FormControl(),
    // })
    this.addForm = this.fb.group({
      texttest: new FormControl()
    });
  }

  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;

  ngOnInit(): void {
    this.addForm = this.fb.group({
      texttest: new FormControl()
    });
    this.getProjectManagerRequsts();
    this.setPaginator();
    this.getDepartmentList()
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value)),
    );
  }

  accountControl = new FormControl();
  accountgroup: AccountGroup[] = []
  /** 
  * @brief 取得所有部門資料轉換到 accountgroup 的 json 列表
  * @param accountgroup 所有部門的 json 列表
  * @param name 部門名稱
  * @param account 單一部門裡所包含成員
  * */
  getDepartmentList(): void {
    this.HttpApiService.getDepartmentList()
      .subscribe(departmentRequest => {
        var departmentdatas: any = departmentRequest
        for (var i in departmentdatas.body.department) {
          this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "account": [] })
        }
        this.getAccountList()
      })
  }

  userList: any
  /** 
  * @brief 取得所有員工資料轉換到 accountgroup 的 json 列表
  * @param userList 全部員工的 json 列表
  * @param name 部門名稱的 json 
  * @param account 單一部門裡所包含成員 
  * */
  getAccountList(): void {
    this.HttpApiService.getAccountList()
      .subscribe(AccountRequest => {
        var accountdatas: any = AccountRequest
        this.userList = AccountRequest.body.accounts
        //this.accountListDatas = accountdatas.body.accounts
        for (var i in accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(accountdatas.body.accounts[i])
            }
          }
        }
        //console.log(accountdatas)
      })
  }

  // 人員關鍵字查詢
  private _filterGroup(value: string): AccountGroup[] {
    if (value) {
      return this.accountgroup
        .map(group => ({ name: group.name, account: _filter(group.account, value) }))
        .filter(group => group.account.length > 0);
    }
    return this.accountgroup;
  }

  account_name: any;
  change_account_id: any
  /** 
  * @brief 測試判斷員工的名稱轉換成員工的 UUID
  * @param change_account_id 員工的 UUID
  * */
  changeaccount(event: any): void {
    //console.log(event)
    this.change_account_id = ''
    for (var i in this.userList) {
      if (this.userList[i].name == this.account_name) {
        this.change_account_id = this.userList[i].account_id

      }
    }
    //console.log(this.changeaccount_id)
  }

  /** 
  * @brief 取得產銷專案的 json 列表
  * @param projectman_option 儲存所有專案的專案負責人名稱的 json 列表
  * */
  getProjectManagerRequsts(): void {
    //換成projectListUser
    this.HttpApiService.getProjectAuthorizationListRequest_t(1, 20).subscribe(projectManagerRequests => {
      this.projectDatas = projectManagerRequests.body.project;
      //console.log(this.projectDatas)
      this.showData(this.projectDatas)
      for (var i in this.projectDatas) {
        this.projectman_option.push(this.projectDatas[i].projectman_name)
        this.projectman_option = [...new Set(this.projectman_option)]
      }
    },
      (err: any) => {
        console.log('err:', err);
      }
    );
  }
  account_id: string
  // 顯示資料
  /** 
  * @brief 將資料轉換顯示至列表
  * @param data 檔案細節 json 資料包
  * @param totalCount 總資料數量
  * @param B1B2DataSource 列表顯示資料格式
  * */
  showData(data: any) {
    this.B1B2DataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.B1B2DataSource.sort = this.sort;
    this.B1B2DataSource.paginator = this.paginator;
  }

  //搜尋資料
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.B1B2DataSource.filter = filterValue.trim().toLowerCase();
  }

  // 設定分頁器參數--------------------------------------------------------
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

  // 過濾資料
  filterData() {
    this.B1B2DataSource.filterPredicate = (data: any, filter: string): boolean => {
      // return data.BuyerPartyID.indexOf(filter) !== -1;
      // return data.BuyerPartyID.toLowerCase().includes(filter) || data.ID.includes(filter) || data.InvoiceNO_KUT.toLowerCase().includes(filter);
      return this.getCheckIncludes(data, ['ObjectID', 'ID', 'InvoiceNO_KUT'], filter);
    };
  }

  // 取得要過濾哪些欄位 array資料  titles要過濾的欄位名稱 keyword關鍵字
  getCheckIncludes(array: any, titles: string[], keyword: string) {
    // console.log(array);
    return titles.some(i => {
      return array[i].toLowerCase().includes(keyword.toLowerCase());
    });
  }

  // filter 輸入關鍵字
  keyupSearch(event: any) {
    this.B1B2DataSource.filter = event.toLowerCase();
  }


  // 檢查月份 未完成
  checkMonth(month: number) {
    const thisYear = new Date(this.now).getFullYear();
    const thisMonth = new Date(this.now).getMonth();
    const selectYear = new Date(this.year).getFullYear();
    return;
    if (thisYear !== selectYear) {
      return false;
    }
    const currentDate = new Date();
    currentDate.setFullYear(thisYear);
    currentDate.setMonth(month - 1);
    currentDate.setDate(+1);
    currentDate.setHours(0, 0, 1);
    console.log(currentDate);
    const myFormattedDate = this.pipe.transform(currentDate, this.formatStr);
    console.log(myFormattedDate);

    return
  }

  // 選擇月份時關閉
  closeDatePicker(elem: MatDatepicker<any>, value: any) {
    this.year = value;
    elem.close();
  }


  getoneproject(p_id: any): void {
    this.HttpApiService.getOneProjectRequest_t(p_id)
      .subscribe(projectRequest => {
        var projectData: any = projectRequest
      })
  }

  /** 
  * @brief 轉換至編輯頁面
  * @param element 檔案細節 json 資料包
  * */
  EditProject(element: any): void {
    this.dialog.open(EditDialogComponent, {
      data: {
        data: element,
      }
    })
  }

  /** 
  * @brief 轉換列表UUID為名稱並檢視、下載專案授權書文件
  * @param element 檔案細節 json 資料包
  * */
  ViewProject(element: any): void {
    console.log(element)
    this.HttpApiService.getOneProjectRequest_t(element.p_id)
      .subscribe(projectRequest => {
        var projectData: any = projectRequest
        for (var i in this.userList) {
          if (projectData.body.projectman_id == this.userList[i].account_id) {
            projectData.body.projectman_id = this.userList[i].name
          }
          if (projectData.body.salesman_id == this.userList[i].account_id) {
            projectData.body.salesman_id = this.userList[i].name
          }
          if (projectData.body.serviceman_id == this.userList[i].account_id) {
            projectData.body.serviceman_id = this.userList[i].name
          }
        }
        this.dialog.open(ViewDialogComponent, {
          data: {
            data: projectData.body
          }
        })
      })
    // this.dialog.open(ViewDialogComponent, {
    //   data: {
    //     data: element,
    //     //p_id: element.p_id,
    //     //t_id: element.t_id
    //   }
    // })
  }

  /** 
  * @brief 轉換至新增頁面
  * */
  AddProject(): void {
    this.dialog.open(AddDialogComponent, {})
  }
}
