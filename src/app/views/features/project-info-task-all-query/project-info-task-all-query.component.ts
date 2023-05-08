import { CrLaborHourDialogComponent } from './cr-labor-hour-dialog/cr-labor-hour-dialog.component';
import { AccountId } from './../../../shared/models/models';
import { HttpApiService } from './../../../api/http-api.service';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerRequestDialogComponent } from './customer-request-dialog/customer-request-dialog.component';
import { CdInterviewDialogComponent } from './cd-interview-dialog/cd-interview-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { LaborHourDialogComponent } from './labor-hour-dialog/labor-hour-dialog.component';
import { MeetDialogComponent } from './meet-dialog/meet-dialog.component';
import { FileUploadDialogComponent } from './../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';


const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

//專案任務
export interface projectDataListElement {
  status: string;//狀態
  task_name: string;//任務名稱
  time_for_start: string;//開始時間
  time_for_done: string;//結束時間
  estimate_time: string;//預計工時
  principal: string;//負責人
  description: string;//備註說明
  start_date: string;//實際開始~結束
  labor_hour: string;//實際工時
  manhour_detail: string;//明細工時
  attachment: string;//附件
  record: string;//紀錄
}


export interface projectDataListElement2 {
  status: string;//狀態
  task_name: string;//任務名稱
  manager: string;//主管預定
  estimate_end: string;//預定完工
  submit: string;//完工送審
  authorize: string;//完工核准
  represent: string;//主要負責人
  note: string;//備註說明
  man_hour: string;//實際工時
  man_hour_detail: string;//明細工時
  attachment: string;//附件
  record: string;//表單紀錄
}

