import { SwalEventService } from 'src/app/api/swal-event.service';
import { HttpApiService } from './../../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileUploadDialogComponent } from '../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { InterviewDialogComponent } from '../../task-return/task-return-edit/interview-dialog/interview-dialog.component';
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-task-audit-edit',
  templateUrl: './task-audit-edit.component.html',
  styleUrls: ['./task-audit-edit.component.scss']
})
export class TaskAuditEditComponent implements OnInit {

  //編輯task的Form
  editTaskForm: FormGroup;
  editTrForm: FormGroup

  @ViewChild('workdetailDialog') workdetailDialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private SwalService: SwalEventService
  ) {
    this.editTaskForm = this.fb.group({
      name: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      date_for_actual_completion: new FormControl(),
      remark: new FormControl(),
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

    console.log("網址列資訊", this.documents_id, this.t_id, this.bonita_task_id)

    this.editTaskForm = new FormGroup({
      name: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      date_for_actual_completion: new FormControl(),
      remark: new FormControl(),
    });

    this.editTrForm = new FormGroup({
      tr_remark: new FormControl(),
    });

    //取得TM待完工專案任務列表
    this.getUserTmAuditCaseList(this.userJson.account, this.userJson.bonita_user_id)

    //取得紀錄資料
    //this.getInterviewRequest()

    //取得回覆紀錄資料
    //this.getTMrecord()
  }

  test(): void {
    console.log(this.tr_remark)
  }


  userTmAuditCaseData: any
  tmAuditCaseTotal: any
  oneTMtaskData: any[] = []

  //tu_id:any
  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();
  interviewcol: string[] = ['create_time', 'creater_name', 'actor', 'content'];

  //取得訪問紀錄interview資料
  interviewRequest: any;
  interviewDatas: any;


  pmReocrdData: any[] = []
  tmReocrdData: any[] = []
  /** 
  * @brief 取得專案負責人(TM)待部門主管完工專案任務資料與筆數
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getUserTmAuditCaseList(account: any, userId: any): void {
    this.HttpApiService.getUserTMAuditCaseList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userTmAuditCaseData = res
      console.log("TM待完工專案任務筆數", this.userTmAuditCaseData.body.length)
      this.tmAuditCaseTotal = this.userTmAuditCaseData.body.length
      console.log("TM待完工專案任務", this.userTmAuditCaseData.body)

      for (let i in this.userTmAuditCaseData.body) {
        if (this.bonita_task_id == this.userTmAuditCaseData.body[i].bonita_task_id) {
          this.oneTMtaskData.push(this.userTmAuditCaseData.body[i])
        }

      }
      console.log("取得單一帶回報專案 oneTMtaskData", this.oneTMtaskData[0].tu_id)
      console.log("取得單一帶回報專案 oneTMtaskData", this.oneTMtaskData[0])

      this.HttpApiService.getOneTransactionRecordRequest_t(this.tu_id).subscribe(res => {
        this.interviewDatas = res.body.transaction_record
        console.log(this.interviewDatas)
        this.interviewDataSource.data = this.interviewDatas
        this.interviewDataSource.sort = this.sort
        this.interviewDataSource.paginator = this.paginator

        for (let i in this.interviewDatas) {
          if (this.interviewDatas[i].actor == "PM會簽") {
            this.pmReocrdData.push(this.interviewDatas[i].remark)
            this.pmReocrdData.push(this.interviewDatas[i].create_time)
          } else if (this.interviewDatas[i].actor == "TM送審") {
            this.tmReocrdData.push(this.interviewDatas[i].remark)
            this.tmReocrdData.push(this.interviewDatas[i].create_time)
          }
        }
        console.log('pm會簽回覆意見', this.pmReocrdData)
        console.log('tm任務回報意見', this.tmReocrdData)
      })


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


  interBtn = false
  //紀錄按鈕狀態
  interviewBtnStatus(): void {
    this.interBtn = !this.interBtn
  }

  date_for_actual_completion: any
  //送審按鈕
  dmReviewRes: any
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
    let dmApprovalStatus: any = { 'dmApprovalStatus': true }
    //modelInput['modelInput'] = gmApprovalStatus
    //console.log(modelInput)
    // console.log(JSON.stringify(modelInput))

    if (this.tr_remark == null || this.tr_remark == undefined || this.tr_remark == '') {
      Swal.fire({
        title: `回覆意見未填寫!`,
        icon: 'error',
        confirmButtonText: '確認!',
        reverseButtons: true,
        confirmButtonColor: '#FF5151'
      })
    } else {
      Swal.fire({
        title: '您是否確定要完工?',
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
          this.HttpApiService.PmReviewCase(this.userJson.account, this.bonita_task_id, dmApprovalStatus).subscribe(res => {
            console.log("res", res)
            this.dmReviewRes = res
            if (this.dmReviewRes.code == 200 && 204) {
              /*新增一筆紀錄 */
              this.uploadTransactionRecordRequests(this.tu_id, '單位主管完工', '專案任務', this.tr_remark)

              /*補上task修改狀態，判斷是否為主要負責人 再修改狀態----------------------------------- */
              let taskDatas: any = { task: [] };
              let temporaryDatas: any = {};
              temporaryDatas['t_id'] = this.t_id;
              temporaryDatas['date_for_estimated_completion'] = this.oneTMtaskData[0].date_for_estimated_completion
              temporaryDatas['date_for_estimated_start'] = this.oneTMtaskData[0].date_for_estimated_start
              temporaryDatas['date_for_actual_completion'] = this.oneTMtaskData[0].date_for_actual_completion
              temporaryDatas['remark'] = "已完工";
              taskDatas.task.push(temporaryDatas)
              this.HttpApiService.updatepluralTaskRequest(taskDatas).
                subscribe(res => {
                  console.log('修改狀態成功', res)
                  //location.href = '/main/projectinfo/project-manager'
                },
                  (err: any) => {
                    console.log('err:', err);
                  }
                );

              /*修改task_user狀態 */
              let taskBonitaStatus: any = {}
              taskBonitaStatus['date_for_delivery'] = this.oneTMtaskData[0].date_for_delivery
              taskBonitaStatus['status_type_id'] = '8620dda9-28b3-46a4-a2ba-3b3da10a950d'//已完工
              console.log(taskBonitaStatus)
              this.HttpApiService.UpdateTaskUserStatus(this.oneTMtaskData[0].tu_id, taskBonitaStatus).subscribe(res => {
                console.log("修改任務負責人已完工狀態成功", res)
              })

              Swal.fire(
                {
                  title: `此任務已完工`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                  reverseButtons: true
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  location.href = '/main/task-audit'
                }
              })
            } else {
              this.uploadTransactionRecordRequests(this.tu_id, '單位主管完工失敗', '專案任務', this.tr_remark)

              Swal.fire(
                {
                  title: `此任務完工失敗!`,
                  icon: 'error',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#FF5151',
                  reverseButtons: true
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  location.href = '/main/task-audit'
                }
              })
            }


          })



          //location.href = '/main/task-audit'
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


  /** 
  * @brief 將單據退回
  *
  * @param p_id 專案任務id
  * @param account 使用者帳號
  * @param bonita_task_id Bonita任務id
  * @param modelInput 同意/退回 json檔
  * @return 回傳有無成功取得. */
  sendBackPmCase(): void {
    //let modelInput:any = { 'modelInput' : {} }
    let gmApprovalStatus: any = { 'dmApprovalStatus': false }
    //modelInput['modelInput'] = gmApprovalStatus
    console.log(gmApprovalStatus)
    console.log(JSON.stringify(gmApprovalStatus))

    if (this.tr_remark == null || this.tr_remark == undefined || this.tr_remark == '') {
      Swal.fire({
        title: `回覆意見未填寫!`,
        icon: 'error',
        confirmButtonText: '確認!',
        reverseButtons: true,
        confirmButtonColor: '#FF5151'
      })
    } else {
      Swal.fire({
        title: '您是否確定要退回?',
        text: "退回後即不可返回!",
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
          this.HttpApiService.PmReviewCase(this.userJson.account, this.bonita_task_id, gmApprovalStatus).subscribe(res => {
            console.log(this.userJson.account, this.bonita_task_id)
            console.log("退回", res)

            this.uploadTransactionRecordRequests(this.tu_id, '單位主管退回', '專案任務', this.tr_remark)
            //location.href = '/main/pm-audit'
          },
            (err: any) => {
              console.log('err:', err);
            })

          /*補上task修改狀態，判斷是否為主要負責人 再修改狀態----------------------------------- */
          let taskDatas: any = { task: [] };
          let temporaryDatas: any = {};
          temporaryDatas['t_id'] = this.t_id;
          temporaryDatas['date_for_estimated_completion'] = this.oneTMtaskData[0].date_for_estimated_completion
          temporaryDatas['date_for_estimated_start'] = this.oneTMtaskData[0].date_for_estimated_start
          temporaryDatas['date_for_actual_completion'] = this.oneTMtaskData[0].date_for_actual_completion
          temporaryDatas['remark'] = "待回報";
          taskDatas.task.push(temporaryDatas)
          this.HttpApiService.updatepluralTaskRequest(taskDatas).
            subscribe(res => {
              console.log('修改任務狀態待回報成功', res)
              //location.href = '/main/projectinfo/project-manager'
            },
              (err: any) => {
                console.log('err:', err);
              }
            );

          /*修改task_user狀態 */
          let taskBonitaStatus: any = {}
          taskBonitaStatus['date_for_delivery'] = this.oneTMtaskData[0].date_for_delivery
          taskBonitaStatus['status_type_id'] = '98c543c6-944e-4860-b323-166ed5f3920e'//待回報
          console.log(taskBonitaStatus)
          this.HttpApiService.UpdateTaskUserStatus(this.oneTMtaskData[0].tu_id, taskBonitaStatus).subscribe(res => {
            console.log('修改任務負責人待回報狀態成功', res)
          })

          Swal.fire(
            {
              title: `已退回至第一階段回報!`,
              icon: 'success',
              confirmButtonText: '確認!',
              confirmButtonColor: '#64c270',
              reverseButtons: true
            }
          ).then((result) => {
            if (result.isConfirmed) {
              location.href = '/main/task-audit'
            }
          })
          //location.href = '/main/pm-audit'
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

  //編輯任務彈跳視窗
  doPostFile(): void {
    this.dialog.open(FileUploadDialogComponent, {
      data: {
        documents_id: this.t_id,
        tu_id: this.tu_id
      }
    });
  }
}
