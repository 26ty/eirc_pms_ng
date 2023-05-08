import { HttpApiService } from './../../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SwalEventService } from 'src/app/api/swal-event.service';
import { FileUploadDialogComponent } from './../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-cr-task-audit-edit',
  templateUrl: './cr-task-audit-edit.component.html',
  styleUrls: ['./cr-task-audit-edit.component.scss']
})
export class CrTaskAuditEditComponent implements OnInit {

  editRemarkForm: FormGroup;//回覆意見
  editCRForm: FormGroup;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private SwalEvent: SwalEventService,
    public dialog: MatDialog,
  ) {
    this.editRemarkForm = this.fb.group({
      remark: new FormControl(),
    });
    this.editCRForm = this.fb.group({
      suitable_content: new FormControl(),
      other_content: new FormControl(),
    });
  }

  // code:any='';
  // name:any='';
  // projectman_name:any = '';
  // serviceman_name:any = '';
  // date_for_start:any = '';
  // date_for_end:any = '';
  cd_id: any = ''
  bonita_task_id: any = '';
  userJson: any
  ngOnInit(): void {
    this.SwalEvent.loadingAlertNoback('請稍等...', 2500)

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    this.cd_id = this.route.snapshot.paramMap.get('cd_id');
    //取得bonita_task_id(審核用task_id)
    this.bonita_task_id = this.route.snapshot.paramMap.get('bonita_task_id')
    console.log("bonita_task_id", this.bonita_task_id) //61445

    //this.cd_id = "103"
    console.log("取得的id=")
    console.log(this.cd_id)
    //取得該id資料
    //this.getEditProject(this.cd_id);
    //this.getEditTaskRequest();

    //A1獲取使用者可執行的單 (任務完工送審)
    this.getTaskFinishManagerReturnList(this.userJson.account, this.userJson.bonita_user_id)
    //取得紀錄資料
    this.getInterviewRequest()
  }

  CRDatas: any[] = []

  crTaskManagerRerurnData: any
  crTaskManagerRerurnTotal: any
  //A1獲取使用者可執行的單 (任務直屬主管審核)
  getTaskFinishManagerReturnList(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getTaskFinishManagerReturnList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.crTaskManagerRerurnData = res
      console.log("筆數 (任務直屬主管審核)", this.crTaskManagerRerurnData.body.length)
      this.crTaskManagerRerurnTotal = this.crTaskManagerRerurnData.body.length
      console.log(" (任務直屬主管審核)", this.crTaskManagerRerurnData.body)

      for (let i in this.crTaskManagerRerurnData.body) {
        if (this.cd_id == this.crTaskManagerRerurnData.body[i].cd_id && this.bonita_task_id == this.crTaskManagerRerurnData.body[i].bonita_task_id) {
          this.CRDatas.push(this.crTaskManagerRerurnData.body[i])
          console.log("this.CRDatas", this.CRDatas)
        }
      }

    })
  }

  //送審按鈕
  submitCase(): void {
    let submitA1: any = { 'status': true }

    console.log(submitA1)

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
        this.HttpApiService.ReviewCRForm(this.userJson.account, this.bonita_task_id, submitA1).subscribe(res => {
          console.log("res", res)
          //更新客需單資料庫
          this.updateCustomerRequest()
          //更新task狀態
          this.updateTaskRequest()
          /*新增審核紀錄 */
          this.uploadTransactionRecordRequests(this.cd_id, '任務完工審核')

        })

        Swal.fire(
          {
            title: `此項目已送出下一階段審核`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            location.href = '/main/cr-task-audit'
          }
        })

        //location.href = '/main/cr-return-director'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
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

  //退回按鈕
  returnCase(): void {
    let submitA1: any = { 'status': false }

    console.log(submitA1)

    Swal.fire({
      title: '您是否確定要退回?',
      text: "退回後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '退回!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.HttpApiService.ReviewCRForm(this.userJson.account, this.bonita_task_id, submitA1).subscribe(res => {
          console.log("res", res)
          //更新客需單資料庫
          //this.updateCustomerRequest()
          //更新課需單
          this.returnTaskRequest()
          /*新增審核紀錄 */
          this.uploadTransactionRecordRequests(this.cd_id, '退回任務')

        })

        Swal.fire(
          {
            title: `此項目已退回上一階段任務`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            location.href = '/main/cr-task-audit'
          }
        })

        //location.href = '/main/cr-return-director'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            title: '此項目未被退回',
            icon: 'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
          }
        )
      }
    })


  }

  //更新CR
  updateCustomerRequest(): void {
    let customerRequestData: any = {};
    customerRequestData['cd_id'] = this.CRDatas[0].cd_id;//對照cd_id
    customerRequestData['suitable_content'] = this.CRDatas[0].suitable_content;
    customerRequestData['other_content'] = this.CRDatas[0].other_content;

    //重新上傳日期
    customerRequestData['date_for_result'] = this.CRDatas[0].date_for_result;
    customerRequestData['date_for_devlop'] = this.CRDatas[0].date_for_devlop;
    customerRequestData['date_for_estimated_end'] = this.CRDatas[0].date_for_estimated_end;
    customerRequestData['date_for_estimated_start'] = this.CRDatas[0].date_for_estimated_start;
    customerRequestData['date_for_recive'] = this.CRDatas[0].date_for_recive;
    customerRequestData['date_for_actual_done'] = this.CRDatas[0].date_for_actual_done;

    console.log(customerRequestData);

    this.HttpApiService.updateCustomerRequest(this.cd_id, customerRequestData).
      subscribe(CR => {
        console.log(CR);
        //location.href = '/main/dashboard'
      })
  }

  updateTaskRequest(): void {
    /*補上task修改狀態，判斷是否為主要負責人 再修改狀態----------------------------------- */
    let taskDatas: any = { "task": [] };

    let taskManagerDatas: any = {};

    taskManagerDatas['t_id'] = this.CRDatas[0].t_id;
    taskManagerDatas['date_for_estimated_start'] = this.CRDatas[0].date_for_estimated_start
    taskManagerDatas['date_for_estimated_completion'] = this.CRDatas[0].date_for_estimated_completion
    taskManagerDatas['date_for_actual_completion'] = this.CRDatas[0].date_for_actual_completion
    taskManagerDatas['status'] = "已完工";

    console.log("taskManagerDatas", taskManagerDatas)
    console.log("taskDatas", taskDatas)

    this.HttpApiService.updatepluralTaskRequest(taskDatas).
      subscribe(res => {
        // console.log('修改狀態成功', res)
      });

    /*修改task_user狀態 */
    let taskBonitaStatus: any = {}
    taskBonitaStatus['date_for_delivery'] = this.CRDatas[0].date_for_delivery
    taskBonitaStatus['status_type_id'] = '8620dda9-28b3-46a4-a2ba-3b3da10a950d'//已完工
    console.log(taskBonitaStatus)
    this.HttpApiService.UpdateTaskUserStatus(this.CRDatas[0].tu_id, taskBonitaStatus).subscribe(res => {
      console.log("修改任務負責人已完工狀態成功", res)
    })


  }

  returnTaskRequest(): void {
    /*補上task修改狀態，判斷是否為主要負責人 再修改狀態----------------------------------- */
    let taskDatas: any = { "task": [] };

    let taskManagerDatas: any = {};

    taskManagerDatas['t_id'] = this.CRDatas[0].t_id;
    taskManagerDatas['date_for_estimated_start'] = this.CRDatas[0].date_for_estimated_start
    taskManagerDatas['date_for_estimated_completion'] = this.CRDatas[0].date_for_estimated_completion
    taskManagerDatas['date_for_actual_completion'] = this.CRDatas[0].date_for_actual_completion
    taskManagerDatas['status'] = "待回報";

    console.log("taskManagerDatas", taskManagerDatas)
    console.log("taskDatas", taskDatas)

    this.HttpApiService.updatepluralTaskRequest(taskDatas).
      subscribe(res => {
        // console.log('修改狀態成功', res)
      });

    /*修改task_user狀態 */
    let taskBonitaStatus: any = {}
    taskBonitaStatus['date_for_delivery'] = this.CRDatas[0].date_for_delivery
    taskBonitaStatus['status_type_id'] = '98c543c6-944e-4860-b323-166ed5f3920e'//待回報
    console.log(taskBonitaStatus)
    this.HttpApiService.UpdateTaskUserStatus(this.CRDatas[0].tu_id, taskBonitaStatus).subscribe(res => {
      console.log("修改任務負責人已完工狀態成功", res)
    })


  }

  remark: any = '';
  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(cd_id: any, actor: any): void {
    let recordData: any = {};//接收資料
    recordData['document_id'] = cd_id
    recordData['actor'] = actor
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

  interBtn = false
  //紀錄按鈕狀態
  interviewBtnStatus(): void {
    this.interBtn = !this.interBtn
  }

  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();
  interviewcol: string[] = ['create_time', 'creater_name', 'actor', 'content'];
  //取得訪問紀錄interview資料--------------------------------------------------------
  interviewRequest: any;
  interviewDatas: any;
  getInterviewRequest(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.cd_id).subscribe(res => {
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)
      this.interviewDataSource.data = this.interviewDatas
      this.interviewDataSource.sort = this.sort
      this.interviewDataSource.paginator = this.paginator
    })
  }


  // 開啟appendixdialog
  // 新增
  addappendixItem() {
    // this.dialog.open(ProduceAddAppendixDialogComponent);
    this.dialog.open(FileUploadDialogComponent, {
      data: {
        documents_id: this.cd_id,
        tu_id: this.CRDatas[0].tu_id
      }
    });
  }

}

