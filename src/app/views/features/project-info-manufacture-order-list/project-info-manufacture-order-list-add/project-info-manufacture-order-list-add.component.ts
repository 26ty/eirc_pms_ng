import { HttpApiService } from './../../../../api/http-api.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { recordData } from './../../../../shared/data/record-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Component({
  selector: 'app-project-info-manufacture-order-list-add',
  templateUrl: './project-info-manufacture-order-list-add.component.html',
  styleUrls: ['./project-info-manufacture-order-list-add.component.scss']
})
export class ProjectInfoManufactureOrderListAddComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  //雙向綁定
  m_id = ''
  customer_id = ''
  order_name = ''
  amount = ''
  shipment_location = ''
  open_date = ''
  close_date = ''
  except_shipment_day = ''
  sales_assistant = ''
  recipient = ''
  contact_person = ''
  remark = ''
  create_time = ''
  project_id = ''
  copy = ''
  status = ''
  creater = ''

  receiptForm: FormGroup;
  campaignOne: FormGroup;
  campaignTwo: FormGroup;

  // table 資料
  dataSource = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();

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


  displayedColumnsObj3: any[] = [
    { cn: '時間', en: 'record_date' },
    { cn: '部門', en: 'department' },
    { cn: '內容', en: 'record_content' },
  ];

  displayedColumns3!: string[];

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private location: Location,
  ) {

    this.receiptForm = this.fb.group({
      m_id: ['', [Validators.required]],
      customer_id: ['', [Validators.required]],
      order_name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      shipment_location: ['', [Validators.required]],
      open_date: ['', [Validators.required, Validators.minLength(9)]],
      close_date: ['', [Validators.required]],
      except_shipment_day: ['', [Validators.required]],
      sales_assistant: ['', [Validators.required]],
      recipient: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      create_time: ['', [Validators.required]],
      project_id: ['', [Validators.required]],
      copy: ['', [Validators.required]],
      status: ['', [Validators.required]],
      creater: ['', [Validators.required]],
    }
    );

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
    this.displayedColumns3 = this.displayedColumnsObj3.map(i => i.en);
  }

  // 選擇月份時關閉
  closeDatePicker(elem: MatDatepicker<any>, value: any) {
    this.year = value;
    elem.close();
  }

  showData3() {
    this.totalCount = recordData.length;
    this.dataSource3.data = recordData;
    this.dataSource3.paginator = this.paginator;
  }


  projectManagerRequests: any;
  projectDatas: any;//---------------取得project整張表資料
  //取得project資料---------------------------------------
  getProjectManagerRequsts(): void {
    this.HttpApiService.getProjectRequest()
      .subscribe(projectManagerRequests => {
        this.projectDatas = projectManagerRequests.result;


        console.log(this.projectDatas)


      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  empt: any

  addProjectInfoManufacture(): void {

    let projectInfoManufactureData: any = {};//接收資料的陣列
    projectInfoManufactureData['customer_id'] = parseInt(this.customer_id);
    projectInfoManufactureData['order_name'] = this.order_name;
    projectInfoManufactureData['amount'] = this.amount;
    projectInfoManufactureData['shipment_location'] = this.shipment_location;
    projectInfoManufactureData['open_date'] = "0001-01-01T00:00:00Z";
    projectInfoManufactureData['close_date'] = "0001-01-01T00:00:00Z";
    projectInfoManufactureData['except_shipment_day'] = "0001-01-01T00:00:00Z";
    projectInfoManufactureData['sales_assistant'] = "";
    projectInfoManufactureData['recipient'] = "";
    projectInfoManufactureData['contact_person'] = ""
    projectInfoManufactureData['remarks'] = this.remark;
    projectInfoManufactureData['create_time'] = "0001-01-01T00:00:00Z";
    projectInfoManufactureData['project_id'] = 0;
    //projectInfoManufactureData['copy'] = '';
    projectInfoManufactureData['status'] = "A";
    projectInfoManufactureData['creater'] = this.userJson.account_id
    projectInfoManufactureData['customer'] = "";

    console.log(projectInfoManufactureData);//把資料console出來

    this.HttpApiService.uploadProjectInfoManufacture(projectInfoManufactureData).subscribe(
      projectManagerRequest => {
        this.empt = projectManagerRequest
        location.href = 'main/project-C/project-info-manufacture-order-list-edit/' + this.empt.body;
      },
      (err: any) => {
        console.log('err:', err);
      }
    );


  }

  //返回上一頁
  goBack(): void {
    this.location.back();
  }




}
