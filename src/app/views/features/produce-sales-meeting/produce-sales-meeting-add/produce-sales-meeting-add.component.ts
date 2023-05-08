import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { HttpApiService } from './../../../../api/http-api.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProduceAddMeetingDialogComponent } from '../produce-add-meeting-dialog/produce-add-meeting-dialog.component';
import { ProduceAddAppendixDialogComponent } from '../produce-add-appendix-dialog/produce-add-appendix-dialog.component';
import { ProduceAddScheduleDialogComponent } from '../produce-add-schedule-dialog/produce-add-schedule-dialog.component';
import { MenuItem } from 'primeng/api';
import { ProduceEditDialogComponent } from '../produce-edit-dialog/produce-edit-dialog/produce-edit-dialog.component';

//機台
export interface PeriodicElement_1 {
  t_id: string;
  tu_id: string;
  fillout: boolean;
  taskname: string;
  date_for_estimated_start_1: any;
  date_for_estimated_completion_1: any;
  date_for_actual_completion_1: any;
  principal_1: string;
  file_1: boolean;
  remark_1: string;
}
const ELEMENT_DATA_1: PeriodicElement_1[] = [
  { t_id: '', tu_id: '', fillout: false, taskname: '機台產銷會議', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台內部訂單', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台-BOM[光學]', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台-BOM[機械]', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台-發包圖面[機械]', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台-BOM[電控]', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台發包[請購]', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台發包[採購]', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台組裝前會議', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台入料完成(含選配)', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '光學校正完成', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '軟體(Vision)完成', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '軟體(Motion)完成', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台組立完成', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台試機完成', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台入庫(含選配)', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台出機', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台裝機', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '正式BOM產出', date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '' },
];
//治具
export interface PeriodicElement_2 {
  t_id: string;
  tu_id: string;
  fillout: boolean;
  taskname: string;
  date_for_estimated_start_2: any;
  date_for_estimated_completion_2: any;
  date_for_actual_completion_2: any;
  principal_2: string;
  file_2: boolean;
  remark_2: string;
}
const ELEMENT_DATA_2: PeriodicElement_2[] = [
  { t_id: '', tu_id: '', fillout: false, taskname: '客戶圖面提供', date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具BOM(設計完成)', date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具內部訂單', date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具發包', date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具入料', date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具組裝完成', date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具預交日', date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具sample提供', date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
];
//書面資料
export interface PeriodicElement_3 {
  t_id: string;
  tu_id: string;
  fillout: boolean;
  taskname: string;
  date_for_estimated_start_3: any;
  date_for_estimated_completion_3: any;
  date_for_actual_completion_3: any;
  principal_3: string;
  file_3: boolean;
  remark_3: string;
}
const ELEMENT_DATA_3: PeriodicElement_3[] = [
  { t_id: '', tu_id: '', fillout: false, taskname: '機械氣泡圖', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '電控電路圖', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機械試驗報告書', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '電控試驗報告書', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'Vision試驗報告書', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'Motion試驗報告書', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機械操作手冊', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '電控操作手冊', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'Vision操作手冊', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'Motion操作手冊', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
];
//試機需求部品
export interface PeriodicElement_4 {
  t_id: string;
  tu_id: string;
  fillout: boolean;
  taskname: string;
  quantity: string;
  date_for_estimated_start_4: any;
  date_for_estimated_completion_4: any;
  date_for_actual_completion_4: any;
  principal_4: string;
  file_4: boolean;
  remark_4: string;
}
const ELEMENT_DATA_4: PeriodicElement_4[] = [
  { t_id: '', tu_id: '', fillout: false, taskname: 'strip', quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'magazing', quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'boat', quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'tray', quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'IC', quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'drawing', quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '其他', quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
];
//其他
export interface PeriodicElement_5 {
  t_id: string;
  tu_id: string;
  fillout: boolean;
  taskname: string;
  date_for_estimated_start_5: any;
  date_for_estimated_completion_5: any;
  date_for_actual_completion_5: any;
  principal_5: string;
  file_5: boolean;
  remark_5: string;
}
const ELEMENT_DATA_5: PeriodicElement_5[] = [
  { t_id: '', tu_id: '', fillout: false, taskname: '配盤', date_for_estimated_start_5: '', date_for_estimated_completion_5: '', date_for_actual_completion_5: '', principal_5: '', file_5: false, remark_5: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '骨架', date_for_estimated_start_5: '', date_for_estimated_completion_5: '', date_for_actual_completion_5: '', principal_5: '', file_5: false, remark_5: '' },
];

//組合機次階
export interface PeriodicElement_6 {
  project_code: string;
  quantity: string;
  assembly: string;
  previous_code: string;
  save_and_cancel: string;
}

const ELEMENT_DATA_6: PeriodicElement_6[] = [
  { project_code: '', quantity: '', assembly: '', previous_code: '', save_and_cancel: '' },
];

//附贈明細
export interface PeriodicElement_7_1 {
  item_number: string;
  product_name: string;
  specification: string;
  quantity_7: string;

}

const ELEMENT_DATA_7_1: PeriodicElement_7_1[] = [
  { item_number: '12345', product_name: '1234567', specification: '123456789101112', quantity_7: '123' },
];

export interface PeriodicElement_7_2 {
  requisiton_number: string;
  application_date: string;
  applicant: string;
  file_creator: string;
  customer: string;
  project_code_7: string;
  requisition: string;
  apply: string;
  purchase: string;
  state: string;

}

const ELEMENT_DATA_7_2: PeriodicElement_7_2[] = [
  { requisiton_number: '20200410', application_date: '2020/04/22', applicant: '林彥東', file_creator: '林彥東', customer: 'ASECL', project_code_7: 'BP6010-0004M01', requisition: '20200400114', apply: '12,345', purchase: '12,345', state: 'F.已結案', },
];

//附贈明細
export interface PeriodicElement_8_2 {
  transaction_department: string;
  transaction_man: string;
  transaction_date: string;
  transaction_detail: string;

}
export interface PeriodicElement123 {
  project: ''
}

const ELEMENT_DATA_8_2: PeriodicElement_8_2[] = [
  { transaction_department: '總經理室', transaction_man: '***', transaction_date: '2021/08/04 15:28:52', transaction_detail: '更新機台-BOM[機械]-0024,***(軟體研發-Motion)資料' },
];

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Component({
  selector: 'app-produce-sales-meeting-add',
  templateUrl: './produce-sales-meeting-add.component.html',
  styleUrls: ['./produce-sales-meeting-add.component.scss']
})
export class ProduceSalesMeetingAddComponent implements OnInit {

  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('addmeetingDialog') addmeetingDialog!: TemplateRef<any>;
  @ViewChild('addappendixDialog') addappendixDialog!: TemplateRef<any>;
  @ViewChild('addscheduleDialog') addscheduleDialog!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale
  private items: MenuItem[];
  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  // table 資料
  dataSource = new MatTableDataSource<any>();

  machinecombinedSource = new MatTableDataSource();
  machinecombinedColumns: string[] = ['mc_code', 'mc_number', 'mc_finished', 'last_mc_code', 'action_edit', 'delete']

  antivirussoftwareSource = new MatTableDataSource();
  antivirussoftwareColumns: string[] = ['as_name', 'software_number', 'machine_number', 'create_time', 'delete']

  pluginSource = new MatTableDataSource();
  pluginColumns: string[] = ['content', 'delete']

  transactionSource = new MatTableDataSource();
  transactionColumns: string[] = ['creater_name', 'create_time', 'actor', 'content']

  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);

  // 時間格式
  formatStr = 'YYYY/MM/d hh:mm:ss';
  hrs = -(new Date().getTimezoneOffset() / 60)

  // 年分
  year: any;

  editForm: FormGroup;
  //宣告會議的dataSource
  testtaskDataSource = new MatTableDataSource();
  projectDatas: any;
  p_id: any = '';

  task_id: any = '';
  taskDatas: any;

  mcDatas: any[] = [{ "mc_code": "-", "mc_id": "32bb6df4-9c69-45b0-9e38-7892492546a5" }];
  mcDataslist: any[] = [];

  plug_inDatas: any;
  plug_in_id: any;



  inner_id: any = ''
  status: any = ''
  //雙向綁訂顯示編輯資料
  code = ''
  projectman_id = ''
  serviceman_id = ''
  customer_id = ''
  date_for_start = ''
  date_for_end = ''
  date_for_estimated_start = ''
  date_for_estimated_completion = ''
  date_for_actual_completion = ''
  principal: any[] = []
  file = ''
  remark = ''
  activeIndex: number = 0;

  salesman_id = ''
  customer_code = ''
  machine_finished_number = ''
  jig_quantity = ''
  machine_english = ''
  machine_quantity = ''
  external_order = ''
  internal_order = ''
  summary_description = ''

  mc_id: any;
  project_id: any;
  mc_code: any;
  mc_number: any;
  mc_finished: any;
  mc_status = "add"
  last_mc: any = "32bb6df4-9c69-45b0-9e38-7892492546a5";

  a: any[] = [
    { 'text': '機台' }, { 'text': '治具(POO)' }, { 'text': '書面資料' },
    { 'text': '試機需求部門' }, { 'text': '其他' }, { 'text': '組合機次階' }
    , { 'text': '外掛部品' }, { 'text': '附贈明細' }, { 'text': '相關紀錄' }
  ]

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  userJson: any

  ngOnInit(): void {
    this.p_id = this.route.snapshot.paramMap.get('p_id');
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    //console.log(this.userJson)
    this.getAllUserName()
    this.getOneProjectDatas()
    this.getAllTaskDatas()
    // this.getMachineListDatas()
    // this.getPlugInDatas()
    // this.getTransactionDatas()

    //this.getTaskDatas()
    //this.getTaskUserDatas()
    // this.getAntivirusSoftwareDatas()
  }

  transactionDatas: any
  transactionlist: any[] = []
  creater: any = ''
  createtime: any = ''
  //取得transaction record資料---------------------------------------
  getTransactionDatas(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.p_id).
      subscribe(transactionRequest => {
        this.transactionDatas = transactionRequest;
        for (var i in this.transactionDatas.body.transaction_record) {
          this.transactionDatas.body.transaction_record[i].create_time = new Date(this.transactionDatas.body.transaction_record[i].create_time)
          this.transactionlist.push(this.transactionDatas.body.transaction_record[i])
          if (this.transactionDatas.body.transaction_record[i].actor == '新建' && this.transactionDatas.body.transaction_record[i].content == '專案') {
            this.creater = this.transactionDatas.body.transaction_record[i].creater_name
            this.createtime = new Date(this.transactionDatas.body.transaction_record[i].create_time)
          }
        }
        console.log(this.transactionDatas)
        this.transactionSource.data = this.transactionlist;//將資料帶入
        this.totalCount = this.transactionlist.length;//計算資料長度
        this.transactionSource.sort = this.sort;
        this.transactionSource.paginator = this.paginator;
      })
  }



  user_id = ''
  userList: any[] = []
  //列出所有username
  getAllUserName(): void {
    this.HttpApiService.getAccountRequest_t(1,20)
    .subscribe(userRequest =>{
      //console.log(userRequest.body.accounts)
      for(var i in userRequest.body.accounts){
        this.userList.push({ id: userRequest.body.accounts[i].account_id, name: userRequest.body.accounts[i].name })
      }
    })
  }

  //取得該id之project資料---------------------------------------
  getOneProjectDatas(): void {
    this.HttpApiService.getOneProjectRequest_t(this.p_id).
      subscribe(projectRequest => {
        this.projectDatas = projectRequest;
        this.customer_code = this.projectDatas.body.customer_code
        //console.log(this.projectDatas.body.date_for_start)
        if (this.projectDatas.body.date_for_start == "0001-01-01T00:00:00Z") {
          this.projectDatas.body.date_for_start = ''
        }
        if (this.projectDatas.body.date_for_end == "0001-01-01T00:00:00Z") {
          this.projectDatas.body.date_for_end = ''
        }
        //console.log(this.projectDatas)
        this.status = this.projectDatas.body.status
        if (this.status != "建檔中" && this.status != "已中止") {
          this.status = "專案已啟動"
        }
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //修改該id之project資料------------------------------------------------------------
  editOneProjectDatas(status: any, actor: any): void {
    //console.log(status)
    let projectManagerDatas: any = {};//接收資料
    // //console.log(this.projectDatas)
    projectManagerDatas['p_id'] = this.projectDatas.body.p_id;
    projectManagerDatas['code'] = this.projectDatas.body.code;
    projectManagerDatas['machine_finished_number'] = this.projectDatas.body.machine_finished_number
    projectManagerDatas['customer_id'] = this.projectDatas.body.customer_id;
    projectManagerDatas['projectman_id'] = this.projectDatas.body.projectman_id;
    projectManagerDatas['date_for_start'] = this.projectDatas.body.date_for_start;
    projectManagerDatas['date_for_end'] = this.projectDatas.body.date_for_end;
    projectManagerDatas['jig_quantity'] = Number(this.projectDatas.body.jig_quantity)
    projectManagerDatas['machine_english'] = this.projectDatas.body.machine_english
    projectManagerDatas['salesman_id'] = this.projectDatas.body.salesman_id;
    projectManagerDatas['serviceman_id'] = this.projectDatas.body.serviceman_id;
    projectManagerDatas['machine_quantity'] = Number(this.projectDatas.body.machine_quantity)
    projectManagerDatas['external_order'] = this.projectDatas.body.external_order
    projectManagerDatas['internal_order'] = this.projectDatas.body.internal_order
    projectManagerDatas['summary_description'] = this.projectDatas.body.summary_description
    projectManagerDatas['status'] = status

    //console.log(projectManagerDatas)
    this.HttpApiService.updateProjectRequest_t(this.p_id, projectManagerDatas).
      subscribe(projectRequest => {
        this.projectDatas = projectRequest;
        //console.log(this.projectDatas)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
    if (actor == "啟動") {
      this.uploadTransactionRecordRequests(this.p_id, actor, "專案")
    }
    else if (actor == "中止") {
      this.uploadTransactionRecordRequests(this.p_id, actor, "專案")
    }
    else {
      this.uploadTransactionRecordRequests(this.p_id, actor, "儲存資料")
    }
    this.updateTask()
    this.updateTaskUserDatas()
    setTimeout(() => { this.editurl() }, 5000);
    //location.href = 'main/projectinfo/produce-sales-meeting';
  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(p_id: any, actor: any, content: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = p_id
    trManagerDatas['actor'] = actor
    trManagerDatas['content'] = content
    trManagerDatas['creater'] = this.userJson.account_id

    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        //console.log(taskuserRequest)
        console.log('成功')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //刪除該id之project資料------------------------------------------------------------
  deleteProjectRequest(): void {
    if (confirm("是否確定要刪除?") == true) {
      this.HttpApiService.deleteProjectRequest_t(this.p_id).subscribe();
      for (var i in this.mcDataslist) {
        this.HttpApiService.deleteMachineCombinedRequest_t(this.mcDataslist[i].mc_id).subscribe();
      }
      for (var i in this.contentlist) {
        this.HttpApiService.deletePlugInRequest_t(this.contentlist[i].pi_id).subscribe();
      }
      this.deleteTaskRequest()
      this.deleteTaskUserRequest()
      alert("已刪除!");
    } else {
      alert("無法刪除!");
    }
    setTimeout(() => { this.editurl() }, 5000);
  }


  // 跳轉頁面------------------------------------------
  editurl(): void {
    window.location.assign('main/projectinfo/produce-sales-meeting');
  }

  //取得該id之所有Task資料---------------------------------------
  getAllTaskDatas(): void {
    this.HttpApiService.getTaskListUserRequest(this.p_id)
      .subscribe(TaskRequest => {
        for (var i in TaskRequest.body.task) {
          this.comparedData(TaskRequest.body.task[i])
        }
      })
  }

  total: any
  // taskuserDatas:any = []

  //比對Task資料---------------------------------------
  comparedData(taskDatas: any): void {

    for (var i in ELEMENT_DATA_1) {
      if (ELEMENT_DATA_1[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_1[i].t_id = taskDatas.t_id
        ELEMENT_DATA_1[i].fillout = true
        ELEMENT_DATA_1[i].date_for_estimated_start_1 = new Date(taskDatas.date_for_estimated_start)
        ELEMENT_DATA_1[i].date_for_estimated_completion_1 = new Date(taskDatas.date_for_estimated_completion)
        ELEMENT_DATA_1[i].date_for_actual_completion_1 = new Date(taskDatas.date_for_actual_completion)
        ELEMENT_DATA_1[i].file_1 = taskDatas.file
        ELEMENT_DATA_1[i].remark_1 = taskDatas.remark
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_1[i].date_for_actual_completion_1 = ""
        }
        ELEMENT_DATA_1[i].tu_id = taskDatas.tu_id
        ELEMENT_DATA_1[i].principal_1 = taskDatas.account_id
        // if(taskDatas.date_for_estimated_start == "")
      }

    }
    for (var i in ELEMENT_DATA_2) {
      if (ELEMENT_DATA_2[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_2[i].t_id = taskDatas.t_id
        ELEMENT_DATA_2[i].fillout = true
        ELEMENT_DATA_2[i].date_for_estimated_start_2 = new Date(taskDatas.date_for_estimated_start)
        ELEMENT_DATA_2[i].date_for_estimated_completion_2 = new Date(taskDatas.date_for_estimated_completion)
        ELEMENT_DATA_2[i].date_for_actual_completion_2 = new Date(taskDatas.date_for_actual_completion)
        ELEMENT_DATA_2[i].file_2 = taskDatas.file
        ELEMENT_DATA_2[i].remark_2 = taskDatas.remark
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_2[i].date_for_actual_completion_2 = ""
        }
        ELEMENT_DATA_2[i].tu_id = taskDatas.tu_id
        ELEMENT_DATA_2[i].principal_2 = taskDatas.account_id
      }
    }
    for (var i in ELEMENT_DATA_3) {
      if (ELEMENT_DATA_3[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_3[i].t_id = taskDatas.t_id
        ELEMENT_DATA_3[i].fillout = true
        ELEMENT_DATA_3[i].date_for_estimated_start_3 = new Date(taskDatas.date_for_estimated_start)
        ELEMENT_DATA_3[i].date_for_estimated_completion_3 = new Date(taskDatas.date_for_estimated_completion)
        ELEMENT_DATA_3[i].date_for_actual_completion_3 = new Date(taskDatas.date_for_actual_completion)
        ELEMENT_DATA_3[i].file_3 = taskDatas.file
        ELEMENT_DATA_3[i].remark_3 = taskDatas.remark
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_3[i].date_for_actual_completion_3 = ""
        }
        ELEMENT_DATA_3[i].tu_id = taskDatas.tu_id
        ELEMENT_DATA_3[i].principal_3 = taskDatas.account_id
      }
    }
    for (var i in ELEMENT_DATA_4) {
      if (ELEMENT_DATA_4[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_4[i].t_id = taskDatas.t_id
        ELEMENT_DATA_4[i].fillout = true
        ELEMENT_DATA_4[i].date_for_estimated_start_4 = new Date(taskDatas.date_for_estimated_start)
        ELEMENT_DATA_4[i].date_for_estimated_completion_4 = new Date(taskDatas.date_for_estimated_completion)
        ELEMENT_DATA_4[i].date_for_actual_completion_4 = new Date(taskDatas.date_for_actual_completion)
        ELEMENT_DATA_4[i].file_4 = taskDatas.file
        ELEMENT_DATA_4[i].remark_4 = taskDatas.remark
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_4[i].date_for_actual_completion_4 = ""
        }
        ELEMENT_DATA_4[i].tu_id = taskDatas.tu_id
        ELEMENT_DATA_4[i].principal_4 = taskDatas.account_id
      }
    }
    for (var i in ELEMENT_DATA_5) {
      if (ELEMENT_DATA_5[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_5[i].t_id = taskDatas.t_id
        ELEMENT_DATA_5[i].fillout = true
        ELEMENT_DATA_5[i].date_for_estimated_start_5 = new Date(taskDatas.date_for_estimated_start)
        ELEMENT_DATA_5[i].date_for_estimated_completion_5 = new Date(taskDatas.date_for_estimated_completion)
        ELEMENT_DATA_5[i].date_for_actual_completion_5 = new Date(taskDatas.date_for_actual_completion)
        ELEMENT_DATA_5[i].file_5 = taskDatas.file
        ELEMENT_DATA_5[i].remark_5 = taskDatas.remark
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_5[i].date_for_actual_completion_5 = ""
        }
        ELEMENT_DATA_5[i].tu_id = taskDatas.tu_id
        ELEMENT_DATA_5[i].principal_5 = taskDatas.account_id
      }
    }
  }

  updatetaskDatas: any = { "task": [] }
  //修改該id之所有Task資料---------------------------------------
  updateTask(): void {
    for (var i in ELEMENT_DATA_1) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['t_id'] = ELEMENT_DATA_1[i].t_id
      taskManagerDatas['remark'] = ELEMENT_DATA_1[i].remark_1
      taskManagerDatas['file'] = ELEMENT_DATA_1[i].file_1
      ELEMENT_DATA_1[i].date_for_estimated_start_1.setHours(ELEMENT_DATA_1[i].date_for_estimated_start_1.getHours() + this.hrs);
      ELEMENT_DATA_1[i].date_for_estimated_completion_1.setHours(ELEMENT_DATA_1[i].date_for_estimated_completion_1.getHours() + this.hrs);
      taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_1[i].date_for_estimated_start_1
      taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_1[i].date_for_estimated_completion_1
      this.updatetaskDatas.task.push(taskManagerDatas)
    }
    for (var i in ELEMENT_DATA_2) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['t_id'] = ELEMENT_DATA_2[i].t_id
      taskManagerDatas['remark'] = ELEMENT_DATA_2[i].remark_2
      taskManagerDatas['file'] = ELEMENT_DATA_2[i].file_2
      ELEMENT_DATA_2[i].date_for_estimated_start_2.setHours(ELEMENT_DATA_2[i].date_for_estimated_start_2.getHours() + this.hrs);
      ELEMENT_DATA_2[i].date_for_estimated_completion_2.setHours(ELEMENT_DATA_2[i].date_for_estimated_completion_2.getHours() + this.hrs);
      taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_2[i].date_for_estimated_start_2
      taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_2[i].date_for_estimated_completion_2
      this.updatetaskDatas.task.push(taskManagerDatas)
    }

    for (var i in ELEMENT_DATA_3) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['t_id'] = ELEMENT_DATA_3[i].t_id
      taskManagerDatas['remark'] = ELEMENT_DATA_3[i].remark_3
      taskManagerDatas['file'] = ELEMENT_DATA_3[i].file_3
      ELEMENT_DATA_3[i].date_for_estimated_start_3.setHours(ELEMENT_DATA_3[i].date_for_estimated_start_3.getHours() + this.hrs);
      ELEMENT_DATA_3[i].date_for_estimated_completion_3.setHours(ELEMENT_DATA_3[i].date_for_estimated_completion_3.getHours() + this.hrs);
      taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_3[i].date_for_estimated_start_3
      taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_3[i].date_for_estimated_completion_3
      this.updatetaskDatas.task.push(taskManagerDatas)
    }
    for (var i in ELEMENT_DATA_4) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['t_id'] = ELEMENT_DATA_4[i].t_id
      taskManagerDatas['remark'] = ELEMENT_DATA_4[i].remark_4
      taskManagerDatas['file'] = ELEMENT_DATA_4[i].file_4
      ELEMENT_DATA_4[i].date_for_estimated_start_4.setHours(ELEMENT_DATA_4[i].date_for_estimated_start_4.getHours() + this.hrs);
      ELEMENT_DATA_4[i].date_for_estimated_completion_4.setHours(ELEMENT_DATA_4[i].date_for_estimated_completion_4.getHours() + this.hrs);
      taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_4[i].date_for_estimated_start_4
      taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_4[i].date_for_estimated_completion_4
      this.updatetaskDatas.task.push(taskManagerDatas)
    }
    for (var i in ELEMENT_DATA_5) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['t_id'] = ELEMENT_DATA_5[i].t_id
      taskManagerDatas['remark'] = ELEMENT_DATA_5[i].remark_5
      taskManagerDatas['file'] = ELEMENT_DATA_5[i].file_5
      ELEMENT_DATA_5[i].date_for_estimated_start_5.setHours(ELEMENT_DATA_5[i].date_for_estimated_start_5.getHours() + this.hrs);
      ELEMENT_DATA_5[i].date_for_estimated_completion_5.setHours(ELEMENT_DATA_5[i].date_for_estimated_completion_5.getHours() + this.hrs);
      taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_5[i].date_for_estimated_start_5
      taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_5[i].date_for_estimated_completion_5
      this.HttpApiService.updateTaskRequest_t(ELEMENT_DATA_5[i].t_id, taskManagerDatas)
      this.updatetaskDatas.task.push(taskManagerDatas)
    }
    this.HttpApiService.updatepluralTaskRequest(this.updatetaskDatas)
      .subscribe(taskRequest => {
        console.log("成功")
        console.log(taskRequest)
      })
  }

  updatetaskuserDatas: any = { "task_user": [] }
  //編輯該id之所有TaskUser資料---------------------------------------
  updateTaskUserDatas(): void {
    for (var i in ELEMENT_DATA_1) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['tu_id'] = ELEMENT_DATA_1[i].tu_id
      taskManagerDatas['task_id'] = ELEMENT_DATA_1[i].t_id
      taskManagerDatas['user_id'] = ELEMENT_DATA_1[i].principal_1
      this.updatetaskuserDatas.task_user.push(taskManagerDatas)
    }
    for (var i in ELEMENT_DATA_2) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['tu_id'] = ELEMENT_DATA_2[i].tu_id
      taskManagerDatas['task_id'] = ELEMENT_DATA_2[i].t_id
      taskManagerDatas['user_id'] = ELEMENT_DATA_2[i].principal_2
      this.updatetaskuserDatas.task_user.push(taskManagerDatas)
    }
    for (var i in ELEMENT_DATA_3) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['tu_id'] = ELEMENT_DATA_3[i].tu_id
      taskManagerDatas['task_id'] = ELEMENT_DATA_3[i].t_id
      taskManagerDatas['user_id'] = ELEMENT_DATA_3[i].principal_3
      this.updatetaskuserDatas.task_user.push(taskManagerDatas)
    }
    for (var i in ELEMENT_DATA_4) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['tu_id'] = ELEMENT_DATA_4[i].tu_id
      taskManagerDatas['task_id'] = ELEMENT_DATA_4[i].t_id
      taskManagerDatas['user_id'] = ELEMENT_DATA_4[i].principal_4
      this.updatetaskuserDatas.task_user.push(taskManagerDatas)
    }
    for (var i in ELEMENT_DATA_5) {
      let taskManagerDatas: any = {};//接收資料
      taskManagerDatas['tu_id'] = ELEMENT_DATA_5[i].tu_id
      taskManagerDatas['task_id'] = ELEMENT_DATA_5[i].t_id
      taskManagerDatas['user_id'] = ELEMENT_DATA_5[i].principal_5
      this.updatetaskuserDatas.task_user.push(taskManagerDatas)
    }
    this.HttpApiService.updatepluralTaskUserRequest(this.updatetaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log("成功")
        console.log(taskuserRequest)
      })
  }

  deletetaskDatas: any[] = []
  //刪除該id之所有task資料--------------未完成----------------------------------------------
  deletepluraltaskRequest(): void {
    for (var i in ELEMENT_DATA_1) {
      this.deletetaskDatas.push(ELEMENT_DATA_1[i].t_id)
    }
    for (var i in ELEMENT_DATA_2) {
      this.deletetaskDatas.push(ELEMENT_DATA_2[i].t_id)
    }
    for (var i in ELEMENT_DATA_3) {
      this.deletetaskDatas.push(ELEMENT_DATA_3[i].t_id)
    }
    for (var i in ELEMENT_DATA_4) {
      this.deletetaskDatas.push(ELEMENT_DATA_4[i].t_id)
    }
    for (var i in ELEMENT_DATA_5) {
      this.deletetaskDatas.push(ELEMENT_DATA_5[i].t_id)
    }
    this.HttpApiService.deletepluralTaskRequest(this.deletetaskDatas)
  }
  //刪除該id之所有TaskUser資料---------------------------------------
  deleteTaskUserDatas(tu_id: any): void {
    this.HttpApiService.deleteTaskUserRequest_t(tu_id)
      .subscribe(taskuserRequest => {

      })
  }

  //刪除該id之所有task資料------------------------------------------------------------
  deleteTaskRequest(): void {
    for (var i in ELEMENT_DATA_1) {
      this.HttpApiService.deleteTaskRequest_t(ELEMENT_DATA_1[i].t_id).subscribe();
    }
    for (var i in ELEMENT_DATA_2) {
      this.HttpApiService.deleteTaskRequest_t(ELEMENT_DATA_2[i].t_id).subscribe();
    }
    for (var i in ELEMENT_DATA_3) {
      this.HttpApiService.deleteTaskRequest_t(ELEMENT_DATA_3[i].t_id).subscribe();
    }
    for (var i in ELEMENT_DATA_4) {
      this.HttpApiService.deleteTaskRequest_t(ELEMENT_DATA_4[i].t_id).subscribe();
    }
    for (var i in ELEMENT_DATA_5) {
      this.HttpApiService.deleteTaskRequest_t(ELEMENT_DATA_5[i].t_id).subscribe();
    }
  }

  //刪除該id之所有taskuser資料------------------------------------------------------------
  deleteTaskUserRequest(): void {
    for (var i in ELEMENT_DATA_1) {
      this.HttpApiService.deleteTaskUserRequest_t(ELEMENT_DATA_1[i].tu_id).subscribe();
    }
    for (var i in ELEMENT_DATA_2) {
      this.HttpApiService.deleteTaskUserRequest_t(ELEMENT_DATA_2[i].tu_id).subscribe();
    }
    for (var i in ELEMENT_DATA_3) {
      this.HttpApiService.deleteTaskUserRequest_t(ELEMENT_DATA_3[i].tu_id).subscribe();
    }
    for (var i in ELEMENT_DATA_4) {
      this.HttpApiService.deleteTaskUserRequest_t(ELEMENT_DATA_4[i].tu_id).subscribe();
    }
    for (var i in ELEMENT_DATA_5) {
      this.HttpApiService.deleteTaskUserRequest_t(ELEMENT_DATA_5[i].tu_id).subscribe();
    }
  }

  editmclist: any[] = [];
  //取得該id之machine_combined資料---------------------------------------
  getMachineListDatas(): void {
    this.HttpApiService.getMachineCombinedListRequest_t(1, 20).
      subscribe(mcRequest => {
        //this.mcDatas = mcRequest
        //console.log(mcRequest)
        for (var i in mcRequest.body.machine_combined) {
          if (mcRequest.body.machine_combined[i].project_id == this.p_id) {
            this.mcDatas.push(mcRequest.body.machine_combined[i])
            this.mcDataslist.push(mcRequest.body.machine_combined[i])
          }
        }
        this.total = mcRequest.body.total
        for (var j = 1; j <= (this.total / 20); j++) {
          this.HttpApiService.getTaskRequest_t((j + 1), 20)
            .subscribe(othermcRequest => {
              for (var i in othermcRequest.body.machine_combined) {
                if (othermcRequest.body.machine_combined[i].project_id == this.p_id) {
                  this.mcDatas.push(othermcRequest.body.machine_combined[i])
                  this.mcDataslist.push(othermcRequest.body.machine_combined[i])
                }
              }
            })
        }
        this.showData(this.mcDataslist)
        //console.log(this.mcDatas)
        //console.log(this.mcDataslist)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  //新增machine_combined資料---------------------------------------
  uploadMachineDatas(): void {
    let mcManagerDatas: any = {};//接收資料
    // //console.log(this.projectDatas)
    mcManagerDatas['project_id'] = this.p_id
    mcManagerDatas['mc_code'] = this.mc_code
    mcManagerDatas['mc_number'] = Number(this.mc_number)
    mcManagerDatas['mc_finished'] = this.mc_finished
    mcManagerDatas['last_mc'] = this.last_mc
    //console.log(mcManagerDatas)
    this.HttpApiService.uploadMachineCombinedRequest_t(mcManagerDatas)
      .subscribe(mcRequest => {
        //console.log(mcRequest)
        this.mcDatas = [{ "mc_code": "-", "mc_id": "32bb6df4-9c69-45b0-9e38-7892492546a5" }];
        this.mcDataslist = []
        this.mc_code = ""
        this.mc_number = ""
        this.mc_finished = ""
        this.last_mc = "32bb6df4-9c69-45b0-9e38-7892492546a5"
        this.getMachineListDatas()
      },
        (err: any) => {
          console.log('err:', err);
        });
  }
  //修改該id之machine_combined資料---------------------------------------
  editMachineDatas(): void {
    //console.log(this.mc_id)
    let mcManagerDatas: any = {};//接收資料
    mcManagerDatas['mc_id'] = this.mc_id
    mcManagerDatas['project_id'] = this.p_id
    mcManagerDatas['mc_code'] = this.mc_code
    mcManagerDatas['mc_number'] = Number(this.mc_number)
    mcManagerDatas['mc_finished'] = this.mc_finished
    mcManagerDatas['last_mc'] = this.last_mc
    //console.log(mcManagerDatas)
    this.HttpApiService.updateMachineCombinedRequest_t(this.mc_id, mcManagerDatas).
      subscribe(mcRequest => {
        console.log("成功")
        this.mcDatas = [{ "mc_code": "-", "mc_id": "32bb6df4-9c69-45b0-9e38-7892492546a5" }];
        this.mcDataslist = []
        this.getMachineListDatas()
      },
        (err: any) => {
          console.log('err:', err);
        });
  }
  //取得單筆machine_combined資料---------------------------------------
  getOneMachineDatas(mc_id: string): void {
    this.HttpApiService.getOneMachineCombinedRequest_t(mc_id)
      .subscribe(Request => {
        let mcRequest: any
        mcRequest = Request
        //console.log(mcRequest.body)
        this.mc_id = mc_id
        this.mc_code = mcRequest.body.mc_code
        this.mc_number = mcRequest.body.mc_number
        this.mc_finished = mcRequest.body.mc_finished
        this.last_mc = mcRequest.body.last_mc
        this.editmclist = []
        for (var i in this.mcDatas) {
          //console.log("test")
          if (this.mc_code != this.mcDatas[i].mc_code) {
            this.editmclist.push(this.mcDatas[i])
          }
        }
        //console.log(this.editmclist)
        this.mc_status = "edit"
      },
        (err: any) => {
          console.log('err:', err);
        });
  }
  //刪除該id之machine_combined資料---------------------------------------
  deleteOneMachineDatas(mc_id: string): void {
    if (confirm("是否確定要刪除?") == true) {
      //console.log(this.projectDatas.body.task_id)
      this.HttpApiService.deleteMachineCombinedRequest_t(mc_id).subscribe();
      alert("已刪除!");
      this.mcDatas = [{ "mc_code": "-", "mc_id": "32bb6df4-9c69-45b0-9e38-7892492546a5" }];
      this.mcDataslist = []
      this.getMachineListDatas()
    } else {
      alert("無法刪除!");
    }
  }

  // 顯示資料
  showData(data: any) {
    //console.log(data)
    this.machinecombinedSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.machinecombinedSource.sort = this.sort;
    this.machinecombinedSource.paginator = this.paginator;
  }

  CancelDatas(): void {
    this.mc_id = ''
    this.mc_code = ''
    this.mc_number = null
    this.mc_finished = ''
    this.last_mc = '32bb6df4-9c69-45b0-9e38-7892492546a5'
    this.mc_status = "add"
    this.content = ''
    this.as_name = ''
    this.software_number = ''
    this.machine_number = ''
  }

  content: any;
  contentlist: any[] = [];
  piDatas: any;
  piDataslist: any[] = [];
  //取得該id之plug_in資料---------------------------------------
  getPlugInDatas(): void {
    this.HttpApiService.getPlugInRequest_t(1, 20).
      subscribe(piRequest => {
        //this.mcDatas = mcRequest
        //console.log(piRequest)
        for (var i in piRequest.body.plug_in) {
          if (piRequest.body.plug_in[i].project_id == this.p_id) {
            this.contentlist.push(piRequest.body.plug_in[i])
          }
        }
        this.total = piRequest.body.total
        for (var j = 1; j <= (this.total / 20); j++) {
          this.HttpApiService.getTaskRequest_t((j + 1), 20)
            .subscribe(otherpiRequest => {
              for (var i in otherpiRequest.body.plug_in) {
                if (otherpiRequest.body.plug_in[i].project_id == this.p_id) {
                  this.contentlist.push(otherpiRequest.body.plug_in[i])
                }
              }
            })
        }
        this.pluginSource.data = this.contentlist;//將資料帶入
        this.totalCount = this.contentlist.length;//計算資料長度
        this.pluginSource.sort = this.sort;
        this.pluginSource.paginator = this.paginator;
        //console.log(this.contentlist)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  //新增plug_in資料-----------------------------------------------
  uploadPlugInDatas(): void {
    let piManagerDatas: any = {};//接收資料
    piManagerDatas['project_id'] = this.p_id
    piManagerDatas['content'] = this.content
    //console.log(piManagerDatas)
    this.HttpApiService.uploadPlugInRequest_t(piManagerDatas).
      subscribe(piRequest => {
        console.log("成功")
        this.contentlist = []
        this.getPlugInDatas()
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  //刪除該id之plug_in資料---------------------------------------
  deletePlugInDatas(pi_id: string): void {
    if (confirm("是否確定要刪除?") == true) {
      this.HttpApiService.deletePlugInRequest_t(pi_id).subscribe();
      alert("已刪除!");
      this.contentlist = []
      this.getPlugInDatas()
    } else {
      alert("無法刪除!");
    }
  }

  as_status: any
  antivirussoftwarelist: any[] = []
  as_name: any;
  software_number: any;
  machine_number: any;
  // 開啟AntivirusSoftwaredialog
  addAntivirusSoftwareItem() {
    this.as_status = "add"
    //this.dialog.open(ProduceAddMeetingDialogComponent);
  }
  //取得該id之antivirus_software資料---------------------------------------
  getAntivirusSoftwareDatas(): void {
    this.HttpApiService.getAntivirusSoftwareRequest_t(1, 20).
      subscribe(asRequest => {
        //this.mcDatas = mcRequest
        //console.log(asRequest)
        for (var i in asRequest.body.antivirus_software) {
          if (asRequest.body.antivirus_software[i].project_id == this.p_id) {
            //this.piDatas.push(piRequest.body.plug_in[i])
            this.antivirussoftwarelist.push(asRequest.body.antivirus_software[i])
          }
        }
        this.total = asRequest.body.total
        for (var j = 1; j <= (this.total / 20); j++) {
          this.HttpApiService.getTaskRequest_t((j + 1), 20)
            .subscribe(otherasRequest => {
              for (var i in otherasRequest.body.antivirus_software) {
                if (otherasRequest.body.antivirus_software[i].project_id == this.p_id) {
                  //this.piDatas.push(piRequest.body.plug_in[i])
                  this.antivirussoftwarelist.push(otherasRequest.body.antivirus_software[i])
                }
              }
            })
        }
        this.antivirussoftwareSource.data = this.antivirussoftwarelist;//將資料帶入
        this.totalCount = this.antivirussoftwarelist.length;//計算資料長度
        this.antivirussoftwareSource.sort = this.sort;
        this.antivirussoftwareSource.paginator = this.paginator;
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  //新增該id之antivirus_software資料---------------------------------------
  uploadAntivirusSoftwareDatas(): void {
    let asManagerDatas: any = {};//接收資料
    asManagerDatas['project_id'] = this.p_id
    asManagerDatas['as_name'] = this.as_name
    asManagerDatas['software_number'] = this.software_number
    asManagerDatas['machine_number'] = this.machine_number
    //console.log(asManagerDatas)
    this.HttpApiService.uploadAntivirusSoftwareRequest_t(asManagerDatas).
      subscribe(asRequest => {
        console.log("成功")
        this.antivirussoftwarelist = []
        this.getAntivirusSoftwareDatas()
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  //刪除該id之antivirus_software資料---------------------------------------
  deleteAntivirusSoftwareDatas(as_id: string): void {
    if (confirm("是否確定要刪除?") == true) {
      this.HttpApiService.deleteAntivirusSoftwareRequest_t(as_id).subscribe();
      alert("已刪除!");
      this.antivirussoftwarelist = []
      this.getAntivirusSoftwareDatas()
    } else {
      alert("無法刪除!");
    }
  }

  // 開啟meetingdialog
  // 新增
  addmeetingItem(p_id: any) {
    this.dialog.open(ProduceAddMeetingDialogComponent, {
      data: {
        p_id: p_id
      }
    });
  }
  // 開啟appendixdialog
  // 新增
  addappendixItem() {
    this.dialog.open(ProduceAddAppendixDialogComponent);
  }
  // 開啟scheduledialog
  // 新增
  addscheduleItem() {
    this.dialog.open(ProduceAddScheduleDialogComponent);
  }
  //建立任務參與人員
  AddTaskUsers(t_id: any, taskname: any): void {
    //console.log(item)
    this.dialog.open(ProduceEditDialogComponent, {
      data: {
        t_id: t_id,
        taskname: taskname
      }
    })
  }

  //機台
  displayedColumns: string[] = ['taskname', 'date_for_estimated_start_1', 'date_for_estimated_completion_1', 'date_for_actual_completion_1', 'principal_1', 'file_1', 'remark_1'];
  dataSource_1 = new MatTableDataSource<PeriodicElement_1>(ELEMENT_DATA_1);
  clickedRows = new Set<PeriodicElement_1>();

  //治具
  displayedColumns_2: string[] = ['taskname', 'date_for_estimated_start_2', 'date_for_estimated_completion_2', 'date_for_actual_completion_2', 'principal_2', 'file_2', 'remark_2'];
  dataSource_2 = new MatTableDataSource<PeriodicElement_2>(ELEMENT_DATA_2);
  clickedRows_2 = new Set<PeriodicElement_2>();

  //書面資料
  displayedColumns_3: string[] = ['taskname', 'date_for_estimated_start_3', 'date_for_estimated_completion_3', 'date_for_actual_completion_3', 'principal_3', 'file_3', 'remark_3'];
  dataSource_3 = new MatTableDataSource<PeriodicElement_3>(ELEMENT_DATA_3);
  clickedRows_3 = new Set<PeriodicElement_3>();

  //試機需求部品
  displayedColumns_4: string[] = ['taskname', 'quantity', 'date_for_estimated_start_4', 'date_for_estimated_completion_4', 'date_for_actual_completion_4', 'principal_4', 'file_4', 'remark_4'];
  dataSource_4 = new MatTableDataSource<PeriodicElement_4>(ELEMENT_DATA_4);
  clickedRows_4 = new Set<PeriodicElement_4>();

  //其他
  displayedColumns_5: string[] = ['taskname', 'date_for_estimated_start_5', 'date_for_estimated_completion_5', 'date_for_actual_completion_5', 'principal_5', 'file_5', 'remark_5'];
  dataSource_5 = new MatTableDataSource<PeriodicElement_5>(ELEMENT_DATA_5);
  clickedRows_5 = new Set<PeriodicElement_5>();

  //組合機次階
  displayedColumns_6: string[] = ['project_code', 'quantity', 'assembly', 'previous_code', 'save_and_cancel'];
  dataSource_6 = ELEMENT_DATA_6;
  clickedRows_6 = new Set<PeriodicElement_6>();

  //附贈明細
  displayedColumns_7_1: string[] = ['item_number', 'product_name', 'specification', 'quantity_7'];
  dataSource_7_1 = ELEMENT_DATA_7_1;
  clickedRows_7_1 = new Set<PeriodicElement_7_1>();

  displayedColumns_7_2: string[] = ['requisiton_number', 'application_date', 'applicant', 'file_creator', 'customer', 'project_code_7', 'requisition', 'apply', 'purchase', 'state'];
  dataSource_7_2 = ELEMENT_DATA_7_2;
  clickedRows_7_2 = new Set<PeriodicElement_7_2>();

  //相關紀錄
  displayedColumns_8_2: string[] = ['transaction_department', 'transaction_man', 'transaction_date', 'transaction_detail'];
  dataSource_8_2 = ELEMENT_DATA_8_2;
  clickedRows_8_2 = new Set<PeriodicElement_8_2>();


}
