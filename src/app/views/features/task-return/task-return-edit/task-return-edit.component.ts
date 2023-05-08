import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { WorkSubmitDialogComponent } from './work-submit-dialog/work-submit-dialog.component';
import { HttpApiService } from './../../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMeetDialogComponent } from '../../project-manager/project-manager-edit/add-meet-dialog/add-meet-dialog.component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SwalEventService } from 'src/app/api/swal-event.service';
import { InterviewDialogComponent } from './interview-dialog/interview-dialog.component';
import Swal from 'sweetalert2'
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-task-return-edit',
  templateUrl: './task-return-edit.component.html',
  styleUrls: ['./task-return-edit.component.scss']
})

export class TaskReturnEditComponent implements OnInit {

  //編輯task的Form
  editTaskForm: FormGroup;
  editTrForm: FormGroup;
  editProjectForm:FormGroup;

  projectDatas: any;
  last_taskDatas: any;
  t_index: any;
  taskDatas: any;
  lasttaskDatas: any;
  date_for_actual_completion: any
  account_field = ['customer_id', 'salesman_id', 'serviceman_id', 'projectman_id', 'creater']

  //project編輯欄位內部訂單
  inner_id:any
  //project銷貨單號
  order_number:any
  @ViewChild('workdetailDialog') workdetailDialog!: TemplateRef<any>;
  @Output() msgToSibling = new EventEmitter<any>();
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private SwalService: SwalEventService,
    //private data: DataService
  ) {
    this.editTaskForm = this.fb.group({
      //name: new FormControl(),
      date_for_estimated_completion: new FormControl(),//預計完成日
      //date_for_delivery: new FormControl(),//出機日
      date_for_actual_completion: new FormControl(),
      remark: new FormControl(),//意見回覆
      inner_id:new FormControl(),
      order_number:new FormControl()
    });

    this.editTrForm = this.fb.group({
      tr_remark: new FormControl(),
    });

    // this.editProjectForm = this.fb.group({
    //   inner_id:new FormControl()
    // });
  }

  userJson: any
  documents_id: any;
  t_id: any;
  tu_id: any;
  bonita_task_id: any;
  p_code: any;
  p_name: any;
  projectman_name: any;
  serviceman_name: any;
  date_for_start: any;
  date_for_end: any;
  ngOnInit(): void {
    /*取得使用者資訊*/
    //console.log(window.localStorage.getItem(TOKEN_KEY))
    const tokenstring = window.localStorage.getItem(TOKEN_KEY)
    console.log("token", tokenstring)

    //console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log("userJson", this.userJson)


    this.documents_id = this.route.snapshot.paramMap.get('documents_id');
    this.t_id = this.route.snapshot.paramMap.get('t_id');
    this.tu_id = this.route.snapshot.paramMap.get('tu_id');
    this.bonita_task_id = this.route.snapshot.paramMap.get('bonita_task_id');

    console.log("網址列資訊", this.documents_id, this.t_id, this.bonita_task_id)
    console.log("this.t_id", this.t_id)

    this.editTaskForm = new FormGroup({
      //name: new FormControl(),
      date_for_estimated_completion: new FormControl(),//預計完成日
      //date_for_delivery: new FormControl(),//出機日
      date_for_actual_completion: new FormControl(),
      remark: new FormControl(),//意見回覆
      inner_id:new FormControl(),
      order_number:new FormControl()
    });

    this.editTrForm = this.fb.group({
      tr_remark: new FormControl(),
    });


    //取得單一專案資料
    this.getOneProjectListData()

    //取得TM待回報專案任務列表
    this.getUserTmCaseList(this.userJson.account, this.userJson.bonita_user_id)

    //取得紀錄資料
    //this.getInterviewRequest()
  }

  test(): void {
    console.log(this.tr_remark)
  }

  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();
  interviewcol: string[] = ['create_time', 'creater_name', 'actor', 'content'];
  //取得訪問紀錄interview資料--------------------------------------------------------
  interviewRequest: any;
  interviewDatas: any;

  DepManagerReturnData: any[] = []

  //取得TM待回報專案任務資料
  userTmReturnCaseData: any
  tmCaseTotal: any
  oneTMtaskData: any[] = []

  /** 
  * @brief 取得TM待回報專案任務資料與筆數
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getUserTmCaseList(account: any, userId: any): void {
    this.HttpApiService.getUserTMCaseList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userTmReturnCaseData = res
      console.log("TM待回報專案任務筆數", this.userTmReturnCaseData.body.length)
      this.tmCaseTotal = this.userTmReturnCaseData.body.length
      console.log("TM待回報專案任務", this.userTmReturnCaseData.body)

      for (let i in this.userTmReturnCaseData.body) {
        if (this.bonita_task_id == this.userTmReturnCaseData.body[i].bonita_task_id) {
          this.oneTMtaskData.push(this.userTmReturnCaseData.body[i])
        }
      }
      console.log("取得單一帶回報專案 oneTMtaskData", this.oneTMtaskData[0].tu_id)

      if(this.oneTMtaskData[0].date_for_actual_completion == '0001-01-01T00:00:00Z'){
        this.oneTMtaskData[0].date_for_actual_completion = ''
      }
      console.log(this.oneTMtaskData[0].date_for_actual_completion)
      this.HttpApiService.getOneTransactionRecordRequest_t(this.oneTMtaskData[0].tu_id).subscribe(res => {
        this.interviewDatas = res.body.transaction_record
        console.log(this.interviewDatas)
        this.interviewDataSource.data = this.interviewDatas
        this.interviewDataSource.sort = this.sort
        this.interviewDataSource.paginator = this.paginator

        for (let i in this.interviewDatas) {
          if (this.interviewDatas[i].actor == "單位主管退回") {
            this.DepManagerReturnData.push(this.interviewDatas[i].remark)
          }
        }
        console.log('單位主管退回意見', this.DepManagerReturnData)
      })


    })
  }

  /** 
  * @brief 取得單位主管送審回覆意見
  *
  * @param t_id 專案之任務id
  * @return 回傳有無成功取得. */
  getTopManagerReturn(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.t_id).subscribe(res => {
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)

      for (let i in this.interviewDatas) {
        if (this.interviewDatas[i].actor == "單位主管退回") {
          this.DepManagerReturnData.push(this.interviewDatas[i].remark)
        }
      }
      console.log('單位主管退回意見', this.DepManagerReturnData)
    })
  }

  tr_remark: any
  /** 
  * @brief 產生一筆新的transaction_record資料格式
  *
  * @param p_id 專案id
  * @param actor 紀錄之動作
  * @param content 紀錄之行為
  * @param remark 紀錄之內容
  * @return 回傳有無成功新增. */
  uploadTransactionRecordRequests(t_id: any, actor: any, content: any, remark?: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = t_id
    trManagerDatas['actor'] = actor
    trManagerDatas['content'] = content
    trManagerDatas['remark'] = remark
    trManagerDatas['creater'] = this.userJson.account_id
    console.log("trManagerDatas", trManagerDatas)
    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        console.log('成功')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  pmRequestRes: any
  /** 
  * @brief 將單據送審
  *
  * @param p_id 專案id
  * @param account 使用者帳號
  * @param bonita_task_id Bonita任務id
  * @param modelInput 同意/退回 json檔
  * @return 回傳有無成功取得. */
  submitPmCase(): void {
    let modelInput: any = { 'modelInput': {} }
    let gmApprovalStatus: any = { 'gmApprovalStatus': true }
    modelInput['modelInput'] = gmApprovalStatus
    console.log(modelInput)
    // console.log(JSON.stringify(modelInput))
    console.log(this.tr_remark)
    console.log(this.oneTMtaskData[0].date_for_actual_completion)
    console.log(typeof(this.date_for_actual_completion))
    if (this.oneTMtaskData[0].date_for_actual_completion == null || this.oneTMtaskData[0].date_for_actual_completion == undefined || this.oneTMtaskData[0].date_for_actual_completion == '') {
      Swal.fire(
        {
          title: `實際完成日(出機日)未填寫`,
          icon: 'error',
          confirmButtonText: '確認!',
          reverseButtons: true,
          confirmButtonColor: '#FF5151'
        })
    } else {
      if (this.tr_remark == null || this.tr_remark == undefined || this.tr_remark == '') {
        Swal.fire(
          {
            title: `意見回覆未填寫`,
            icon: 'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
            reverseButtons: true
          }
        )
      } else {
        Swal.fire({
          title: '您是否確定要送審?',
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
            this.HttpApiService.PmReviewCase(this.userJson.account, this.bonita_task_id, modelInput).subscribe(res => {
              console.log("tm送審成功", res)
              this.pmRequestRes = res
              if (this.pmRequestRes.code == 200 && 204) {
                /*補上task修----------------------------------- */
                let taskDatas: any = { task: [] };
                let temporaryDatas: any = {};
                temporaryDatas['t_id'] = this.t_id;
                temporaryDatas['date_for_estimated_completion'] = this.oneTMtaskData[0].date_for_estimated_completion
                temporaryDatas['date_for_estimated_start'] = this.oneTMtaskData[0].date_for_estimated_start
                if (this.date_for_actual_completion != null) {
                  this.date_for_actual_completion.setHours(this.date_for_actual_completion.getHours() + this.hrs);
                }
                temporaryDatas['date_for_actual_completion'] = this.date_for_actual_completion

                if (this.date_for_actual_start != null) {
                  temporaryDatas['date_for_actual_start'] = this.oneTMtaskData[0].date_for_actual_start
                }

                taskDatas.task.push(temporaryDatas)
                console.log(taskDatas)
                this.HttpApiService.updatepluralTaskRequest(taskDatas).
                  subscribe(res => {
                    console.log('修改task表實際完成日成功', res)
                    //location.href = '/main/projectinfo/project-manager'
                  },
                    (err: any) => {
                      console.log('err:', err);
                    }
                  );

                // /*修改task_user狀態 */
                let taskBonitaStatus: any = {}
                taskBonitaStatus['date_for_delivery'] = new Date();
                taskBonitaStatus['status_type_id'] = 'fd69629d-acce-4f3d-a537-3c6a7afeb956'//待會簽
                console.log(taskBonitaStatus)
                this.HttpApiService.UpdateTaskUserStatus(this.tu_id, taskBonitaStatus).subscribe(res => {
                  /*新增審核紀錄 */
                  this.uploadTransactionRecordRequests(this.tu_id, 'TM送審', '專案任務', this.tr_remark)
                  console.log('修改task_user表狀態成功', res)
                  Swal.fire(
                    {
                      title: `已送審至下一階段會簽`,
                      icon: 'success',
                      confirmButtonText: '確認!',
                      confirmButtonColor: '#64c270',
                      reverseButtons: true
                    }
                  ).then((result) => {
                    if (result.isConfirmed) {
                      window.location.assign(`main/task-return`);
                    }
                  })
                })
              } else {
                /*新增審核紀錄 */
                this.uploadTransactionRecordRequests(this.tu_id, 'TM送審失敗', '專案任務', this.tr_remark)
                Swal.fire(
                  {
                    title: `送審失敗`,
                    icon: 'error',
                    confirmButtonText: '確認!',
                    confirmButtonColor: '#FF5151',
                    reverseButtons: true
                  }
                ).then((result) => {
                  if (result.isConfirmed) {
                    window.location.assign(`main/task-return`);
                  }
                })
              }

            })



            //location.href = '/main/task-return'
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
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
      }

    }


  }

  //雙向綁定
  date_for_estimated_completion: any//預計完成日
  //date_for_delivery=''//出機日
  remark: any
  
  date_for_actual_start: any
  uploadtaskDatas: any = { "task": [] }
  hrs = -(new Date().getTimezoneOffset() / 60)
  /** 
  * @brief 修改專案之任務
  *
  * @param uploadtaskDatas 欲修改專案之任務
  * @return 回傳有無成功更新. */
  updateTaskRequest(): void {
    let newTaskDatas: any = {}
    newTaskDatas['t_id'] = this.t_id
    new Date(this.oneTMtaskData[0].date_for_estimated_start).setHours(new Date(this.oneTMtaskData[0].date_for_estimated_start).getHours() + this.hrs);
    newTaskDatas['date_for_estimated_start'] = this.oneTMtaskData[0].date_for_estimated_start

    new Date(this.oneTMtaskData[0].date_for_estimated_completion).setHours(new Date(this.oneTMtaskData[0].date_for_estimated_completion).getHours() + this.hrs);
    newTaskDatas['date_for_estimated_completion'] = this.oneTMtaskData[0].date_for_estimated_completion

    new Date(this.oneTMtaskData[0].date_for_actual_completion).setHours(new Date(this.oneTMtaskData[0].date_for_actual_completion).getHours() + this.hrs);
    newTaskDatas['date_for_actual_completion'] = this.oneTMtaskData[0].date_for_actual_completion

    this.uploadtaskDatas.task.push(newTaskDatas)
    //newTaskDatas['remark'] = this.taskDatas.body.remark
    console.log(this.uploadtaskDatas)
    this.HttpApiService.updatepluralTaskRequest(this.uploadtaskDatas)
      .subscribe(updateRequest => {
        console.log("更新task成功", updateRequest)
        // this.getOneTaskListData()//重新讀取
        Swal.fire(
          {
            title: `已編輯`,
            icon: 'success',
            confirmButtonText: '確認!',
            //reverseButtons: true,
            confirmButtonColor: '#64c270',
          }
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.assign(`main/task-return-edit/${this.documents_id}/${this.t_id}/${this.tu_id}/${this.bonita_task_id}`);
          }
        })
      }, (err: any) => {
        console.log('err:', err)
      })
  }


  /** 
  * @brief 取得單一專案資料
  *
  * @param documents_id 專案id
  * @return 回傳有無成功取得. */
  getOneProjectListData(): void {
    this.HttpApiService.getOneProjectListRequest(this.documents_id)
      .subscribe(projectRequest => {
        this.projectDatas = projectRequest.body
        console.log("projectDatas", this.projectDatas)
        
      })
  }

  /** 
  * @brief 更新專案資料
  *
  * @param documents_id 專案id
  * @return 回傳有無成功更新. */
  updateProject():void{
    // this.getOneProjectListData()
    this.HttpApiService.getOneProjectListRequest(this.documents_id)
      .subscribe(projectRequest => {
        this.projectDatas = projectRequest.body
        console.log("projectDatas", this.projectDatas)
        console.log(this.inner_id)
        console.log(typeof(this.oneTMtaskData[0].inner_id))
        console.log(this.order_number)
        console.log(typeof(this.oneTMtaskData[0].order_number))
        let projectManagerDatas: any = {};
        if(this.oneTMtaskData[0].inner_id == undefined ){

          projectManagerDatas['inner_id'] = this.inner_id

        }else{

          projectManagerDatas['inner_id'] = this.oneTMtaskData[0].inner_id

        } 

        if(this.oneTMtaskData[0].order_number == undefined ){

          projectManagerDatas['order_number'] = this.order_number

        }else{

          projectManagerDatas['order_number'] = this.oneTMtaskData[0].order_number

        } 
        //this.projectDatas.body.date_for_start.setHours(this.projectDatas.body.date_for_start.getHours() + this.hrs);
        projectManagerDatas['date_for_start'] = this.projectDatas.date_for_start
        //this.projectDatas.body.date_for_end.setHours(this.projectDatas.body.date_for_end.getHours() + this.hrs);
        projectManagerDatas['date_for_end'] = this.projectDatas.date_for_end
        projectManagerDatas['date_for_check'] = this.projectDatas.date_for_check
        projectManagerDatas['date_for_delivery'] = this.projectDatas.date_for_delivery
        projectManagerDatas['date_for_pay'] = this.projectDatas.date_for_pay
        projectManagerDatas['is_template'] = this.projectDatas.is_template
        console.log(projectManagerDatas)
        this.HttpApiService.updateProjectRequest_t(this.documents_id, projectManagerDatas).
          subscribe(res => {
            console.log("update project res",res)
          })
      })
    
  }

  /** 
  * @brief 取得訪問紀錄interview資料
  *
  * @param p_id 專案id
  * @return 回傳有無成功取得. */
  getInterviewRequest(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.oneTMtaskData[0].tu_id).subscribe(res => {
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)
      this.interviewDataSource.data = this.interviewDatas
      this.interviewDataSource.sort = this.sort
      this.interviewDataSource.paginator = this.paginator
    })
  }

  interBtn = false
  //紀錄按鈕狀態
  interviewBtnStatus(): void {
    this.interBtn = !this.interBtn
  }

  message: string;

  doPostWorkSubmit() {
    //this.data.changeMessage("Hello from Sibling")
    this.dialog.open(WorkSubmitDialogComponent, {
      data: {
        t_id: this.t_id,
        tu_id: this.tu_id
      }
    });
  }

  doPostAddMeet(item: any) {
    this.dialog.open(AddMeetDialogComponent, {
      data: {
        m_id: item
      }
    });
  }
  // doPostFile() {
  //   this.dialog.open(FileUploadDialogComponent);
  // }

  // 回上一頁
  cancelItem() {
    window.history.back();
  }

  projectLink() {
    location.href = `/main/projectinfo/project-manager-edit/${this.documents_id}`
  }

  //紀錄彈跳視窗
  doPostInterview(item: any): void {
    this.dialog.open(InterviewDialogComponent, {
      data: {
        tu_id: item
      }
    });
  }
  /*可刪*/
  

  /** 
  * @brief 取得單一專案任務資料
  *
  * @param p_id 任務id
  * @return 回傳有無成功取得. */
  getOneTaskListData(): void {
    this.HttpApiService.getOneTaskListRequest(this.t_id)
      .subscribe(taskRequest => {
        this.taskDatas = taskRequest
        console.log("taskDatas", this.taskDatas)
        this.HttpApiService.getOneTaskListRequest(this.taskDatas.body.last_task)
          .subscribe(lasttaskRequest => {
            this.lasttaskDatas = lasttaskRequest
            //console.log(this.lasttaskDatas.body.t_name)
          })
      })
  }

  //編輯任務彈跳視窗
  doPostFile(): void {
    this.dialog.open(FileUploadDialogComponent, {
      height: '800px',
      width: '800px',
      data: {
        documents_id: this.t_id,
        tu_id: this.tu_id
      }
    });
  }
}
