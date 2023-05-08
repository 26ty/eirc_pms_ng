import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/api/http-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-laborhour-direct-audit-edit',
  templateUrl: './laborhour-direct-audit-edit.component.html',
  styleUrls: ['./laborhour-direct-audit-edit.component.scss']
})
export class LaborhourDirectAuditEditComponent implements OnInit {

  editProjectForm: FormGroup; //編輯project
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { 
    this.editProjectForm = this.fb.group({
      //status: new FormControl(),
      remark: ['', [Validators.required]],
    });
  }

  hm_id:any
  bonita_task_id:any
  ngOnInit(): void {
    this.editProjectForm = this.fb.group({
      //status: new FormControl(),
      remark: new FormControl(),
    });
    this.getUserJson()

    this.hm_id = this.route.snapshot.paramMap.get('hm_id');
    this.bonita_task_id = this.route.snapshot.paramMap.get('bonita_task_id');

    console.log("hm_id && bonita_task_id",this.hm_id,this.bonita_task_id)

    this.getlabordirectCaseList(this.userJson.account, this.userJson.bonita_user_id)
  }

  remark:any
  test(): void {
    console.log(this.remark)
  }

  userJson: any
  /** 
  * @brief 取得目前登錄者資訊
  * @return 回傳有無成功取得. */
  getUserJson(): void {
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
  }

  bonita_case_id: any
  bonita_task_name: any
  category: any
  content: any
  creater: any
  creater_name: any
  date_for_start:any

  hour_id: any
  laborhour: any
  m_content: any
  m_date_for_start:any
  m_laborhour: any
  m_nature: any
  m_time_for_end: any
  m_time_for_start: any
  m_title: any
  nature: any
  p_code: any
  p_id: any
  p_name: any
  projectman_id: any
  projectman_name: any
  t_code: any
  t_id: any
  t_name:any
  time_for_end: any
  time_for_start: any
  title: any

  labordirectCaseData: any
  labordirectCaseTotal: any
  onelaborData: any[] = []
  /** 
  * @brief 取得主管待審核異動工時資料&筆數
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getlabordirectCaseList(account: any, userId: any): void {
    this.HttpApiService.getLaborDirectBonitaCaseList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.labordirectCaseData = res
      console.log("主管異動工時審核筆數", this.labordirectCaseData.body.length)
      this.labordirectCaseTotal = this.labordirectCaseData.body.length
      console.log("主管異動工時審核", this.labordirectCaseData.body)

      for (let i in this.labordirectCaseData.body) {
        if (this.bonita_task_id == this.labordirectCaseData.body[i].bonita_task_id) {
          this.onelaborData.push(this.labordirectCaseData.body[i])
        }
      }
      console.log("取得單一工時異動審核 onelaborData", this.onelaborData[0])


    })
  }

  /** 
  * @brief 產生一筆新的transaction_record資料格式
  *
  * @param p_id 專案id
  * @param actor 紀錄之動作
  * @param content 紀錄之行為
  * @param remark 紀錄之內容
  * @return 回傳有無成功新增. */
  uploadTransactionRecordRequests(p_id: any, actor: any, content: any, remark: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = p_id
    trManagerDatas['actor'] = actor //'PM送審'
    trManagerDatas['content'] = content // '專案'
    trManagerDatas['creater'] = this.userJson.account_id
    trManagerDatas['remark'] = remark //this.remark
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


  /** 
  * @brief 審核單據
  *
  * @param hm_id 異動工時id
  * @param account 使用者帳號
  * @param bonita_task_id Bonita任務id
  * @param gmApprovalStatus 同意/退回 json檔
  * @return 回傳有無成功取得. */
  ReviewRes:any
  submitPmCase(hm_id:any):void {
    //let modelInput:any = { 'modelInput' : {} }
    let gmApprovalStatus:any = { 'hm_id':hm_id,'status' : true}
    //modelInput['modelInput'] = gmApprovalStatus
    console.log(gmApprovalStatus)
    console.log(JSON.stringify(gmApprovalStatus))

    Swal.fire({
      title: '您是否確定要同意此異動?',
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
        this.HttpApiService.LaborReviewTask(this.userJson.account,this.bonita_task_id,gmApprovalStatus).subscribe(
          res => {
            console.log(res)
            if(res.code == 200 && 204 ){
              //紀錄
              this.uploadTransactionRecordRequests(this.hm_id, '直屬主管', '同意異動工時', this.remark)
              Swal.fire(
                {
                  title: `此工時異動已通過！`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                  reverseButtons: true
                }
              ).then((result) =>{
                if (result.isConfirmed) {
                  window.location.assign(`main/laborhour-direct-audit`);
                }
              })
            }else{
              Swal.fire(
                {
                  title: `異動通過失敗，請重試！`,
                  icon: 'error',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#FF5151',
                  reverseButtons: true
                }
              )
            }
          },
          (err: any) => {
            console.log('err:', err);
          }
        )
      }
    })
  }

