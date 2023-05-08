import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpApiService } from './../../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SwalEventService } from 'src/app/api/swal-event.service';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-cr-pm-evalution-edit',
  templateUrl: './cr-pm-evalution-edit.component.html',
  styleUrls: ['./cr-pm-evalution-edit.component.scss']
})
export class CrPmEvalutionEditComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  editRemarkForm: FormGroup; //編輯remark
  editCRForm: FormGroup;

  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private SwalEvent: SwalEventService,
    public dialog: MatDialog,
  ) {
    this.editRemarkForm = this.fb.group({
      //status: new FormControl(),
      remark: ['', [Validators.required]],
    });
    this.editCRForm = this.fb.group({
      suitable_content: new FormControl(),
      other_content: new FormControl(),
    });
  }

  cd_id: any = '';
  bonita_task_id: any = '';

  suitable_content: any = '';
  other_content: any = '';
  remark: any = '';

  userJson: any
  ngOnInit(): void {
    this.SwalEvent.loadingAlertNoback('請稍等...', 2500)

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
        console.log(CR)
        this.CRDatas = CR;
      },
        (err: any) => {
          console.log('err:', err);
        }
      );

  }

  //送審按鈕
  submitCase(): void {
    if (this.editRemarkForm.valid) {
      let submitA1: any = { 'status': true }

      console.log(submitA1)

      Swal.fire({
        title: '已確認工時完成，並要送交完工審核嗎?',
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
            /*新增審核紀錄 */
            this.uploadTransactionRecordRequests(this.cd_id)

          })

          Swal.fire(
            {
              title: `此客需單已完工並送交審核.`,
              icon: 'success',
              confirmButtonText: '確認!',
              confirmButtonColor: '#64c270',
              reverseButtons: true
            }
          ).then((result) => {
            if (result.isConfirmed) {
              location.href = '/main/cr-pm-evalution'
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
    } else {
      Swal.fire({
        title: '未輸入意見回覆!',
        icon: 'error',
        cancelButtonText: '確認!',
        confirmButtonColor: '#FF5151',
      }
      )
    }



  }

  //更新CR
  updateCustomerRequest(): void {
    let customerRequestData: any = {};
    customerRequestData['cd_id'] = this.CRDatas.body.cd_id;//對照cd_id
    customerRequestData['suitable_content'] = this.CRDatas.body.suitable_content;
    customerRequestData['other_content'] = this.CRDatas.body.other_content;
    customerRequestData['status'] = '進行中(待結案)';

    //重新上傳日期
    customerRequestData['date_for_result'] = this.CRDatas.date_for_result;
    customerRequestData['date_for_devlop'] = this.CRDatas.date_for_devlop;
    customerRequestData['date_for_estimated_end'] = this.CRDatas.date_for_estimated_end;
    customerRequestData['date_for_estimated_start'] = this.CRDatas.date_for_estimated_start;
    customerRequestData['date_for_recive'] = this.CRDatas.date_for_recive;
    customerRequestData['date_for_actual_done'] = this.CRDatas.date_for_actual_done;


    console.log(customerRequestData);

    this.HttpApiService.updateCustomerRequest(this.cd_id, customerRequestData).
      subscribe(CR => {
        console.log(CR);
        //location.href = '/main/dashboard'
      })
  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(cd_id: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = cd_id
    trManagerDatas['actor'] = 'PM送審評估報告'
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