const ElEMENT_DATA_2: projectDataListElement2[] = [
  { status: '逾期完工', task_name: 'CR-20210018', manager: '2021/09/17', estimate_end: '', submit: '', authorize: '', represent: '張元譯', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' },
  { status: '逾期未完工', task_name: 'CR-20210019', manager: '2021/09/24', estimate_end: '', submit: '', authorize: '', represent: '黃政達', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' },
  { status: '逾期完工', task_name: 'CR-20210019', manager: '2021/09/24', estimate_end: '', submit: '', authorize: '', represent: '黃政達', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' },
  { status: '逾期完工', task_name: 'CR-20210019', manager: '2021/09/24', estimate_end: '', submit: '', authorize: '', represent: '黃政達', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' }
]

export interface projectDataListElement3 {
  status: string;//狀態
  task_name: string;//任務名稱
  manager: string;//主管預定
  estimate_end: string;//預定完工
  submit: string;//完工送審
  authorize: string;//完工核准
  represent: string;//主要負責人
  note: string;//備註說明
  man_hour: string;//實際工時
  man_hour_detail: string;//明細工時
  attachment: string;//附件
  record: string;//表單紀錄
}

const ElEMENT_DATA_3: projectDataListElement3[] = [
  { status: '逾期完工', task_name: 'CRM-2021-05-0024', manager: '2021/08/13', estimate_end: '2021/08/16', submit: '2021/08/16', authorize: '2021/08/17', represent: '黃柏樺', note: '已完工', man_hour: '14.0', man_hour_detail: '', attachment: '', record: '' },
  { status: '逾期未完工', task_name: 'CRM-2021-07-0017', manager: '2021/08/13', estimate_end: '', submit: '', authorize: '', represent: '黃政達', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' },
  { status: '逾期完工', task_name: 'CRM-2021-07-0018', manager: '2021/08/31', estimate_end: '', submit: '', authorize: '', represent: '黃政達', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' },
  { status: '逾期完工', task_name: 'CRM-2021-07-0019', manager: '2021/08/31', estimate_end: '', submit: '', authorize: '', represent: '黃政達', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' }
]

export interface projectDataListElement4 {
  status: string;//狀態
  task_name: string;//任務名稱
  manager: string;//主管預定
  estimate_end: string;//預定完工
  submit: string;//完工送審
  authorize: string;//完工核准
  represent: string;//主要負責人
  note: string;//備註說明
  man_hour: string;//實際工時
  man_hour_detail: string;//明細工時
  attachment: string;//附件
  record: string;//表單紀錄
}

const ElEMENT_DATA_4: projectDataListElement4[] = [
  { status: '逾期未完工', task_name: 'CRM-2021-05-0024', manager: '2021/08/13', estimate_end: '2021/08/16', submit: '2021/08/16', authorize: '2021/08/17', represent: '黃柏樺', note: '已完工', man_hour: '14.0', man_hour_detail: '', attachment: '', record: '' },
  { status: '如期完工', task_name: 'CRM-2021-07-0017', manager: '2021/08/13', estimate_end: '', submit: '', authorize: '', represent: '黃政達', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' },
  { status: '逾期完工', task_name: 'CRM-2021-07-0018', manager: '2021/08/31', estimate_end: '', submit: '', authorize: '', represent: '黃政達', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' },
  { status: '未逾期執行中', task_name: 'CRM-2021-07-0019', manager: '2021/08/31', estimate_end: '', submit: '', authorize: '', represent: '黃政達', note: '', man_hour: '', man_hour_detail: '', attachment: '', record: '' }
]

export interface projectDataListElement5 {
  sort: string;//性質
  date: string;//日期
  man_hour: string;//工時
  create_user: string;//建檔人
  project_id: string;//專案代號
  machine: string;//機台
  title: string;//主題
  action_delete: string;//刪除紐
}


const ElEMENT_DATA_5: projectDataListElement5[] = [
  { sort: '設計', date: '2021/05/28', man_hour: '3.0H', create_user: '吳紹安', project_id: '', machine: '', title: 'CRM問題處理', action_delete: '' },
  { sort: '資料整理', date: '2021/01/08', man_hour: '3.0H', create_user: '吳紹安', project_id: '', machine: '', title: '治具設計送審', action_delete: '' }
]


@Component({
  selector: 'app-project-info-task-all-query',
  templateUrl: './project-info-task-all-query.component.html',
  styleUrls: ['./project-info-task-all-query.component.scss']
})
export class ProjectInfoTaskAllQueryComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('CRpaginator') CRpaginator!: MatPaginator;
  @ViewChild('LHpaginator') LHpaginator!: MatPaginator;
  @ViewChild('Meetpaginator') Meetpaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('projectTaskSort') projectTaskSort!: MatSort;
  @ViewChild('CRSort') CRSort!: MatSort;
  @ViewChild('meetSort') meetSort!: MatSort;
  @ViewChild('LHSort') LHSort!: MatSort;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('addDialog') addDialog!: TemplateRef<any>;
  @ViewChild('fileUploadDialog') fileUploadDialog!: TemplateRef<any>;
  @ViewChild('taskDialog') taskDialog!: TemplateRef<any>;
  @ViewChild('userDialog') userDialog!: TemplateRef<any>;
  @ViewChild('crmDialog') crmDialog!: TemplateRef<any>;
  @ViewChild('internalContactDialog') internalContactDialog!: TemplateRef<any>;



  campaignOne: FormGroup;
  campaignTwo: FormGroup;

  displayedColumn: string[] = ['status', 't_name', 'date_for_estimated_start', 'date_for_estimated_completion', 'estimate_time', 'name', 'description', 'start_date', 'labor_hour', 'manhour_detail', 'attachment', 'record'];

  CRdisplayedColumn: string[] = ['status', 'cd_id', 'date', 'estimate_end', 'submit', 'authorize', 'represent', 'note', 'man_hour', 'man_hour_detail', 'attachment', 'record'];

  displayedColumn3: string[] = ['status', 'project_id', 'manager', 'estimate_end', 'submit', 'authorize', 'contact_person', 'note', 'man_hour', 'man_hour_detail', 'attachment', 'record'];

  displayedColumn4: string[] = ['status', 'task_name', 'manager', 'estimate_end', 'submit', 'authorize', 'represent', 'note', 'man_hour', 'man_hour_detail', 'attachment', 'record'];
  //datasSource4 = ElEMENT_DATA_4;
  datasSource4 = []

  // LHdisplayedColumn: string[] = ['nature', 'date_for_start', 'man_hour', 'create_user', 'project_id', 'machine', 'title', 'action_delete'];
  LHdisplayedColumn: string[] = ['nature', 'date_for_start', 'man_hour', 'create_user', 'project_id', 'machine', 'title'];
  datasSource5 = ElEMENT_DATA_5;

  //會議欄位顯示
  //meetCol: string[] = ['date_for_start', 'chairman', 'attendees', 'm_name', 'member', 'record'];
  meetCol: string[] = ['date_for_start', 'chairman', 'm_name', 'record'];

  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  displayedColumnsObj2: any[] = [
    { cn: '任務名稱', en: 'task_name' },
    { cn: '主管預定', en: 'manager' },
    { cn: '預定完工', en: 'estimate_end' },
    { cn: '完工送審', en: 'submit' },
    { cn: '完工核准', en: 'authorize' },
    { cn: '主要負責人', en: 'principal' },
    { cn: '備註說明', en: 'note' },
    { cn: '實際工時', en: 'man_hour' },
    { cn: '工時明細', en: 'man_hour_detail' },
    { cn: '附件', en: 'attachment' },
    { cn: '表單紀錄', en: 'record' },
  ];

  displayedColumnsObj3: any[] = [
    { cn: '性質', en: 'sort' },
    { cn: '日期', en: 'date' },
    { cn: '建檔人', en: 'create_user' },
    { cn: '標題', en: 'title' },
    { cn: '處理方式/處理結果', en: 'deal_with_way_result' },
  ];

  displayedColumnsObj5: any[] = [
    //{ cn: '成員', en: 'attendees' },
    { cn: '紀錄', en: 'rocord' },
    { cn: '時間', en: 'start_date' },
    { cn: '會議主席', en: 'chairman' },
    //{ cn: '參與人員', en: 'attendees' },
    { cn: '主題', en: 'name' },
  ];

  displayedColumns!: string[];
  displayedColumns2!: string[];
  displayedColumns3!: string[];
  displayedColumns4!: string[];
  displayedColumns5!: string[];

  // table date
  toppings = new FormControl();

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;
  projectTasktotalCount!: number;
  CRtotalCount!: number;
  LHTotalCount!: number
  MeetingTotalCount!: number

  // MatPaginator Output
  pageEvent!: PageEvent;


  // table 資料
  projectTaskDataSource = new MatTableDataSource<any>();
  CRdataSource = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  dataSource4 = new MatTableDataSource<any>();
  LHdatasSource = new MatTableDataSource<any>();
  meetDataSource = new MatTableDataSource<any>();

  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);

  // 時間格式
  formatStr = 'YYYY-MM-d hh:mm:ss';

  // 年分
  year: any;
  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private httpApiService: HttpApiService
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

    //取得客需單列表
    this.getCustomerRequests();

    // this.getProjectInfoManufactures();
    //取得專案任務列表
    this.getTaskRequsts();
    //取得工時明細列表
    this.getLaborHourList();
    //取得會議列表
    this.getMeetRequest();

    this.displayedColumns2 = this.displayedColumnsObj2.map(i => i.en);
    this.displayedColumns3 = this.displayedColumnsObj3.map(i => i.en);
    this.displayedColumns5 = this.displayedColumnsObj5.map(i => i.en);

    this.setPaginator();
  }




  ngAfterViewInit() {
    // 設定資料排序
    this.projectTaskDataSource.sort = this.projectTaskSort;
    this.CRdataSource.sort = this.CRSort;
    this.dataSource3.sort = this.sort;
    this.dataSource4.sort = this.sort;
    this.LHdatasSource.sort = this.LHSort;
    this.meetDataSource.sort = this.meetSort;
  }

  //顯示資料

  showData2(data: any) {
    this.CRdataSource.data = data;//將資料帶入
    this.CRtotalCount = data.length;//計算資料長度
    this.CRdataSource.paginator = this.CRpaginator;
  }

  showData3(data: any) {
    this.dataSource3.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
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
    this.projectTaskDataSource.filterPredicate = (data: any, filter: string): boolean => {
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
    this.projectTaskDataSource.filter = event.toLowerCase();
    this.CRdataSource.filter = event.toLowerCase();
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

  // 藉由ObjectID取得item
  getItemByObjectID(id: string) {
    if (!id) {
      return;
    }

    // return tableData.find(i => i.ParentObjectID === id);
  }

  internalContactView() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    const dialogRef = this.dialog.open(this.internalContactDialog);
  }

  crmView() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    const dialogRef = this.dialog.open(this.crmDialog);
  }

  taskView(item: any, item2: any) {
    this.dialog.open(TaskDialogComponent, {
      data: {
        t_id: item,
        name: item2
      }
    });
  }

  meetView(item: any, item2: any) {
    this.dialog.open(MeetDialogComponent, {
      data: {
        m_id: item,
        name: item2
      }
    });
  }



  //工時明細
  laborHourView(item: any, item2: any) {
    this.dialog.open(LaborHourDialogComponent, {
      data: {
        l_id: item,
        name: item2
      }
    });
  }

  //客需單dialog
  customerRequestView(item: any) {
    this.dialog.open(CustomerRequestDialogComponent, {
      data: {
        c_id: item
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
  //客需單工時明細dialog
  customerLHView(item: any) {
    this.dialog.open(CrLaborHourDialogComponent, {
      data: {
        cu_id: item
      }
    });
  }

  //專案工時明細dialog
  proectLHView(item: any) {
    this.dialog.open(CrLaborHourDialogComponent, {
      data: {
        t_id: item
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
    const dialogRef = this.dialog.open(this.fileUploadDialog);
  }

  // 開啟appendixdialog
  // 新增
  addappendixItem(documents_id: any) {
    // this.dialog.open(ProduceAddAppendixDialogComponent);
    this.dialog.open(FileUploadDialogComponent, {
      data: {
        documents_id: documents_id
      }
    });
  }

  //取得customer資料---------------------------------------
  getCustomerRequests(): void {
    this.httpApiService.getByUserIDListHCR(this.userJson.account_id)
      .subscribe(customerRequests => {
        console.log(customerRequests)
        this.showData2(customerRequests.body);
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //取的labor_hour資料--------------------------------------
  getLaborHourList(): void {
    this.httpApiService.getLaborHourByUserId(this.userJson.account_id)
      .subscribe(LHRequests => {
        console.log('工時明細', LHRequests)
        this.LHdatasSource.data = LHRequests.body.labor_hour;//將資料帶入
        this.LHTotalCount = this.LHdatasSource.data.length;//計算資料長度
        this.LHdatasSource.paginator = this.LHpaginator;
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //取得Project Info Manufactures資料---------------------------------------
  getProjectInfoManufactures(): void {
    this.httpApiService.getProjectInfoManufacture(1, 20)
      .subscribe(projectInfoManufacture => {
        console.log(projectInfoManufacture)
        this.showData3(projectInfoManufacture.result);
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //請求task參數
  testtaskRequest: any;
  testtaskDatas: any;
  //取得任務all task資料--------------------------------------
  taskDatas: any[] = [];
  totaltask: any;
  projectAttendeeList: any[] = []//暫時專案參與成員
  origin_id = '1e6913f5-55be-413a-94a5-68f8cc67d5b2'//專案任務
  getTaskRequsts(): void {
    console.log(this.userJson.account_id)
    this.httpApiService.getTaskByOriginIDAndUserID(this.origin_id, this.userJson.account_id)
      .subscribe(testtaskRequest => {
        console.log(testtaskRequest)
        this.testtaskDatas = testtaskRequest.body.task
        this.projectTaskDataSource.data = this.testtaskDatas;
        this.totaltask = testtaskRequest.body.total
        this.projectTasktotalCount = testtaskRequest.body.total
        for (let i in this.testtaskDatas) {
          this.projectAttendeeList.push(this.testtaskDatas[i].name)
        }
        console.log(this.projectAttendeeList)
        this.projectTaskDataSource.data = this.testtaskDatas;
      });
  }

  //取得會議meeting資料-------------------------------------------------------------
  meetRequest: any;

  getMeetRequest(): void {
    this.httpApiService.getMeetingListUserByUserID(this.userJson.account_id, 1)
      .subscribe(meetRequest => {
        console.log('會議', meetRequest)
        this.meetDataSource.data = meetRequest.body.meeting;//將資料帶入
        this.MeetingTotalCount = meetRequest.body.total;//計算資料長度
        this.meetDataSource.paginator = this.Meetpaginator;
      });
  }


}







