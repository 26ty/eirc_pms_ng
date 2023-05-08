import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpApiService } from './../../../../api/http-api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
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

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Component({
  selector: 'app-project-template-add',
  templateUrl: './project-template-add.component.html',
  styleUrls: ['./project-template-add.component.scss']
})
export class ProjectTemplateAddComponent implements OnInit {

  addForm: FormGroup;
  displayedColumns: string[] = ['t_name', 'date_for_estimated_start', 'date_for_estimated_end', 'last_task', 'laborhour', 'principal', 'action_edit', 'action_delete'];

  pt_code: any;
  pt_name: any;
  pt_remark: any;
  creater: any = '8a0d5500-c725-4fbf-a961-e429e76b8d85'

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;


  // table 資料
  dataSource = new MatTableDataSource<any>();

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
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
  ) {
    this.addForm = this.fb.group({
      pt_code: new FormControl(),
      pt_name: new FormControl(),
      pt_remark: new FormControl()
    });
  }
  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)
    this.setPaginator();
    this.addForm = this.fb.group({
      pt_code: new FormControl(),
      pt_name: new FormControl(),
      pt_remark: new FormControl()
    });


  }

  pt_id: any;

  addProjectTemplateRequest(): void {
    let projectTemplateDatas: any = {}
    projectTemplateDatas['pt_code'] = this.pt_code;
    projectTemplateDatas['pt_name'] = this.pt_name;
    projectTemplateDatas['pt_remark'] = this.pt_remark;
    projectTemplateDatas['creater'] = this.userJson.account_id

    this.HttpApiService.uploadProjectTemplateRequest(projectTemplateDatas).subscribe(
      projectTemplateRequest => {
        console.log("新增成功", projectTemplateRequest)
        this.pt_id = projectTemplateRequest
        console.log(this.pt_id.body)

        let taskTemplateDatas: any = {}
        taskTemplateDatas['documents_id'] = this.pt_id.body;
        taskTemplateDatas['t_name'] = this.t_name;
        taskTemplateDatas['principal'] = this.principal;
        taskTemplateDatas['date_for_estimated_start'] = this.date_for_estimated_start;
        taskTemplateDatas['date_for_estimated_end'] = this.date_for_estimated_end;
        console.log(taskTemplateDatas)

        location.href = '/main/projectinfo/project-template-edit/' + this.pt_id.body
      }
    )
  }

  t_id: any;
  code: any;
  t_name: any;
  last_task: any;
  principal: any;
  date_for_estimated_start: any;
  date_for_estimated_end: any;
  date_for_end: any
  //天數
  datenum: any;
  //labor_hour
  laborhour: any;
  //StoS
  //StoF
  taskDatas: any[] = [{
    't_name': "-", 't_id': "9ba83ec0-d9de-4a53-b80d-50526c1c4239", 'date_for_estimated_start': new Date(), 'date_for_estimated_end': new Date()
  }]
  taskList: any[] = []//列表顯示
  addTaskList(): void {
    // console.log(this.taskList.length) //0
    // console.log(this.taskDatas[0].last_task) //9ba83ec0-d9de-4a53-b80d-50526c1c4239

    // for(let i in this.taskDatas){
    //   if(this.last_task == this.taskDatas[i].t_id){
    //     if(this.last_task == '9ba83ec0-d9de-4a53-b80d-50526c1c4239'){
    //       console.log(i)
    //       var date_for_start = this.taskDatas[i].date_for_estimated_start //start(new date) + 1
    //       var date_for_end = new Date()// end = start
    //       date_for_end.setDate(date_for_end.getDate() + Number(this.datenum)) // 結束日 + 輸入天數

    //       this.taskDatas.push(
    //         {
    //           //task
    //           //'task':this.taskDatas[i].task_id,
    //           'code':this.code,
    //           't_name':this.t_name,
    //           'last_task':this.t_id,//uuid
    //           'principal':this.principal,
    //           'date_for_estimated_start':date_for_start,
    //           'date_for_estimated_end':date_for_end,
    //           //labor_hour
    //           'laborhour':this.laborhour
    //         }
    //       )

    //       this.taskList.push(
    //         {
    //           //task
    //           //'task':this.taskDatas[i].task_id,
    //           'code':this.code,
    //           't_name':this.t_name,
    //           'last_task':this.last_task,//uuid
    //           'principal':this.principal,
    //           'date_for_estimated_start':date_for_start,
    //           'date_for_estimated_end':date_for_end,
    //           //labor_hour
    //           'laborhour':this.laborhour
    //         }
    //       )
    //     }else{
    //       var date_for_start_ = this.taskDatas[i].date_for_estimated_end//start=end(new date)+1
    //       var date_for_end_ = this.taskDatas[i].date_for_estimated_end// end = start
    //       date_for_end_.setDate(date_for_end_.getDate() + Number(this.datenum)) // 結束日+輸入天數

    //       this.taskList.push(
    //         {
    //           //task
    //           //'task':this.taskDatas[i].task_id,
    //           'code':this.code,
    //           't_name':this.t_name,
    //           'last_task':this.last_task,//uuid
    //           'principal':this.principal,
    //           'date_for_estimated_start':date_for_start_,
    //           'date_for_estimated_end':date_for_end_,
    //           //labor_hour
    //           'laborhour':this.laborhour
    //         }
    //       )
    //     }

    //   }
    // }
    // console.log("taskDatas",this.taskDatas)
    // console.log("taskList",this.taskList)
    // this.showData(this.taskList)
    // this.code=''
    // this.t_name=''
    // this.last_task=''
    // this.principal=''
    // this.laborhour=''
  }
  // 顯示資料
  showData(data: any) {
    this.totalCount = data.length;
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
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

  // filter 輸入關鍵字
  keyupSearch(event: any) {
    this.dataSource.filter = event.toLowerCase();
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

  cancelAdd() {
    window.location.assign('main/projectinfo/project-template');
  }
}