  // status_tpye_id:any //退回：e15e56c5-c2f4-45e9-9734-fe061a2469ff
  /** 
  * @brief 退回單據
  *
  * @param hm_id 異動工時id
  * @param account 使用者帳號
  * @param bonita_task_id Bonita任務id
  * @param gmApprovalStatus 同意/退回 json檔
  * @return 回傳有無成功取得. */
  sendBackStatusType:any = 'e15e56c5-c2f4-45e9-9734-fe061a2469ff'
  sendBackPmCase(hm_id:any){
    let gmApprovalStatus:any = { 'status' : false}
    console.log(gmApprovalStatus)

    let statusType:any = { 'status_type_id' : this.sendBackStatusType }
    console.log(statusType)
    console.log("hm_id",hm_id)
    console.log(JSON.stringify(gmApprovalStatus))

    Swal.fire({
      title: '您是否確定要退回此異動?',
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
        this.HttpApiService.LaborReviewTask(this.userJson.account,this.bonita_task_id,gmApprovalStatus).subscribe(
          res => {
            console.log("退回該工時res",res)
            if(res.code == 200 && 204 ){
              this.HttpApiService.UpdatedLaborStatus(hm_id,statusType).subscribe(
                res => {
                  console.log("修改工時狀態回退回res",res)
                  if(res.code == 200 && 204 ){
                    //紀錄
                    this.uploadTransactionRecordRequests(this.hm_id, '直屬主管', '退回異動工時', this.remark)
                    Swal.fire(
                      {
                        title: `此工時異動已退回！`,
                        icon: 'success',
                        confirmButtonText: '確認!',
                        confirmButtonColor: '#64c270',
                        reverseButtons: true
                      }
                    ).then((result) =>{
                      if (result.isConfirmed) {
                        window.location.assign(`main/laborhour-direct-audit`);
                      }
                    })
                  }else{
                    Swal.fire(
                      {
                        title: `退回失敗，請重試！`,
                        icon: 'error',
                        confirmButtonText: '確認!',
                        confirmButtonColor: '#FF5151',
                        reverseButtons: true
                      }
                    ).then((result) =>{
                      if (result.isConfirmed) {
                        window.location.assign(`main/laborhour-direct-audit`);
                      }
                    })
                  }
                },
                (err: any) => {
                  console.log('err:', err);
                  Swal.fire(
                    {
                      title: `退回失敗，請重試！`,
                      icon: 'error',
                      confirmButtonText: '確認!',
                      confirmButtonColor: '#FF5151',
                      reverseButtons: true
                    }
                  ).then((result) =>{
                    if (result.isConfirmed) {
                      window.location.assign(`main/laborhour-direct-audit`);
                    }
                  })
                }
              )
              
            }else{
              Swal.fire(
                {
                  title: `退回失敗，請重試！`,
                  icon: 'error',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#FF5151',
                  reverseButtons: true
                }
              ).then((result) =>{
                if (result.isConfirmed) {
                  window.location.assign(`main/laborhour-direct-audit`);
                }
              })
            }
          },
          (err: any) => {
            console.log('err:', err);
          }
        )
      }
    })
  }
}
