import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { HttpApiService } from './../../../api/http-api.service';
import Swal from 'sweetalert2'
import { TemplateAddDialogComponent } from './template-add-dialog/template-add-dialog.component';
import { RepeatOrderComponent } from './repeat-order/repeat-order.component';
////import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormalprojectAddDialogComponent } from './formalproject-add-dialog/formalproject-add-dialog.component';
import { ActivatedRoute } from '@angular/router';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { controllers } from 'chart.js';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment, Moment} from 'moment';

//const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/dd',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface toppinglist {
  value: string;
  viewValue: string;
}

//部門
interface Account {
  account_id: string;
  name: string;
  bonita_user_id?: string;
  dep_name?: string;
}
interface AccountGroup {
  disabled?: boolean;
  dep_name: string;
  dep_id: string;
  account: Account[];
}

//機台
export interface PeriodicElement1 {
  project: string;
  date_for_estimated_start: string;
  date_for_estimated_completion: string;
  date_for_actual_completion: string;
  principal: string;
  file: boolean;
  remark: string;
}

interface Option {
  label: string;
  value: any;
}
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';



@Component({
  selector: 'app-produce-sales-meeting',
  templateUrl: './produce-sales-meeting.component.html',
  styleUrls: ['./produce-sales-meeting.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ProduceSalesMeetingComponent implements OnInit {

  toppingList: toppinglist[] = [
    { value: 'status', viewValue: '狀態' },
    { value: 'customer_code', viewValue: '客需單號' },
    { value: 'code', viewValue: '專案代號' },
    { value: 'projectman_name', viewValue: '專案負責人' },
    { value: 'serviceman_name', viewValue: '客服負責人' },
    { value: 'customer_name', viewValue: '客戶' },
    { value: 'date_for_start', viewValue: '起始日期' },
    { value: 'date_for_end', viewValue: '結束日期' },
    { value: 'action_edit', viewValue: '編輯' },
    { value: 'is_template', viewValue: '產銷範本' },
    { value: 'copy', viewValue: '複製轉新增', },
  ];
  selectedValue = ['status', 'customer_code', 'code', 'projectman_name', 'serviceman_name', 'customer_name', 'date_for_start', 'date_for_end', 'action_edit', 'is_template'];
  selectedValue_test = ['status', 'customer_code', 'code', 'projectman_name', 'serviceman_name', 'customer_name', 'date_for_start', 'date_for_end', 'action_edit', 'is_template', 'copy'];
  toppings = new FormControl();


  //toppingList : string[] = ['客需單號','專案代號','專案負責人','客服負責人','客戶','起始日期','結束日期','狀態'];

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('addDialog') addDialog!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;

  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  status = ['建檔中', '專案已啟動', '已中止']
  myControl = new FormControl();
  projectDatas: any[] = [];
  totalprojectDatas: any;
  // selected_code: any;
  customer_code_option: any[] = [];
  code_option: any[] = [];

  value = '';
  //status value
  status_value = '';

  //宣告dataSource
  dataSource_1 = new MatTableDataSource();
  // MatPaginator Inputs
  totalCount!: number;

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
  ) {

  }

  FlatNode: any
  userJson: any
  ngOnInit(): void {
    this.getProjectListManagerRequests();
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)
    this.Comparison()
    this.getDepartmentList()
  }

  // systememail = 'htaeirctest@gmail.com'
  // systempassword = 'czwucttwoqkijzas' //固定
  // testemail():void {
  //   var url = String(window.location.href)
  //   let emailRequest: any = {}
  //   emailRequest['host'] = 'smtp.gmail.com'
  //   emailRequest['port'] = '587'
  //   emailRequest['name'] = 'HTA後台系統'
  //   emailRequest['username'] = this.systememail
  //   emailRequest['password'] = this.systempassword
  //   //emailRequest['to'] = 'isabelle_wu@hta.com.tw'
  //   emailRequest['to'] = 'c108118213@nkust.edu.tw'
  //   emailRequest['subject'] = '新建專案啟動'
  //   emailRequest['body'] = `<html><body><h1>專案啟動待簽核!</h1><a href='${url}'>專案連結</a></body></html>`
  //   this.HttpApiService.SendEmailRequest_t(emailRequest)
  //     .subscribe(res => {
  //       console.log('成功',res)
  //     },
  //       (err: any) => {
  //         console.log('err:', err);
  //       }
  //     );
  // }

  business = false
  Comparison(): void {
    if (this.userJson.account_id == '5acc1fb9-5dbd-48a6-840d-9477238b4f31' || this.userJson.account_id == 'b57fc8f3-0444-42a7-b15d-7526284ea082' || this.userJson.account_id == '3acddb9e-09f8-4e47-860f-536093bb6b9f'
      || this.userJson.account_id == '9dee04c4-38ff-4e2a-98dd-86f71d9311b1' || this.userJson.account_id == 'fbe0c96a-40dc-466e-b7eb-722d71bb0bc3' || this.userJson.account_id == '4936854c-1881-4395-9ff6-56228c43a592'
      || this.userJson.account_id == 'bef186bb-1d0b-4588-a090-8b866c7c5850' || this.userJson.account_id == '694f82a4-4092-4e9d-992e-909e5380c97a') {
      this.business = true
      this.selectedValue = ['status', 'customer_code', 'code', 'projectman_name', 'serviceman_name', 'customer_name', 'date_for_start', 'date_for_end', 'action_edit', 'is_template', 'copy'];
    }
  }

  date_for_start: any;
  //textdate = '2022-08-09T00:00:00Z';
  texttest: any;
  copytoadd(projectdata: any): void {
    //console.log(projectdata)
    //this.getalltask(projectdata.p_id, 'test')
    Swal.fire({
      title: `您是否確定要複製專案?`,
      //text: "啟動後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `確定!`,
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '載入中...',
          html: '新增專案中',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        this.inquireproject(projectdata.p_id)
      }
    })
  }

  inquireproject(p_id: any) {
    this.HttpApiService.getOneProjectRequest_t(p_id)
      .subscribe(projectRequest => {
        var projectDatas: any = projectRequest
        this.uploadproject(projectDatas.body)
      })
  }

  hrs = -(new Date().getTimezoneOffset() / 60)
  p_id: any
  uploadproject(projectdata: any): void {
    console.log(projectdata)
    let projectManagerDatas: any = {};//接收資料
    for (var i in projectdata) {
      if (i != 'p_id') {
        projectManagerDatas[`${i}`] = projectdata[i]
      }
      if (i == 'code') {
        var codeyear = String(new Date().getFullYear())
        var codemonth = String(new Date().getMonth() + 1)
        if (codemonth.length < 2) {
          codemonth = '0' + codemonth
        }
        var codedate = String(new Date().getDate())
        if (codedate.length < 2) {
          codedate = '0' + codedate
        }
        projectManagerDatas['code'] = codeyear + codemonth + codedate + "-XXXX"
      }
      projectManagerDatas['status'] = '產銷建檔中'
      // var date_for_start = new Date()
      // date_for_start.setHours(date_for_start.getHours() + this.hrs);
      // projectManagerDatas['date_for_start'] = date_for_start
    }
    console.log(projectManagerDatas)
    this.HttpApiService.uploadProjectRequest_t(projectManagerDatas)
      .subscribe(projectRequest => {
        let projectData: any = projectRequest
        this.p_id = projectData.body
        console.log(projectData)
        console.log("成功")
        this.getalltask(projectdata.p_id, this.p_id)
        setTimeout(() => { this.uploadTransactionRecordRequests(this.p_id) }, 2000);
      },
        (err: any) => {
          console.log('err:', err);
        });
  }
  getalltask(p_id: any, newp_id: any): void {
    this.HttpApiService.getTaskListUserRequest(p_id)
      .subscribe(taskRequest => {
        let taskData: any = taskRequest.body.task
        this.uploadTask(newp_id, taskData)
        console.log(taskData)
      })
  }

  taskDatas: any = { "task": [] }
  uploadTask(p_id: any, taskdata: any): void {
    for (var i in taskdata) {
      if (taskdata[Number(i)]['t_name'] != '治具' && taskdata[Number(i)]['t_name'] != '書面資料' && taskdata[Number(i)]['t_name'] != '試機需求部品' && taskdata[Number(i)]['t_name'] != '其他列') {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['documents_id'] = p_id
        taskManagerDatas['t_name'] = taskdata[Number(i)]['t_name']
        taskManagerDatas['default_date'] = 2
        taskManagerDatas['default_labor_hour'] = 2
        taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
        taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
        taskManagerDatas['origin_id'] = taskdata[Number(i)]['origin_id']
        taskManagerDatas['date_for_estimated_start'] = taskdata[Number(i)]['date_for_estimated_start']
        taskManagerDatas['date_for_actual_completion'] = ""
        taskManagerDatas['date_for_estimated_completion'] = taskdata[Number(i)]['date_for_estimated_completion']
        taskManagerDatas['hierarchy'] = 1
        taskManagerDatas['quantity'] = taskdata[Number(i)]['quantity']
        taskManagerDatas['file'] = taskdata[Number(i)]['file']
        this.taskDatas.task.push(taskManagerDatas)
      }
    }
    console.log(this.taskDatas)
    this.HttpApiService.uploadpluralTaskRequest(this.taskDatas)
      .subscribe(taskRequest => {
        var taskidDatas: any = taskRequest
        this.uploadTaskUserDatas(taskidDatas.body, taskdata)
      })
  }

  taskuserDatas: any = { "task_user": [] }
  //產生一筆新的task_user資料格式-------------------------------------------
  uploadTaskUserDatas(taskidDatas: any, taskdata: any): void {
    this.taskuserDatas = { "task_user": [] }
    var j = 0
    for (var i in taskdata) {
      if (taskdata[Number(i)]['t_name'] != '治具' && taskdata[Number(i)]['t_name'] != '書面資料' && taskdata[Number(i)]['t_name'] != '試機需求部品' && taskdata[Number(i)]['t_name'] != '其他列') {
        let taskuserManagerDatas: any = {};//接收資料
        taskuserManagerDatas['task_id'] = taskidDatas[j]
        taskuserManagerDatas['user_id'] = taskdata[Number(i)]['account_id']
        taskuserManagerDatas['principal'] = true
        j = j + 1
        this.taskuserDatas.task_user.push(taskuserManagerDatas)
      }
    }
    console.log(this.taskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.taskuserDatas)
      .subscribe(taskuserRequest => {
        console.log('成功')
        //setTimeout(() => { this.editurl() }, 5000);
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(p_id: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = p_id
    trManagerDatas['actor'] = "新建"
    trManagerDatas['content'] = "專案"
    trManagerDatas['creater'] = this.userJson.account_id

    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log('成功')
        this.editurl()
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  // 跳轉頁面------------------------------------------
  editurl(): void {
    window.location.assign(`main/projectinfo/produce-sales-meeting-edit/${this.p_id}`);
  }


  getProjectListManagerRequests(): void {
    this.HttpApiService.getProduceSalesListRequest_t(1, 20)
      .subscribe(projectRequest => {
        //console.log(projectRequest.body.project)
        for (var i in projectRequest.body.project) {
          if (projectRequest.body.project[i].status != "產銷建檔中" && projectRequest.body.project[i].status != "已中止") {
            if (projectRequest.body.project[i].status != "建檔中") {
              projectRequest.body.project[i].status = "專案已啟動"
            }
            else {
              projectRequest.body.project[i].status = "待專案啟動"
            }
            projectRequest.body.project[i].status = "專案已啟動"
          }
          this.projectDatas.push(projectRequest.body.project[i])
          if (projectRequest.body.project[i].customer_code) {
            this.customer_code_option.push(projectRequest.body.project[i].customer_code)
            this.customer_code_option = [...new Set(this.customer_code_option)]
          }
          if (projectRequest.body.project[i].code) {
            this.code_option.push(projectRequest.body.project[i].code)
            this.code_option = [...new Set(this.code_option)]
          }
          if (projectRequest.body.project[i].date_for_end == '0001-01-01T00:00:00Z') {
            projectRequest.body.project[i].date_for_end = ''
          }
        }
        console.log(projectRequest)
        this.showData(this.projectDatas, projectRequest.body.total)
      });
  }

  test(p_id: any, is_template: any): void {
    console.log(is_template)
    this.HttpApiService.getOneProjectRequest_t(p_id)
      .subscribe(projectRequest => {
        var projectDatas: any = projectRequest
        //console.log(projectDatas.body)
        this.editOneProjectDatas(projectDatas, is_template)
      })
  }

  //修改該id之project資料------------------------------------------------------------
  editOneProjectDatas(projectDatas: any, is_template: any): void {
    let projectManagerDatas: any = {};//接收資料
    projectManagerDatas['p_id'] = projectDatas.body.p_id;
    projectManagerDatas['status'] = projectDatas.body.status
    projectManagerDatas['date_for_start'] = projectDatas.body.date_for_start;
    projectManagerDatas['date_for_end'] = projectDatas.body.date_for_end;
    projectManagerDatas['is_template'] = is_template
    console.log(projectManagerDatas)
    this.HttpApiService.updateProjectRequest_t(this.p_id, projectManagerDatas).
      subscribe(projectRequest => {
        console.log(projectRequest)
      })
  }

  // 顯示資料
  showData(data: any, totalcount: any) {
    // for (var i in data) {
    //   if (data[i].status != "建檔中" && data[i].status != "已中止") {
    //     data[i].status = "專案已啟動"
    //   }
    // }
    this.dataSource_1.data = data;//將資料帶入
    this.totalCount = totalcount;//計算資料長度
    //this.dataSource_1.sort = this.sort;
    this.dataSource_1.paginator = this.paginator;
    console.log(this.dataSource_1)
  }
  //搜尋資料
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_1.filter = filterValue.trim().toLowerCase();
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
    this.dataSource_1.filterPredicate = (data: any, filter: string): boolean => {
      return this.getCheckIncludes(data, ['ObjectID', 'ID', 'InvoiceNO_KUT'], filter);
    };
  }
  // 取得要過濾哪些欄位 array資料  titles要過濾的欄位名稱 keyword關鍵字
  getCheckIncludes(array: any, titles: string[], keyword: string) {
    return titles.some(i => {
      return array[i].toLowerCase().includes(keyword.toLowerCase());
    });
  }
  // filter 輸入關鍵字
  keyupSearch(event: any) {
    this.dataSource_1.filter = event.toLowerCase();
  }
  // 新增dialog
  addItem(item: any) {
    if (item == "A") {
      const dialogRef = this.dialog.open(this.addDialog);
    }
    if (item == "B") {
      this.dialog.open(RepeatOrderComponent);
    }
    if (item == "C") {
      this.dialog.open(FormalprojectAddDialogComponent);
    }
    if (item == "D") {
      this.dialog.open(TemplateAddDialogComponent);
    }
  }

  sweetalert(): void {
    Swal.fire({
      text: "此功能尚未開放",
      icon: 'warning',
      //confirmButtonColor: '#3085d6',
      confirmButtonColor: '#64c270',
      confirmButtonText: '確定',
    })
  }







  salesman_id: any
  accountgroup: AccountGroup[] = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
  //accountgroup: AccountGroup[] = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "-未指定-" }] }]
  //取得user部門列表-------------------------------------------------------------------------
  getDepartmentList(): void {
    this.HttpApiService.getDepartmentList()
      .subscribe(departmentRequest => {
        var departmentdatas: any = departmentRequest
        for (var i in departmentdatas.body.department) {
          this.accountgroup.push({ "dep_name": departmentdatas.body.department[i].name, "dep_id": departmentdatas.body.department[i].d_id, "account": [] })
        }
        this.getAccountList()
      })
  }
  //取得user列表-------------------------------------------------------------------------
  getAccountList(): void {
    this.HttpApiService.getAccountRequest_t(1, 20)
      .subscribe(AccountRequest => {
        var accountdatas: any = AccountRequest
        //console.log(accountdatas.body.accounts)
        for (var i in accountdatas.body.accounts) {
          if (accountdatas.body.accounts[i].dep) {
            for (var j in this.accountgroup) {
              if (this.accountgroup[j].dep_id == accountdatas.body.accounts[i].dep) {
                this.accountgroup[j].account.push({ "account_id": accountdatas.body.accounts[i].account_id, "name": accountdatas.body.accounts[i].name })
              }
            }
          }
        }
      })
    console.log(this.accountgroup)
  }

  BusinessData: any
  MechanismData: any
  ElectronicData: any
  ManufactureData: any
  PurchaseData: any
  OperatingData: any
  CustomerData: any

  distinguish(): void {

  }

}
