import { HttpApiService } from './../../../api/http-api.service';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2'
import { FileUploadDialogComponent } from './../project-manager/project-manager-edit/file-upload-dialog/file-upload-dialog.component';

const USER_KEY = 'auth-user';

interface Account {
  account_id: string;
  name: string;
  bonita_user_id: string;
  dep_name: string;
}

interface AccountGroup {
  disabled?: boolean;
  name: string;
  account: Account[];
}

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

interface toppinglist {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-customer-demand-form',
  templateUrl: './customer-demand-form.component.html',
  styleUrls: ['./customer-demand-form.component.scss']
})
export class CustomerDemandFormComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('addDialog') addDialog!: TemplateRef<any>;
  @ViewChild('detailDialog') detailDialog!: TemplateRef<any>;
  @ViewChild('doingDialog') doingDialog!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileUpdateDialog') fileUpdateDialog!: TemplateRef<any>;

  items: MenuItem[];
  home: MenuItem;

  //搜尋input
  codeValue = '';

  /** 
  * @brief 所有客需單要顯示的欄位陣列
  *
  * @param value 客需單的 json
  * @param viewValue 客需單的 json 中文
  * */
  toppingList: toppinglist[] = [
    { value: 'status', viewValue: '狀態' },
    { value: 'code', viewValue: '單號' },
    { value: 'project_code', viewValue: '專案代號' },
    { value: 'salesman_name', viewValue: '業務' },
    { value: 'customer_name', viewValue: '客戶' },
    { value: 'demand_content', viewValue: '主旨' },
    { value: 'date_for_recive', viewValue: '客戶提出' },
    { value: 'date_for_devlop', viewValue: '預計完成' },
    { value: 'date_for_actual_done', viewValue: '實際完成' },
    { value: 'projectman_name', viewValue: 'PM' },
    // { value: 'note', viewValue: '附件' },
    // { value: 'type', viewValue: '製令管理' },
    { value: 'action_edit', viewValue: '編輯' },
    // { value: 'action_detail', viewValue: '檢視紐' },
  ];

  /** 
  * @brief 被選擇要顯示的值
  *
  * @param status 對應 toppingList 裡的 value
  * @param code 對應 toppingList 裡的 value
  * ...以此類推*/
  selectedValue = ['status', 'code', 'project_code', 'salesman_name', 'customer_name', 'demand_content', 'date_for_recive', 'date_for_devlop', 'date_for_actual_done', 'projectman_name', 'action_edit'];


  myControl = new FormControl();
  //查詢option
  code_option: any[] = [];
  projectman_option: any[] = [];
  //CRStatus_option: any[] = ['填寫中', '審核中', '結案;不承接', '已結案', '進行中', '單位主管審核中', '最高主管審核中', '結案;轉正式專案', '已取消', '退件'];
  CRStatus_option: any[] = ['填寫中', '單位主管審核', '副總審核(指定專案經理)', '最高主管審核(最後確認)', '派工中', '會簽主管(指定負責人)', '進行中', '進行中(待結案)', '結案中(最高主管)', '已結案'];

  toppings = new FormControl();
  customerRequests: any;

  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  value = '';
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
    private httpApiService: HttpApiService
  ) {

  }

  userJson: any

  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)


    this.items = [
      { label: '專案計畫管理' },
      { label: '客需單管理作業' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/main/dashboard' };

    this.getCustomerRequests(1, 20);

    //取得部門資料
    this.getDepartmentList();

    this.setPaginator();
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

  // 開啟dialog
  // 新增
  addItem() {
    const dialogRef = this.dialog.open(this.addDialog);
  }

  // 選擇單項
  editItem(item: any) {
    this.selectedItem = item;
    window.location.assign('/main/project-A/project-request-edit');
  }

  // 藉由ObjectID取得item
  getItemByObjectID(id: string) {
    if (!id) {
      return;
    }

    // return tableData.find(i => i.ParentObjectID === id);
  }

  doingItem() {
    const dialogRef = this.dialog.open(this.doingDialog);
  }

  addManufactureOrder(item: any) {
    this.selectedItem = item;
    window.location.assign('/main/project-C/project-info-manufacture-order-list');
  }


  CRData: any[] = [];
  getCustomerRequests(pageIndex: any, pageSize: any): void {
    this.httpApiService.getCustomerRequest_n(pageIndex + 1, pageSize)
      .subscribe(customerRequests => {
        console.log(customerRequests)
        this.showData(customerRequests.body.customer_demand);
        this.CRData = customerRequests.body.customer_demand

        for (let i in this.CRData) {
          this.code_option.push(this.CRData[i].code)
          this.projectman_option.push(this.CRData[i].projectman_name)
          this.projectman_option = [...new Set(this.projectman_option)]
        }
        //console.log(this.code_option)

      }
      );
  }

  doPostDetail(item: any) {
    this.dialog.open(DetailDialogComponent, {
      data: {
        c_id: item
      }
    });

    console.log(item)
  }

  fileItem() {
    const dialogRef = this.dialog.open(this.fileUpdateDialog);
  }

  CRDatas: any;
  //雙向綁定
  cd_id = ''
  code = ''
  empt: any

  addCustomerRequest(): void {

    if (this.account_group == "938b0495-ac5f-4df5-a4ae-4d138f85dff5") {
      let customerRequestData: any = {};//接收資料的陣列
      customerRequestData['code'] = this.code;
      customerRequestData['salesman_id'] = "fbe0c96a-40dc-466e-b7eb-722d71bb0bc3";
      customerRequestData['status'] = "填寫中";

      //必填UUID
      customerRequestData['customer_id'] = "00000000-0000-0000-0000-000000000000";
      customerRequestData['contact_person_id'] = "00000000-0000-0000-0000-000000000000";
      customerRequestData['machine_status_id'] = "00000000-0000-0000-0000-000000000000";
      customerRequestData['extend_type_id'] = "00000000-0000-0000-0000-000000000000";
      customerRequestData['salesman_id'] = this.userJson.account_id;
      customerRequestData['projectman_id'] = "00000000-0000-0000-0000-000000000000";
      customerRequestData['project_id'] = "00000000-0000-0000-0000-000000000000";
      customerRequestData['creater'] = this.userJson.account_id;

      const date = new Date();
      customerRequestData['date_for_recive'] = date;
      customerRequestData['date_for_estimated_start'] = date;
      customerRequestData['date_for_estimated_end'] = date;
      customerRequestData['date_for_devlop'] = date;

      console.log(customerRequestData)

      this.httpApiService.uploadCustomerDemand(customerRequestData).subscribe(
        CR => {
          console.log(CR)
          this.uploadTransactionRecordRequests(CR.body)



        }
      );
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

  //產生一筆新的transaction_record 紀錄資料格式-------------------------------------------
  uploadTransactionRecordRequests(id: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = id
    trManagerDatas['actor'] = '創建'
    trManagerDatas['content'] = '客需單'
    trManagerDatas['creater'] = this.userJson.account_id

    this.httpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        //console.log(taskuserRequest)
        console.log('成功')
        location.href = '/main/project-A/project-request-edit/' + id;
      }
      );
  }

  // 開啟appendixdialog
  // 新增
  addappendixItem() {
    // this.dialog.open(ProduceAddAppendixDialogComponent);
    this.dialog.open(FileUploadDialogComponent, {
      data: {
        documents_id: this.cd_id
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
