import { InterviewDialogComponent } from './../../task-return/task-return-edit/interview-dialog/interview-dialog.component';
import { WorkSubmitDialogComponent } from './../../task-return/task-return-edit/work-submit-dialog/work-submit-dialog.component';
import { HttpApiService } from './../../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';
import { AddMeetDialogComponent } from '../../project-manager/project-manager-edit/add-meet-dialog/add-meet-dialog.component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SwalEventService } from 'src/app/api/swal-event.service';

import Swal from 'sweetalert2'
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-pm-task-return-edit',
  templateUrl: './pm-task-return-edit.component.html',
  styleUrls: ['./pm-task-return-edit.component.scss']
})
export class PmTaskReturnEditComponent implements OnInit {

  //編輯task的Form
  editTaskForm: FormGroup;
  editTrForm: FormGroup
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
    private SwalService: SwalEventService,

    //private data: DataService
  ) {
    this.editTaskForm = this.fb.group({
      //name: new FormControl(),
      date_for_estimated_completion: new FormControl(),//預計完成日
      //date_for_delivery: new FormControl(),//出機日
      date_for_actual_completion: new FormControl(),
      remark: new FormControl(),//意見回覆
    });

    this.editTrForm = this.fb.group({
      tr_remark: new FormControl(),
    });
  }

  userJson: any
  documents_id: any;
  t_id: any;
  tu_id: any
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

    console.log("網址列資訊", this.documents_id, this.t_id, this.tu_id, this.bonita_task_id)

    this.editTaskForm = new FormGroup({
      //name: new FormControl(),
      date_for_estimated_completion: new FormControl(),//預計完成日
      //date_for_delivery: new FormControl(),//出機日
      date_for_actual_completion: new FormControl(),
      //remark: new FormControl(),//意見回覆
    });

    this.editTrForm = this.fb.group({
      tr_remark: new FormControl(),
    });
    //this.getOneTaskListData()
    //this.getOneProjectListData()

    //this.data.currentMessage.subscribe(message => this.message = message)

    //取得TM待回報專案任務列表
    this.getUserPmCounterSignList(this.userJson.account, this.userJson.bonita_user_id)

    //取得紀錄資料
    this.getInterviewRequest()

    //取得回覆紀錄資料
    this.getTMrecord()
  }

  test(): void {
    console.log(this.tr_remark)
  }

  //取得PM會簽任務列表
  userPmCounterSignData: any
  tmCounterSignTotal: any
  onePMtaskData: any[] = []
  /** 
  * @brief 取得PM會簽任務列表資料與筆數
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getUserPmCounterSignList(account: any, userId: any): void {
    this.HttpApiService.getUserCounterSignList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userPmCounterSignData = res
      console.log("PM會簽任務筆數", this.userPmCounterSignData.body.length)
      this.tmCounterSignTotal = this.userPmCounterSignData.body.length
      console.log("PM會簽任務", this.userPmCounterSignData.body)

      for (let i in this.userPmCounterSignData.body) {
        if (this.bonita_task_id == this.userPmCounterSignData.body[i].bonita_task_id) {
          this.onePMtaskData.push(this.userPmCounterSignData.body[i])
        }
      }
      console.log("取得單一帶回報專案 onePMtaskData", this.onePMtaskData[0].tu_id)
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
        console.log('新增紀錄成功')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  tmReocrdData: any[] = []
  /** 
  * @brief 取得專專案負責人TM送審回覆意見
  *
  * @param t_id 專案之任務id
  * @return 回傳有無成功取得. */
  getTMrecord(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.tu_id).subscribe(res => {
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)

      for (let i in this.interviewDatas) {
        if (this.interviewDatas[i].actor == "TM送審") {
          this.tmReocrdData.push(this.interviewDatas[i].remark)
        }
      }
      console.log('TM 送審回覆意見', this.tmReocrdData)
    })
  }

  pmReviewRes: any
  date_for_actual_start: any
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
    if (this.tr_remark == null || this.tr_remark == '' || this.tr_remark == undefined) {
      Swal.fire({
        title: `回覆意見未填寫!`,
        icon: 'warning',
        confirmButtonText: '確認!',
        reverseButtons: true,
        confirmButtonColor: '#FF5151'
      })
    } else {
      Swal.fire({
        title: '您是否確定要送出會簽?',
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

          /*送審 */
          this.HttpApiService.PmReviewCase(this.userJson.account, this.bonita_task_id, modelInput).subscribe(res => {
            console.log("res", res)
            this.pmReviewRes = res
            if (this.pmReviewRes.code == 200 && 204) {

              /*補上task修改狀態，判斷是否為主要負責人 再修改狀態----------------------------------- */
              let taskDatas: any = { task: [] };
              let temporaryDatas: any = {};
              temporaryDatas['t_id'] = this.t_id;
              //this.oneTMtaskData[0].date_for_estimated_completion.setHours(this.oneTMtaskData[0].date_for_estimated_completion.getHours() + this.hrs);
              temporaryDatas['date_for_estimated_completion'] = this.onePMtaskData[0].date_for_estimated_completion
              temporaryDatas['date_for_estimated_start'] = this.onePMtaskData[0].date_for_estimated_start

              //this.oneTMtaskData[0].date_for_actual_completion.setHours(this.oneTMtaskData[0].date_for_actual_completion.getHours() + this.hrs);
              temporaryDatas['date_for_actual_completion'] = this.onePMtaskData[0].date_for_actual_completion
              if (this.date_for_actual_start != null) {
                temporaryDatas['date_for_actual_start'] = this.onePMtaskData[0].date_for_actual_start
              }
              taskDatas.task.push(temporaryDatas)
              this.HttpApiService.updatepluralTaskRequest(taskDatas).
                subscribe(res => {
                  console.log('修改task狀態成功', res)
                  //location.href = '/main/projectinfo/project-manager'
                },
                  (err: any) => {
                    console.log('err:', err);
                  }
                );

              /*更改task_user狀態為待審核 */
              let taskBonitaStatus: any = {}
              taskBonitaStatus['date_for_delivery'] = this.onePMtaskData[0].date_for_delivery
              taskBonitaStatus['status_type_id'] = '7278b671-ad00-4ef2-b608-376a1f8c3967'//待審核
              console.log(taskBonitaStatus)
              this.HttpApiService.UpdateTaskUserStatus(this.tu_id, taskBonitaStatus).subscribe(res => {
                /*新增一筆紀錄 */
                this.uploadTransactionRecordRequests(this.tu_id, 'PM會簽', '專案任務', this.tr_remark)
                console.log('修改task_user狀態成功', res)
                Swal.fire(
                  {
                    title: `已送審至下一階段完工`,
                    icon: 'success',
                    confirmButtonText: '確認!',
                    confirmButtonColor: '#64c270',
                    reverseButtons: true
                  }
                ).then((result) => {
                  if (result.isConfirmed) {
                    location.href = '/main/pm-task-return'
                  }
                })
              })
            } else {
              /*新增一筆紀錄 */
              this.uploadTransactionRecordRequests(this.tu_id, 'PM會簽失敗', '專案任務', this.tr_remark)
              console.log('修改task_user狀態成功', res)
              Swal.fire(
                {
                  title: `送出會簽失敗!`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#FF5151',
                  reverseButtons: true
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  location.href = '/main/pm-task-return'
                }
              })
            }


          })



          // this.SwalService.loadingAlert('已送審至下一階段審核',1500)
          //location.href = '/main/pm-task-return'
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


  //雙向綁定
  date_for_estimated_completion: any//預計完成日
  //date_for_delivery=''//出機日
  remark: any
  date_for_actual_completion: any

  // updateTaskRequest(): void {
  //   let newTaskDatas: any = {}
  //   newTaskDatas['date_for_estimated_completion'] = this.taskDatas.body.date_for_estimated_completion
  //   newTaskDatas['date_for_actual_completion'] = this.taskDatas.body.date_for_actual_completion
  //   //newTaskDatas['remark'] = this.taskDatas.body.remark
  //   console.log(newTaskDatas)
  //   this.HttpApiService.updateTaskRequest_t(this.t_id, newTaskDatas)
  //     .subscribe(updateRequest => {
  //       console.log("更新task成功", updateRequest)
  //       this.getOneTaskListData()//重新讀取
  //     }, (err: any) => {
  //       console.log('err:', err)
  //     })
  // }

  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();
  interviewcol: string[] = ['create_time', 'creater_name', 'actor', 'content'];

  //取得訪問紀錄interview資料
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
  //附件彈跳視窗
  doPostFile(): void {
    this.dialog.open(FileUploadDialogComponent, {
      data: {
        documents_id: this.t_id,
        tu_id: this.tu_id
      }
    });
  }

  //紀錄彈跳視窗
  doPostInterview(item: any): void {
    this.dialog.open(InterviewDialogComponent, {
      data: {
        tu_id: item
      }
    });
  }

  // 回上一頁
  cancelItem() {
    window.history.back();
  }

  projectLink() {
    location.href = `/main/projectinfo/project-manager-edit/${this.documents_id}`
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
