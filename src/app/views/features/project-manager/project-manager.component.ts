import { HttpApiService } from './../../../api/http-api.service';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

interface toppinglist {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('addDialog') addDialog!: TemplateRef<any>;
  @ViewChild('add2Dialog') add2Dialog!: TemplateRef<any>;
  @ViewChild('detailDialog') detailDialog!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale
  //input value
  value = '';
  //搜尋input
  projectnamevalue = '';
  status_value = '';
  //宣告projectmanager dataSource
  B1B2DataSource = new MatTableDataSource();
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
  toppings = new FormControl();
  toppingList: toppinglist[] = [
    { value: 'type', viewValue: '類別' },
    { value: 'code', viewValue: '代號' },
    { value: 'p_name', viewValue: '名稱' },
    { value: 'customer_name', viewValue: '客戶' },
    { value: 'projectman_name', viewValue: '負責人' },
    { value: 'serviceman_name', viewValue: '客服' },
    { value: 'date_for_start', viewValue: '起始' },
    { value: 'date_for_end', viewValue: '結束' },
    { value: 'status', viewValue: '狀態' },
    { value: 'action_edit', viewValue: '編輯' },
    { value: 'action_manufactrue', viewValue: '製令' },
  ];
  selectedValue = ['status', 'type', 'code', 'p_name', 'projectman_name', 'customer_name', 'serviceman_name', 'date_for_start', 'date_for_end', 'action_edit', 'action_manufactrue'];
  //雙向綁定------------------------------------------------------------------------
  type: any = '';
  status: any = '';
  projectman_name: any = '';

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,

  ) { }

  ngOnInit(): void {
    this.getProjectManagerRequsts();
    this.setPaginator();
  }

  myControl = new FormControl();

  projectStatus_option: any[] = ['建檔中', '執行中', '審核中', '已取消', '已中止',
    '已暫停', '已結案', '出機待驗收', '已驗收待結案'];

  //計算狀態數量陣列
  status_option: any[] = [];

  //專案負責人option
  projectman_option: any[] = [];

  //專案狀態列表
  projectType_option: any[] = ['一般專案', 'Repeat Order', '正式專案', '年度專案', '修改案',
    '開發中專案', '開發案', '出機待驗收', '已驗收待結案'];

  //專案客戶option
  projectCustomer_option: any[] = [];

  //專案代號option
  projectCode_option: any[] = [];

  //專案狀態數量
  setTotal: number;
  runTotal: number;
  pendTotal: number;
  endTotal: number;
  run: number = 0;//執行中
  set: number = 0;//建檔中
  pend: number = 0;//待驗收
  end: number = 0;//已結案
  stop: number = 0;//已中止
  review: number = 0;//審核中
  pause: number = 0;//已暫停

  status_datas: any = [];//計算狀態個別數值

  //下方圖表變數設置
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: any;
  public barChartType: any = 'bar';
  public barChartLegend: boolean;
  public barChartData: any;


  //取得個別user-------------------------------------
  getAccountoneRequsts(a: string, i: any, j: any): void {
    this.HttpApiService.getAccountOneRequest_t(a).subscribe(Requests => {
      this.projectDatas[i][this.account_field[j]] = Requests.body.name
      //console.log(this.projectDatas[i][this.account_field[j]])
    })
  }
  account_field = ['customer_id', 'salesman_id', 'serviceman_id', 'projectman_id', 'creater']
  name: any[] = []

  projectManagerRequests: any;
  projectDatas: any[] = [];
  actProjectDatas: any[]; //篩選狀態過後的專題列表
  /** 
  * @brief 取得所有專案列表(all project)資料
  *
  * @return 回傳有無成功取得專案資料. */
  getProjectManagerRequsts(): void {
    //換成projectListUser

    this.HttpApiService.getProjectListRequest_t(1, 20).subscribe(projectManagerRequests => {
      //this.projectDatas = projectManagerRequests.body.project;
      console.log(this.projectDatas)

      for (let i in projectManagerRequests.body.project) {
        if (projectManagerRequests.body.project[i].status != '產銷建檔中') {
          if (projectManagerRequests.body.project[i].status == '待專案啟動') {
            projectManagerRequests.body.project[i].status = '建檔中'
            console.log(projectManagerRequests.body.project[i])
          }
          //this.actProjectDatas.push(this.projectDatas[i])
          this.projectDatas.push(projectManagerRequests.body.project[i])
          //console.log("fuck")
        }
      }
      //console.log(this.actProjectDatas)

      this.showData(this.projectDatas)
      //console.log(this.projectDatas)
      //console.log(this.projectDatas)
      //將負責人姓名存進projectman_option
      for (let i in this.projectDatas) {
        //console.log(`專案負責人有${this.projectDatas[i].projectman_name}`)
        this.projectman_option.push(this.projectDatas[i].projectman_name)
        this.projectman_option = [...new Set(this.projectman_option)]
        this.status_option.push(this.projectDatas[i].status)
        this.projectCustomer_option.push(this.projectDatas[i].customer_name)
        this.projectCustomer_option = [...new Set(this.projectCustomer_option)]
        this.projectCode_option.push(this.projectDatas[i].code)
      }
      //console.log("負責人陣列",this.projectman_option)
      //console.log("狀態陣列",this.status_option)
      //console.log("客戶陣列",this.projectCustomer_option)
      //console.log("專案代號陣列",this.projectCode_option)
      for (let i in this.status_option) {
        //console.log(this.status_option[i].text)

        if (this.status_option[i] == "執行中") {
          this.run += 1;//計算執行中幾次
        }
        if (this.status_option[i] == "建檔中") {
          this.set += 1;//執行建檔中幾次
        }
        if (this.status_option[i] == "待驗收") {
          this.pend += 1;//執行建檔中幾次
          if (this.pend < 1) {
            this.pend = 0;
          }
        }
        if (this.status_option[i] == "已結案") {
          this.end += 1;//執行建檔中幾次
        }
        if (this.status_option[i] == "已中止") {
          this.stop += 1;//執行建檔中幾次
        }
        if (this.status_option[i] == "審核中") {
          this.review += 1;//執行建檔中幾次
        }
        if (this.status_option[i] == "已暫停") {
          this.pause += 1;//執行建檔中幾次
        }
      }
      this.status_datas = [this.run, this.review, this.pend, this.end, this.set, this.stop, this.pause]
      //console.log(this.status_datas)
      this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      this.barChartLabels = ['執行中', '審核中', '待驗收', '已結案', '建檔中', '已中止', '已暫停', '已取消', '填寫中'];
      this.barChartType = 'bar';
      this.barChartLegend = true;
      this.barChartData = [
        { data: this.status_datas, label: '專案件數' }
      ];
    },
      (err: any) => {
        console.log('err:', err);
      }
    );
  }
  account_id: string
  // 顯示資料
  showData(data: any) {
    this.B1B2DataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.B1B2DataSource.sort = this.sort;
    this.B1B2DataSource.paginator = this.paginator;
    //console.log(this.B1B2DataSource.data)
    //console.log(this.paginator)

    // this.account_id = "d65f3750-07cc-4f46-a62c-b2eb374ed8be"
    // this.HttpApiService.getAccountOneRequest_t(this.account_id)
    // .subscribe(Requests => {       
    //   console.log(Requests.body.name) 
    // }
    // )

  }

  /** 
  * @brief 搜尋特定欄位
  *
  * @param event 事件觸發 */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.B1B2DataSource.filter = filterValue.trim().toLowerCase();
  }

  // applyFilter2(event: Event) {
  //   const filterValue = (event.target as HTMLOptionElement).value;
  //   this.B1B2DataSource.filter = filterValue.trim().toLowerCase();
  // }


  // selected: number = 1;
  // //select
  // selectOption(id: any) {
  //   //console.log(`選取的值為${id}`)
  //   //console.log(this.selected)
  // }

  //搜尋特定欄位
  setupFilter() {
    this.B1B2DataSource.filterPredicate = (data: any, filter: string): boolean =>
      data.customer_name
        .trim()
        .toLocaleLowerCase()
        .indexOf(filter) !== -1;
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

  // 開啟dialog

  // 跳轉至編輯頁面
  editProjectPage(p_id: any) {

    window.location.assign('/main/projectinfo/project-manager-edit/' + p_id);
  }
  // 新增1
  addItem() {
    this.dialog.open(this.addDialog, {
      data: {
        dataKey: this.projectManagerRequests
      }
    });
  }

  // 新增2
  add2Item() {
    const dialogRef = this.dialog.open(this.add2Dialog);
  }

  detailItem() {
    const dialogRef = this.dialog.open(this.detailDialog);
  }
  // 選擇單項
  editItem(item: any) {
    this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.location.assign('main/projectinfo/project-manager-edit');
  }

  //開啟製令
  addManufactureOrder(item: any) {
    this.selectedItem = item;
    window.location.assign('main/projectinfo/manufacture-order-open');
  }

  // 藉由ObjectID取得item
  getItemByObjectID(id: string) {
    if (!id) {
      return;
    }

    // return tableData.find(i => i.ParentObjectID === id);
  }

}
