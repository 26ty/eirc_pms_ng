import { Position } from './../../../../admin/models/organization';
import { HttpApiService } from './../../../../api/http-api.service';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { CaseDialogComponent } from './case-dialog/case-dialog.component';
import { MeetDialogComponent } from './meet-dialog/meet-dialog.component';
import { EditMeetDialogComponent } from './edit-meet-dialog/edit-meet-dialog.component';
import { WorktimeDialogComponent } from './worktime-dialog/worktime-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { SourceDialogComponent } from './source-dialog/source-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { AddMeetDialogComponent } from './add-meet-dialog/add-meet-dialog.component';
import { HintDialogComponent } from './hint-dialog/hint-dialog.component'
//test
import { FuncService } from './../../../../func/func.service';
import { TreeNode } from 'primeng/api';
import { taskrow } from './../../../../shared/data/project-manager-data';
import { TaskItem } from './../../../../shared/models/task';
//swal
import Swal from 'sweetalert2'
//http
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SwalEventService } from 'src/app/api/swal-event.service';

//auto
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

//gantt
import { GanttDialogComponent } from './gantt-dialog/gantt-dialog.component';
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
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

export interface meet {
  m_id: number; name: string; start_date: string; end_date: string; chairman: string; attendee: string; room: string
}
//製令
export interface manufactureOrderElement {
  position: number;
  date: string;
  name: string;
}

const ELEMENT_DATA_3: manufactureOrderElement[] = [
  { position: 1, date: '20200418', name: 'Tray Exchange Boat System' },
  { position: 1, date: '202107115', name: 'Tray Exchange Boat System' },
]

