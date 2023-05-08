import { HttpApiService } from './../../../api/http-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'

const USER_KEY = 'auth-user';

interface toppinglist {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-project-info-manufacture-order-list',
  templateUrl: './project-info-manufacture-order-list.component.html',
  styleUrls: ['./project-info-manufacture-order-list.component.scss']
})

export class ProjectInfoManufactureOrderListComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('addDialog') addDialog!: TemplateRef<any>;

  toppingList: toppinglist[] = [
    { value: 'status', viewValue: '狀態' },
    { value: 'code', viewValue: '單號' },
    { value: 'project_name', viewValue: '專案代號' },
    { value: 'salesman_name', viewValue: '業務' },
    { value: 'order_name', viewValue: '主件品號' },
    { value: 'recipient_name', viewValue: '收文者' },
    { value: 'creater_name', viewValue: '發文者' },
    { value: 'date_for_open', viewValue: '製令開啟期限~關閉' },
    { value: 'action_edit', viewValue: '編輯按鈕' },

  ];
  selectedValue = ['status', 'code', 'project_name', 'salesman_name', 'order_name', 'creater_name', 'recipient_name', 'date_for_open', 'action_edit'];

  //查詢option
  code_option: any[] = [];
  project_code_option: any[] = [];
  order_name_option: any[] = [];

  toppings = new FormControl();

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  value = '';
  // table 資料
  dataSource = new MatTableDataSource<any>();

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private httpApiService: HttpApiService,

  ) { }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    this.getProjectInfoManufactures()
    this.getDepartmentList()
  }

  //顯示資料
  showData(data: any) {
    this.dataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //搜尋資料
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  //開啟dialog
  // 新增
  addItem() {
    if (this.account_group == "b379a8bb-23ee-479c-b17f-a8fbacf21bfb") {
      const dialogRef = this.dialog.open(this.addDialog);
    } else {
      Swal.fire(
        {
          title: `請由業務部人員協助新增客需單`,
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
          reverseButtons: true
        }
      )
    }
  }

  ProjectInfoManufactures: any
  MODataSource: any[] = [];
  getProjectInfoManufactures(): void {

    this.httpApiService.getProjectInfoManufacture_byProject(1, 20)
      .subscribe(ProjectInfoManufactures => {
        console.log(ProjectInfoManufactures)

        this.ProjectInfoManufactures = ProjectInfoManufactures.body.manufacture_order
        for (let i in this.ProjectInfoManufactures) {
          this.MODataSource.push(ProjectInfoManufactures.body.manufacture_order[i])
        }
        this.showData(this.MODataSource);

        for (let i in this.ProjectInfoManufactures) {
          this.code_option.push(this.ProjectInfoManufactures[i].code)
          this.project_code_option.push(this.ProjectInfoManufactures[i].p_code)
          this.project_code_option = [...new Set(this.project_code_option)]
          this.order_name_option.push(this.ProjectInfoManufactures[i].order_name)
        }
      });



  }

  //取得user name
  userList: any[] = [];
  a: any[] = [];
  getAllUserName(): void {
    for (var pagenum = 1; pagenum <= 92; pagenum++) {
      this.httpApiService.getAccountRequest_t(pagenum, 1)
        .subscribe(userRequest => {
          //console.log(userRequest)
          this.userList.push({ "id": userRequest.body.accounts[0].account_id, "name": userRequest.body.accounts[0].name })
          this.a.push({ test: pagenum, tt: pagenum })
        })
    }
  }

  //取得user列表-------------------------------------------------------------------------
  accountControl = new FormControl();
  accountgroup: any[] = []
  departmentData: any;
  getDepartmentList(): void {
    this.httpApiService.getDepartmentList().subscribe(res => {
      console.log('部門', res)
      this.departmentData = res.body.department

      var departmentdatas: any = res
      for (var i in departmentdatas.body.department) {
        this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "d_id": departmentdatas.body.department[i].d_id })
      }
      this.getAccountList()


    })
  }

  account_group: any
  getAccountList(): void {
    this.httpApiService.getAccountList()
      .subscribe(AccountRequest => {
        console.log(AccountRequest)
        var accountdatas: any = AccountRequest
        for (var i in accountdatas.body.accounts) {

          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name) {
              if (accountdatas.body.accounts[i].account_id == this.userJson.account_id) {
                this.account_group = this.accountgroup[j].d_id
              }
            }
          }

        }
        console.log("accountgroup", this.accountgroup)
        console.log("account_group", this.account_group)
        // this.getCountersignRequest();
      })

  }





}
