import { FileUploadDialogComponent } from './../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';
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
import Swal from 'sweetalert2'

import { FormControl } from '@angular/forms';
//import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';


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
  workdate: number;
  grouplist: any[];
}
const ELEMENT_DATA_1: PeriodicElement_1[] = [
  //{ t_id: '', tu_id: '', fillout: false, taskname: '機台產銷會議', grouplist: ['業務'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 1 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台產銷會議', grouplist: ['全部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 1 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台內部訂單', grouplist: ['業務'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 1 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台-BOM[光學]', grouplist: ['Vision'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 1 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台-BOM[機械]', grouplist: ['機械研發部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 1 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台-發包圖面[機械]', grouplist: ['全部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 0 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台-BOM[電控]', grouplist: ['電控部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 1 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台發包[請購]', grouplist: ['製造部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 2 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台發包[採購]', grouplist: ['採購'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 4 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台組裝前會議', grouplist: ['全部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 0 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台入料完成(含選配)', grouplist: ['採購'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 44 },
  { t_id: '', tu_id: '', fillout: false, taskname: '光學校正完成', grouplist: ['Vision'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 20 },
  { t_id: '', tu_id: '', fillout: false, taskname: '軟體(Vision)完成', grouplist: ['Vision'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 20 },
  { t_id: '', tu_id: '', fillout: false, taskname: '軟體(Motion)完成', grouplist: ['Vision'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 20 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台組立完成', grouplist: ['製造部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 0 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台試機完成', grouplist: ['製造部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 4 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台入庫(含選配)', grouplist: ['製造部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 0 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台出機', grouplist: ['營運業務部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 0 },
  { t_id: '', tu_id: '', fillout: false, taskname: '機台裝機', grouplist: ['客服'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 0 },
  { t_id: '', tu_id: '', fillout: false, taskname: '正式BOM產出', grouplist: ['全部'], date_for_estimated_start_1: '', date_for_estimated_completion_1: '', date_for_actual_completion_1: '', principal_1: '', file_1: false, remark_1: '', workdate: 0 },
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
  grouplist: any[];
}
const ELEMENT_DATA_2: PeriodicElement_2[] = [
  //{ t_id: '', tu_id: '', fillout: false, taskname: '治具', date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '客戶圖面提供', grouplist: ['業務'], date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具BOM(設計完成)', grouplist: ['電控部'], date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具內部訂單', grouplist: ['機械研發部'], date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具發包', grouplist: ['製造部'], date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具入料', grouplist: ['採購'], date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具組裝完成', grouplist: ['製造部'], date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具預交日', grouplist: ['業務'], date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '治具sample提供', grouplist: ['業務'], date_for_estimated_start_2: '', date_for_estimated_completion_2: '', date_for_actual_completion_2: '', principal_2: '', file_2: false, remark_2: '' },
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
  grouplist: any[];
}
const ELEMENT_DATA_3: PeriodicElement_3[] = [
  //{ t_id: '', tu_id: '', fillout: false, taskname: '書面資料', date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機械氣泡圖', grouplist: ['機械研發部'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '電控電路圖', grouplist: ['電控部'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機械試驗報告書', grouplist: ['機械研發部'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '電控試驗報告書', grouplist: ['電控部'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'Vision試驗報告書', grouplist: ['Vision'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'Motion試驗報告書', grouplist: ['Vision'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '機械操作手冊', grouplist: ['機械研發部'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '電控操作手冊', grouplist: ['電控部'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'Vision操作手冊', grouplist: ['Vision'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'Motion操作手冊', grouplist: ['Vision'], date_for_estimated_start_3: '', date_for_estimated_completion_3: '', date_for_actual_completion_3: '', principal_3: '', file_3: false, remark_3: '' },
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
  grouplist: any[];
}
const ELEMENT_DATA_4: PeriodicElement_4[] = [
  //{ t_id: '', tu_id: '', fillout: false, taskname: '試機需求', quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'strip', grouplist: ['業務'], quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'magazing', grouplist: ['業務'], quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'boat', grouplist: ['業務'], quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'tray', grouplist: ['業務'], quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'IC', grouplist: ['業務'], quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: 'drawing', grouplist: ['業務'], quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '其他', grouplist: ['業務'], quantity: '', date_for_estimated_start_4: '', date_for_estimated_completion_4: '', date_for_actual_completion_4: '', principal_4: '', file_4: false, remark_4: '' },
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
  grouplist: any[];
}
const ELEMENT_DATA_5: PeriodicElement_5[] = [
  { t_id: '', tu_id: '', fillout: false, taskname: '配盤', grouplist: ['全部'], date_for_estimated_start_5: '', date_for_estimated_completion_5: '', date_for_actual_completion_5: '', principal_5: '', file_5: false, remark_5: '' },
  { t_id: '', tu_id: '', fillout: false, taskname: '骨架', grouplist: ['全部'], date_for_estimated_start_5: '', date_for_estimated_completion_5: '', date_for_actual_completion_5: '', principal_5: '', file_5: false, remark_5: '' },
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
const ELEMENT_DATA_8_2: PeriodicElement_8_2[] = [
  { transaction_department: '總經理室', transaction_man: '***', transaction_date: '2021/08/04 15:28:52', transaction_detail: '更新機台-BOM[機械]-0024,***(軟體研發-Motion)資料' },
];

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

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Component({
  selector: 'app-produce-sales-meeting-edit',
  templateUrl: './produce-sales-meeting-edit.component.html',
  styleUrls: ['./produce-sales-meeting-edit.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})


export class ProduceSalesMeetingEditComponent implements OnInit {

  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('addmeetingDialog') addmeetingDialog!: TemplateRef<any>;
  @ViewChild('addappendixDialog') addappendixDialog!: TemplateRef<any>;
  @ViewChild('addscheduleDialog') addscheduleDialog!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale
  private items: MenuItem[];
  // MatPaginator Inputs
  totalCount!: number;
  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);
  // 時間格式
  formatStr = 'YYYY/MM/d hh:mm:ss';
  hrs = -(new Date().getTimezoneOffset() / 60)
  // 年分
  year: any;

  editForm: FormGroup;
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

  userJson: any

  //origin_id: any = '5451f88e-6d83-44c6-96c3-cd1d049249f7';//產銷
  origin_id: any = '1e6913f5-55be-413a-94a5-68f8cc67d5b2'//專案
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
  is_template = ''
  machine_english = ''
  nameplate = ''
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



  constructor(
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.dialogLoading()
    this.p_id = this.route.snapshot.paramMap.get('p_id');
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式

    this.Comparison()
    this.getAllCustomerName()
    this.getDepartmentList()
    this.getOneProjectDatas()
    this.getAllTaskDatas("load")
    this.getTransactionDatas()
    this.getMachineListDatas()
    this.getPlugInDatas()
    this.getAllFilesRequest()

    //測試跑流用
    // this.getAntivirusSoftwareDatas()
    // if (this.userJson.account == 'james') {
    //   this.getreviewAntivirusSoftwareDatas()
    // }
  }


  //取得該單據檔案總覽
  //宣告檔案files的dataSource
  AllfilesDataSource = new MatTableDataSource();
  Allfilescol: string[] = ['file_name', 'file_extension', 'creater_name', 'create_time'];
  AllfileName: any = ''
  AllfilesTotal: any
  getAllFilesRequest(): void {
    this.HttpApiService.getDocumentsFilesList(this.p_id).subscribe(
      res => {
        console.log("取得附件總覽res", res.body.file)
        this.AllfilesDataSource = res.body.file;
        this.AllfilesTotal = res.body.total;
      }
    )
  }

  fileDownload(href: any) {
    window.open(href, '_blank')

  }


  business = false
  Comparison(): void {
    if (this.userJson.account_id == '5acc1fb9-5dbd-48a6-840d-9477238b4f31' || this.userJson.account_id == 'b57fc8f3-0444-42a7-b15d-7526284ea082' || this.userJson.account_id == '3acddb9e-09f8-4e47-860f-536093bb6b9f'
      || this.userJson.account_id == '9dee04c4-38ff-4e2a-98dd-86f71d9311b1' || this.userJson.account_id == 'fbe0c96a-40dc-466e-b7eb-722d71bb0bc3' || this.userJson.account_id == '4936854c-1881-4395-9ff6-56228c43a592'
      || this.userJson.account_id == 'bef186bb-1d0b-4588-a090-8b866c7c5850' || this.userJson.account_id == '694f82a4-4092-4e9d-992e-909e5380c97a') {
      this.business = true
    }
  }

  //changeaccount_id: any
  changedate(event: any, Dataname: any, index: any): void {
    if (Dataname == 'ELEMENT_DATA_1') {
      var test = new Date(event)
      test.setDate(test.getDate() + ELEMENT_DATA_1[index].workdate)
      this.dataSource_1.filteredData[index].date_for_estimated_completion_1 = test
    }
    if (Dataname == 'ELEMENT_DATA_2') {
      this.dataSource_2.filteredData[index].date_for_estimated_completion_2 = event
    }
    if (Dataname == 'ELEMENT_DATA_3') {
      this.dataSource_3.filteredData[index].date_for_estimated_completion_3 = event
    }
    if (Dataname == 'ELEMENT_DATA_4') {
      this.dataSource_4.filteredData[index].date_for_estimated_completion_4 = event
    }
    if (Dataname == 'ELEMENT_DATA_5') {
      this.dataSource_5.filteredData[index].date_for_estimated_completion_5 = event
    }
    //console.log(this.dataSource_1.filteredData[index].date_for_estimated_completion_1)
  }

  //loading
  dialogLoading() {
    Swal.fire({
      title: '載入中...',
      html: '請稍等',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 4000,
      didOpen: () => {
        Swal.showLoading()
      }
    })
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
        //console.log(this.transactionlist)
        this.transactionSource.data = this.transactionlist;//將資料帶入
        this.totalCount = this.transactionlist.length;//計算資料長度
        this.transactionSource.sort = this.sort;
        this.transactionSource.paginator = this.paginator;
      })
  }

  customerList: any[] = []
  //列出所有customername (未完成)
  getAllCustomerName(): void {
    // this.HttpApiService.getAccountRequest_t(1, 20)
    //   .subscribe(userRequest => {
    //     //console.log(userRequest.body.accounts)
    //     for (var i in userRequest.body.accounts) {
    //       this.customerList.push({ id: userRequest.body.accounts[i].account_id, name: userRequest.body.accounts[i].name })
    //     }
    //   })
    this.customerList.push({ id: "00000000-0000-0000-0000-000000000000", name: '-' })
  }

  BusinessData: any[] = [] // 業務
  VisionData: any[] = [] // Vision
  MechanismData: any[] = [] // 機構（機械研發部）
  ElectronicData: any[] = [] // 電控
  ManufactureData: any[] = [] // 製造
  PurchaseData: any[] = [] // 採購
  OperatingData: any[] = [] // 營運
  CustomerData: any[] = [] // 客服

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
        console.log(this.accountgroup)
        this.getAccountList()
      })
  }
  //取得user列表-------------------------------------------------------------------------
  getAccountList(): void {
    this.HttpApiService.getAccountList()
      .subscribe(AccountRequest => {
        var accountdatas: any = AccountRequest
        console.log(accountdatas.body.accounts)
        for (var i in accountdatas.body.accounts) {
          if (accountdatas.body.accounts[i].dep_name) {
            for (var j in this.accountgroup) {
              if (this.accountgroup[j].dep_name == accountdatas.body.accounts[i].dep_name) {
                this.accountgroup[j].account.push({ "account_id": accountdatas.body.accounts[i].account_id, "name": accountdatas.body.accounts[i].name })
              }
            }
          }
        }
        this.getOneGroupList(this.accountgroup)
      })

    console.log(this.accountgroup)
  }


  // getAccountList(): void {
  //   this.HttpApiService.getAccountList()
  //     .subscribe(AccountRequest => {
  //       var accountdatas: any = AccountRequest
  //       for (var i in accountdatas.body.accounts) {
  //         for (var j in this.accountgroup) {
  //           if (this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name) {
  //             this.accountgroup[j].account.push(accountdatas.body.accounts[i])
  //           }
  //         }
  //       }
  //     console.log(accountdatas)
  //     })
  // }


  getOneGroupList(accountList: any): void {
    for (var i in accountList) {
      if (accountList[i].dep_name == '業務') {
        this.BusinessData = accountList[i]
      }
      if (accountList[i].dep_name == 'Vision') {
        this.VisionData = accountList[i]
      }
      if (accountList[i].dep_name == '機械研發部') {
        this.MechanismData = accountList[i]
      }
      if (accountList[i].dep_name == '電控部') {
        this.ElectronicData = accountList[i]
      }
      if (accountList[i].dep_name == '製造部') {
        this.ManufactureData = accountList[i]
      }
      if (accountList[i].dep_name == '採購') {
        this.PurchaseData = accountList[i]
      }
      if (accountList[i].dep_name == '營運業務部') {
        this.OperatingData = accountList[i]
      }
      if (accountList[i].dep_name == '客服') {
        this.CustomerData = accountList[i]
      }
      if (accountList[i].dep_name == '全部') {
        this.CustomerData = accountList[i]
      }
    }
    this.ComparisonGroup()
    //console.log(this.VisionData)
    //console.log(this.CustomerData)
  }

  ComparisonGroup(): void {
    for (var i in ELEMENT_DATA_1) {
      if (ELEMENT_DATA_1[i].grouplist[0] == '業務') {
        ELEMENT_DATA_1[i].grouplist = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
        ELEMENT_DATA_1[i].grouplist.push(this.BusinessData)
      }
      if (ELEMENT_DATA_1[i].grouplist[0] == 'Vision') {
        ELEMENT_DATA_1[i].grouplist = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
        ELEMENT_DATA_1[i].grouplist.push(this.VisionData)
      }
      if (ELEMENT_DATA_1[i].grouplist[0] == '機械研發部') {
        ELEMENT_DATA_1[i].grouplist = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
        ELEMENT_DATA_1[i].grouplist.push(this.MechanismData)
      }
      if (ELEMENT_DATA_1[i].grouplist[0] == '電控部') {
        ELEMENT_DATA_1[i].grouplist = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
        ELEMENT_DATA_1[i].grouplist.push(this.ElectronicData)
      }
      if (ELEMENT_DATA_1[i].grouplist[0] == '製造部') {
        ELEMENT_DATA_1[i].grouplist = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
        ELEMENT_DATA_1[i].grouplist.push(this.ManufactureData)
      }
      if (ELEMENT_DATA_1[i].grouplist[0] == '採購') {
        ELEMENT_DATA_1[i].grouplist = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
        ELEMENT_DATA_1[i].grouplist.push(this.PurchaseData)
      }
      if (ELEMENT_DATA_1[i].grouplist[0] == '營運業務部') {
        ELEMENT_DATA_1[i].grouplist = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
        ELEMENT_DATA_1[i].grouplist.push(this.OperatingData)
      }
      if (ELEMENT_DATA_1[i].grouplist[0] == '客服') {
        ELEMENT_DATA_1[i].grouplist = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
        ELEMENT_DATA_1[i].grouplist.push(this.CustomerData)
      }
      if (ELEMENT_DATA_1[i].grouplist[0] == '全部') {
        //ELEMENT_DATA_1[i].grouplist = [{ "dep_name": "空白", "dep_id": "black_id", "account": [{ "account_id": "0caaf460-ee49-44c7-80e6-62faf0e8488e", "name": "" }] }]
        ELEMENT_DATA_1[i].grouplist = this.accountgroup
      }
    }
    console.log(ELEMENT_DATA_1)
  }

  //取得該id之project資料---------------------------------------
  getOneProjectDatas(): void {
    this.HttpApiService.getOneProjectRequest_t(this.p_id).
      subscribe(projectRequest => {
        this.projectDatas = projectRequest;
        if (this.projectDatas.body.customer_code == '00000000-0000-0000-0000-000000000000') {
          this.projectDatas.body.customer_code = '無'
        }
        if (this.projectDatas.body.code == '無') {
          this.projectDatas.body.code = ''
        }
        this.customer_code = this.projectDatas.body.customer_code
        this.projectDatas.body.date_for_start = new Date(this.projectDatas.body.date_for_start)
        if (this.projectDatas.body.date_for_end == "0001-01-01T00:00:00Z") {
          this.projectDatas.body.date_for_end = new Date('')
        }
        else {
          this.projectDatas.body.date_for_end = new Date(this.projectDatas.body.date_for_end)
        }
        if (this.projectDatas.body.is_template == true) {
          this.projectDatas.body.is_template = 'true'
        }
        else {
          this.projectDatas.body.is_template = 'false'
        }

        this.status = this.projectDatas.body.status
        if (this.status != "產銷建檔中" && this.status != "已中止") {
          this.status = "專案已啟動"
          this.isReadOnly = true
        }
        console.log(this.status)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  isReadOnly = false
  //修改該id之project資料------------------------------------------------------------
  editOneProjectDatas(status: any, actor: any): void {
    Swal.fire({
      title: `您是否確定要${actor}專案?`,
      //text: "啟動後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `${actor}`,
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '載入中...',
          html: '資料儲存中',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        let projectManagerDatas: any = {};//接收資料
        projectManagerDatas['p_id'] = this.projectDatas.body.p_id;
        projectManagerDatas['status'] = status
        this.projectDatas.body.date_for_start.setHours(this.projectDatas.body.date_for_start.getHours() + this.hrs);
        projectManagerDatas['date_for_start'] = this.projectDatas.body.date_for_start;
        this.projectDatas.body.date_for_end.setHours(this.projectDatas.body.date_for_end.getHours() + this.hrs);
        projectManagerDatas['date_for_end'] = this.projectDatas.body.date_for_end;
        if (actor != '中止') {
          projectManagerDatas['code'] = this.projectDatas.body.code;
          projectManagerDatas['p_name'] = this.projectDatas.body.code;
          projectManagerDatas['machine_finished_number'] = this.projectDatas.body.machine_finished_number
          projectManagerDatas['customer_id'] = this.projectDatas.body.customer_id;
          projectManagerDatas['projectman_id'] = this.projectDatas.body.projectman_id;
          projectManagerDatas['jig_quantity'] = Number(this.projectDatas.body.jig_quantity)
          projectManagerDatas['machine_english'] = this.projectDatas.body.machine_english
          projectManagerDatas['nameplate'] = this.projectDatas.body.nameplate
          projectManagerDatas['salesman_id'] = this.projectDatas.body.salesman_id;
          projectManagerDatas['serviceman_id'] = this.projectDatas.body.serviceman_id;
          projectManagerDatas['machine_quantity'] = Number(this.projectDatas.body.machine_quantity)
          projectManagerDatas['external_order'] = this.projectDatas.body.external_order
          projectManagerDatas['internal_order'] = this.projectDatas.body.internal_order
          projectManagerDatas['summary_description'] = this.projectDatas.body.summary_description
          if (this.projectDatas.body.is_template == 'false') {
            projectManagerDatas['is_template'] = false
          }
          else {
            projectManagerDatas['is_template'] = true
          }
        }
        console.log(projectManagerDatas)
        this.HttpApiService.updateProjectRequest_t(this.p_id, projectManagerDatas).
          subscribe(projectRequest => {
            this.projectDatas = projectRequest;
            console.log(this.projectDatas)
            if (this.projectDatas.code == 200) {
              if (actor == '更新') {
                this.uploadTransactionRecordRequests(this.p_id, actor, "儲存資料")
                this.updatePrincipalTask()
                this.uploadTask()
              }
              else if (actor == '中止') {
                this.uploadTransactionRecordRequests(this.p_id, actor, "產銷")
              }
              setTimeout(() => {
                Swal.fire(
                  {
                    title: `已${actor}!`,
                    icon: 'success',
                    confirmButtonText: '確認!',
                    confirmButtonColor: '#64c270',
                  }
                ).then((result) => {
                  if (result.isConfirmed) {
                    window.location.assign(`main/projectinfo/produce-sales-meeting`);
                  }
                })
              }, 2000);
            }
          },
            (err: any) => {
              console.log('err:', err);
              Swal.fire(
                {
                  title: `${actor}失敗!`,
                  icon: 'error',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#FF5151',
                }
              )
            }
          );
      }
    })
  }

  deleteTlist: any[] = [];
  //啟動該id之project資料------------------------------------------------------------
  startProjectDatas(status: any, actor: any): void {
    Swal.fire({
      title: `您是否確定要${actor}專案?`,
      //text: "啟動後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `${actor}`,
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.projectDatas.body.code && this.projectDatas.body.machine_finished_number && this.projectDatas.body.customer_id && this.projectDatas.body.projectman_id && this.projectDatas.body.salesman_id && this.projectDatas.body.serviceman_id && this.projectDatas.body.date_for_start && this.projectDatas.body.date_for_end && this.projectDatas.body.jig_quantity && this.projectDatas.body.customer_id != "0caaf460-ee49-44c7-80e6-62faf0e8488e" && this.projectDatas.body.projectman_id != "0caaf460-ee49-44c7-80e6-62faf0e8488e" && this.projectDatas.body.salesman_id != "0caaf460-ee49-44c7-80e6-62faf0e8488e") {
          Swal.fire({
            title: '載入中...',
            html: '資料儲存中',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
            }
          })
          this.startbtn = "start"
          //this.updateProject(status)
          this.testemail()
          this.updatePrincipalTask()
          this.uploadTask()
        }
        else {
          Swal.fire(
            {
              title: `${actor}失敗!`,
              text: '請確認專案內容是否填寫完成',
              icon: 'error',
              confirmButtonText: '確認!',
              confirmButtonColor: '#FF5151',
            }
          )
        }
      }
    })
  }

  systememail = 'htaeirctest@gmail.com'
  systempassword = 'czwucttwoqkijzas' //固定
  testemail(): void {
    var url = String(window.location.href)
    let emailRequest: any = {}
    emailRequest['host'] = 'smtp.gmail.com'
    emailRequest['port'] = '587'
    emailRequest['name'] = 'HTA後台系統'
    emailRequest['username'] = this.systememail
    emailRequest['password'] = this.systempassword
    //emailRequest['to'] = 'isabelle_wu@hta.com.tw'
    emailRequest['to'] = 'c108118213@nkust.edu.tw'
    emailRequest['subject'] = '新建專案啟動'
    emailRequest['body'] = `<html><body><h2>你好!</h2><h4>專案產銷會議作業（${this.projectDatas.body.code}）已啟動，請盡快處理</h4><a href='${url}'>專案連結</a></body></html>`
    this.HttpApiService.SendEmailRequest_t(emailRequest)
      .subscribe(res => {
        console.log('成功', res)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  updateProject(status: any): void {
    let projectManagerDatas: any = {};//接收資料
    projectManagerDatas['p_id'] = this.projectDatas.body.p_id;
    projectManagerDatas['status'] = status
    projectManagerDatas['code'] = this.projectDatas.body.code;
    projectManagerDatas['p_name'] = this.projectDatas.body.code;
    projectManagerDatas['machine_finished_number'] = this.projectDatas.body.machine_finished_number
    projectManagerDatas['customer_id'] = this.projectDatas.body.customer_id;
    projectManagerDatas['projectman_id'] = this.projectDatas.body.projectman_id;
    this.projectDatas.body.date_for_start.setHours(this.projectDatas.body.date_for_start.getHours() + this.hrs);
    projectManagerDatas['date_for_start'] = this.projectDatas.body.date_for_start;
    this.projectDatas.body.date_for_end.setHours(this.projectDatas.body.date_for_end.getHours() + this.hrs);
    projectManagerDatas['date_for_end'] = this.projectDatas.body.date_for_end;
    projectManagerDatas['jig_quantity'] = Number(this.projectDatas.body.jig_quantity)
    projectManagerDatas['machine_english'] = this.projectDatas.body.machine_english
    projectManagerDatas['nameplate'] = this.projectDatas.body.nameplate
    projectManagerDatas['salesman_id'] = this.projectDatas.body.salesman_id;
    projectManagerDatas['serviceman_id'] = this.projectDatas.body.serviceman_id;
    projectManagerDatas['machine_quantity'] = Number(this.projectDatas.body.machine_quantity)
    projectManagerDatas['external_order'] = this.projectDatas.body.external_order
    projectManagerDatas['internal_order'] = this.projectDatas.body.internal_order
    projectManagerDatas['summary_description'] = this.projectDatas.body.summary_description
    if (this.projectDatas.body.is_template == 'false') {
      projectManagerDatas['is_template'] = false
    }
    else {
      projectManagerDatas['is_template'] = true
    }

    console.log(projectManagerDatas)
    this.HttpApiService.updateProjectRequest_t(this.p_id, projectManagerDatas).
      subscribe(projectRequest => {
      })
  }

  blanktaskdatas: any[] = []
  blanktaskuserdatas: any[] = []
  doublecheck = false
  gettasklist(): void {
    //console.log("有跑")
    this.blanktaskdatas = []
    this.blanktaskuserdatas = []
    this.HttpApiService.getTaskListUserRequest(this.p_id).
      subscribe(taskRequest => {
        var taskDatas: any = taskRequest
        for (var i in taskDatas.body.task) {
          if (taskDatas.body.task[i].account_id == '0caaf460-ee49-44c7-80e6-62faf0e8488e' || taskDatas.body.task[i].account_id == undefined || taskDatas.body.task[i].date_for_estimated_start == '' || taskDatas.body.task[i].date_for_estimated_start == '0001-01-01T00:00:00Z' || taskDatas.body.task[i].date_for_estimated_completion == '' || taskDatas.body.task[i].date_for_estimated_completion == '0001-01-01T00:00:00Z') {
            this.blanktaskdatas.push({ "t_id": taskDatas.body.task[i].t_id })
            this.blanktaskuserdatas.push({ "tu_id": taskDatas.body.task[i].tu_id })
            Swal.fire({
              title: '任務資料填寫不完全仍要啟動嗎?',
              text: "啟動後將刪除未完成任務!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: '啟動!',
              cancelButtonText: '取消!',
              confirmButtonColor: '#64c270',
              cancelButtonColor: '#FF5151',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.doublecheck = true
                this.dialogLoading()
                this.startOneProjectDatas('待專案啟動', '啟動')
              }
              else {
                this.startbtn = ""
              }
            })
          }
        }
        console.log(this.blanktaskdatas.length)
        if (this.doublecheck == false && this.blanktaskdatas.length == 0) {
          this.startOneProjectDatas('待專案啟動', '啟動')
        }
        //console.log(this.blanktaskdatas)
      })
  }
  delstart = false
  startOneProjectDatas(status: any, actor: any): void {
    //console.log("???")
    let projectManagerDatas: any = {};//接收資料
    projectManagerDatas['p_id'] = this.projectDatas.body.p_id;
    projectManagerDatas['code'] = this.projectDatas.body.code;
    projectManagerDatas['p_name'] = this.projectDatas.body.code;
    projectManagerDatas['machine_finished_number'] = this.projectDatas.body.machine_finished_number
    projectManagerDatas['customer_id'] = this.projectDatas.body.customer_id;
    projectManagerDatas['projectman_id'] = this.projectDatas.body.projectman_id;
    this.projectDatas.body.date_for_start.setHours(this.projectDatas.body.date_for_start.getHours() + this.hrs);
    projectManagerDatas['date_for_start'] = this.projectDatas.body.date_for_start;
    this.projectDatas.body.date_for_end.setHours(this.projectDatas.body.date_for_end.getHours() + this.hrs);
    projectManagerDatas['date_for_end'] = this.projectDatas.body.date_for_end;
    projectManagerDatas['jig_quantity'] = Number(this.projectDatas.body.jig_quantity)
    projectManagerDatas['machine_english'] = this.projectDatas.body.machine_english
    projectManagerDatas['nameplate'] = this.projectDatas.body.nameplate
    projectManagerDatas['salesman_id'] = this.projectDatas.body.salesman_id;
    projectManagerDatas['serviceman_id'] = this.projectDatas.body.serviceman_id;
    projectManagerDatas['machine_quantity'] = Number(this.projectDatas.body.machine_quantity)
    projectManagerDatas['external_order'] = this.projectDatas.body.external_order
    projectManagerDatas['internal_order'] = this.projectDatas.body.internal_order
    projectManagerDatas['summary_description'] = this.projectDatas.body.summary_description
    projectManagerDatas['status'] = status
    if (this.projectDatas.body.is_template == 'false') {
      projectManagerDatas['is_template'] = false
    }
    else {
      projectManagerDatas['is_template'] = true
    }
    console.log(projectManagerDatas)

    this.HttpApiService.updateProjectRequest_t(this.p_id, projectManagerDatas).
      subscribe(projectRequest => {
        this.projectDatas = projectRequest;
        //啟動異動處理
        this.uploadTransactionRecordRequests(this.p_id, actor, "產銷")
        //this.uploadTask()

        this.delstart = true
        this.deleteBlackDatas()
        this.uploadfirsttask()
        //setTimeout(() => {this.uploadfirsttask(),1000}),
        setTimeout(() => {
          Swal.fire(
            {
              title: `已${actor}!`,
              icon: 'success',
              confirmButtonText: '確認!',
              confirmButtonColor: '#64c270',
            }
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.assign(`main/projectinfo/produce-sales-meeting`);
            }
          })
        }, 2000);
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  uploadfirsttaskDatas: any = { "task": [] }
  firsttid: any
  firsttask = false
  uploadfirsttask(): void {
    let taskManagerDatas: any = {};//接收資料
    taskManagerDatas['documents_id'] = this.p_id
    taskManagerDatas['t_name'] = "治具"
    taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['origin_id'] = this.origin_id
    taskManagerDatas['hierarchy'] = 1
    this.uploadfirsttaskDatas.task.push(taskManagerDatas)

    taskManagerDatas = {};//接收資料
    taskManagerDatas['documents_id'] = this.p_id
    taskManagerDatas['t_name'] = "書面資料"
    taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['origin_id'] = this.origin_id
    taskManagerDatas['hierarchy'] = 1
    this.uploadfirsttaskDatas.task.push(taskManagerDatas)

    taskManagerDatas = {};//接收資料
    taskManagerDatas['documents_id'] = this.p_id
    taskManagerDatas['t_name'] = "試機需求部品"
    taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['origin_id'] = this.origin_id
    taskManagerDatas['hierarchy'] = 1
    this.uploadfirsttaskDatas.task.push(taskManagerDatas)

    taskManagerDatas = {};//接收資料
    taskManagerDatas['documents_id'] = this.p_id
    taskManagerDatas['t_name'] = "其他列"
    taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['origin_id'] = this.origin_id
    taskManagerDatas['hierarchy'] = 1
    this.uploadfirsttaskDatas.task.push(taskManagerDatas)

    this.HttpApiService.uploadpluralTaskRequest(this.uploadfirsttaskDatas)
      .subscribe(taskRequest => {
        var taskidDatas: any = taskRequest
        this.firsttid = taskidDatas.body
        console.log(taskidDatas.body)
        this.uploadfirsttaskuser(taskidDatas.body)
      })
  }

  uploadfirsttaskuserDatas: any = { "task_user": [] }
  firsttuid: any
  uploadfirsttaskuser(taskidDatas: any): void {
    let taskuserManagerDatas: any = {};//接收資料
    taskuserManagerDatas['task_id'] = taskidDatas[0]
    taskuserManagerDatas['user_id'] = "00000000-0000-0000-0000-000000000000"
    taskuserManagerDatas['principal'] = true
    this.uploadfirsttaskuserDatas.task_user.push(taskuserManagerDatas)

    taskuserManagerDatas = {};//接收資料
    taskuserManagerDatas['task_id'] = taskidDatas[1]
    taskuserManagerDatas['user_id'] = "00000000-0000-0000-0000-000000000000"
    taskuserManagerDatas['principal'] = true
    this.uploadfirsttaskuserDatas.task_user.push(taskuserManagerDatas)

    taskuserManagerDatas = {};//接收資料
    taskuserManagerDatas['task_id'] = taskidDatas[2]
    taskuserManagerDatas['user_id'] = "00000000-0000-0000-0000-000000000000"
    taskuserManagerDatas['principal'] = true
    this.uploadfirsttaskuserDatas.task_user.push(taskuserManagerDatas)

    taskuserManagerDatas = {};//接收資料
    taskuserManagerDatas['task_id'] = taskidDatas[3]
    taskuserManagerDatas['user_id'] = "00000000-0000-0000-0000-000000000000"
    taskuserManagerDatas['principal'] = true
    this.uploadfirsttaskuserDatas.task_user.push(taskuserManagerDatas)

    console.log(this.uploadfirsttaskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.uploadfirsttaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log('成功', taskuserRequest)
        var taskuserdatas: any = taskuserRequest
        this.firsttuid = taskuserdatas.body
        this.firsttask = true
        this.getAllTaskDatas('renew')
        console.log(this.firsttid, this.firsttuid)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }


  deletefirstBlackDatas(): void {
    this.blanktaskdatas = []
    this.blanktaskuserdatas = []
    if (this.taskclass['DATA_2'] == false) {
      this.blanktaskdatas.push({ "t_id": this.firsttid[0] })
      this.blanktaskuserdatas.push({ "tu_id": this.firsttuid[0] })
    }
    if (this.taskclass['DATA_3'] == false) {
      this.blanktaskdatas.push({ "t_id": this.firsttid[1] })
      this.blanktaskuserdatas.push({ "tu_id": this.firsttuid[1] })
    }
    if (this.taskclass['DATA_4'] == false) {
      this.blanktaskdatas.push({ "t_id": this.firsttid[2] })
      this.blanktaskuserdatas.push({ "tu_id": this.firsttuid[2] })
    }
    if (this.taskclass['DATA_5'] == false) {
      this.blanktaskdatas.push({ "t_id": this.firsttid[3] })
      this.blanktaskuserdatas.push({ "tu_id": this.firsttuid[3] })
    }
    this.deleteBlackDatas()
  }

  deleteBlackDatas(): void {
    this.HttpApiService.deletepluralTaskRequest(this.blanktaskdatas)
      .subscribe(deleteRequest => {
        console.log(deleteRequest)
      });
    this.HttpApiService.deletepluralTaskUserRequest(this.blanktaskuserdatas)
      .subscribe(deleteRequest => {
        console.log(deleteRequest)
      });
  }

  test(): void {

  }

  copytoadd(p_id: any): void {
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
        this.inquireproject(p_id)
      }
    })
  }

  inquireproject(p_id: any) {
    this.HttpApiService.getOneProjectRequest_t(p_id)
      .subscribe(projectRequest => {
        var projectDatas: any = projectRequest
        this.uploadnewproject(projectDatas.body)
      })
  }

  uploadnewproject(projectdata: any): void {
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
        var p_id = projectData.body
        console.log(projectData)
        console.log("成功")
        this.getalltask(projectdata.p_id, p_id)
        setTimeout(() => { this.uploadnewTransactionRecordRequests(p_id) }, 2000);
      },
        (err: any) => {
          console.log('err:', err);
        });
  }

  getalltask(p_id: any, newp_id: any): void {
    this.HttpApiService.getTaskListUserRequest(p_id)
      .subscribe(taskRequest => {
        let taskData: any = taskRequest.body.task
        this.uploadnewTask(newp_id, taskData)
        console.log(taskData)
      })
  }

  newtaskDatas: any = { "task": [] }
  uploadnewTask(p_id: any, taskdata: any): void {
    //console.log(taskdata)
    for (var i in taskdata) {
      //console.log(taskdata[Number(i)]['t_name'])
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
        this.newtaskDatas.task.push(taskManagerDatas)
      }
    }
    console.log(this.newtaskDatas)
    this.HttpApiService.uploadpluralTaskRequest(this.newtaskDatas)
      .subscribe(taskRequest => {
        var taskidDatas: any = taskRequest
        this.uploadnewTaskUserDatas(taskidDatas.body, taskdata)
      })
  }

  newtaskuserDatas: any = { "task_user": [] }
  //產生一筆新的task_user資料格式-------------------------------------------
  uploadnewTaskUserDatas(taskidDatas: any, taskdata: any): void {
    this.newtaskuserDatas = { "task_user": [] }
    var j = 0
    for (var i in taskdata) {
      if (taskdata[Number(i)]['t_name'] != '治具' && taskdata[Number(i)]['t_name'] != '書面資料' && taskdata[Number(i)]['t_name'] != '試機需求部品' && taskdata[Number(i)]['t_name'] != '其他列') {
        let taskuserManagerDatas: any = {};//接收資料
        taskuserManagerDatas['task_id'] = taskidDatas[j]
        taskuserManagerDatas['user_id'] = taskdata[Number(i)]['account_id']
        taskuserManagerDatas['principal'] = true
        j = j + 1
        this.newtaskuserDatas.task_user.push(taskuserManagerDatas)
      }
    }
    console.log(this.newtaskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.newtaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log('成功')

      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadnewTransactionRecordRequests(p_id: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = p_id
    trManagerDatas['actor'] = "新建"
    trManagerDatas['content'] = "專案"
    trManagerDatas['creater'] = this.userJson.account_id
    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log('成功')
        this.editnewurl(p_id)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  // 跳轉頁面------------------------------------------
  editnewurl(p_id: any): void {
    window.location.assign(`main/projectinfo/produce-sales-meeting-edit/${p_id}`);
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

  projectPrincipal = { 'projectman_id': '', 'salesman_id': '', 'serviceman_id': '' }
  //修改該專案負責人Task資料---------------------------------------
  updatePrincipalTask(): void {
    for (var i in this.principal_array) {
      let taskManagerDatas: any = {};//接收資料
      let updatetaskuserDatas: any = { "task_user": [] }
      taskManagerDatas['tu_id'] = this.principal_array[i].tu_id
      taskManagerDatas['task_id'] = this.principal_array[i].t_id
      if (this.principal_array[i].t_name == "專案負責") {
        taskManagerDatas['user_id'] = this.projectDatas.body.projectman_id
        this.projectPrincipal['projectman_id'] = this.projectDatas.body.projectman_id
      }
      else if (this.principal_array[i].t_name == "業務負責") {
        taskManagerDatas['user_id'] = this.projectDatas.body.salesman_id
        this.projectPrincipal['salesman_id'] = this.projectDatas.body.salesman_id
      }
      else if (this.principal_array[i].t_name == "客服負責") {
        taskManagerDatas['user_id'] = this.projectDatas.body.serviceman_id
        this.projectPrincipal['serviceman_id'] = this.projectDatas.body.serviceman_id
      }
      updatetaskuserDatas.task_user.push(taskManagerDatas)
      this.HttpApiService.updatepluralTaskUserRequest(updatetaskuserDatas)
        .subscribe(taskuserRequest => {
          console.log("成功修改專案負責人")
        })
    }
  }

  //刪除彈跳視窗
  sweetalert_delete(): void {
    Swal.fire({
      text: "確定要刪除嗎",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: '取消!',
      confirmButtonText: `確定!`,
      reverseButtons: true,
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '載入中...',
          html: '請稍等',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        this.deleteProjectRequest()
      }
    })
  }
  //刪除該id之project資料------------------------------------------------------------
  deleteProjectRequest(): void {
    this.HttpApiService.deleteProjectRequest_t(this.p_id).subscribe();
    //刪除組合機次階資料
    if (this.mcDataslist) {
      for (var i in this.mcDataslist) {
        this.HttpApiService.deleteMachineCombinedRequest_t(this.mcDataslist[i].mc_id).subscribe();
      }
    }
    //刪除外掛部品資料
    if (this.contentlist) {
      for (var i in this.contentlist) {
        this.HttpApiService.deletePlugInRequest_t(this.contentlist[i].pi_id).subscribe();
      }
    }
    //刪除異動紀錄資料
    for (var i in this.transactionlist) {
      this.HttpApiService.deleteTransactionRecordRequest_t(this.transactionlist[i].tr_id).subscribe();
    }
    //刪除專案負責人資料
    for (var i in this.principal_array) {
      this.deletetaskDatas.push({ 't_id': this.principal_array[i].t_id })
      this.deletetaskuserDatas.push({ 'tu_id': this.principal_array[i].tu_id })
    }
    this.deleteTaskRequest()
    this.deleteTaskUserRequest()
    setTimeout(() => { this.editurl() }, 2000);
  }


  // 跳轉頁面------------------------------------------
  editurl(): void {
    //window.location.assign(`main/projectinfo/produce-sales-meeting-edit/${this.p_id}`);
    window.location.assign(`main/projectinfo/produce-sales-meeting`);
  }

  principal_array: any[] = []
  startbtn = ''
  //取得該id之所有Task資料---------------------------------------
  getAllTaskDatas(status: any): void {
    this.HttpApiService.getTaskListUserRequest(this.p_id)
      .subscribe(TaskRequest => {
        console.log(TaskRequest.body.task)
        if (this.delstart == true) {
          this.emptyData()
        }
        for (var i in TaskRequest.body.task) {
          this.comparedData(TaskRequest.body.task[i])
          if (TaskRequest.body.task[i].t_name == "專案負責" || TaskRequest.body.task[i].t_name == "客服負責" || TaskRequest.body.task[i].t_name == "業務負責") {
            this.principal_array.push(TaskRequest.body.task[i])
          }
        }
        if (status == 'renew') {
          this.updateTask()
          this.updateTaskUserDatas()
        }
      })
  }


  //清空Task資料----------------------------------------
  emptyData(): void {
    for (var i in ELEMENT_DATA_1) {
      ELEMENT_DATA_1[i].t_id = ''
      ELEMENT_DATA_1[i].tu_id = ''
      ELEMENT_DATA_1[i].fillout = false
    }
    for (var i in ELEMENT_DATA_2) {
      ELEMENT_DATA_2[i].t_id = ''
      ELEMENT_DATA_2[i].tu_id = ''
      ELEMENT_DATA_2[i].fillout = false
    }
    for (var i in ELEMENT_DATA_3) {
      ELEMENT_DATA_3[i].t_id = ''
      ELEMENT_DATA_3[i].tu_id = ''
      ELEMENT_DATA_3[i].fillout = false
    }
    for (var i in ELEMENT_DATA_4) {
      ELEMENT_DATA_4[i].t_id = ''
      ELEMENT_DATA_4[i].tu_id = ''
      ELEMENT_DATA_4[i].fillout = false
    }
    for (var i in ELEMENT_DATA_5) {
      ELEMENT_DATA_5[i].t_id = ''
      ELEMENT_DATA_5[i].tu_id = ''
      ELEMENT_DATA_5[i].fillout = false
    }
  }

  total: any
  //比對Task資料---------------------------------------
  comparedData(taskDatas: any): void {
    for (var i in ELEMENT_DATA_1) {
      if (ELEMENT_DATA_1[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_1[i].t_id = taskDatas.t_id
        ELEMENT_DATA_1[i].fillout = true
        if (ELEMENT_DATA_1[i].date_for_estimated_start_1 == '') {
          ELEMENT_DATA_1[i].date_for_estimated_start_1 = new Date(taskDatas.date_for_estimated_start)
        }
        if (ELEMENT_DATA_1[i].date_for_estimated_completion_1 == '') {
          ELEMENT_DATA_1[i].date_for_estimated_completion_1 = new Date(taskDatas.date_for_estimated_completion)
        }
        if (ELEMENT_DATA_1[i].date_for_actual_completion_1 == '') {
          ELEMENT_DATA_1[i].date_for_actual_completion_1 = new Date(taskDatas.date_for_actual_completion)
        }
        if (ELEMENT_DATA_1[i].file_1 == false) {
          ELEMENT_DATA_1[i].file_1 = taskDatas.file
        }
        if (ELEMENT_DATA_1[i].remark_1 == '') {
          ELEMENT_DATA_1[i].remark_1 = taskDatas.remark
        }
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_1[i].date_for_actual_completion_1 = ""
        }
        if (taskDatas.date_for_estimated_start == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_1[i].date_for_estimated_start_1 = ""
        }
        if (taskDatas.date_for_estimated_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_1[i].date_for_estimated_completion_1 = ""
        }
        ELEMENT_DATA_1[i].tu_id = taskDatas.tu_id
        if (ELEMENT_DATA_1[i].principal_1 == '') {
          ELEMENT_DATA_1[i].principal_1 = taskDatas.account_id
        }
      }
    }
    for (var i in ELEMENT_DATA_2) {
      if (ELEMENT_DATA_2[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_2[i].t_id = taskDatas.t_id
        ELEMENT_DATA_2[i].fillout = true
        if (ELEMENT_DATA_2[i].date_for_estimated_start_2 == '') {
          ELEMENT_DATA_2[i].date_for_estimated_start_2 = new Date(taskDatas.date_for_estimated_start)
        }
        if (ELEMENT_DATA_2[i].date_for_estimated_completion_2 == '') {
          ELEMENT_DATA_2[i].date_for_estimated_completion_2 = new Date(taskDatas.date_for_estimated_completion)
        }
        if (ELEMENT_DATA_2[i].date_for_actual_completion_2 == '') {
          ELEMENT_DATA_2[i].date_for_actual_completion_2 = new Date(taskDatas.date_for_actual_completion)
        }
        if (ELEMENT_DATA_2[i].file_2 == false) {
          ELEMENT_DATA_2[i].file_2 = taskDatas.file
        }
        if (ELEMENT_DATA_2[i].remark_2 == '') {
          ELEMENT_DATA_2[i].remark_2 = taskDatas.remark
        }
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_2[i].date_for_actual_completion_2 = ""
        }
        if (taskDatas.date_for_estimated_start == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_2[i].date_for_estimated_start_2 = ""
        }
        if (taskDatas.date_for_estimated_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_2[i].date_for_estimated_completion_2 = ""
        }
        ELEMENT_DATA_2[i].tu_id = taskDatas.tu_id
        if (ELEMENT_DATA_2[i].principal_2 == '') {
          ELEMENT_DATA_2[i].principal_2 = taskDatas.account_id
        }
      }
    }
    for (var i in ELEMENT_DATA_3) {
      if (ELEMENT_DATA_3[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_3[i].t_id = taskDatas.t_id
        ELEMENT_DATA_3[i].fillout = true
        if (ELEMENT_DATA_3[i].date_for_estimated_start_3 == '') {
          ELEMENT_DATA_3[i].date_for_estimated_start_3 = new Date(taskDatas.date_for_estimated_start)
        }
        if (ELEMENT_DATA_3[i].date_for_estimated_completion_3 == '') {
          ELEMENT_DATA_3[i].date_for_estimated_completion_3 = new Date(taskDatas.date_for_estimated_completion)
        }
        if (ELEMENT_DATA_3[i].date_for_actual_completion_3 == '') {
          ELEMENT_DATA_3[i].date_for_actual_completion_3 = new Date(taskDatas.date_for_actual_completion)
        }
        if (ELEMENT_DATA_3[i].file_3 == false) {
          ELEMENT_DATA_3[i].file_3 = taskDatas.file
        }
        if (ELEMENT_DATA_3[i].remark_3 == '') {
          ELEMENT_DATA_3[i].remark_3 = taskDatas.remark
        }
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_3[i].date_for_actual_completion_3 = ""
        }
        if (taskDatas.date_for_estimated_start == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_3[i].date_for_estimated_start_3 = ""
        }
        if (taskDatas.date_for_estimated_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_3[i].date_for_estimated_completion_3 = ""
        }
        ELEMENT_DATA_3[i].tu_id = taskDatas.tu_id
        if (ELEMENT_DATA_3[i].principal_3 == '') {
          ELEMENT_DATA_3[i].principal_3 = taskDatas.account_id
        }
      }
    }
    for (var i in ELEMENT_DATA_4) {
      if (ELEMENT_DATA_4[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_4[i].t_id = taskDatas.t_id
        ELEMENT_DATA_4[i].fillout = true
        if (ELEMENT_DATA_4[i].quantity == '') {
          ELEMENT_DATA_4[i].quantity = taskDatas.quantity
        }
        if (ELEMENT_DATA_4[i].date_for_estimated_start_4 == '') {
          ELEMENT_DATA_4[i].date_for_estimated_start_4 = new Date(taskDatas.date_for_estimated_start)
        }
        if (ELEMENT_DATA_4[i].date_for_estimated_completion_4 == '') {
          ELEMENT_DATA_4[i].date_for_estimated_completion_4 = new Date(taskDatas.date_for_estimated_completion)
        }
        if (ELEMENT_DATA_4[i].date_for_actual_completion_4 == '') {
          ELEMENT_DATA_4[i].date_for_actual_completion_4 = new Date(taskDatas.date_for_actual_completion)
        }
        if (ELEMENT_DATA_4[i].file_4 == false) {
          ELEMENT_DATA_4[i].file_4 = taskDatas.file
        }
        if (ELEMENT_DATA_4[i].remark_4 == '') {
          ELEMENT_DATA_4[i].remark_4 = taskDatas.remark
        }
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_4[i].date_for_actual_completion_4 = ""
        }
        if (taskDatas.date_for_estimated_start == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_4[i].date_for_estimated_start_4 = ""
        }
        if (taskDatas.date_for_estimated_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_4[i].date_for_estimated_completion_4 = ""
        }
        ELEMENT_DATA_4[i].tu_id = taskDatas.tu_id
        if (ELEMENT_DATA_4[i].principal_4 == '') {
          ELEMENT_DATA_4[i].principal_4 = taskDatas.account_id
        }
      }
    }
    for (var i in ELEMENT_DATA_5) {
      if (ELEMENT_DATA_5[i].taskname == taskDatas.t_name) {
        ELEMENT_DATA_5[i].t_id = taskDatas.t_id
        ELEMENT_DATA_5[i].fillout = true
        if (ELEMENT_DATA_5[i].date_for_estimated_start_5 == '') {
          ELEMENT_DATA_5[i].date_for_estimated_start_5 = new Date(taskDatas.date_for_estimated_start)
        }
        if (ELEMENT_DATA_5[i].date_for_estimated_completion_5 == '') {
          ELEMENT_DATA_5[i].date_for_estimated_completion_5 = new Date(taskDatas.date_for_estimated_completion)
        }
        if (ELEMENT_DATA_5[i].date_for_actual_completion_5 == '') {
          ELEMENT_DATA_5[i].date_for_actual_completion_5 = new Date(taskDatas.date_for_actual_completion)
        }
        if (ELEMENT_DATA_5[i].file_5 == false) {
          ELEMENT_DATA_5[i].file_5 = taskDatas.file
        }
        if (ELEMENT_DATA_5[i].remark_5 == '') {
          ELEMENT_DATA_5[i].remark_5 = taskDatas.remark
        }
        if (taskDatas.date_for_actual_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_5[i].date_for_actual_completion_5 = ""
        }
        if (taskDatas.date_for_estimated_start == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_5[i].date_for_estimated_start_5 = ""
        }
        if (taskDatas.date_for_estimated_completion == "0001-01-01T00:00:00Z") {
          ELEMENT_DATA_5[i].date_for_estimated_completion_5 = ""
        }
        ELEMENT_DATA_5[i].tu_id = taskDatas.tu_id
        if (ELEMENT_DATA_5[i].principal_5 == '') {
          ELEMENT_DATA_5[i].principal_5 = taskDatas.account_id
        }
      }
    }
  }

  errorswal: any = false

  uploadtaskDatas: any = { "task": [] }
  //新增該id之所有Task資料---------------------------------------
  uploadTask(): void {
    for (var i in ELEMENT_DATA_1) {
      if (ELEMENT_DATA_1[i].fillout == true) {
        this.taskclass["DATA_1"] = true
      }
      if (ELEMENT_DATA_1[i].fillout == false) {
        if (ELEMENT_DATA_1[i].date_for_estimated_start_1 || ELEMENT_DATA_1[i].date_for_estimated_completion_1 || ELEMENT_DATA_1[i].file_1 || ELEMENT_DATA_1[i].remark_1) {
          let taskManagerDatas: any = {};//接收資料
          taskManagerDatas['documents_id'] = this.p_id
          taskManagerDatas['t_name'] = ELEMENT_DATA_1[i].taskname
          taskManagerDatas['default_date'] = 2
          taskManagerDatas['default_labor_hour'] = 2
          taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['origin_id'] = this.origin_id
          taskManagerDatas['date_for_actual_completion'] = ""
          taskManagerDatas['hierarchy'] = 1
          taskManagerDatas['remark'] = ELEMENT_DATA_1[i].remark_1
          taskManagerDatas['file'] = ELEMENT_DATA_1[i].file_1
          if (ELEMENT_DATA_1[i].date_for_estimated_start_1) {
            ELEMENT_DATA_1[i].date_for_estimated_start_1.setHours(ELEMENT_DATA_1[i].date_for_estimated_start_1.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_1[i].date_for_estimated_start_1
          }
          if (ELEMENT_DATA_1[i].date_for_estimated_completion_1) {
            ELEMENT_DATA_1[i].date_for_estimated_completion_1.setHours(ELEMENT_DATA_1[i].date_for_estimated_completion_1.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_1[i].date_for_estimated_completion_1
          }
          this.uploadtaskDatas.task.push(taskManagerDatas)
        }
      }
    }
    for (var i in ELEMENT_DATA_2) {
      if (ELEMENT_DATA_2[i].fillout == false) {
        if (ELEMENT_DATA_2[i].date_for_estimated_start_2 || ELEMENT_DATA_2[i].date_for_estimated_completion_2 || ELEMENT_DATA_2[i].file_2 || ELEMENT_DATA_2[i].remark_2) {
          let taskManagerDatas: any = {};//接收資料
          taskManagerDatas['documents_id'] = this.p_id
          taskManagerDatas['t_name'] = ELEMENT_DATA_2[i].taskname
          taskManagerDatas['default_date'] = 2
          taskManagerDatas['default_labor_hour'] = 2
          taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['origin_id'] = this.origin_id
          taskManagerDatas['date_for_actual_completion'] = ""
          taskManagerDatas['hierarchy'] = 1
          taskManagerDatas['remark'] = ELEMENT_DATA_2[i].remark_2
          taskManagerDatas['file'] = ELEMENT_DATA_2[i].file_2
          if (ELEMENT_DATA_2[i].date_for_estimated_start_2) {
            ELEMENT_DATA_2[i].date_for_estimated_start_2.setHours(ELEMENT_DATA_2[i].date_for_estimated_start_2.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_2[i].date_for_estimated_start_2
          }
          if (ELEMENT_DATA_2[i].date_for_estimated_completion_2) {
            ELEMENT_DATA_2[i].date_for_estimated_completion_2.setHours(ELEMENT_DATA_2[i].date_for_estimated_completion_2.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_2[i].date_for_estimated_completion_2
          }
          this.uploadtaskDatas.task.push(taskManagerDatas)
        }
      }
    }

    for (var i in ELEMENT_DATA_3) {
      if (ELEMENT_DATA_3[i].fillout == false) {
        if (ELEMENT_DATA_3[i].date_for_estimated_start_3 || ELEMENT_DATA_3[i].date_for_estimated_completion_3 || ELEMENT_DATA_3[i].file_3 || ELEMENT_DATA_3[i].remark_3) {
          let taskManagerDatas: any = {};//接收資料
          taskManagerDatas['documents_id'] = this.p_id
          taskManagerDatas['t_name'] = ELEMENT_DATA_3[i].taskname
          taskManagerDatas['default_date'] = 2
          taskManagerDatas['default_labor_hour'] = 2
          taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['origin_id'] = this.origin_id
          taskManagerDatas['date_for_actual_completion'] = ""
          taskManagerDatas['hierarchy'] = 1
          taskManagerDatas['remark'] = ELEMENT_DATA_3[i].remark_3
          taskManagerDatas['file'] = ELEMENT_DATA_3[i].file_3
          if (ELEMENT_DATA_3[i].date_for_estimated_start_3) {
            ELEMENT_DATA_3[i].date_for_estimated_start_3.setHours(ELEMENT_DATA_3[i].date_for_estimated_start_3.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_3[i].date_for_estimated_start_3
          }
          if (ELEMENT_DATA_3[i].date_for_estimated_completion_3) {
            ELEMENT_DATA_3[i].date_for_estimated_completion_3.setHours(ELEMENT_DATA_3[i].date_for_estimated_completion_3.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_3[i].date_for_estimated_completion_3
          }
          this.uploadtaskDatas.task.push(taskManagerDatas)
        }
      }
    }
    for (var i in ELEMENT_DATA_4) {
      if (ELEMENT_DATA_4[i].fillout == false) {
        if (ELEMENT_DATA_4[i].date_for_estimated_start_4 || ELEMENT_DATA_4[i].date_for_estimated_completion_4 || ELEMENT_DATA_4[i].file_4 || ELEMENT_DATA_4[i].remark_4 || ELEMENT_DATA_4[i].quantity) {
          let taskManagerDatas: any = {};//接收資料
          taskManagerDatas['documents_id'] = this.p_id
          taskManagerDatas['t_name'] = ELEMENT_DATA_4[i].taskname
          taskManagerDatas['default_date'] = 2
          taskManagerDatas['default_labor_hour'] = 2
          taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['origin_id'] = this.origin_id
          taskManagerDatas['date_for_actual_completion'] = ""
          taskManagerDatas['hierarchy'] = 1
          taskManagerDatas['quantity'] = Number(ELEMENT_DATA_4[i].quantity)
          taskManagerDatas['remark'] = ELEMENT_DATA_4[i].remark_4
          taskManagerDatas['file'] = ELEMENT_DATA_4[i].file_4
          if (ELEMENT_DATA_4[i].date_for_estimated_start_4) {
            ELEMENT_DATA_4[i].date_for_estimated_start_4.setHours(ELEMENT_DATA_4[i].date_for_estimated_start_4.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_4[i].date_for_estimated_start_4
          }
          if (ELEMENT_DATA_4[i].date_for_estimated_completion_4) {
            ELEMENT_DATA_4[i].date_for_estimated_completion_4.setHours(ELEMENT_DATA_4[i].date_for_estimated_completion_4.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_4[i].date_for_estimated_completion_4
          }
          this.uploadtaskDatas.task.push(taskManagerDatas)
        }
      }
    }
    for (var i in ELEMENT_DATA_5) {
      if (ELEMENT_DATA_5[i].fillout == false) {
        if (ELEMENT_DATA_5[i].date_for_estimated_start_5 || ELEMENT_DATA_5[i].date_for_estimated_completion_5 || ELEMENT_DATA_5[i].file_5 || ELEMENT_DATA_5[i].remark_5) {
          let taskManagerDatas: any = {};//接收資料
          taskManagerDatas['documents_id'] = this.p_id
          taskManagerDatas['t_name'] = ELEMENT_DATA_5[i].taskname
          taskManagerDatas['default_date'] = 2
          taskManagerDatas['default_labor_hour'] = 2
          taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['origin_id'] = this.origin_id
          taskManagerDatas['date_for_actual_completion'] = ""
          taskManagerDatas['hierarchy'] = 1
          taskManagerDatas['remark'] = ELEMENT_DATA_5[i].remark_5
          taskManagerDatas['file'] = ELEMENT_DATA_5[i].file_5
          if (ELEMENT_DATA_5[i].date_for_estimated_start_5) {
            ELEMENT_DATA_5[i].date_for_estimated_start_5.setHours(ELEMENT_DATA_5[i].date_for_estimated_start_5.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_5[i].date_for_estimated_start_5
          }
          if (ELEMENT_DATA_5[i].date_for_estimated_completion_5) {
            ELEMENT_DATA_5[i].date_for_estimated_completion_5.setHours(ELEMENT_DATA_5[i].date_for_estimated_completion_5.getHours() + this.hrs);
            taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_5[i].date_for_estimated_completion_5
          }
          this.uploadtaskDatas.task.push(taskManagerDatas)
        }
      }
    }
    this.HttpApiService.uploadpluralTaskRequest(this.uploadtaskDatas)
      .subscribe(taskRequest => {
        console.log("成功新增任務")
        var taskidDatas: any = taskRequest
        this.uploadTaskUserDatas(taskidDatas.body)
      })
  }
  taskuserDatas: any = { "task_user": [] }
  //產生一筆新的task_user資料格式-------------------------------------------
  uploadTaskUserDatas(taskidDatas: any): void {
    for (var i in taskidDatas) {
      let taskuserManagerDatas: any = {};//接收資料
      taskuserManagerDatas['task_id'] = taskidDatas[i]
      taskuserManagerDatas['user_id'] = "00000000-0000-0000-0000-000000000000"
      taskuserManagerDatas['principal'] = true
      this.taskuserDatas.task_user.push(taskuserManagerDatas)
    }
    this.HttpApiService.uploadpluralTaskUserRequest(this.taskuserDatas)
      .subscribe(taskuserRequest => {
        console.log('成功新增負責人')
        this.getAllTaskDatas("renew")
      }, (err: any) => {
        console.log('err:', err);
      }
      );
  }

  updatetaskDatas: any = { "task": [] }
  taskclass: any = { "DATA_1": false, "DATA_2": false, "DATA_3": false, "DATA_4": false, "DATA_5": false, }
  //修改該id之所有Task資料---------------------------------------
  updateTask(): void {
    this.updatetaskDatas = { "task": [] }
    let firstManangerDatas: any = {}
    for (var i in ELEMENT_DATA_1) {
      if (ELEMENT_DATA_1[i].fillout) {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['t_id'] = ELEMENT_DATA_1[i].t_id
        taskManagerDatas['remark'] = ELEMENT_DATA_1[i].remark_1
        taskManagerDatas['file'] = ELEMENT_DATA_1[i].file_1
        if (i != "0") {
          taskManagerDatas['hierarchy'] = 2
          if (ELEMENT_DATA_1[i].t_id) {
            taskManagerDatas['last_task'] = ELEMENT_DATA_1[0].t_id
          }
        }
        if (ELEMENT_DATA_1[i].date_for_estimated_start_1) {
          ELEMENT_DATA_1[i].date_for_estimated_start_1.setHours(ELEMENT_DATA_1[i].date_for_estimated_start_1.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_1[i].date_for_estimated_start_1
        }
        if (ELEMENT_DATA_1[i].date_for_estimated_completion_1) {
          ELEMENT_DATA_1[i].date_for_estimated_completion_1.setHours(ELEMENT_DATA_1[i].date_for_estimated_completion_1.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_1[i].date_for_estimated_completion_1
        }
        this.updatetaskDatas.task.push(taskManagerDatas)
      }
    }
    for (var i in ELEMENT_DATA_2) {
      //console.log("?")
      if (ELEMENT_DATA_2[i].fillout) {
        //console.log("??")
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['t_id'] = ELEMENT_DATA_2[i].t_id
        taskManagerDatas['remark'] = ELEMENT_DATA_2[i].remark_2
        taskManagerDatas['file'] = ELEMENT_DATA_2[i].file_2
        if (ELEMENT_DATA_2[i].date_for_estimated_start_2) {
          ELEMENT_DATA_2[i].date_for_estimated_start_2.setHours(ELEMENT_DATA_2[i].date_for_estimated_start_2.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_2[i].date_for_estimated_start_2
        }
        if (ELEMENT_DATA_2[i].date_for_estimated_completion_2) {
          ELEMENT_DATA_2[i].date_for_estimated_completion_2.setHours(ELEMENT_DATA_2[i].date_for_estimated_completion_2.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_2[i].date_for_estimated_completion_2
        }
        taskManagerDatas['hierarchy'] = 2
        if (this.firsttask == true) {
          taskManagerDatas['last_task'] = this.firsttid[0]
          this.taskclass['DATA_2'] = true
          firstManangerDatas['t_id'] = this.firsttid[0]
          if (firstManangerDatas['date_for_estimated_start'] == undefined) {
            firstManangerDatas['date_for_estimated_start'] = ELEMENT_DATA_2[i].date_for_estimated_start_2
          }
          firstManangerDatas['date_for_estimated_completion'] = ELEMENT_DATA_2[i].date_for_estimated_completion_2
        }
        else {
          taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
        }
        this.updatetaskDatas.task.push(taskManagerDatas)
      }
    }
    console.log(firstManangerDatas)
    if (this.firsttask == true && firstManangerDatas["t_id"]) {
      console.log("222")
      this.updatetaskDatas.task.push(firstManangerDatas)
      firstManangerDatas = {}
    }

    for (var i in ELEMENT_DATA_3) {
      if (ELEMENT_DATA_3[i].fillout) {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['t_id'] = ELEMENT_DATA_3[i].t_id
        taskManagerDatas['remark'] = ELEMENT_DATA_3[i].remark_3
        taskManagerDatas['file'] = ELEMENT_DATA_3[i].file_3
        if (ELEMENT_DATA_3[i].date_for_estimated_start_3) {
          ELEMENT_DATA_3[i].date_for_estimated_start_3.setHours(ELEMENT_DATA_3[i].date_for_estimated_start_3.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_3[i].date_for_estimated_start_3
        }
        if (ELEMENT_DATA_3[i].date_for_estimated_completion_3) {
          ELEMENT_DATA_3[i].date_for_estimated_completion_3.setHours(ELEMENT_DATA_3[i].date_for_estimated_completion_3.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_3[i].date_for_estimated_completion_3
        }
        taskManagerDatas['hierarchy'] = 2
        if (this.firsttask == true) {
          taskManagerDatas['last_task'] = this.firsttid[1]
          this.taskclass['DATA_3'] = true
          firstManangerDatas['t_id'] = this.firsttid[1]
          if (firstManangerDatas['date_for_estimated_start'] == undefined) {
            firstManangerDatas['date_for_estimated_start'] = ELEMENT_DATA_3[i].date_for_estimated_start_3
          }
          firstManangerDatas['date_for_estimated_completion'] = ELEMENT_DATA_3[i].date_for_estimated_completion_3
        }
        else {
          taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
        }
        console.log(taskManagerDatas)
        this.updatetaskDatas.task.push(taskManagerDatas)
      }
    }
    if (this.firsttask == true && firstManangerDatas["t_id"]) {
      this.updatetaskDatas.task.push(firstManangerDatas)
      firstManangerDatas = {}
    }

    for (var i in ELEMENT_DATA_4) {
      if (ELEMENT_DATA_4[i].fillout) {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['t_id'] = ELEMENT_DATA_4[i].t_id
        taskManagerDatas['quantity'] = Number(ELEMENT_DATA_4[i].quantity)
        taskManagerDatas['remark'] = ELEMENT_DATA_4[i].remark_4
        taskManagerDatas['file'] = ELEMENT_DATA_4[i].file_4
        if (ELEMENT_DATA_4[i].date_for_estimated_start_4) {
          ELEMENT_DATA_4[i].date_for_estimated_start_4.setHours(ELEMENT_DATA_4[i].date_for_estimated_start_4.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_4[i].date_for_estimated_start_4
        }
        if (ELEMENT_DATA_4[i].date_for_estimated_completion_4) {
          ELEMENT_DATA_4[i].date_for_estimated_completion_4.setHours(ELEMENT_DATA_4[i].date_for_estimated_completion_4.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_4[i].date_for_estimated_completion_4
        }
        taskManagerDatas['hierarchy'] = 2
        if (this.firsttask == true) {
          taskManagerDatas['last_task'] = this.firsttid[2]
          this.taskclass['DATA_4'] = true
          firstManangerDatas['t_id'] = this.firsttid[2]
          if (firstManangerDatas['date_for_estimated_start'] == undefined) {
            firstManangerDatas['date_for_estimated_start'] = ELEMENT_DATA_4[i].date_for_estimated_start_4
          }
          firstManangerDatas['date_for_estimated_completion'] = ELEMENT_DATA_4[i].date_for_estimated_completion_4
        }
        else {
          taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
        }
        this.updatetaskDatas.task.push(taskManagerDatas)
      }
    }
    if (this.firsttask == true && firstManangerDatas["t_id"]) {
      this.updatetaskDatas.task.push(firstManangerDatas)
      firstManangerDatas = {}
    }

    for (var i in ELEMENT_DATA_5) {
      if (ELEMENT_DATA_5[i].fillout) {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['t_id'] = ELEMENT_DATA_5[i].t_id
        taskManagerDatas['remark'] = ELEMENT_DATA_5[i].remark_5
        taskManagerDatas['file'] = ELEMENT_DATA_5[i].file_5
        if (ELEMENT_DATA_5[i].date_for_estimated_start_5) {
          ELEMENT_DATA_5[i].date_for_estimated_start_5.setHours(ELEMENT_DATA_5[i].date_for_estimated_start_5.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_start'] = ELEMENT_DATA_5[i].date_for_estimated_start_5
        }
        if (ELEMENT_DATA_5[i].date_for_estimated_completion_5) {
          ELEMENT_DATA_5[i].date_for_estimated_completion_5.setHours(ELEMENT_DATA_5[i].date_for_estimated_completion_5.getHours() + this.hrs);
          taskManagerDatas['date_for_estimated_completion'] = ELEMENT_DATA_5[i].date_for_estimated_completion_5
        }
        taskManagerDatas['hierarchy'] = 2
        if (this.firsttask == true) {
          taskManagerDatas['last_task'] = this.firsttid[3]
          this.taskclass['DATA_5'] = true
          firstManangerDatas['t_id'] = this.firsttid[3]
          if (firstManangerDatas['date_for_estimated_start'] == undefined) {
            firstManangerDatas['date_for_estimated_start'] = ELEMENT_DATA_5[i].date_for_estimated_start_5
          }
          firstManangerDatas['date_for_estimated_completion'] = ELEMENT_DATA_5[i].date_for_estimated_completion_5
        }
        else {
          taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
        }
        //this.HttpApiService.updateTaskRequest_t(ELEMENT_DATA_5[i].t_id, taskManagerDatas)
        this.updatetaskDatas.task.push(taskManagerDatas)
      }
    }
    if (this.firsttask == true && firstManangerDatas["t_id"]) {
      this.updatetaskDatas.task.push(firstManangerDatas)
      firstManangerDatas = {}
    }


    console.log(this.updatetaskDatas)
    this.HttpApiService.updatepluralTaskRequest(this.updatetaskDatas)
      .subscribe(taskRequest => {
        console.log("成功修改任務")
        console.log(taskRequest)
      })
  }

  updatetaskuserDatas: any = { "task_user": [] }
  //編輯該id之所有TaskUser資料---------------------------------------
  updateTaskUserDatas(): void {
    this.updatetaskuserDatas = { "task_user": [] }
    for (var i in ELEMENT_DATA_1) {
      if (ELEMENT_DATA_1[i].fillout) {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['tu_id'] = ELEMENT_DATA_1[i].tu_id
        taskManagerDatas['task_id'] = ELEMENT_DATA_1[i].t_id
        taskManagerDatas['user_id'] = ELEMENT_DATA_1[i].principal_1
        this.updatetaskuserDatas.task_user.push(taskManagerDatas)
      }
    }
    for (var i in ELEMENT_DATA_2) {
      if (ELEMENT_DATA_2[i].fillout) {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['tu_id'] = ELEMENT_DATA_2[i].tu_id
        taskManagerDatas['task_id'] = ELEMENT_DATA_2[i].t_id
        taskManagerDatas['user_id'] = ELEMENT_DATA_2[i].principal_2
        this.updatetaskuserDatas.task_user.push(taskManagerDatas)
      }
    }
    if (this.firsttask == true) {
      console.log(this.projectPrincipal['salesman_id'])
      let firstManangerDatas: any = {}
      firstManangerDatas['tu_id'] = this.firsttuid[0]
      firstManangerDatas['task_id'] = this.firsttid[0]
      firstManangerDatas['user_id'] = this.projectPrincipal['salesman_id']
      this.updatetaskuserDatas.task_user.push(firstManangerDatas)
    }
    for (var i in ELEMENT_DATA_3) {
      if (ELEMENT_DATA_3[i].fillout) {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['tu_id'] = ELEMENT_DATA_3[i].tu_id
        taskManagerDatas['task_id'] = ELEMENT_DATA_3[i].t_id
        taskManagerDatas['user_id'] = ELEMENT_DATA_3[i].principal_3
        this.updatetaskuserDatas.task_user.push(taskManagerDatas)
      }
    }
    if (this.firsttask == true) {
      let firstManangerDatas: any = {}
      firstManangerDatas['tu_id'] = this.firsttuid[1]
      firstManangerDatas['task_id'] = this.firsttid[1]
      firstManangerDatas['user_id'] = this.projectPrincipal['projectman_id']
      this.updatetaskuserDatas.task_user.push(firstManangerDatas)
    }

    for (var i in ELEMENT_DATA_4) {
      if (ELEMENT_DATA_4[i].fillout) {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['tu_id'] = ELEMENT_DATA_4[i].tu_id
        taskManagerDatas['task_id'] = ELEMENT_DATA_4[i].t_id
        taskManagerDatas['user_id'] = ELEMENT_DATA_4[i].principal_4
        this.updatetaskuserDatas.task_user.push(taskManagerDatas)
      }
    }
    if (this.firsttask == true) {
      let firstManangerDatas: any = {}
      firstManangerDatas['tu_id'] = this.firsttuid[2]
      firstManangerDatas['task_id'] = this.firsttid[2]
      firstManangerDatas['user_id'] = this.projectPrincipal['salesman_id']
      this.updatetaskuserDatas.task_user.push(firstManangerDatas)
    }

    for (var i in ELEMENT_DATA_5) {
      if (ELEMENT_DATA_5[i].fillout) {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['tu_id'] = ELEMENT_DATA_5[i].tu_id
        taskManagerDatas['task_id'] = ELEMENT_DATA_5[i].t_id
        taskManagerDatas['user_id'] = ELEMENT_DATA_5[i].principal_5
        this.updatetaskuserDatas.task_user.push(taskManagerDatas)
      }
    }
    console.log(this.updatetaskuserDatas)
    console.log(this.startbtn)
    this.HttpApiService.updatepluralTaskUserRequest(this.updatetaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log("成功修改負責人")
        console.log(taskuserRequest)
        if (this.startbtn == "start") {
          this.startbtn = ''
          setTimeout(() => { this.gettasklist() }, 1000);
        }
        if (this.delstart == true) {
          this.deletefirstBlackDatas()
        }
        //console.log(taskuserRequest)
      })
  }

  deletetaskDatas: any = []

  //刪除該id之所有task資料------------------------------------------------------------
  deleteTaskRequest(): void {
    this.deletetaskDatas = []
    for (var i in ELEMENT_DATA_1) {
      if (ELEMENT_DATA_1[i].t_id) {
        this.deletetaskDatas.push({ 't_id': ELEMENT_DATA_1[i].t_id })
      }
    }
    for (var i in ELEMENT_DATA_2) {
      if (ELEMENT_DATA_2[i].t_id) {
        this.deletetaskDatas.push({ 't_id': ELEMENT_DATA_2[i].t_id })
      }
    }
    for (var i in ELEMENT_DATA_3) {
      if (ELEMENT_DATA_3[i].t_id) {
        this.deletetaskDatas.push({ 't_id': ELEMENT_DATA_3[i].t_id })
      }
    }
    for (var i in ELEMENT_DATA_4) {
      if (ELEMENT_DATA_4[i].t_id) {
        this.deletetaskDatas.push({ 't_id': ELEMENT_DATA_4[i].t_id })
      }
    }
    for (var i in ELEMENT_DATA_5) {
      if (ELEMENT_DATA_5[i].t_id) {
        this.deletetaskDatas.push({ 't_id': ELEMENT_DATA_5[i].t_id })
      }
    }
    console.log(this.deletetaskDatas)
    this.HttpApiService.deletepluralTaskRequest(this.deletetaskDatas).subscribe();
  }

  deletetaskuserDatas: any = []
  //刪除該id之所有taskuser資料------------------------------------------------------------
  deleteTaskUserRequest(): void {
    this.deletetaskuserDatas = []
    for (var i in ELEMENT_DATA_1) {
      if (ELEMENT_DATA_1[i].tu_id) {
        this.deletetaskuserDatas.push({ 'tu_id': ELEMENT_DATA_1[i].tu_id })
      }
    }
    for (var i in ELEMENT_DATA_2) {
      if (ELEMENT_DATA_2[i].tu_id) {
        this.deletetaskuserDatas.push({ 'tu_id': ELEMENT_DATA_2[i].tu_id })
      }
    }
    for (var i in ELEMENT_DATA_3) {
      if (ELEMENT_DATA_3[i].tu_id) {
        this.deletetaskuserDatas.push({ 'tu_id': ELEMENT_DATA_3[i].tu_id })
      }
    }
    for (var i in ELEMENT_DATA_4) {
      if (ELEMENT_DATA_4[i].tu_id) {
        this.deletetaskuserDatas.push({ 'tu_id': ELEMENT_DATA_4[i].tu_id })
      }
    }
    for (var i in ELEMENT_DATA_5) {
      if (ELEMENT_DATA_5[i].tu_id) {
        this.deletetaskuserDatas.push({ 'tu_id': ELEMENT_DATA_5[i].tu_id })
      }
    }
    console.log(this.deletetaskuserDatas)
    this.HttpApiService.deletepluralTaskUserRequest(this.deletetaskuserDatas).subscribe();
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
        this.content = ''
        this.getPlugInDatas()
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  //刪除該id之plug_in資料---------------------------------------
  deletePlugInDatas(pi_id: string): void {
    Swal.fire({
      title: '是否確定要刪除?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.HttpApiService.deletePlugInRequest_t(pi_id).subscribe(
          res => {
            if (res.code == 200) {
              Swal.fire(
                {
                  title: `已刪除!`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  this.contentlist = []
                  this.getPlugInDatas()
                  window.location.assign(`main/projectinfo/produce-sales-meeting-edit/${this.p_id}`);
                }
              })
            } else {
              Swal.fire(
                {
                  title: `刪除失敗!`,
                  icon: 'error',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.assign(`main/projectinfo/produce-sales-meeting-edit/${this.p_id}`);
                }
              })
            }


          }
        );

      }
    })

    // if (confirm("是否確定要刪除?") == true) {

    //   alert("已刪除!");

    // } else {
    //   alert("無法刪除!");
    // }
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
        console.log(this.antivirussoftwarelist)
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


  reviewantivirussoftwarelist: any[] = []
  review = false
  //取得該id之reviewantivirus_software資料---------------------------------------
  getreviewAntivirusSoftwareDatas(): void {
    this.HttpApiService.getreviewAntivirusSoftwareRequest_t().
      subscribe(asRequest => {
        console.log(asRequest)
        let asRequestData: any = asRequest
        for (var i in asRequestData.body) {
          this.review = true
          this.reviewantivirussoftwarelist.push(asRequestData.body[i])
        }
        this.reviewantivirussoftwareSource.data = this.reviewantivirussoftwarelist;//將資料帶入
        this.totalCount = this.reviewantivirussoftwarelist.length;//計算資料長度
        this.reviewantivirussoftwareSource.sort = this.sort;
        this.reviewantivirussoftwareSource.paginator = this.paginator;
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  //修改該id之reviewantivirus_software資料---------------------------------------
  renewAntivirusSoftwareDatas(as_id: string, bonita_task_id: any): void {
    let asManagerDatas: any = {};//接收資料
    asManagerDatas['as_id'] = as_id
    asManagerDatas['status'] = true
    console.log(asManagerDatas)
    this.HttpApiService.reviewAntivirusSoftwareRequest_t(this.userJson.account, bonita_task_id, asManagerDatas).
      subscribe(asRequest => {
        console.log("成功")
        this.reviewantivirussoftwarelist = []
        this.antivirussoftwarelist = []
        this.getreviewAntivirusSoftwareDatas()
        this.getAntivirusSoftwareDatas()
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
    asManagerDatas['account'] = this.userJson.account
    console.log(asManagerDatas)
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
    // this.dialog.open(ProduceAddAppendixDialogComponent);
    this.dialog.open(FileUploadDialogComponent, {
      data: {
        documents_id: this.p_id
      }
    });
  }
  // 開啟scheduledialog
  // 新增
  addscheduleItem() {
    Swal.fire({
      text: "此功能尚未開放",
      icon: 'warning',
      //confirmButtonColor: '#3085d6',
      confirmButtonColor: '#64c270',
      confirmButtonText: '確定',
    })
    //this.dialog.open(ProduceAddScheduleDialogComponent);
  }
  //建立任務參與人員
  AddTaskUsers(isReadOnly: boolean, element: any, date_for_estimated_start: any, date_for_estimated_completion: any, principal: any, file: any, remark: any): void {
    //console.log(ELEMENT_DATA_1)
    console.log(principal)
    // if(principal != "0caaf460-ee49-44c7-80e6-62faf0e8488e"){
    //   console.log("???")
    // }
    // else{
    //   console.log("e04")
    // }
    if (element.t_id && principal && principal != "0caaf460-ee49-44c7-80e6-62faf0e8488e") {
      this.dialog.open(ProduceEditDialogComponent, {
        data: {
          t_id: element.t_id,
          taskname: element.taskname,
          isReadOnly: isReadOnly
        }
      })
    }
    else {
      if (principal && date_for_estimated_start && date_for_estimated_completion && principal != "0caaf460-ee49-44c7-80e6-62faf0e8488e") {
        this.AddOneTask(element, date_for_estimated_start, date_for_estimated_completion, principal, file, remark)
      }
      else {
        Swal.fire({
          icon: 'error',
          title: '資料填寫不完全',
          //text: 'Something went wrong!',
        })
      }
    }
  }
  onetaskDatas: any = { "task": [] }
  //新增單筆任務
  AddOneTask(element: any, date_for_estimated_start: any, date_for_estimated_completion: any, principal: any, file: any, remark: any): void {
    let taskManagerDatas: any = {};//接收資料
    taskManagerDatas['documents_id'] = this.p_id
    taskManagerDatas['t_name'] = element.taskname
    taskManagerDatas['default_date'] = 2
    taskManagerDatas['default_labor_hour'] = 2
    taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['origin_id'] = this.origin_id
    taskManagerDatas['date_for_actual_completion'] = ""
    taskManagerDatas['hierarchy'] = 1
    taskManagerDatas['remark'] = remark
    taskManagerDatas['file'] = file
    date_for_estimated_start.setHours(date_for_estimated_start.getHours() + this.hrs);
    date_for_estimated_completion.setHours(date_for_estimated_completion.getHours() + this.hrs);
    taskManagerDatas['date_for_estimated_start'] = date_for_estimated_start
    taskManagerDatas['date_for_estimated_completion'] = date_for_estimated_completion
    this.onetaskDatas.task.push(taskManagerDatas)
    this.HttpApiService.uploadpluralTaskRequest(this.onetaskDatas)
      .subscribe(taskRequest => {
        console.log("成功新增單筆任務")
        var taskidDatas: any = taskRequest
        this.AddOneTaskUser(taskidDatas.body[0], principal, element)
      })
  }
  onetaskuserDatas: any = { "task_user": [] }
  //新增單筆任務負責人
  AddOneTaskUser(t_id: any, principal: any, element: any): void {
    let taskuserManagerDatas: any = {};//接收資料
    taskuserManagerDatas['task_id'] = t_id
    taskuserManagerDatas['user_id'] = principal
    taskuserManagerDatas['principal'] = true
    this.onetaskuserDatas.task_user.push(taskuserManagerDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.onetaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log('成功新增單筆負責人')
        this.getAllTaskDatas("renew")
        this.dialog.open(ProduceEditDialogComponent, {
          data: {
            t_id: t_id,
            taskname: element.taskname
          }
        })
      }, (err: any) => {
        console.log('err:', err);
      }
      );
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
  machinecombinedSource = new MatTableDataSource();
  machinecombinedColumns: string[] = ['mc_code', 'mc_number', 'mc_finished', 'last_mc_code', 'action_edit', 'delete']

  //防毒軟體
  antivirussoftwareSource = new MatTableDataSource();
  antivirussoftwareColumns: string[] = ['as_name', 'software_number', 'machine_number', 'create_time', 'status', 'delete']
  //防毒軟體主管簽核
  reviewantivirussoftwareSource = new MatTableDataSource();
  reviewantivirussoftwareColumns: string[] = ['as_name', 'software_number', 'machine_number', 'create_time', 'status', 'review']

  //外掛部品
  pluginSource = new MatTableDataSource();
  pluginColumns: string[] = ['content', 'delete']

  //異動紀錄
  transactionSource = new MatTableDataSource();
  transactionColumns: string[] = ['create_time', 'creater_name', 'actor', 'content']

  //附贈明細(尚未開放)
  displayedColumns_7_1: string[] = ['item_number', 'product_name', 'specification', 'quantity_7'];
  dataSource_7_1 = ELEMENT_DATA_7_1;
  clickedRows_7_1 = new Set<PeriodicElement_7_1>();

  displayedColumns_7_2: string[] = ['requisiton_number', 'application_date', 'applicant', 'file_creator', 'customer', 'project_code_7', 'requisition', 'apply', 'purchase', 'state'];
  dataSource_7_2 = ELEMENT_DATA_7_2;
  clickedRows_7_2 = new Set<PeriodicElement_7_2>();


}
