import { Department } from './../../../../admin/models/organization';
import { HttpApiService } from './../../../../api/http-api.service';
import { CustomerDemandReceipt } from './../../../../shared/models/task';
import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MeetDialogComponent } from './meet-dialog/meet-dialog.component';
import { EditMeetDialogComponent } from './edit-meet-dialog/edit-meet-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddMeetDialogComponent } from './add-meet-dialog/add-meet-dialog.component';
import Swal from 'sweetalert2'
import { truncateSync } from 'fs';
import { TreeNode } from 'primeng/api';
import { SwalEventService } from 'src/app/api/swal-event.service';
import { FileUploadDialogComponent } from './../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';
import { MenuItem } from 'primeng/api';

//import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';

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

export interface PeriodicElement1 {
  name: string;
  before_id: string;
  principal: string;
  labor_hour: string;
  description: string;
  time_for_done: string;
  time_for_start: string;
}



// export interface Task {
//   code: string;
//   name: string;
//   completed: boolean;
//   cs_id: string;
//   subtasks?: Task[];
// }



const ELEMENT_DATA_1: PeriodicElement1[] = [

]

@Component({
  selector: 'app-project-request-edit',
  templateUrl: './project-request-edit.component.html',
  styleUrls: ['./project-request-edit.component.scss']
})