@Component({
  selector: 'app-project-manager-edit',
  templateUrl: './project-manager-edit.component.html',
  styleUrls: ['./project-manager-edit.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})

export class ProjectManagerEditComponent implements OnInit {

  /*排序任務資料 */
  files1: TreeNode[];
  cols: any[];

  /*假資料*/
  displayedColumn_3: string[] = ['position', 'date', 'name']
  datasSource_3 = ELEMENT_DATA_3;

  taskrow: TaskItem[] = taskrow;
  //--------------------------------------------------------------------------

  selectedValue = ['type', 'code', 'p_name', 'projectman_id', 'customer_id', 'serviceman_id', 'date_for_start', 'date_for_end', 'status', 'action_edit', 'action_manufactrue'];

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('paginator_resoource') paginator_resource!: MatPaginator;
  @ViewChild('paginator_labor') paginator_labor!: MatPaginator;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('addDialog') addDialog!: TemplateRef<any>;
  @ViewChild('addMeetDialog') addMeetDialog!: TemplateRef<any>;
  @ViewChild('editMeetDialog') editMeetDialog!: TemplateRef<any>;
  @ViewChild('worktimeDialog') worktimeDialog!: TemplateRef<any>;
  @ViewChild('caseDialog') caseDialog!: TemplateRef<any>;
  @ViewChild('authDialog') authDialog!: TemplateRef<any>;
  @ViewChild('meetDialog') meetDialog!: TemplateRef<any>;
  @ViewChild('sourceDialog') sourceDialog!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  meetCol: string[] = ['name', 'start_date', 'end_date', 'chairman', 'room', 'action_edit', 'action_detail'];
  filescol: string[] = ['file_name', 'file_extension', 'creater_name', 'create_time'];
  interviewcol: string[] = ['create_time', 'creater_name', 'content', 'remark'];
  // 被選擇的資料
  selectedItem: any;

  totalCount!: number;

  //任務筆數總數
  tasktotalCount!: number;
  tasktotalCount2!: number;

  //任務筆數總數
  resourcetotalCount!: number;
  resourcetotalCount_test!: number;

  //任務筆數總數
  labortotalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;
  // table 資料
  //dataSource = new MatTableDataSource<any>();

  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);

  // 時間格式
  formatStr = 'YYYY-MM-d hh:mm:ss';

  // 年分
  year: any;

  //編輯project資料Form
  editProjectForm: FormGroup;

  //編輯task資料Form
  editTaskForm: FormGroup;
  //meetData: any = [];
  //meetData: any =  new MatTableDataSource();
  //宣告檔案files的dataSource
  filesDataSource = new MatTableDataSource();

  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();

  //宣告任務的dataSource
  testtaskDataSource = new MatTableDataSource();

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: any;
  public barChartType: any = 'bar';
  public barChartLegend: boolean;
  public barChartData: any;

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,
    private func: FuncService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private SwalEvent: SwalEventService
  ) {
    //宣告editPRojectForm FormControl
    this.editProjectForm = this.fb.group({
      code: new FormControl(),
      type: new FormControl(),
      p_name: new FormControl(),
      customer_id: new FormControl(),
      date_for_start: new FormControl(),
      date_for_end: new FormControl(),
      projectman_id: new FormControl(),
      serviceman_id: new FormControl(),
      salesman_id: new FormControl(),
      machine_quantity: new FormControl(),
      machine_finished_number: new FormControl(),
    });
  }

  userJson: any
  ngOnInit(): void {
    this.SwalEvent.loadingAlertNoback('請稍等...', 2500)

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    //取得此頁面url p_id
    this.p_id = this.route.snapshot.paramMap.get('p_id');
    //console.log(this.p_id)
    //宣告editPRojectForm FormControl
    this.editProjectForm = new FormGroup({
      code: new FormControl(),
      type: new FormControl(),
      p_name: new FormControl(),
      customer_id: new FormControl(),
      date_for_start: new FormControl(),
      date_for_end: new FormControl(),
      projectman_id: new FormControl(),
      serviceman_id: new FormControl(),
      salesman_id: new FormControl(),
      machine_quantity: new FormControl(),
      machine_finished_number: new FormControl(),
    })

    this.setPaginator();

    //取得單一專案(one project)資料
    this.getEditProject(this.p_id);

    //取得該專案底下所有任務(all task)資料
    this.getTaskRequsts(this.p_id);

    //取得該專案底下資源(resource)資料
    this.getResourceRequest(this.p_id);

    //取得該專案底下工時(laborhour)資料
    this.getLaborRequest(this.p_id);

    //取得該專案底下會議(meeting)資料
    this.getMeetRequsts(this.p_id);

    //取得該專案底下附件(file)資料
    this.getFilesRequest(this.p_id);

    //取得該專案底下紀錄(interview)資料
    this.getInterviewRequest(this.p_id);

    //取得all user資料
    //this.getAllUserName();

    //取得部門資料
    this.getDepartmentList()

    // //取得附件資料
    // this.getFilesRequest()

    //取得專案及任務負責人bonita_user_id 的List
    //this.getProjectBonitaUserList(this.p_id)
    //this.getTaskBonitaUserList(this.p_id)
    //console.log("startB2FormDatas",this.startB2FormDatas)

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


  //產生一筆新的transaction_record 紀錄資料格式-------------------------------------------
  // uploadTransactionRecordRequests(p_id: any, actor: any, content: any): void {
  //   let trManagerDatas: any = {};//接收資料
  //   trManagerDatas['document_id'] = p_id
  //   trManagerDatas['actor'] = actor
  //   trManagerDatas['content'] = content
  //   trManagerDatas['creater'] = this.userJson.account_id

  //   this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
  //     .subscribe(taskuserRequest => {
  //       console.log(taskuserRequest)
  //       console.log('成功')
  //     },
  //       (err: any) => {
  //         console.log('err:', err);
  //       }
  //     );
  // }

  //Project資料參數宣告--------------------------------------
  p_id: any = '';
  //雙向綁訂顯示編輯資料
  type: any = '';
  code: any = '';
  p_name: any = '';
  customer_id: any = '';
  date_for_start: any = '';
  date_for_end: any = '';
  status: any = '';
  principal: any = '';
  projectman_id: any = '';
  serviceman_id: any = '';
  salesman_id: any = '';
  date_for_pay: any = '';
  date_for_check: any = '';
  date_for_delivery: any = '';
  inner_id: any = '';
  machine_quantity: any = '';
  machine_finished_number: any = '';

  projectDatas: any;

  //取得專案負責人的bonita_id 啟動單據----------------------------
  projectBonitaUserDatas: any
  projectBonitaId: any
  startB2FormDatas: any = {};
  testJson: any
  taskBonitaIdLists: any[] = [];
  is_start_tmList: any[] = []
  /** 
  * @brief 啟動B2專案單據
  *
  * @param documentId 欲啟動之單據id(專案id)
  * @return 回傳有無成功啟動. */
  getProjectBonitaUserList(documentId: any): void {
    this.taskBonitaIdLists = []
    this.is_start_tmList = []
    //取得專案負責人的bonita_user_id
    this.HttpApiService.getProjectBonitaUserList(documentId).subscribe(userRes => {
      console.log("userRes", userRes)
      this.projectBonitaUserDatas = userRes.body.project
      console.log("projectBonitaUserDatas", this.projectBonitaUserDatas)

      // this.getTaskBonitaUserList(documentId)
      //取得任務負責人的bonita_id
      this.HttpApiService.getTaskBonitaUserList(documentId).subscribe(userRes => {

        console.log("userRes", userRes)
        this.taskBonitaUserDatas = userRes.body.task
        console.log("taskBonitaUserDatas", this.taskBonitaUserDatas)
        for (let i in this.taskBonitaUserDatas) {
          // if(this.taskBonitaUserDatas[i].principal == true){
          //   this.taskBonitaIdList.push(this.taskBonitaUserDatas[i].task_bonita_id)
          // }
          this.is_start_tmList.push(this.taskBonitaUserDatas[i].task_bonita_id)
          if (this.taskBonitaUserDatas[i].task_bonita_id != null) {
            this.taskBonitaIdLists.push(this.taskBonitaUserDatas[i].task_bonita_id)
          }

        }
        this.startB2FormDatas = {}
        console.log("is_start_tmList 有null要提醒", this.is_start_tmList)
        console.log("taskBonitaIdLists", this.taskBonitaIdLists)
        this.startB2FormDatas['account'] = this.userJson.account
        this.startB2FormDatas['pm'] = this.projectBonitaUserDatas[0].projectman_bonita_id
        this.startB2FormDatas['tm'] = this.taskBonitaIdLists
        console.log("startB2FormDatas %j", this.startB2FormDatas)
        this.testJson = JSON.stringify(this.startB2FormDatas)
        console.log("testJson", this.testJson)

        if (this.userJson.account_id != 'd65f3750-07cc-4f46-a62c-b2eb374ed8be') {
          Swal.fire(
            {
              title: `無權限啟動此專案！`,
              icon: 'error',
              confirmButtonText: '確認!',
              reverseButtons: true,
              confirmButtonColor: '#FF5151',
            }
          )
        } else {
          //確認視窗

          Swal.fire({
            title: '您是否確定要啟動專案?',
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
              this.HttpApiService.startProjectForm(documentId, this.startB2FormDatas).subscribe(res => {
                console.log(res)
                //this.uploadTransactionRecordRequests(this.p_id, '啟動', '專案')
                if (res.body == 0) {
                  this.SwalEvent.uploadTransactionRecordRequests(this.p_id, '啟動專案', '失敗', this.userJson.account_id)
                  Swal.fire({
                    title: '啟動失敗!',
                    icon: 'error',
                    text: '請確認專案任務資料完整性.',
                    cancelButtonText: '確認!',
                    confirmButtonColor: '#FF5151',
                  }
                  )
                } else {
                  this.SwalEvent.uploadTransactionRecordRequests(this.p_id, '啟動', '專案', this.userJson.account_id)
                  let projectManagerDatas: any = {};
                  projectManagerDatas['status'] = "執行中";
                  this.projectDatas.body.date_for_start.setHours(this.projectDatas.body.date_for_start.getHours() + this.hrs);
                  projectManagerDatas['date_for_start'] = this.projectDatas.body.date_for_start
                  this.projectDatas.body.date_for_end.setHours(this.projectDatas.body.date_for_end.getHours() + this.hrs);
                  projectManagerDatas['date_for_end'] = this.projectDatas.body.date_for_end
                  this.HttpApiService.updateProjectRequest_t(this.p_id, projectManagerDatas).
                    subscribe(project => {
                      console.log('修改狀態成功', project)
                      //location.href = '/main/projectinfo/project-manager'
                    },
                      (err: any) => {
                        console.log('err:', err);
                      }
                    );

                  Swal.fire(
                    {
                      title: `已啟動!`,
                      icon: 'success',
                      text: '此專案及任務已發配各階負責人.',
                      confirmButtonText: '確認!',
                      confirmButtonColor: '#64c270',
                    }
                  ).then((result) => {
                    if (result.isConfirmed) {
                      window.location.assign(`main/projectinfo/project-manager`);
                    }
                  })
                }

              })




              //location.href = '/main/pm-return'
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

      })


    })
  }

  //取得任務負責人的bonita_id----------------------------
  taskBonitaUserDatas: any
  taskBonitaIdList: any[] = [];
  getTaskBonitaUserList(documentId: any): void {

    this.HttpApiService.getTaskBonitaUserList(documentId).subscribe(userRes => {
      console.log("userRes", userRes)
      this.taskBonitaUserDatas = userRes.body.task
      console.log("taskBonitaUserDatas", this.taskBonitaUserDatas)
      for (let i in this.taskBonitaUserDatas) {
        this.taskBonitaIdList.push(this.taskBonitaUserDatas[i].task_bonita_id)
      }

      console.log("taskBonitaIdList", this.taskBonitaIdList)
    })
  }

  old_projectman: any
  old_serviceman: any
  old_salesman: any
  /** 
  * @brief 取得單一專案(one project)資料
  *
  * @param p_id 取得網址列支專案id 作為此函式之參數
  * @return 回傳有無成功取得專案資料. */
  getEditProject(p_id: any): void {
    //取得id
    // this.p_id = this.route.snapshot.paramMap.get('p_id');
    //連接api server
    this.HttpApiService.getOneProjectRequest_t(p_id).
      subscribe(project => {
        this.projectDatas = project;
        this.projectDatas.body.date_for_start = new Date(this.projectDatas.body.date_for_start)
        this.projectDatas.body.date_for_end = new Date(this.projectDatas.body.date_for_end)
        if (this.projectDatas.body.status == '待專案啟動') {
          this.projectDatas.body.status == "建檔中"
        }
        console.log(this.projectDatas.body)
        this.old_projectman = this.projectDatas.body.projectman_id
        this.old_salesman = this.projectDatas.body.salesman_id
        this.old_serviceman = this.projectDatas.body.serviceman_id
        console.log(this.old_projectman, this.old_salesman, this.old_serviceman)
        console.log(this.projectDatas.body.status)

        //取得creater name
        this.getOneUserName(this.projectDatas.body.creater)


      },
        (err: any) => {
          console.log('err:', err);
        }
      );
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
    // console.log(this.userList)
    // this.test(this.userList)

    // // console.log(typeof(this.userList))
    // console.log(this.a)
    // console.log(this.a[0])
    // for(var i in this.userList){
    //   console.log(i)
    // }
  }

  //用user id 取得user name
  getOneUserName(id: any): void {
    this.HttpApiService.getAccountOneRequest_t(id).
      subscribe(user => {
        if (id == user.body.account_id) {
          this.projectDatas.body.creater = user.body.name
        }
      }
      )
  }

  hrs = -(new Date().getTimezoneOffset() / 60)
  //狀態 建檔中 執行中 審核中 已取消 已中止 已暫停 已結案 出機待驗收 已驗收待結案
  /** 
  * @brief 更新專案(project)資料
  *
  * @param status 狀態
  * @return 回傳有無成功更新. */
  updateProject(status?: any): void {
    console.log("status", status)
    //接收資料object
    let projectManagerDatas: any = {};
    projectManagerDatas['p_id'] = this.p_id;//對照p_id
    projectManagerDatas['code'] = this.projectDatas.body.code;
    projectManagerDatas['type'] = this.projectDatas.body.type;
    projectManagerDatas['p_name'] = this.projectDatas.body.p_name;
    projectManagerDatas['customer_id'] = this.projectDatas.body.customer_id;
    this.projectDatas.body.date_for_start.setHours(this.projectDatas.body.date_for_start.getHours() + this.hrs);
    projectManagerDatas['date_for_start'] = this.projectDatas.body.date_for_start
    this.projectDatas.body.date_for_end.setHours(this.projectDatas.body.date_for_end.getHours() + this.hrs);
    projectManagerDatas['date_for_end'] = this.projectDatas.body.date_for_end
    projectManagerDatas['date_for_check'] = this.projectDatas.body.date_for_check
    projectManagerDatas['date_for_delivery'] = this.projectDatas.body.date_for_delivery
    projectManagerDatas['date_for_pay'] = this.projectDatas.body.date_for_pay
    //pm
    projectManagerDatas['projectman_id'] = this.projectDatas.body.projectman_id;
    //serviceman
    projectManagerDatas['serviceman_id'] = this.projectDatas.body.serviceman_id;
    //salesman
    projectManagerDatas['salesman_id'] = this.projectDatas.body.salesman_id;

    projectManagerDatas['inner_id'] = '0';
    projectManagerDatas['machine_quantity'] = Number(this.projectDatas.body.machine_quantity);
    projectManagerDatas['machine_finished_number'] = this.projectDatas.body.machine_finished_number;
    if (status == null) {
      projectManagerDatas['status'] = this.projectDatas.body.status
    }
    if (status == "submit") {
      projectManagerDatas['status'] = "審核中";
    }
    if (status == "save") {
      projectManagerDatas['status'] = "建檔中";
    }
    if (status == "stop") {
      projectManagerDatas['status'] = "已中止";
    }
    if (status == "end") {
      projectManagerDatas['status'] = "已結案";
    }
    if (status == "run") {
      projectManagerDatas['status'] = "執行中";
    }
    if (status == "pause") {
      projectManagerDatas['status'] = "已暫停";
    }

    console.log(projectManagerDatas)
    //連接api server
    this.HttpApiService.updateProjectRequest_t(this.p_id, projectManagerDatas).
      subscribe(project => {
        console.log("專案編輯", project)
        this.SwalEvent.uploadTransactionRecordRequests(this.p_id, '編輯', '專案', this.userJson.account_id)

        if (this.old_projectman != '00000000-0000-0000-0000-000000000000' && this.projectDatas.body.projectman_id != this.old_projectman) {
          this.editTaskRequest('專案負責', this.projectDatas.body.projectman_id)
        }

        if (this.projectDatas.body.salesman_id != this.old_salesman) {
          if (this.old_salesman == '00000000-0000-0000-0000-000000000000') {
            // 新增任務
            this.addTaskRequest(this.p_id, '業務負責', this.projectDatas.body.salesman_id)
          } else {
            this.editTaskRequest('業務負責', this.projectDatas.body.salesman_id)
          }
        }

        if (this.projectDatas.body.serviceman_id != this.old_serviceman) {
          if (this.old_serviceman == '00000000-0000-0000-0000-000000000000') {
            // 新增任務
            this.addTaskRequest(this.p_id, '客服負責', this.projectDatas.body.serviceman_id)
          } else {
            this.editTaskRequest('客服負責', this.projectDatas.body.serviceman_id)
          }
        }

        console.log("old_projectman", this.old_projectman)
        console.log("old_salesman", this.old_salesman)
        console.log("old_serviceman", this.old_serviceman)

        Swal.fire(
          {
            title: `已編輯`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.assign(`main/projectinfo/project-manager-edit/${this.p_id}`);
          }
        })

      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }


  // 新增任務 task表
  t_name: any;
  //code:any;
  principal_id: any; //主要負責人id task_user.principal = true
  last_task = "00000000-0000-0000-0000-000000000000";
  taskList = [{ "id": "00000000-0000-0000-0000-000000000000", "name": "-", "hierarchy": '0' }]

  addTaskRes: any
  addtId: any

  uploadtaskDatas: any = { "task": [] }
  uploadtaskuserDatas: any = { "task_user": [] }
  addTaskRequest(documents_id: any, t_name: any, tu_id: any): void {
    // this.projectDatas.body.date_for_start = this.projectDatas.body.date_for_start
    // this.projectDatas.body.date_for_end = this.projectDatas.body.date_for_end
    this.uploadtaskDatas = { "task": [] }
    this.uploadtaskuserDatas = { "task_user": [] }
    var hierarchy
    for (var i in this.taskList) {
      if (this.taskList[i].id == this.last_task) {
        hierarchy = Number(this.taskList[i].hierarchy) + 1
      }
    }
    let taskManagerDatas: any = {}
    taskManagerDatas['documents_id'] = documents_id
    taskManagerDatas['t_name'] = t_name
    taskManagerDatas['last_task'] = this.last_task

    this.projectDatas.body.date_for_start.setHours(this.projectDatas.body.date_for_start.getHours() + this.hrs);
    taskManagerDatas['date_for_estimated_start'] = this.projectDatas.body.date_for_start

    this.projectDatas.body.date_for_end.setHours(this.projectDatas.body.date_for_end.getHours() + this.hrs);
    taskManagerDatas['date_for_estimated_completion'] = this.projectDatas.body.date_for_end

    taskManagerDatas['origin_id'] = "1e6913f5-55be-413a-94a5-68f8cc67d5b2"// project來源
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['file'] = false
    taskManagerDatas['landmark'] = false
    taskManagerDatas['hierarchy'] = hierarchy
    console.log("taskManagerDatas", taskManagerDatas)
    this.uploadtaskDatas.task.push(taskManagerDatas)
    this.HttpApiService.uploadpluralTaskRequest(this.uploadtaskDatas).subscribe(addTaskRes => {

      this.addtId = addTaskRes//為了取得新增task的body{id}
      console.log('成功新增task', this.addtId)
      //tu
      this.uploadtaskuserDatas = { "task_user": [] }
      let taskUserDatas: any = {}
      taskUserDatas['principal'] = true //主要負責人true
      taskUserDatas['task_id'] = this.addtId.body[0] // t_id
      taskUserDatas['user_id'] = tu_id
      console.log("taskUserDatas", taskUserDatas)
      this.uploadtaskuserDatas.task_user.push(taskUserDatas)

      this.HttpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
        .subscribe(taskuserRequest => {
          console.log("成功新增task_user", taskuserRequest)
          //window.location.assign(`main/projectinfo/project-manager-edit/${pid}`);

        })
      //this.SwalService.loadingAlertbackproject('新增任務成功！..',1500,this.p_id)
    }, (err: any) => {
      console.log('err:', err)
    })
  }

  fuck: any
  //取得專案負責 客服負責 業務負責t_id
  re_tid: any
  updatetaskuserDatas: any = { "task_user": [] }
  editTaskRequest(t_name: any, user_id: any): void {
    this.HttpApiService.getTaskListUserRequest(this.p_id)
      .subscribe(res => {
        console.log(res)
        this.fuck = res.body.task
        console.log("fuck", this.fuck)
        for (let i in this.fuck) {
          if (t_name == this.fuck[i].t_name) {
            this.re_tid = this.fuck[i].tu_id
          }
        }
        console.log(this.re_tid)

        //修改task_user時間到了
        let updateTaskUser: any = {}
        updateTaskUser['tu_id'] = this.re_tid
        updateTaskUser['user_id'] = user_id
        updateTaskUser['principal'] = true
        console.log(updateTaskUser)
        this.updatetaskuserDatas.task_user.push(updateTaskUser)
        this.HttpApiService.updatepluralTaskUserRequest(this.updatetaskuserDatas)
          .subscribe(taskuserRequest => {
            console.log("任務負責人成功修改", taskuserRequest)
          })

      });
  }
  //狀態 建檔中 執行中 審核中 已取消 已中止 已暫停 已結案 出機待驗收 已驗收待結案
  //更新project資料---------------------------------------
  udStatus: any
  updateStatus(status: any, status_v: string): void {
    Swal.fire({
      title: `您是否確定要${status_v}專案?`,
      text: `${status_v}後即不可返回!`,
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
        //接收資料object
        let projectManagerDatas: any = {};
        projectManagerDatas['date_for_start'] = this.projectDatas.body.date_for_start
        projectManagerDatas['date_for_end'] = this.projectDatas.body.date_for_end
        projectManagerDatas['date_for_check'] = this.projectDatas.body.date_for_check
        projectManagerDatas['date_for_delivery'] = this.projectDatas.body.date_for_delivery
        projectManagerDatas['date_for_pay'] = this.projectDatas.body.date_for_pay
        if (status == null) {
          projectManagerDatas['status'] = this.projectDatas.body.status
        }
        if (status == "submit") {
          projectManagerDatas['status'] = "審核中";
        }
        if (status == "save") {
          projectManagerDatas['status'] = "建檔中";
        }
        if (status == "stop") {
          projectManagerDatas['status'] = "已中止";
        }
        if (status == "end") {
          projectManagerDatas['status'] = "已結案";
        }
        if (status == "run") {
          projectManagerDatas['status'] = "執行中";
        }
        if (status == "pause") {
          projectManagerDatas['status'] = "已暫停";
        }

        console.log(projectManagerDatas)
        //連接api server
        this.HttpApiService.updateProjectRequest_t(this.p_id, projectManagerDatas).
          subscribe(res => {
            console.log("專案狀態編輯", res)
            //儲存後回project manager頁面
            //location.href = '/main/projectinfo/project-manager'
            this.udStatus = res
            if (this.udStatus.code == 200) {
              this.SwalEvent.uploadTransactionRecordRequests(this.p_id, status_v, '專案', this.userJson.account_id)
              Swal.fire(
                {
                  title: `專案已${status_v}`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                  reverseButtons: true
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.assign(`main/projectinfo/project-manager-edit/${this.p_id}`);
                }
              })
            } else {
              Swal.fire(
                {
                  title: `${status_v}專案失敗`,
                  icon: 'error',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#FF5151',
                  reverseButtons: true
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.assign(`main/projectinfo/project-manager-edit/${this.p_id}`);
                }
              })
            }


          },
            (err: any) => {
              console.log('err:', err);
              Swal.fire(
                {
                  title: `${status_v}專案失敗`,
                  icon: 'error',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#FF5151',
                  reverseButtons: true
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.assign(`main/projectinfo/project-manager-edit/${this.p_id}`);
                }
              })
            }
          );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          {
            title: '已取消',
            text: '此項目未被送出',
            icon: 'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
          }
        )
      }
    })


    console.log("status", status)

  }
  //列表col DataSource參數宣告--------------------------------------

  //任務列表col
  displayedColumns_1: string[] = ['code', 't_name', 'name', 'date_for_estimated_start', 'date_for_estimated_completion', 'date_for_actual_completion', 'file', 't_id', 'action_detail', 'remark'];
  displayedColumns_2: string[] = ['name', 'date_for_estimated_start', 'date_for_estimated_completion', 'date_for_actual_completion', 'principal', 'labor_hour', 'file', 'action_edit', 'action_detail', 'remark'];


  //任務列表dataSource
  dataSource_1 = new MatTableDataSource();
  dataSource_2 = new MatTableDataSource();

  //會議table
  //宣告會議的dataSource
  meetDataSource = new MatTableDataSource();
  display_meet: string[] = ['m_name', 'name', 'date_for_start', 'time_for_start', 'time_for_end', 'room', 'action_edit', 'action_detail'];

  //已報工時col labor_hour型態換陣列 因為是累加的
  displayedColumns_laborhour: string[] = ['account_id', 'name', 'hour', 'action_detail'];

  //工時管理table
  dataSource_laborhour = new MatTableDataSource();

  //資源管理col
  displayedColumns_resource: string[] = ['account_id', 'name', 'hour', 'action_detail'];

  //資源管理table
  dataSource_resource = new MatTableDataSource();

  //task參數宣告--------------------------------------



  //任務名稱陣列
  taskname: any[] = [];
  //塞特別任務
  specialtaskname: any;
  //專案參與人員陣列
  taskprincipal: any[] = [];
  //前一任務列表
  lasttask: any[] = [];
  //編輯資料
  editTaskDatas: any;


  //請求task參數
  testtaskRequest: any;
  testtaskDatas: any;
  taskDatas: any[] = [];
  totaltask: any;
  projectAttendeeList: any[] = [] //專案參與成員
  /** 
  * @brief 取得該專案底下所有任務(all task)資料
  *
  * @param p_id 專案id
  * @return 回傳有無成功取得. */
  getTaskRequsts(p_id:any): void {
    this.HttpApiService.getTaskListUserRequest(p_id)
      .subscribe(testtaskRequest => {
        console.log(testtaskRequest)
        this.sortTask(testtaskRequest)
        this.testtaskDatas = testtaskRequest.body.task
        this.totaltask = testtaskRequest.body.total
        //this.dataSource_1.data = this.testtaskDatas
        this.showData(this.testtaskDatas)
        for (let i in this.testtaskDatas) {
          if (this.testtaskDatas[i].name != "-") {
            this.projectAttendeeList.push(this.testtaskDatas[i].name)
          }
        }
        console.log("testtaskDatas有人名的任務列表", this.testtaskDatas)
        this.dataSource_1.data = this.testtaskDatas;
        //console.log(this.taskDatas)
        //this.dataSource_1.data = this.testtaskDatas;
      });
  }

  //排序task資料--------------------------------------
  sortdatas: any = { "data": [] }
  temporary: any = []
  stringSortDatas: any
  sortTask(taskDatas: any): void {
    var taskdatas: any = taskDatas
    console.log(taskDatas)
    var hierarchy: number = 0
    for (var i = taskdatas.body.task.length - 1; i >= 0; i--) {
      if (taskdatas.body.task[i].hierarchy >= hierarchy) {
        hierarchy = Number(taskdatas.body.task[i].hierarchy)
      }
      var re = /-/gi;
      var ans = taskdatas.body.task[i].date_for_estimated_start.replace(re, '/')
      console.log(ans)
      this.temporary.push(
        {
          "data": {
            "hierarchy": taskdatas.body.task[i].hierarchy,
            "code": taskdatas.body.task[i].code,
            "t_name": taskdatas.body.task[i].t_name,
            "name": taskdatas.body.task[i].name,
            "date_for_estimated_start": taskdatas.body.task[i].date_for_estimated_start.split("T")[0].replace(re, '/'),
            "date_for_estimated_completion": taskdatas.body.task[i].date_for_estimated_completion.split("T")[0].replace(re, '/'),
            "date_for_actual_completion": taskdatas.body.task[i].date_for_actual_completion.split("T")[0].replace(re, '/'),
            "status": taskdatas.body.task[i].status,
            "remark": taskdatas.body.task[i].remark,
            "last_task": taskdatas.body.task[i].last_task,
            "t_id": taskdatas.body.task[i].t_id,
          },
          "children": [],
        },
      )
    }
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
      { field: 't_name', header: '名稱', width: '25%' },
      { field: 'name', header: '負責人', width: '13%' },
      { field: 'date_for_estimated_start', header: '預計開始', width: '13%' },
      { field: 'date_for_estimated_completion', header: '預計結束', width: '13%' },
      { field: 'date_for_actual_completion', header: '實際完成', width: '13%' },
      { field: 'status', header: '狀態', width: '10%' },
      // { field: 't_id', header: '任務描述' }
      // { field: 'size', header: '結束時間' },
      // { field: 'type', header: '實際完成日' },
      // { field: 'name', header: '任務描述' }
    ];


    this.test = [
      { id: 't_id' }
    ]

  }

  test: any[]
  // getTaskSortDatas(data:any){
  //   return this.http.get<any>(data)
  //     .toPromise()
  //     .then(res => <TreeNode[]>res.data);
  // }

  testmeetDatas: any;
  meetDatas: any[] = [];
  meet_total: any
  /** 
  * @brief 取得專案底下所有會議(meeting)資料
  *
  * @param p_id 專案id
  * @return 回傳有無成功取得. */
  getMeetRequsts(p_id:any): void {
    this.HttpApiService.getMeetingListUserRequest_t(p_id, 1)
      .subscribe(meetRequest => {
        this.testmeetDatas = meetRequest.body.meeting;

        console.log(this.testmeetDatas)
        this.meetDataSource.data = this.testmeetDatas;
        this.meet_total = this.testmeetDatas.length
      });
  }

  resourceDatas: any;
  /** 
  * @brief 取得該專案底下資源(resource)資料
  *
  * @param p_id 專案id
  * @return 回傳有無成功取得. */
  getResourceRequest(p_id: any): void {
    this.HttpApiService.getTaskListHourByUserIDRequest(p_id)
      .subscribe(resourceRequest => {
        this.resourceDatas = resourceRequest.body.task
        this.dataSource_resource.data = this.resourceDatas
        this.resourcetotalCount = this.resourceDatas.length;
        this.dataSource_resource.sort = this.sort;
        this.dataSource_resource.paginator = this.paginator_resource;
        console.log("this.resourceDatas", this.resourceDatas)
      })
  }

  //資源工時細項
  resourceDeatailData: any;
  hourDatas: any[] = []
  t_nameDatas: any[] = []
  getOneResourceRequest(documentId: any, accountId: any) {
    this.hourDatas = []
    this.t_nameDatas = []
    console.log("documentId", documentId)
    console.log("accountId", accountId)
    this.HttpApiService.getByTaskListHourDocumentsAndUserIDRequest(documentId, accountId)
      .subscribe(resourceDeatailRequest => {
        this.resourceDeatailData = resourceDeatailRequest.body.task
        console.log(this.resourceDeatailData)
        for (let i in this.resourceDeatailData) {
          this.hourDatas.push(this.resourceDeatailData[i].hour)
          this.t_nameDatas.push(this.resourceDeatailData[i].t_name)
        }
        console.log(this.hourDatas)

        this.barChartOptions = {
          scaleShowVerticalLines: false,
          responsive: true,
        };
        this.barChartLabels = this.t_nameDatas;
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
          { data: this.hourDatas, label: '已提報工時之任務' }
        ];

      })
  }

  laborDatas: any;
  taskUserList: any[] = []
  /** 
  * @brief 取得該專案工時列表
  *
  * @param id 專案id
  * @return 回傳有無成功取得. */
  getLaborRequest(id: any): void {
    this.HttpApiService.getByDocumnetIDListHourRequest(id)
      .subscribe(laborRequest => {
        this.laborDatas = laborRequest.body.task_user
        this.dataSource_laborhour.data = this.laborDatas
        this.labortotalCount = this.laborDatas.length;
        this.dataSource_laborhour.sort = this.sort;
        this.dataSource_laborhour.paginator = this.paginator_labor;
        console.log("this.laborDatas", this.laborDatas)
        for (let i in this.laborDatas) {
          console.log(this.laborDatas[i].name)
          this.taskUserList.push(this.laborDatas[i].name)
        }
      })
  }

  //工時頁面工時細項
  laborDetailDatas: any;
  laborDetailList: any[] = []
  sumLaborHour: any
  getOneLaborRequest(documentId: any, accountId: any, sumLabor: any, name: any) {
    this.laborDetailList = []
    this.sumLaborHour = ''
    this.HttpApiService.getByIDListTaskHour(documentId, accountId)
      .subscribe(laborDetailRequest => {
        this.laborDetailDatas = laborDetailRequest.body.task
        console.log(this.laborDetailDatas)
        if (sumLabor != null) {
          this.sumLaborHour = sumLabor
          for (let i in this.laborDetailDatas) {
            this.laborDetailList.push({ t_name: this.laborDetailDatas[i].t_name, hour: this.laborDetailDatas[i].hour })
          }
          console.log(this.laborDetailList)
          console.log("總計小時", this.sumLaborHour)
        } else {
          this.hintNull(name)
        }


      })
  }
  meetOneDatas: any
  meettotalCount: any;



  filesRequest: any;
  filesDatas: any;
  fileName: any = ''
  filesTotal: any
  /** 
  * @brief 取得該專案底下所有附件資料
  *
  * @param p_id 專案id
  * @return 回傳有無成功取得. */
  getFilesRequest(p_id:any): void {
    this.HttpApiService.getDocumentsFilesList(p_id).subscribe(
      res => {
        console.log("取得附件res", res.body.file)
        this.filesDataSource = res.body.file;
        this.filesTotal = res.body.total;
      }
    )
  }

  download(filename: any) {
    // var type = this.fileName.split('.')[1]
    // this.HttpApiService.download(filename).subscribe((res: any) => {
    //   var blob = new Blob([res], { type: 'application/' + type });
    //   let downloadURL = window.URL.createObjectURL(blob);
    //   let link = document.createElement('a');
    //   link.href = downloadURL;
    //   link.download = this.fileName; //瀏覽器下載時的檔案名稱
    //   link.click();
    // }, error => {
    //   console.log(error);
    // });
  }

  //刪除檔案files資料----------------------------------------------------------------
  f_id: any;
  deleteFilesRequest(id: any): void {

    if (confirm("是否確定要刪除?") == true) {
      this.HttpApiService.deleteFilesRequest(id).subscribe();

      const backUrl = `main/projectinfo/project-manager-edit/${this.p_id}`
      location.href = backUrl;
      alert("已刪除!");
    } else {
      alert("無法刪除!");
    }

  }

  interviewRequest: any;
  interviewDatas: any;
  /** 
  * @brief 取得該專案底下訪問紀錄(interview)資料
  *
  * @param fileData 專案id
  * @return 回傳有無成功取得. */
  getInterviewRequest(p_id:any): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(p_id).subscribe(res => {
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)
      this.interviewDataSource.data = this.interviewDatas
      this.interviewDataSource.sort = this.sort
      this.interviewDataSource.paginator = this.paginator
    })
  }

  //取得全部人員資料表


  // 顯示資料
  // showData(data: any) {
  //   console.log(data)
  //   this.taskDataSource.data = data;//將資料帶入
  //   this.totalCount = data.length;//計算資料長度
  //   this.taskDataSource.sort = this.sort;
  //   this.taskDataSource.paginator = this.paginator;
  // }
  // 顯示資料
  showData(data: any) {
    // for (var i in data) {
    //   if (data[i].status != "建檔中" && data[i].status != "已中止") {
    //     data[i].status = "專案已啟動"
    //   }
    // }
    this.dataSource_1.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.dataSource_1.sort = this.sort;
    this.dataSource_1.paginator = this.paginator;
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

  //取得要過濾哪些欄位 array資料  titles要過濾的欄位名稱 keyword關鍵字
  //搜尋
  getCheckIncludes(array: any, titles: string[], keyword: string) {
    // console.log(array);
    return titles.some(i => {
      return array[i].toLowerCase().includes(keyword.toLowerCase());
    });
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
    const myFormattedDate = this.pipe.transform(currentDate, this.formatStr);

    return
  }

  // 選擇月份時關閉
  closeDatePicker(elem: MatDatepicker<any>, value: any) {
    this.year = value;
    elem.close();
  }

  //開啟彈跳視窗函式--------------------------------------

  // hint labor=null 彈跳視窗
  hintNull(name: any) {
    // this.dialog.open(HintDialogComponent, {
    //   data: {
    //     name: name
    //   }
    // });
    Swal.fire(
      {
        title: '此員工目前無工時資料',
        text: name + '  還未送審工時！',
        icon: 'warning',
        confirmButtonText: '確認!',
        confirmButtonColor: '#FF5151',
      }
    )
  }

  // 回上一頁
  cancelItem() {
    window.history.back();
  }

  // 新增任務
  addItem() {
    const dialogRef = this.dialog.open(this.addDialog);
  }



  //新增任務彈跳視窗----假新增
  doPostAdd(item: any): void {
    this.dialog.open(AddDialogComponent, {
      data: {
        p_id: item
      }
    });
  }

  //編輯任務彈跳視窗
  doPostEdit(item: any): void {
    this.dialog.open(EditDialogComponent, {
      data: {
        p_id: this.p_id,
        t_id: item
      }
    });
    //console.log(item)
  }

  //任務細項
  doPostDetail(item: any, item1: any, item2: any) {
    this.dialog.open(CaseDialogComponent, {
      data: {
        name: item,
        t_id: item1,//抓任務名稱
        p_id: item2
      }
    });
  }

  //建立會議
  addMeetItem() {
    const dialogRef = this.dialog.open(this.addMeetDialog);
  }

  //建立會議
  doPostMeetAdd(item: any): void {
    this.dialog.open(AddMeetDialogComponent, {
      data: {
        p_id: item
      }
    })
  }

  //會議細項
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
        p_id: item2
      }
    });
  }

  //任務資源細項
  doPostRsource(item: any) {
    this.dialog.open(SourceDialogComponent, {
      data: {
        account_id: item
      }
    });
  }

  //工時
  worktimeItem() {
    const dialogRef = this.dialog.open(this.worktimeDialog);
  }

  //工時
  doPostWork(item: any, item2: any) {
    this.dialog.open(WorktimeDialogComponent, {
      data: {
        name: item,
        p_id: item2
      }
    });
  }

  //權限設定
  authItem() {
    const dialogRef = this.dialog.open(this.authDialog);
  }

  //附件上傳
  fileUpload() {
    this.dialog.open(FileUploadDialogComponent);
  }

  // 藉由ObjectID取得item
  getItemByObjectID(id: string) {
    if (!id) {
      return;
    }
    // return tableData.find(i => i.ParentObjectID === id);
  }

  // //甘特圖
  // ganttOpen() {
  //   this.dialog.open(GanttDialogComponent);
  // }

  /** 
  * @brief 取得任務時程，開啟甘特圖
  *
  * @param item 任務時程資料*/
  ganttOpen(item: any): void {
    this.dialog.open(GanttDialogComponent, {
      data: {
        p_id: item
      }
    });
  }


}
