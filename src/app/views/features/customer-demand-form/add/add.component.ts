import { HttpApiService } from './../../../../api/http-api.service';
import { CustomerDemandReceipt } from './../../../../shared/models/task';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { taskData } from './../../../../shared/data/task-data';
import { recordData } from './../../../../shared/data/record-data';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditMeetDialogComponent } from './edit-meet-dialog/edit-meet-dialog.component';
import { MeetDialogComponent } from './meet-dialog/meet-dialog.component';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('addDialog') addDialog!: TemplateRef<any>
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileUpdateDialog') fileUpdateDialog!: TemplateRef<any>;
  @ViewChild('taskDialog') taskDialog!: TemplateRef<any>;
  @ViewChild('userDialog') userDialog!: TemplateRef<any>;

  receiptForm: FormGroup;
  departments: FormGroup;
  campaignOne: FormGroup;
  campaignTwo: FormGroup;

  receipts?: CustomerDemandReceipt[];
  receipt?: CustomerDemandReceipt;
  userList: any[] = [];

  // table 資料
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  taskDataSource = new MatTableDataSource();
  recentlydataSource = new MatTableDataSource();
  countersignDataSource = new MatTableDataSource();
  meetDataSource = new MatTableDataSource();
  @ViewChild('addMeetDialog') addMeetDialog!: TemplateRef<any>;

  //任務列表
  displayedColumn: string[] = ['status', 'task_name', 'start_time', 'end_time', 'estimate_time', 'represent', 'note', 'start_date', 'end_date', 'attachment', 'action_edit', 'record', 'action_detail'];
  //會簽列表
  countersignColumn: string[] = ['status', 'dep_id', 'feedback', 'create_time'];
  //會議列表
  meetCol: string[] = ['name', 'start_date', 'end_date', 'chairman', 'action_edit', 'action_detail'];

  //機台選擇
  machine_option: any[] = [{
    key: "DP7600",
    value: "1e6913f5-55be-413a-94a5-68f8cc67d5b2",
  }, {
    key: "DP7700",
    value: "bd6f7b93-6882-4ebb-8489-4228cf249c4a",
  }];


  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);

  // 時間格式
  formatStr = 'YYYY-MM-d hh:mm:ss';

  // 年分
  year: any;

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  // 定義table標題
  displayedColumnsObj: any[] = [
    { cn: '任務名稱', en: 'task_name' },
    { cn: '開始時間', en: 'start_time' },
    { cn: '結束時間', en: 'end_time' },
    { cn: '預計時間', en: 'estimate_time' },
    { cn: '負責人', en: 'represent' },
    { cn: '備註說明', en: 'note' },
    { cn: '開始日期', en: 'start_date' },
    { cn: '完工日期', en: 'end_date' },
    { cn: '附件', en: 'attachment' },
    { cn: '紀錄', en: 'record' },
  ];
  countersignColumnObj: any[] = [
    { cn: '部門', en: 'dep_id' },
    { cn: '內容', en: 'feedback' },
    { cn: '時間', en: 'create_time' },
  ];
  displayedColumnsRecently10: any[] = [
    { cn: '任務名稱', en: 'subject' },
    { cn: '開始時間', en: 'date_for_devlop' },
    { cn: '結束時間', en: 'date_for_done' },
  ];
  displayedColumnsObj3: any[] = [
    { cn: '時間', en: 'creater_time' },
    { cn: '部門', en: 'type' },
    { cn: '內容', en: 'content' },
  ];

  displayedColumns!: string[];
  displayedColumns2!: string[];
  displayedColumns3!: string[];

  ngAfterViewInit() {
    // 設定資料排序
    this.dataSource.sort = this.sort;
    this.dataSource2.sort = this.sort;
    this.dataSource3.sort = this.sort;

    // 執行顯示資料
    setTimeout(() => {
      this.showData();
      this.showData2()
      this.showData3();
    }, 0);
  }

  // 顯示資料
  showData() {
    this.totalCount = taskData.length;
    this.dataSource.data = taskData;
    this.dataSource.paginator = this.paginator;
  }
  showData2() {
    this.totalCount = taskData.length;
    this.dataSource2.data = taskData;
    this.dataSource2.paginator = this.paginator;
  }
  showData3() {
    this.totalCount = recordData.length;
    this.dataSource3.data = recordData;
    this.dataSource3.paginator = this.paginator;
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

  // 過濾資料
  filterData() {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
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

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private location: Location,
    private matPaginatorIntl: MatPaginatorIntl,
    //private customerDemandService: CustomerDemandService
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
  ) {

    this.receiptForm = this.fb.group({
      code: new FormControl(),
      date_for_recive: new FormControl(),
      customer_id: new FormControl(),
      contact_person_id: new FormControl(),
      demand_content: new FormControl(),
      suitable_content: new FormControl(),
      other_content: new FormControl(),
      budget: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_end: new FormControl(),
      machine_status_id: new FormControl(),
      extend_type_id: new FormControl(),
      extend_rem: new FormControl(),
      date_for_devlop: new FormControl(),
      est_quantity: new FormControl(),
      eva_report: new FormControl(),
    });


    this.departments = this.fb2.group({
      department1: false,
      department2: false,
      department3: false,
      department4: false,
      department5: false,
      department6: false,
    });
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
    //進十筆
    //this.showDataRecently10(customerRequests.result);

    //取得紀錄資料
    this.getLogRequests();
    this.getAllUserName()

    this.receiptForm = new FormGroup({
      code: new FormControl(),
      date_for_recive: new FormControl(),
      customer_id: new FormControl(),
      contact_person_id: new FormControl(),
      demand_content: new FormControl(),
      suitable_content: new FormControl(),
      other_content: new FormControl(),
      budget: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_end: new FormControl(),
      machine_status_id: new FormControl(),
      extend_type_id: new FormControl(),
      extend_rem: new FormControl(),
      date_for_devlop: new FormControl(),
      est_quantity: new FormControl(),
      eva_report: new FormControl(),
    })

    this.displayedColumns = this.displayedColumnsObj.map(i => i.en);
    this.displayedColumns2 = this.displayedColumnsRecently10.map(i => i.en);
    //this.displayedColumns3 = this.displayedColumnsObj3.map(i => i.en);


    this.setPaginator();
  }

  // 送出
  submit(formValue: any) {
    // if (formValue.new_password !== formValue.confirm_password) {
    //   alert('請確認密碼');
    //   return;
    // }
    if (this.receiptForm.valid) {
      //   this.updateMemberPassword(member);
    } else {
      this.markFormGroupTouched(this.receiptForm);
    }
  }

  // 將formgroup改為觸碰狀態
  private markFormGroupTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  //返回上一頁
  goBack(): void {
    this.location.back();
  }

  // 選擇月份時關閉
  closeDatePicker(elem: MatDatepicker<any>, value: any) {
    this.year = value;
    elem.close();
  }

  // 開啟dialog
  // 新增
  addTask(item: any) {
    this.dialog.open(AddDialogComponent, {
      data: {
        t_id: item
      }
    });
  }

  //列出所有username
  getAllUserName(): void {
    for (var pagenum = 1; pagenum <= 92; pagenum++) {
      this.HttpApiService.getAccountRequest_t(pagenum, 1)
        .subscribe(userRequest => {
          this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
        })
    }
  }

  CRDatas: any;
  //雙向綁定
  t_id = ''

  code = ''
  date_for_recive = ''
  customer_id = ''
  contact_person_id = ''
  demand_content = ''
  suitable_content = ''
  other_content = ''
  budget = ''
  date_for_estimated_start = ''
  date_for_estimated_end = ''
  machine_status_id = ''
  extend_type_id = ''
  extend_rem = ''
  date_for_devlop = ''
  est_quantity: any = ''
  eva_report = ''

  addCustomerRequest(): void {

    let customerRequestData: any = {};//接收資料的陣列
    customerRequestData['code'] = this.code;
    customerRequestData['date_for_recive'] = this.date_for_recive;
    customerRequestData['customer_id'] = this.customer_id;
    customerRequestData['contact_person_id'] = this.contact_person_id;
    customerRequestData['demand_content'] = this.demand_content;
    customerRequestData['suitable_content'] = this.suitable_content;
    customerRequestData['other_content'] = this.other_content;
    customerRequestData['budget'] = this.budget;
    customerRequestData['date_for_estimated_start'] = this.date_for_estimated_start;
    customerRequestData['date_for_estimated_end'] = this.date_for_estimated_end;
    customerRequestData['machine_status_id'] = this.machine_status_id;
    customerRequestData['extend_type_id'] = this.extend_type_id;
    customerRequestData['extend_rem'] = this.extend_rem;
    customerRequestData['date_for_devlop'] = this.date_for_devlop;
    customerRequestData['est_quantity'] = Number(this.est_quantity);
    customerRequestData['eva_report'] = this.eva_report;

    //測試區
    customerRequestData['salesman_id'] = this.contact_person_id;

    customerRequestData['projectman_id'] = this.contact_person_id;
    customerRequestData['creater'] = this.userJson.account_id;
    customerRequestData['accept'] = false;
    customerRequestData['status'] = "單位主管審核";
    customerRequestData['date_for_actual_done'] = this.date_for_estimated_end;

    this.HttpApiService.uploadCustomerDemand(customerRequestData).subscribe(
      projectManagerRequest => {
        console.log(projectManagerRequest)
      },
      (err: any) => {
        console.log('err:', err);
      }
    );

    location.href = 'main/project-A/project-request';
  }

  saveCustomerRequest(): void {

    let customerRequestData: any = {};//接收資料的陣列
    customerRequestData['code'] = this.code;
    customerRequestData['date_for_recive'] = this.date_for_recive;
    customerRequestData['customer_id'] = this.customer_id;
    customerRequestData['contact_person_id'] = this.contact_person_id;
    customerRequestData['demand_content'] = this.demand_content;
    customerRequestData['suitable_content'] = this.suitable_content;
    customerRequestData['other_content'] = this.other_content;
    customerRequestData['budget'] = this.budget;
    customerRequestData['date_for_estimated_start'] = this.date_for_estimated_start;
    customerRequestData['date_for_estimated_end'] = this.date_for_estimated_end;
    customerRequestData['machine_status_id'] = this.machine_status_id;
    customerRequestData['extend_type_id'] = this.extend_type_id;
    customerRequestData['extend_rem'] = this.extend_rem;
    customerRequestData['date_for_devlop'] = this.date_for_devlop;
    customerRequestData['est_quantity'] = Number(this.est_quantity);
    customerRequestData['eva_report'] = this.eva_report;

    //測試區
    customerRequestData['salesman_id'] = this.contact_person_id;
    customerRequestData['projectman_id'] = this.contact_person_id;
    customerRequestData['creater'] = this.userJson.account_id;
    customerRequestData['accept'] = false;
    customerRequestData['status'] = "填寫中";
    customerRequestData['date_for_actual_done'] = this.date_for_estimated_start;

    console.log("傳送資料", customerRequestData);//把資料console出來

    this.HttpApiService.uploadCustomerDemand(customerRequestData).subscribe(
      projectManagerRequest => {
        console.log(projectManagerRequest)
      },
      (err: any) => {
        console.log('err:', err);
      }
    );

    location.href = 'main/project-A/project-request';
  }

  taskView(item: any, item2: any) {
    this.dialog.open(TaskDialogComponent, {
      data: {
        t_id: item,
        name: item2
      }
    });
  }

  //顯示資料
  showDataRecently10(data: any) {

    if (data.length < 10) {
      this.recentlydataSource.data = data;//將資料帶入
    } else {
      let i: number = 0;

      while (i < 9) {
        this.recentlydataSource.data.push(data[i])
        i++;
      }
    }


    this.recentlydataSource.sort = this.sort;
    this.recentlydataSource.paginator = this.paginator;
  }

  //取得會議meeting資料-------------------------------------------------------------
  meetRequest: any;
  meetDatas: any;

  getMeetRequest(): void {
    this.HttpApiService.getMeetingRequest(1, 20)
      .subscribe(meetRequest => {
        this.meetDatas = meetRequest.result;
        this.meetDataSource.data = meetRequest.result;
        this.totalCount = meetRequest.result.length;
      });
  }

  //建立會議
  addMeetItem() {
    const dialogRef = this.dialog.open(this.addMeetDialog);
  }

  doPostMeet(item: any) {
    this.dialog.open(MeetDialogComponent, {
      data: {
        m_id: item

      }
    });
  }

  userResourse() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    const dialogRef = this.dialog.open(this.userDialog);
  }

  fileItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    const dialogRef = this.dialog.open(this.fileUpdateDialog);
  }

  //編輯任務彈跳視窗
  doPostEdit(item: any, item2: any): void {
    this.dialog.open(EditTaskDialogComponent, {
      data: {
        name: item,//抓任務名稱
        t_id: item2
      }
    });
  }

  //取得Log資料---------------------------------------
  getLogRequests(): void {
    this.HttpApiService.getLogRequest()
      .subscribe(logRequests => {
        this.totalCount = logRequests.result.length;
        this.dataSource3.data = logRequests.result;
        this.dataSource3.paginator = this.paginator;
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  doPostMeetEdit(item: any) {
    this.dialog.open(EditMeetDialogComponent, {
      data: {
        m_id: item
      }
    });
  }



}

