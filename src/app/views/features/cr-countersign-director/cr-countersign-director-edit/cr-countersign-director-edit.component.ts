import { HttpApiService } from './../../../../api/http-api.service';
import { CustomerDemandReceipt } from './../../../../shared/models/task';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { SwalEventService } from 'src/app/api/swal-event.service';
import Swal from 'sweetalert2'
import { WorkSubmitDialogComponent } from '../../cr-countersign-director/cr-countersign-director-edit/work-submit-dialog/work-submit-dialog.component';
import { FileUploadDialogComponent } from './../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';

//import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Component({
  selector: 'app-cr-countersign-director-edit',
  templateUrl: './cr-countersign-director-edit.component.html',
  styleUrls: ['./cr-countersign-director-edit.component.scss']
})
export class CrCountersignDirectorEditComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  //@ViewChild('addDialog') addDialog!: TemplateRef<any>
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild('fileUpdateDialog') fileUpdateDialog!: TemplateRef<any>;
  //@ViewChild('taskDialog') taskDialog!: TemplateRef<any>;
  //@ViewChild('userDialog') userDialog!: TemplateRef<any>;
  @ViewChild('content', { 'static': true }) content: ElementRef;
  @ViewChild('recentlyPaginator') recentlyPaginator!: MatPaginator;
  @ViewChild('recentlySort') recentlySort!: MatSort;
  @ViewChild('interviewSortSort') interviewSortSort!: MatSort;

  receiptForm: FormGroup;
  departments: FormGroup;
  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  editRemarkForm: FormGroup;//回覆意見

  receipts?: CustomerDemandReceipt[];
  receipt?: CustomerDemandReceipt;

  // table 資料
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  countersignDataSource = new MatTableDataSource();
  recentlydataSource = new MatTableDataSource<any>();
  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();

  displayedColumn: string[] = ['status', 't_name', 'date_for_estimated_start', 'date_for_estimated_completion', 'estimate_time', 'name', 'remark', 'start_date', 'date_for_actual_completion', 'attachment', 'action_edit', 'record', 'action_detail'];
  countersignColumn: string[] = ['dep_id', 'feedback', 'create_time'];
  interviewcol: string[] = ['create_time', 'creater_name', 'content', 'remark'];
  recently10Col: string[] = ['code', 'date_for_estimated_start', 'date_for_estimated_end']

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
  recentlyCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  countersignColumnObj: any[] = [
    { cn: '部門', en: 'dep_id' },
    { cn: '內容', en: 'feedback' },
    { cn: '時間', en: 'create_time' },
  ];

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
    private SwalEvent: SwalEventService
  ) {

    this.editRemarkForm = this.fb.group({
      remark: ['', [Validators.required]],
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
  //documents_id: any;
  cd_id: any;
  bonita_task_id: any;

  ngOnInit(): void {
    this.SwalEvent.loadingAlertNoback('請稍等...', 2500)

    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    //this.documents_id = this.route.snapshot.paramMap.get('documents_id');
    this.cd_id = this.route.snapshot.paramMap.get('cd_id');
    this.bonita_task_id = this.route.snapshot.paramMap.get('bonita_task_id');

    this.setPaginator();

    //C 獲取使用者可執行的單 (會簽主管指派各部門人員(可能1人或多人))
    this.getCrReturnList_C(this.userJson.account, this.userJson.bonita_user_id);

    //取得部門
    this.getDepartmentList_cs()


    //取得all user資料
    this.getAllUserName();
    //進十筆客需單
    this.getCustomerRequests();
    //取得interview資料
    this.getInterviewRequest();

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
  addItem() {
    //const dialogRef = this.dialog.open(this.addDialog);
  }

  //取得user name
  userList: any[] = [];
  a: any[] = [];
  getAllUserName(): void {
    for (var pagenum = 1; pagenum <= 92; pagenum++) {
      this.HttpApiService.getAccountRequest_t(pagenum, 1)
        .subscribe(userRequest => {
          //console.log(userRequest)
          this.userList.push({ "id": userRequest.body.accounts[0].account_id, "name": userRequest.body.accounts[0].name })
          this.a.push({ test: pagenum, tt: pagenum })
        })
    }
  }

  CRDatas: any[] = []

  userCrReturnData_C: any
  crRerurnTotal_C: any
  //C 獲取使用者可執行的單 (會簽主管指派各部門人員(可能1人或多人))
  getCrReturnList_C(account: any, userId: any): void {
    console.log(account, userId)
    this.HttpApiService.getDispatchCrReturnList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userCrReturnData_C = res
      console.log("C筆數(會簽主管指派各部門人員(可能1人或多人))", this.userCrReturnData_C.body.length)
      this.crRerurnTotal_C = this.userCrReturnData_C.body.length
      console.log("待(會簽主管指派各部門人員(可能1人或多人))", this.userCrReturnData_C.body)

      for (let i in this.userCrReturnData_C.body) {
        if (this.cd_id == this.userCrReturnData_C.body[i].cd_id && this.bonita_task_id == this.userCrReturnData_C.body[i].bonita_task_id) {
          this.CRDatas.push(this.userCrReturnData_C.body[i])
          console.log("this.CRDatas", this.CRDatas)
        }
      }
    })
  }

  //d_id,cs_id,修改前,修改後,bonita_group_id,d_name,d_id,bonita_user_id[]
  csStatus: any[][] = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [0, 0, 0, 0, 0, 0],
    ["", "", "", "", "", ""],
    [0, 0, 0, 0, 0, 0]
  ];

  departmentData: any;
  CSdepartmentList: any;
  //取得部門
  getDepartmentList_cs(): void {
    this.HttpApiService.getDepartmentList().subscribe(res => {
      console.log('部門', res)
      this.departmentData = res.body.department

      var departmentdatas: any = res
      for (var i in departmentdatas.body.department) {
        this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "d_id": departmentdatas.body.department[i].d_id })
      }
      this.getAccountList()
      this.getA1DepartmentList()

    })
  }

  A1departmentData: any;
  //取得A1部門
  getA1DepartmentList(): void {
    this.HttpApiService.getA1DepartmentList().subscribe(res => {
      console.log('A1部門', res)
      this.A1departmentData = res.body.department
      console.log('A1部門', this.A1departmentData)
      this.getCountersignRequest();

    })
  }

  //取得user列表-------------------------------------------------------------------------
  accountControl = new FormControl();
  accountgroup: any[] = []

  account_group: any[] = []
  account_parent_group: any[] = []

  getAccountList(): void {
    this.HttpApiService.getAccountNameDepartmentList()
      .subscribe(AccountRequest => {
        console.log(AccountRequest)
        var accountdatas: any = AccountRequest
        for (var i in accountdatas.body.accounts) {

          for (var j in this.accountgroup) {

            if (this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name) {
              if (accountdatas.body.accounts[i].account_id == this.userJson.account_id) {
                this.account_group.push(this.accountgroup[j].d_id)
              }
            }
          }

        }
        console.log("accountgroup", this.accountgroup)
        console.log("account_group", this.account_group)
        this.getCountersignRequest();
      })

  }

  //會簽資料
  csDatas: any;

  CSBonitaUserID: any[] = [];

  //取得會簽
  getCountersignRequest(): void {
    this.HttpApiService.getCountersignRequest(this.cd_id).subscribe(
      csRequest => {
        this.CSdepartmentList = []
        this.csDatas = csRequest.body.countersign_user
        this.countersignDataSource = csRequest.body.countersign_user
        console.log('this.csDatas', this.csDatas)
        console.log('this.A1departmentData', this.A1departmentData)

        for (let i in this.A1departmentData) {
          let value: boolean = false
          let cs_id: any = ''
          let countersign_user: any[] = [];
          for (var j in this.csDatas) {
            if (this.csDatas[j].d_id == this.A1departmentData[i].d_id) {
              value = true
              cs_id = this.csDatas[j].cs_id
              countersign_user.push({ "name": this.csDatas[j].name })

              // console.log(this.account_group)
              // console.log(this.csDatas[j].name)
              // console.log(this.csDatas[j].d_id)
              // console.log(this.csDatas[j].parent_d_id)
              // console.log(this.A1departmentData[i].parent_name, this.A1departmentData[i].parent_d_id)

              if (this.account_group[0] == this.csDatas[j].d_id || this.account_group[1] == this.csDatas[j].d_id) {
                this.CSBonitaUserID.push(this.csDatas[j].bonita_user_id)
              }

            }
          }


          console.log(this.A1departmentData[i].Users)
          this.CSdepartmentList.push({
            "id": this.A1departmentData[i].d_id,
            "user": this.A1departmentData[i].Users,
            "name": this.A1departmentData[i].name,
            "ckecked": value,
            "cs_id": cs_id,
            "countersign_user": countersign_user
          })
        }

        console.log(this.CSBonitaUserID)

        console.log(this.CSdepartmentList)
      }
    );
  }

  //更新CR資料---------------------------------------
  updateCustomerRequest(): void {

    let customerRequestData: any = {};//接收資料

    customerRequestData['status'] = "進行中"

    //重新上傳日期
    customerRequestData['date_for_result'] = this.CRDatas[0].date_for_result;
    customerRequestData['date_for_devlop'] = this.CRDatas[0].date_for_devlop;
    customerRequestData['date_for_estimated_end'] = this.CRDatas[0].date_for_estimated_end;
    customerRequestData['date_for_estimated_start'] = this.CRDatas[0].date_for_estimated_start;
    customerRequestData['date_for_recive'] = this.CRDatas[0].date_for_recive;
    customerRequestData['date_for_actual_done'] = this.CRDatas[0].date_for_actual_done;

    console.log("customerRequestData", customerRequestData)

    this.HttpApiService.updateCustomerRequest(this.cd_id, customerRequestData).
      subscribe(CR => {
        console.log(CR);
      },
        (err: any) => {
          console.log('err:', err);
        }
      );





    //location.href = 'main/project-A/project-request';
  }


  //刪除檔案CR資料----------------------------------------------------------------

  deleteCustomerRequest(id: number): void {
    Swal.fire({
      title: '您是否確定要刪除?',
      text: "刪除後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除!',
      cancelButtonText: '取消!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.HttpApiService.deleteCustomerRequest(this.cd_id).subscribe();

        const backUrl = `main/project-A/project-request`
        location.href = backUrl;
        Swal.fire(
          {
            title: `此客需單已刪除`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        )
        location.href = 'main/project-A/project-request'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            title: '已取消',
            text: '此客需單未被刪除',
            icon: 'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
          }
        )
      }
    })

  }

  //取得簽核CountersignRequestts資料-------------------------------------------------------------

  getCountersignRequestts(): void {
    this.HttpApiService.getCountersignRequest(this.cd_id)
      .subscribe(countersignRequest => {


        //this.countersignDataSource.data = countersignRequest;//將資料帶入
        //this.countersignDataSource.sort = this.sort;
        //this.countersignDataSource.paginator = this.paginator;
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //送審按鈕
  submitA1: any = {}
  CSBonitaIdLists: any[] = [];
  submitCase(): void {


    this.CSBonitaIdLists = []
    //取得專案負責人的bonita_user_id
    for (var i in this.CSBonitaUserID) {
      if (this.CSBonitaUserID[i] != null) {
        this.CSBonitaIdLists.push(Number(this.CSBonitaUserID[i]))
      }
    }
    this.CSBonitaIdLists = this.CSBonitaIdLists.filter((item, index) => this.CSBonitaIdLists.indexOf(item) === index);
    console.log(this.CSBonitaIdLists)
    if (this.CSBonitaIdLists.length != 0) {

      if (this.editRemarkForm.valid) {

        this.submitA1['dstaff'] = this.CSBonitaIdLists

        console.log(this.submitA1)

        Swal.fire({
          title: '您確定要送交會簽流程嗎?',
          text: "送出後即不可返回!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '送出!',
          cancelButtonText: '取消!',
          confirmButtonColor: '#64c270',
          cancelButtonColor: '#FF5151',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            /*動作程式 */
            this.HttpApiService.ReviewCRForm(this.userJson.account, this.bonita_task_id, this.submitA1).subscribe(res => {
              console.log("res", res)
              //更新客需單資料庫
              this.updateCustomerRequest()
              /*新增審核紀錄 */
              this.uploadTransactionRecordRequests(this.cd_id)

            })

            Swal.fire(
              {
                title: `此客需單已審核完畢並進入會簽`,
                icon: 'success',
                confirmButtonText: '確認!',
                confirmButtonColor: '#64c270',
                reverseButtons: true
              }
            ).then((result) => {
              if (result.isConfirmed) {
                location.href = '/main/cr-countersign-director'
              }
            })

            //location.href = '/main/cr-return-director'
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire(
              {
                title: '已取消',
                text: '此客需單未被送出',
                icon: 'error',
                confirmButtonText: '確認!',
                confirmButtonColor: '#FF5151',
              }
            )
          }
        })

      } else {
        Swal.fire({
          title: '未輸入意見回覆!',
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
        }
        )
      }

    } else {

      Swal.fire(
        {
          title: '無設定會簽人員!',
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
        }
      )
    }





  }

  remark: any = '';
  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(cd_id: any): void {
    let recordData: any = {};//接收資料
    recordData['document_id'] = cd_id
    recordData['actor'] = '會簽主管指派會簽人員'
    recordData['content'] = '客需單'
    recordData['creater'] = this.userJson.account_id
    recordData['remark'] = this.remark

    this.HttpApiService.uploadTransactionRecordRequest_t(recordData)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        console.log('成功')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //取得訪問紀錄interview資料--------------------------------------------------------
  interviewRequest: any;
  interviewDatas: any;
  department_interview: any[] = []
  getInterviewRequest(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.cd_id).subscribe(res => {
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)
      this.interviewDataSource.data = this.interviewDatas
      this.interviewDataSource.sort = this.interviewSortSort
      this.interviewDataSource.paginator = this.paginator

      for (let i in this.interviewDatas) {
        if (this.interviewDatas[i].actor == '單位主管審核') {
          this.department_interview[0] = this.interviewDatas[i]
        } else if (this.interviewDatas[i].actor == '業務處副總審核') {
          this.department_interview[1] = this.interviewDatas[i]
        } else if (this.interviewDatas[i].actor == '最高主管審核') {
          this.department_interview[2] = this.interviewDatas[i]
        } else if (this.interviewDatas[i].actor == 'PM送審評估報告') {
          this.department_interview[3] = this.interviewDatas[i]
        } else if (this.interviewDatas[i].actor == '製令結案') {
          this.department_interview[4] = this.interviewDatas[i]
        }


      }
    })
  }

  //取得近十筆客需單CustomerRequest資料-------------------------------------------------------------

  getCustomerRequests(): void {
    this.HttpApiService.getCustomerRequest(1, 10)
      .subscribe(customerRequests => {
        this.recentlydataSource.data = customerRequests.body.customer_demand
        this.recentlyCount = customerRequests.body.task
        this.recentlydataSource.paginator = this.recentlyPaginator
        this.recentlydataSource.sort = this.recentlySort;
        console.log('recentlyCount', this.recentlyCount)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  taskView() {
    //const dialogRef = this.dialog.open(this.taskDialog);
  }

  userResourse() {
    //const dialogRef = this.dialog.open(this.userDialog);
  }

  fileItem() {
    //const dialogRef = this.dialog.open(this.fileUpdateDialog);
  }

  //新增會簽人員
  doPostWorkSubmit(item: any, item2: any, item3: any, item4: any, item5: any) {
    //this.data.changeMessage("Hello from Sibling")

    this.dialog.open(WorkSubmitDialogComponent, {
      data: {
        cd_id: item,
        cs_id: item2,
        d_name: item3,
        d_id: item4,
        account_id: this.userJson.account_id,
        bonita_task_id: this.bonita_task_id,
        user: item5
      }
    });
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

}