export class ProjectRequestEditComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('taskPaginator') taskPaginator!: MatPaginator;
  @ViewChild('recentlyPaginator') recentlyPaginator!: MatPaginator;
  @ViewChild('manufactureOrderPaginator') manufactureOrderPaginator!: MatPaginator;
  @ViewChild('meetPaginator') meetPaginator!: MatPaginator;

  @ViewChild('taskSort') taskSort!: MatSort;
  @ViewChild('recentlySort') recentlySort!: MatSort;
  @ViewChild('manufactureOrderSort') manufactureOrderSort!: MatSort;
  @ViewChild('meetSort') meetSort!: MatSort;
  @ViewChild('interviewSortSort') interviewSortSort!: MatSort;

  @ViewChild('addDialog') addDialog!: TemplateRef<any>
  @ViewChild('fileUpdateDialog') fileUpdateDialog!: TemplateRef<any>;
  @ViewChild('taskDialog') taskDialog!: TemplateRef<any>;
  @ViewChild('userDialog') userDialog!: TemplateRef<any>;
  @ViewChild('content', { 'static': true }) content: ElementRef;
  @ViewChild('addMeetDialog') addMeetDialog!: TemplateRef<any>;
  @ViewChild('editMeetDialog') editMeetDialog!: TemplateRef<any>;

  receiptForm: FormGroup;
  departments: FormGroup;
  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  closeForm: FormGroup;
  CSForm: FormGroup;

  receipts?: CustomerDemandReceipt[];
  receipt?: CustomerDemandReceipt;

  // table 資料
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  taskDataSource = new MatTableDataSource<any>();
  recentlydataSource = new MatTableDataSource<any>();
  countersignDataSource = new MatTableDataSource<any>();
  meetDataSource = new MatTableDataSource();
  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();

  displayedColumn: string[] = ['status', 't_name', 'date_for_estimated_start', 'date_for_estimated_completion', 'estimate_time', 'name', 'remark', 'start_date', 'date_for_actual_completion', 'attachment', 'action_edit'];
  countersignColumn: string[] = ['status', 'd_name', 'remark', 'date_for_completion'];
  display_meet: string[] = ['m_name', 'name', 'date_for_start', 'time_for_start', 'time_for_end', 'room', 'action_edit', 'action_detail'];
  interviewcol: string[] = ['create_time', 'creater_name', 'content', 'remark'];

  items: MenuItem[];
  home: MenuItem;

  //csStatus: any[][] = [["ae4b0b6b-2f1b-40cc-9849-8162822225d8", "d9d74cc0-54df-4938-a649-ea2ff4b48ba8", "0af3ed5b-86be-49f1-a0aa-ed517523b7fa", "5950d9ac-8a60-4d1d-965a-8b4ec57bb097", "3a9859a3-c443-42d9-be78-28f6938ce4f7", "a7b95448-9586-448a-a896-e52dfcb55ffc"], ["", "", "", "", "", ""], [false, false, false, false, false, false], [false, false, false, false, false, false]];

  // task: Task = {
  //   name: 'Indeterminate',
  //   completed: false,
  //   code: 'primary',
  //   cs_id: '',
  //   subtasks: [
  //   ],
  // };


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
  taskCount!: number;
  recentlyCount!: number;
  meettotalCount: any;

  // MatPaginator Output
  pageEvent!: PageEvent;


  // 定義table標題
  displayedColumnsObj: any[] = [
    { cn: '任務名稱', en: 't_name' },
    { cn: '開始時間', en: 'date_for_start' },
    { cn: '結束時間', en: 'date_for_end' },
    { cn: '預計工時', en: 'estimate_time' },
    { cn: '負責人', en: 'proncal' },
    { cn: '備註說明', en: 'description' },
    { cn: '開始日期', en: 'start_date' },
    { cn: '完工日期', en: 'end_date' },
    { cn: '附件', en: 'attachment' },
    { cn: '紀錄', en: 'record' },
  ];


  displayedColumnsRecently10: any[] = [
    { cn: '任務名稱', en: 'code' },
    { cn: '時程', en: 'date_for_estimated_start' },
    { cn: '時程', en: 'date_for_estimated_end' },
  ];
  displayedColumnsObj3: any[] = [
    { cn: '時間', en: 'creater_time' },
    { cn: '部門', en: 'type' },
    { cn: '內容', en: 'content' },
  ];
  countersignColumnObj: any[] = [
    { cn: '部門', en: 'd_name' },
    { cn: '內容', en: 'remark' }
  ];

  displayedColumns!: string[];
  displayedColumns2!: string[];
  displayedColumns3!: string[];

  ngAfterViewInit() {
    // 設定資料排序
    //this.dataSource.sort = this.sort;
    //this.dataSource2.sort = this.sort;
    //this.dataSource3.sort = this.sort;
    this.taskDataSource.sort = this.taskSort;
    this.recentlydataSource.sort = this.recentlySort;
    this.meetDataSource.sort = this.meetSort

    // 執行顯示資料
    setTimeout(() => {
      //this.showData();
      //this.showData2();
      //this.showData3();
    }, 0);
  }

  showData3(data: any) {
    this.totalCount = data.length;
    this.dataSource3.data = data;
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
    return titles.some(i => {
      return array[i].toLowerCase().includes(keyword.toLowerCase());
    });
  }

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private fb_close: FormBuilder,
    private location: Location,
    private matPaginatorIntl: MatPaginatorIntl,
    //private customerDemandService: CustomerDemandService
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private SwalEvent: SwalEventService
  ) {

    this.receiptForm = this.fb.group({
      date_for_recive: [''],//必填
      customer_id: [''],
      contact_person_id: ['', [Validators.required]],
      demand_content: ['', [Validators.required]],
      suitable_content: ['', [Validators.required]],
      other_content: ['', [Validators.required]],
      budget: ['', [Validators.required]],
      date_for_estimated_start: [''],//必填
      date_for_estimated_end: [''],//必填
      machine_status_id: ['', [Validators.required]],
      extend_type_id: [''],
      extend_rem: [''],
      date_for_devlop: ['', [Validators.required]],
      est_quantity: ['', [Validators.required]],
      eva_report: [''],

    });

    this.closeForm = this.fb_close.group({
      //origin_id: new FormControl(),
      project_id: [''],
      result_status: ['', [Validators.required]],//結果狀態
      date_for_result: [''],//再議日期
      result_content: [''],//結果說明
    })

    this.CSForm = new FormGroup({
      department: new FormControl(),
    })

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

    this.SwalEvent.loadingAlertNoback('請稍等...', 2500)

    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    //console.log(this.userJson)

    this.items = [
      { label: '客需單管理', routerLink: '/main/project-A/project-request' },
      { label: '客需單管理作業' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/main/dashboard' };


    //取得該id資料
    this.getEditCustomerRequest();
    //取得部門資料
    this.getDepartmentList_cs();
    // 取得所有機台
    this.getAllModel()

    //取得all user資料
    this.getAllUserName();
    //取得all task資料
    this.getTaskRequsts();
    //取得interview資料
    this.getInterviewRequest();

    //取得部門資料
    this.getDepartmentList();

    //取得會議資料
    this.getMeetRequsts();
    //取得CR資料
    this.getCustomerRequests();
    //取的所有project_code
    this.getAllProject()



    //取得紀錄資料
    //this.getLogRequests();
    //取的結案
    this.getBusinessCloseCrReturnList(this.userJson.account, this.userJson.bonita_user_id)


    this.displayedColumns = this.displayedColumnsObj.map(i => i.en);
    this.displayedColumns2 = this.displayedColumnsRecently10.map(i => i.en);
    this.displayedColumns3 = this.displayedColumnsObj3.map(i => i.en);

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

  //客需單資料
  CRDatas: any;
  //會簽資料
  CountersignDatas: any;
  //雙向綁定
  c_id: any = ''
  t_id: any = ''

  task_ids: any;


  //取得該id之CR資料---------------------------------------
  getEditCustomerRequest(): void {
    //取得id
    this.c_id = this.route.snapshot.paramMap.get('c_id');
    //server getOne
    this.HttpApiService.getOneCustomerRequest(this.c_id).
      subscribe(CR => {
        console.log(CR)
        this.CRDatas = CR;

        if (this.CRDatas.body.bonita_case_id) {
          this.CScheckbox = true
        }

        //Bonita A1獲取使用者可執行的單 (重啟單)
        if (this.CRDatas.body.bonita_case_id) {
          this.getA1BonitaCaseListStart(this.CRDatas.body.bonita_case_id)
        }

        if (this.CRDatas.body.salesman_id == this.userJson.account_id) {
          this.permission = false
          console.log(this.permission)
        }

        this.CRDatas.body.extend_type_id = this.CRDatas.body.extend_type_id.toUpperCase()

        console.log(this.CRDatas.body.extend_type_id)
      });

  }

  AllModel: any[]
  getAllModel() {
    this.HttpApiService.getAllModel().
      subscribe(res => {

        console.log(res)
        this.AllModel = res

        // console.log(this.AllModel)

      })
  }

  restart_task_id = ''
  //Bonita A1獲取使用者可執行的單 (重啟單)
  getA1BonitaCaseListStart(bonita_case_id: any): void {
    this.HttpApiService.getA1BonitaCaseListStart(this.userJson.account, bonita_case_id).
      subscribe(res => {
        //console.log('bonita重啟單', res)
        if (res.code == 200) {
          this.restart_task_id = res.body
          this.CScheckbox = false
        }

      })
  }


  //取得Log資料---------------------------------------
  getLogRequests(): void {
    this.HttpApiService.getLogRequest()
      .subscribe(logRequests => {
        this.showData3(logRequests.result);
      }
      );
  }


  /** 
  * @brief 更新客需單資料
  *
  * @param status 客需單狀態
  * @param customerRequestData 客需單資料 json
  */
  updateCustomerRequest(status: any): void {

    let customerRequestData: any = {};//接收資料
    customerRequestData['code'] = this.CRDatas.body.code;
    customerRequestData['date_for_recive'] = this.CRDatas.body.date_for_recive;
    customerRequestData['customer_id'] = this.CRDatas.body.customer_id;
    customerRequestData['contact_person_id'] = this.CRDatas.body.contact_person_id;
    customerRequestData['demand_content'] = this.CRDatas.body.demand_content;
    customerRequestData['suitable_content'] = this.CRDatas.body.suitable_content;
    customerRequestData['other_content'] = this.CRDatas.body.other_content;
    customerRequestData['budget'] = this.CRDatas.body.budget;
    //this.CRDatas.body.date_for_estimated_start.setHours(this.CRDatas.body.date_for_estimated_start.getHours() + 8) //加八小時
    customerRequestData['date_for_estimated_start'] = this.CRDatas.body.date_for_estimated_start;
    //this.CRDatas.body.date_for_estimated_end.setHours(this.CRDatas.body.date_for_estimated_end.getHours() + 8) //加八小時
    customerRequestData['date_for_estimated_end'] = this.CRDatas.body.date_for_estimated_end;
    customerRequestData['machine_status_id'] = this.CRDatas.body.machine_status_id;
    customerRequestData['extend_type_id'] = this.CRDatas.body.extend_type_id;
    customerRequestData['extend_rem'] = this.CRDatas.body.extend_rem;
    customerRequestData['date_for_devlop'] = this.CRDatas.body.date_for_devlop;
    customerRequestData['est_quantity'] = Number(this.CRDatas.body.est_quantity);
    customerRequestData['eva_report'] = this.CRDatas.body.eva_report;
    customerRequestData['status'] = status;

    if (status == '結案中(單位主管)') {

      customerRequestData['result_status'] = this.CRDatas.body.result_status;

      if (this.CRDatas.body.result_status == 'pending') {
        customerRequestData['project_id'] = "00000000-0000-0000-0000-000000000000";
        customerRequestData['date_for_result'] = this.CRDatas.body.date_for_result;
        customerRequestData['result_content'] = this.CRDatas.body.result_content;
      } else if (this.CRDatas.body.result_status == '拒絕') {
        customerRequestData['project_id'] = "00000000-0000-0000-0000-000000000000";
        customerRequestData['result_content'] = this.CRDatas.body.result_content;
        customerRequestData['date_for_result'] = this.CRDatas.body.date_for_result;
      } else if (this.CRDatas.body.result_status == '有機會發展') {
        customerRequestData['project_id'] = this.CRDatas.body.project_id;
        customerRequestData['result_content'] = "";
        customerRequestData['date_for_result'] = "0001-01-01T00:00:00Z";
      }


    }

    //重新上傳日期
    customerRequestData['date_for_actual_done'] = this.CRDatas.body.date_for_actual_done;



    //console.log("customerRequestData", customerRequestData)

    this.HttpApiService.updateCustomerRequest(this.c_id, customerRequestData).
      subscribe(CR => {
        console.log(status, CR);

        if (CR.code == 200 && status == "填寫中") {
          //更新客需單
          this.getEditCustomerRequest()
          Swal.fire({
            title: '已儲存!',
            icon: 'success',
            cancelButtonText: '確認!',
            confirmButtonColor: '#64c270'
          })


        }

      })

    //location.href = 'main/project-A/project-request';
  }

  bonita_task_id: any
  CScheckbox: boolean

  userCrReturnData: any
  crRerurnTotal: any
  //獲取使用者可執行的單 (業務結案)
  getBusinessCloseCrReturnList(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getBusinessCloseCrReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.userCrReturnData = res
      console.log("客需單待審核筆數(業務結案)", this.userCrReturnData.body.length)
      this.crRerurnTotal = this.userCrReturnData.body.length
      console.log("客需單待審核(業務結案)", this.userCrReturnData.body)

      for (let i in this.userCrReturnData.body) {
        if (this.c_id == this.userCrReturnData.body[i].cd_id) {
          this.bonita_task_id = this.userCrReturnData.body[i].bonita_task_id
          //console.log(this.bonita_task_id)
          const today = new Date();
          this.CRDatas.body.date_for_result = today
        }
      }
    })
  }

  //啟動客需單----------------------------
  projectBonitaId: any
  startA1: any = {};
  // testJson: any

  submitA1: any = {}

  /** 
  * @brief 送審
  *
  * @param documentId 此客需單 id
  * @param startA1 需傳給 bonita 資料
  */
  getCRBonitaUserList(documentId: any): void {
    //console.log(this.receiptForm)

    if (this.receiptForm.valid) { // 確認客需單已填寫完整
      //起單
      this.startA1 = {}
      this.startA1['account'] = this.userJson.account
      //console.log("startA1 %j", this.startA1)
      // this.testJson = JSON.stringify(this.startA1)
      // console.log("testJson", this.testJson)

      //確認視窗
      Swal.fire({
        title: '您確定要送交審核嗎?',
        //text: "啟動後即不可返回!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '啟動!',
        cancelButtonText: '取消!',
        confirmButtonColor: '#64c270',
        cancelButtonColor: '#FF5151',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          /*動作程式 */
          //啟動單據
          this.HttpApiService.startCRForm(documentId, this.startA1).subscribe(res => {
            //console.log(res)
            //送審任務

            for (let i in this.testtaskDatas) {
              this.submitA1['designee'] = Number(this.testtaskDatas[i].bonita_user_id)
              //console.log(this.testtaskDatas[i])
              //console.log(this.submitA1)

              // 執行顯示資料
              setTimeout(() => {
                //取得bonita_task_id
                // this.getTaskReturnList(res.body, this.submitA1)


              }, 500);

            }
            if (res.code == 200) {
              //更新客需單
              this.updateCustomerRequest('單位主管審核中')
              //新增紀錄
              this.uploadTransactionRecordRequests(this.c_id, '啟動', '客需單')
              Swal.fire({
                title: '已啟動!',
                icon: 'success',
                text: '此客需單送往單位主管.',
                cancelButtonText: '確認!',
                confirmButtonColor: '#64c270'
              }).then((result) => {
                if (result.isConfirmed) {
                  location.href = '/main/project-A/project-request'
                }
              })


            }
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: '已取消!',
            icon: 'error',
            cancelButtonText: '確認!',
            confirmButtonColor: '#FF5151',
          }

          )
        }
      })
    } else {
      Swal.fire({
        title: '啟動失敗!',
        icon: 'error',
        text: '請確認客需單資料完整性.',
        cancelButtonText: '確認!',
        confirmButtonColor: '#FF5151',
      }
      )
    }



  }

  //取得bonita_task_id
  getTaskReturnList(bonita_case_id: any, item: any): void {
    this.HttpApiService.getTaskReturnList(this.userJson.account, bonita_case_id, this.userJson.bonita_user_id).subscribe(res => {
      console.log(res)
      if (res.code == 404) {
        Swal.fire(
          {
            title: `沒有新增任務之權限`,
            icon: 'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
            reverseButtons: true
          }
        )
      }
      // this.addBonitaTask(res.body, submitA1)
      else if (this.CRDatas.body.status == '結案中(單位主管)' || this.CRDatas.body.status == '結案中(副總)' || this.CRDatas.body.status == '結案中(最高主管)' || this.CRDatas.body.status == '已結案'
        || this.CRDatas.body.status == '已結案(pending)' || this.CRDatas.body.status == '已結案(拒絕)' || this.CRDatas.body.status == '已結案(有機會發展)') {



        Swal.fire(
          {
            title: `結案之後不可新增任務`,
            icon: 'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
            reverseButtons: true
          }
        )
      } else {

        this.dialog.open(AddDialogComponent, {
          data: {
            c_id: item,
            bonita_case_id: bonita_case_id,
            account: this.userJson.account
          }
        });

      }

    }

    )
  }

  addBonitaTask(bonita_task_id: any, submitA1: any): void {
    this.HttpApiService.ReviewCRForm(this.userJson.account, bonita_task_id, submitA1).subscribe(res => {
      //console.log("res", res)

    })
  }



  //產生一筆新的transaction_record 紀錄資料格式-------------------------------------------
  uploadTransactionRecordRequests(c_id: any, actor: any, content: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = c_id
    trManagerDatas['actor'] = actor
    trManagerDatas['content'] = content
    trManagerDatas['creater'] = this.userJson.account_id

    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        //console.log(taskuserRequest)
        console.log('成功')
      }
      );
  }

  /** 
  * @brief 刪除客需單
  *
  * @param id 此客需單 id
  */
  deleteCustomerRequest(id: string): void {
    console.log(id)

    Swal.fire({
      title: '您是否確定要刪除?',
      text: "刪除後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.HttpApiService.deleteCustomerRequest(id).subscribe(Request => {
          console.log(Request)
          console.log('成功')
          if (Request.code == 200) {
            Swal.fire(
              {
                title: `此客需單已刪除`,
                icon: 'success',
                confirmButtonText: '確認!',
                confirmButtonColor: '#64c270',
                reverseButtons: true
              }
            ).then((result) => {
              if (result.isConfirmed) {
                location.href = '/main/project-A/project-request'
              }
            })
          }
        }

        );

        // const backUrl = `main/project-A/project-request`
        //location.href = backUrl;

        //location.href = 'main/project-A/project-request'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: '已取消!',
          icon: 'error',
          cancelButtonText: '確認!',
          confirmButtonColor: '#FF5151',
        }
        )
      }
    })


  }

  //d_id,cs_id,修改前,修改後
  csStatus: any[][] = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false]];

  departmentData: any;
  CSdepartmentList: any[] = [];

  //取得部門
  getDepartmentList_cs(): void {
    this.HttpApiService.getDepartmentList().subscribe(res => {
      //console.log('部門', res)
      this.departmentData = res.body.department
      this.getA1DepartmentList();

    })
  }

  A1departmentData: any;
  /** 
  * @brief 取得A1部門
  *
  * @param A1departmentData 存放有哪些須會簽部門*/
  getA1DepartmentList(): void {
    this.HttpApiService.getA1DepartmentList().subscribe(res => {
      console.log('A1部門', res)
      this.A1departmentData = res.body.department
      console.log('A1部門', this.A1departmentData)
      this.getCountersignRequest();

    })
  }

  //會簽資料
  csDatas: any;

  /** 
  * @brief 取得會簽
  *
  * @param csDatas 會簽資料
  */
  getCountersignRequest(): void {
    this.HttpApiService.getCountersignRequest(this.c_id).subscribe(
      csRequest => {
        this.CSdepartmentList = []
        this.csDatas = csRequest.body.countersign_user
        this.countersignDataSource = csRequest.body.countersign_user
        //console.log('this.csDatas', this.csDatas)

        for (let i in this.A1departmentData) {
          let value: boolean = false
          let cs_id: any = ''
          let countersign_user: any[] = []; // 存放該會簽的會簽人員
          for (var j in this.csDatas) {
            if (this.csDatas[j].d_id == this.A1departmentData[i].d_id) {
              value = true
              cs_id = this.csDatas[j].cs_id
              countersign_user.push({ "name": this.csDatas[j].name })
            }
          }
          this.CSdepartmentList.push({
            "id": this.A1departmentData[i].d_id,
            "name": this.A1departmentData[i].name,
            "ckecked": value,
            "cs_id": cs_id,
            "countersign_user": countersign_user
          })
        }

        console.log(this.CSdepartmentList)

      }
    );
  }

  //CS-checkbox改變
  updateCSComplete(id: string, cs_id: string) {
    if (cs_id != '') {
      this.deleteCountersignRequest(cs_id)
    } else {
      this.uploadCountersignRequest(id)
    }

  }

  //新增會簽
  uploadCountersignRequest(id: string) {

    let uploadCSData: any = {};//接收資料s
    uploadCSData['documents_id'] = this.c_id
    uploadCSData['department_id'] = id
    uploadCSData['creater'] = this.userJson.account_id

    console.log('uploadCSData', uploadCSData)

    this.HttpApiService.uploadCountersignRequest(uploadCSData).subscribe(
      csRequest => {
        console.log(csRequest)
        this.getCountersignRequest()
      }
    )
  }


  //刪除會簽
  deleteCountersignRequest(id: string): void {
    this.HttpApiService.deleteCountersignRequest(id).subscribe(
      csRequest => {
        console.log(csRequest)
        this.getCountersignRequest()
      }
    );
  }

  taskView(item: any, item2: any) {
    this.dialog.open(TaskDialogComponent, {
      data: {
        t_id: item,
        name: item2
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


  //請求task參數
  testtaskRequest: any;
  testtaskDatas: any;
  //取得任務all task資料--------------------------------------
  taskDatas: any[] = [];
  totaltask: any;
  getTaskRequsts(): void {
    this.HttpApiService.getTaskListUserRequest(this.c_id)
      .subscribe(testtaskRequest => {
        console.log(testtaskRequest)
        this.sortTask(testtaskRequest)
        //console.log(this.c_id)
        this.testtaskDatas = testtaskRequest.body.task
        this.taskDataSource.data = this.testtaskDatas;
        //console.log(this.testtaskDatas)
        this.taskDataSource.data = this.testtaskDatas;
        this.taskDataSource.paginator = this.taskPaginator;
      });
  }

  /*排序任務資料 */
  files1: TreeNode[];
  cols: any[];
  //排序task資料--------------------------------------

  sortdatas: any = { "data": [] }
  temporary: any = []
  stringSortDatas: any
  sortTask(taskDatas: any): void {
    var taskdatas: any = taskDatas
    //console.log(taskDatas)
    var hierarchy: number = 0
    for (var i = taskdatas.body.task.length - 1; i >= 0; i--) {
      if (taskdatas.body.task[i].hierarchy >= hierarchy) {
        hierarchy = Number(taskdatas.body.task[i].hierarchy)
      }
      this.temporary.push(
        {
          "data": {
            "hierarchy": taskdatas.body.task[i].hierarchy,
            "code": taskdatas.body.task[i].code,
            "t_name": taskdatas.body.task[i].t_name,
            "name": taskdatas.body.task[i].name,
            "date_for_estimated_start": taskdatas.body.task[i].date_for_estimated_start.split("T")[0],
            "date_for_estimated_completion": taskdatas.body.task[i].date_for_estimated_completion.split("T")[0],
            "date_for_actual_completion": taskdatas.body.task[i].date_for_actual_completion.split("T")[0],
            "status": taskdatas.body.task[i].status,
            "remark": taskdatas.body.task[i].remark,
            "last_task": taskdatas.body.task[i].last_task,
            "t_id": taskdatas.body.task[i].t_id,
          },
          "children": [],
        },
      )
    }
    console.log(this.temporary)
    for (var i = hierarchy; i > 0; i--) {
      for (var j = this.temporary.length - 1; j >= 0; j--) {
        if (this.temporary[j].data.hierarchy == i) {
          for (var x = 0; x < this.temporary.length; x++) {
            if (this.temporary[j].data.last_task == this.temporary[x].data.t_id) {
              this.temporary[x].children.push(
                this.temporary[j]
              )
            }
          }
        }
      }
    }
    for (var i: number = 0; i < this.temporary.length; i++) {
      if (this.temporary[i].data.hierarchy == 1) {
        this.sortdatas.data.push(
          this.temporary[i]
        )
      }
    }
    console.log(this.sortdatas)
    console.log(JSON.stringify(this.sortdatas, null, '\t'))
    this.stringSortDatas = JSON.stringify(this.sortdatas, null, '\t')

    //轉為treenode型態
    this.files1 = <TreeNode[]>this.sortdatas.data
    console.log(this.files1)

    this.cols = [
      // { field: 'code', header: '代號', width: '15%' },
      { field: 't_name', header: '名稱', width: '15%' },
      { field: 'name', header: '負責人', width: '15%' },
      { field: 'date_for_estimated_start', header: '預計開始', width: '15%' },
      { field: 'date_for_estimated_completion', header: '預計結束', width: '15%' },
      { field: 'date_for_actual_completion', header: '實際完成', width: '15%' },
      { field: 'status', header: '狀態', width: '15%' },
      // { field: 't_id', header: '任務描述' }
      // { field: 'size', header: '結束時間' },
      // { field: 'type', header: '實際完成日' },
      // { field: 'name', header: '任務描述' }
    ];

  }

  permission = true

  //取得近十筆客需單CustomerRequest資料-------------------------------------------------------------
  getCustomerRequests(): void {
    this.HttpApiService.getCustomerRequest(1, 10)
      .subscribe(customerRequests => {
        //console.log(customerRequests)
        this.recentlydataSource.data = customerRequests.body.customer_demand
        this.recentlyCount = customerRequests.body.task
        this.recentlydataSource.paginator = this.recentlyPaginator
        //console.log('recentlyCount', this.recentlyCount)



      }
      );
  }


  //取得任務meeting資料--------------------------------------------------
  testmeetDatas: any;
  meetDatas: any[] = [];
  getMeetRequsts(): void {
    this.HttpApiService.getMeetingListUserRequest_t(this.c_id, 1)
      .subscribe(meetRequest => {
        //console.log(meetRequest)
        this.testmeetDatas = meetRequest.body.meeting;
        for (var i in this.testmeetDatas) {
          if (this.testmeetDatas[i].documents_id == this.c_id) {
            this.meetDatas.push(this.testmeetDatas[i])
            //console.log(this.p_id,this.testmeetDatas[i].documents_id)
          }
        }

        this.meetDataSource.data = this.meetDatas;
        this.meettotalCount = meetRequest.body.total
        this.meetDataSource.paginator = this.meetPaginator;
      });
  }

  //取得訪問紀錄interview資料--------------------------------------------------------
  interviewRequest: any;
  interviewDatas: any;
  department_interview: any[] = []
  getInterviewRequest(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.c_id).subscribe(res => {
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
      //console.log(this.department_interview)
    })
  }

  //取得user列表-------------------------------------------------------------------------
  accountControl = new FormControl();
  accountgroup: AccountGroup[] = []
  getDepartmentList(): void {
    this.HttpApiService.getDepartmentList()
      .subscribe(departmentRequest => {
        var departmentdatas: any = departmentRequest
        for (var i in departmentdatas.body.department) {
          this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "account": [] })
        }
        this.getAccountList()
      })
  }

  getAccountList(): void {
    this.HttpApiService.getAccountList()
      .subscribe(AccountRequest => {
        var accountdatas: any = AccountRequest
        for (var i in accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(accountdatas.body.accounts[i])
            }
          }
        }
      })
  }

  //結案按鈕
  submitCase(): void {

    if (this.closeForm.valid) {

      let submitA1: any = { 'status': true }
      console.log(submitA1)

      Swal.fire({
        title: '您確定要送交結案嗎?',
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
          this.HttpApiService.ReviewCRForm(this.userJson.account, this.bonita_task_id, submitA1).subscribe(res => {
            console.log("res", res)

            if (res.code == 200) {

              Swal.fire({
                title: `此客需單已送出下一階段簽核`,
                icon: 'success',
                confirmButtonText: '確認!',
                confirmButtonColor: '#64c270',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  location.href = '/main/project-A/project-request'
                }
              })

              //更新客需單資料庫
              this.updateCustomerRequest('結案中(單位主管)')
              /*新增審核紀錄 */
              this.uploadTransactionRecordRequests(this.c_id, '業務結案', '客需單')
              //更新客需單
              this.getEditCustomerRequest()
            } else {
              Swal.fire(
                {
                  title: '此客需單未被送出!',
                  icon: 'error',
                  cancelButtonText: '確認!',
                  confirmButtonColor: '#FF5151',
                }
              )
            }


          })

          //location.href = '/main/cr-return-director'
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: '已取消!',
            icon: 'error',
            cancelButtonText: '確認!',
            confirmButtonColor: '#FF5151',
          }
          )
        }
      })

    } else {
      Swal.fire({
        title: '結案失敗!',
        icon: 'error',
        text: '未勾選評估後結論/後續選項',
        cancelButtonText: '確認!',
        confirmButtonColor: '#FF5151'
      }
      )
    }




  }

  //重啟按鈕
  resubmitCase(): void {
    let submitA1: any = { 'status': true }

    console.log(submitA1)

    Swal.fire({
      title: '您是否確定要重新啟單?',
      text: "重新啟單後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '重新啟單!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.HttpApiService.ReviewCRForm(this.userJson.account, this.restart_task_id, submitA1).subscribe(res => {
          console.log("res", res)

          if (res.code == 200) {
            //更新客需單資料庫
            this.updateCustomerRequest('單位主管審核中')
            /*新增審核紀錄 */
            this.uploadTransactionRecordRequests(this.c_id, '業務重新啟單', '客需單')
            Swal.fire(
              {
                title: `此客需單送往單位主管`,
                icon: 'success',
                confirmButtonText: '確認!',
                confirmButtonColor: '#64c270',
                reverseButtons: true
              }
            ).then((result) => {
              if (result.isConfirmed) {
                location.href = '/main/project-A/project-request'
              }
            })


          }



        })



        //location.href = '/main/cr-return-director'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: '已取消!',
          icon: 'error',
          cancelButtonText: '確認!',
          confirmButtonColor: '#FF5151',
        }
        )
      }
    })


  }

  codeList: any[] = [];
  request: any
  project_id: any = ''

  //取得project單號
  getAllProject(): void {
    this.HttpApiService.getProjectListRequest_t(1, 1).subscribe(projectRequest => {
      this.request = projectRequest.body.project
      //console.log('projectRequest', projectRequest)

      this.codeList.push({ "id": "00000000-0000-0000-0000-000000000000", "name": "-未指定-" })

      for (let i in this.request) {
        this.codeList.push({ "id": projectRequest.body.project[i].p_id, "name": projectRequest.body.project[i].code })

      }
      //console.log('this.projectList', this.codeList)
    })
  }



  //建立會議
  doPostMeetAdd(item: any): void {
    this.dialog.open(AddMeetDialogComponent, {
      data: {
        c_id: item
      }
    })
  }

  //顯示會議細項
  doPostMeet(item: any) {
    this.dialog.open(MeetDialogComponent, {
      data: {
        m_id: item
      }
    });
  }

  //編輯會議
  doPostMeetEdit(item: any, item2: any) {
    this.dialog.open(EditMeetDialogComponent, {
      data: {
        m_id: item,
        c_id: item2
      }
    });
  }

  /** 
  * @brief 新增任務
  *
  * @param item 此客需單 id
  * @param bonita_case_id bonita 的 case_id
  */
  addTask(item: any, bonita_case_id: any) {
    if (bonita_case_id) {
      this.getTaskReturnList(this.CRDatas.body.bonita_case_id, item)
    } else {
      Swal.fire(
        {
          title: `啟單之後才可新增任務`,
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
          reverseButtons: true
        }
      )
    }

  }


  /** 
  * @brief 編輯任務彈跳視窗
  *
  * @param item 此客需單 id
  * @param item2 要修改的任務 id
  */
  doPostEdit(item: any, item2: any): void {
    this.dialog.open(EditDialogComponent, {
      data: {
        c_id: item,//抓任務名稱
        t_id: item2
      }
    });
  }

  /** 
  * @brief 跳轉至申請單網址
  *
  * @param c_id 此客需單 id
  */
  print(): void {
    window.open('/main/print-component/' + this.c_id)
  }

  /** 
  * @brief 開啟上傳檔案 dialog
  *
  * @param documents_id 單據 id 此處放客需單 id 為 c_id
  */
  addappendixItem() {
    // this.dialog.open(ProduceAddAppendixDialogComponent);
    this.dialog.open(FileUploadDialogComponent, {
      data: {
        documents_id: this.c_id
      }
    });
  }

}

