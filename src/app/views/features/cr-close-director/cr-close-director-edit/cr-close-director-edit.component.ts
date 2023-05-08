import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpApiService } from './../../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SwalEventService } from 'src/app/api/swal-event.service';
import { FileUploadDialogComponent } from './../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';
import Swal from 'sweetalert2'

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-cr-close-director-edit',
  templateUrl: './cr-close-director-edit.component.html',
  styleUrls: ['./cr-close-director-edit.component.scss']
})
export class CrCloseDirectorEditComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  editRemarkForm: FormGroup;
  editCRForm: FormGroup;//編輯CR

  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private SwalEvent: SwalEventService,
    public dialog: MatDialog,
  ) {
    this.editRemarkForm = this.fb.group({
      //status: new FormControl(),
      remark: new FormControl(),
    });
    this.editCRForm = this.fb.group({
      suitable_content: new FormControl(),
      other_content: new FormControl(),
    });
  }

  cd_id: any = '';
  bonita_task_id: any;

  suitable_content: any = '';
  other_content: any = '';
  remark: any = '';

  userJson: any
  ngOnInit(): void {
    this.SwalEvent.loadingAlertNoback('請稍等...', 2500)

    this.editRemarkForm = this.fb.group({
      //status: new FormControl(),
      remark: new FormControl(),
    });

    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    //取得bonita_task_id(審核用task_id)
    this.bonita_task_id = this.route.snapshot.paramMap.get('bonita_task_id')
    console.log("bonita_task_id", this.bonita_task_id) //61445
    //取得cd_id
    this.cd_id = this.route.snapshot.paramMap.get('cd_id')
    console.log("cd_id", this.cd_id) //61445

    //取得該id資料
    //this.getOneProject();
    this.getEditCustomerRequest();
    //取得紀錄資料
    this.getInterviewRequest()
  }
  test(): void {
    console.log(this.remark)
  }

  CRDatas: any;
  //取得該id之CR資料---------------------------------------
  getEditCustomerRequest(): void {
    //取得id
    //server getOne
    this.HttpApiService.getOneCustomerRequest(this.cd_id).
      subscribe(CR => {
        this.CRDatas = CR;
      },
        (err: any) => {
          console.log('err:', err);
        }
      );

  }

  //送審按鈕
  submitCase(): void {
    let submitA1: any = { 'status': true }

    console.log(submitA1)

    Swal.fire({
      title: '您確定該單據完工嗎?',
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
          this.updateCustomerRequest('結案中(最高主管)')
          /*新增審核紀錄 */
          this.uploadTransactionRecordRequests(this.cd_id, '業務處副總結案簽核')

        })

        Swal.fire(
          {
            title: `此客需單已送出下一階段簽核`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            location.href = '/main/cr-close-director'
          }
        })

        //location.href = '/main/cr-return-director'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: '已取消',
          text: '此客需單未被送出',
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
        }

        )
      }
    })


  }

  //退回
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
          this.updateCustomerRequest('進行中(待結案)')
          /*新增審核紀錄 */
          this.uploadTransactionRecordRequests(this.cd_id, '退回')

        })

        Swal.fire(
          {
            title: '已退回',
            text: '此客需單已退回上一階段簽核',
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
          }
        ).then((result) => {
          if (result.isConfirmed) {
            location.href = '/main/cr-close-director'
          }
        })

        //location.href = '/main/cr-return-director'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            title: '此客需單未被退回',
            icon: 'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
          }
        )
      }
    })


  }

  //更新CR
  updateCustomerRequest(status: any): void {
    let customerRequestData: any = {};
    customerRequestData['cd_id'] = this.CRDatas.body.cd_id;//對照cd_id
    customerRequestData['suitable_content'] = this.CRDatas.body.suitable_content;
    customerRequestData['other_content'] = this.CRDatas.body.other_content;
    customerRequestData['status'] = status;

    customerRequestData['result_status'] = this.CRDatas[0].result_status;
    if (this.CRDatas[0].result_status == 'pending') {
      customerRequestData['project_id'] = "00000000-0000-0000-0000-000000000000";
      customerRequestData['date_for_result'] = this.CRDatas[0].date_for_result;
      customerRequestData['result_content'] = this.CRDatas[0].result_content;
    } else if (this.CRDatas[0].result_status == '拒絕') {
      customerRequestData['project_id'] = "00000000-0000-0000-0000-000000000000";
      customerRequestData['result_content'] = this.CRDatas[0].result_content;
      customerRequestData['date_for_result'] = this.CRDatas[0].date_for_result;
    } else if (this.CRDatas[0].result_status == '有機會發展') {
      customerRequestData['project_id'] = this.CRDatas[0].project_id;
      customerRequestData['result_content'] = "";
      customerRequestData['date_for_result'] = "0001-01-01T00:00:00Z";
    }

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

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(cd_id: any, actor: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = cd_id
    trManagerDatas['actor'] = actor
    trManagerDatas['content'] = '客需單'
    trManagerDatas['creater'] = this.userJson.account_id
    trManagerDatas['remark'] = this.remark
    console.log("trManagerDatas", trManagerDatas)
    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        console.log('成功新增紀錄')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
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

  interBtn = false
  //紀錄按鈕狀態
  interviewBtnStatus(): void {
    this.interBtn = !this.interBtn
  }
  //離開修改頁面
  // 選擇單項
  cancelItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.history.back();
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
