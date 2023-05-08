import { WorkSubmitDialogComponent } from './../../task-return/task-return-edit/work-submit-dialog/work-submit-dialog.component';
import { HttpApiService } from './../../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../customer-demand-form/file-upload-dialog/file-upload-dialog.component';
import { AddMeetDialogComponent } from '../../project-manager/project-manager-edit/add-meet-dialog/add-meet-dialog.component';
import Swal from 'sweetalert2'
import { SwalEventService } from 'src/app/api/swal-event.service';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterviewDialogComponent } from '../../task-return/task-return-edit/interview-dialog/interview-dialog.component';
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-task-check-edit',
  templateUrl: './task-check-edit.component.html',
  styleUrls: ['./task-check-edit.component.scss']
})
export class TaskCheckEditComponent implements OnInit {

  //編輯task的Form
  editTaskForm: FormGroup;
  projectDatas: any;
  last_taskDatas: any;
  t_index: any;
  taskDatas: any;
  lasttaskDatas: any;
  account_field = ['customer_id', 'salesman_id', 'serviceman_id', 'projectman_id', 'creater']

  @ViewChild('workdetailDialog') workdetailDialog!: TemplateRef<any>;
  @Output() msgToSibling = new EventEmitter<any>();
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private SwalService: SwalEventService
    //private data: DataService
  ) {
    this.editTaskForm = this.fb.group({
      //name: new FormControl(),
      date_for_estimated_completion: new FormControl(),//預計完成日
      //date_for_delivery: new FormControl(),//出機日
      date_for_actual_completion: new FormControl(),
      remark: new FormControl(),//意見回覆
    });
  }

  userJson: any
  documents_id: any;
  t_id: any;
  tu_id: any;
  bonita_task_id: any;
  ngOnInit(): void {
    /*取得使用者資訊*/
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log("userJson", this.userJson)

    this.documents_id = this.route.snapshot.paramMap.get('documents_id');
    this.t_id = this.route.snapshot.paramMap.get('t_id');
    this.tu_id = this.route.snapshot.paramMap.get('tu_id');
    this.bonita_task_id = this.route.snapshot.paramMap.get('bonita_task_id');

    console.log("網址列資訊", this.documents_id, this.t_id, this.bonita_task_id)

    this.editTaskForm = new FormGroup({
      //name: new FormControl(),
      date_for_estimated_completion: new FormControl(),//預計完成日
      //date_for_delivery: new FormControl(),//出機日
      date_for_actual_completion: new FormControl(),
      remark: new FormControl(),//意見回覆
    });

    //this.getOneTaskListData()
    //this.getOneProjectListData()

    //this.data.currentMessage.subscribe(message => this.message = message)
    //取得TM待回報專案任務列表
    this.getUserPmCounterSignList(this.userJson.account, this.userJson.bonita_user_id)

    this.getInterviewRequest()
    this.getPMrecord()
  }

  //取得PM會簽任務列表
  userPmCounterSignData: any
  tmCounterSignTotal: any
  onePMtaskData: any[] = []
  /** 
  * @brief 取得專案任務會簽確認列表資料與筆數
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getUserPmCounterSignList(account: any, userId: any): void {
    this.HttpApiService.GetTaskCheckCaseList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userPmCounterSignData = res
      console.log("專案任務會簽筆數", this.userPmCounterSignData.body.length)
      this.tmCounterSignTotal = this.userPmCounterSignData.body.length
      console.log("專案任務會簽", this.userPmCounterSignData.body)

      for (let i in this.userPmCounterSignData.body) {
        if (this.bonita_task_id == this.userPmCounterSignData.body[i].bonita_task_id) {
          this.onePMtaskData.push(this.userPmCounterSignData.body[i])
        }
      }
      console.log("取得單一帶回報專案 onePMtaskData", this.onePMtaskData[0].tu_id)
    })
  }

  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();
  interviewcol: string[] = ['create_time', 'creater_name', 'actor', 'content'];

  interviewRequest: any;
  interviewDatas: any;
  /** 
  * @brief 取得訪問紀錄interview資料
  *
  * @param p_id 專案id
  * @return 回傳有無成功取得. */
  getInterviewRequest(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.tu_id).subscribe(res => {
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

  
  pmReocrdData: any[] = []
  pmBackReocrdData: any[] = []
  dmReocrdData: any[] = []
  /** 
  * @brief 取得pm會簽回覆意見&單位主管回覆意見
  *
  * @param t_id 專案之任務id
  * @return 回傳有無成功取得. */
  getPMrecord(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.tu_id).subscribe(res => {
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)

      for (let i in this.interviewDatas) {
        if (this.interviewDatas[i].actor == "PM會簽") {
          this.pmReocrdData.push(this.interviewDatas[i].remark)
        } else if (this.interviewDatas[i].actor == "單位主管完工") {
          this.dmReocrdData.push(this.interviewDatas[i].remark)
        } else if (this.interviewDatas[i].actor == "單位主管退回") {
          this.pmBackReocrdData.push(this.interviewDatas[i].remark)
        }
      }
      console.log('pm會簽回覆意見', this.pmReocrdData)
      console.log('單位主管回覆意見', this.dmReocrdData)
      console.log('單位主管退回意見', this.pmBackReocrdData)
    })
  }


  pmReviewRes: any
  /** 
  * @brief 將單據送審
  *
  * @param p_id 專案id
  * @param account 使用者帳號
  * @param bonita_task_id Bonita任務id
  * @param modelInput 同意/退回 json檔
  * @return 回傳有無成功取得. */
  submitPmCase(): void {
    //let modelInput: any = { 'modelInput': {} }
    let gmApprovalStatus: any = { 'dmApprovalStatus': true }
    //modelInput['modelInput'] = gmApprovalStatus
    console.log(gmApprovalStatus)
    // console.log(JSON.stringify(modelInput))

    Swal.fire({
      title: '您是否確定要送出確認會簽?',
      text: "送出後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*送審 */
        this.HttpApiService.PmReviewCase(this.userJson.account, this.bonita_task_id, gmApprovalStatus).subscribe(res => {
          console.log("res", res)
          /*新增一筆紀錄 */
          this.pmReviewRes = res
          if (this.pmReviewRes.code == 200) {
            this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM確認', '任務會簽', this.userJson.account_id)

            Swal.fire(
              {
                title: `已確認會簽`,
                icon: 'success',
                confirmButtonText: '確認!',
                confirmButtonColor: '#64c270',
                reverseButtons: true
              }
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.assign(`main/task-check`);
              }
            })
          } else {
            this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM確認失敗', '任務會簽', this.userJson.account_id)

            Swal.fire(
              {
                title: `確認會簽失敗`,
                icon: 'error',
                confirmButtonText: '確認!',
                confirmButtonColor: '#FF5151',
                reverseButtons: true
              }
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.assign(`main/task-check`);
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

  //雙向綁定
  date_for_estimated_completion: any//預計完成日
  //date_for_delivery=''//出機日
  remark: any
  date_for_actual_completion: any

  projectLink() {
    location.href = `/main/projectinfo/project-manager-edit/${this.documents_id}`
  }

  message: string;

  doPostWorkSubmit(item: any) {
    //this.data.changeMessage("Hello from Sibling")
    this.dialog.open(WorkSubmitDialogComponent, {
      data: {
        t_id: item
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
  doPostFile() {
    this.dialog.open(FileUploadDialogComponent);
  }

  // 回上一頁
  cancelItem() {
    window.history.back();
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
  //專案資料
  getOneProjectListData(): void {
    this.HttpApiService.getOneProjectListRequest(this.documents_id)
      .subscribe(projectRequest => {
        this.projectDatas = projectRequest
        console.log("projectDatas", this.projectDatas)
      })
  }

  //任務資料
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
}

