import { FileUploadDialogComponent } from './../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';
import { ProjectInterviewDialogComponent } from './../../pm-return/pm-return-edit/project-interview-dialog/project-interview-dialog.component';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpApiService } from './../../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-pm-audit-edit',
  templateUrl: './pm-audit-edit.component.html',
  styleUrls: ['./pm-audit-edit.component.scss']
})
export class PmAuditEditComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  editProjectForm: FormGroup; //編輯project
  editRecordForm: FormGroup;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.editProjectForm = this.fb.group({
      status: new FormControl()
    });

    this.editRecordForm = this.fb.group({
      remark: new FormControl()
    });
  }

  bonita_task_id:any = ''
  p_id: any = '';
  code: any = '';
  name: any = '';
  customer_name: any = '';
  date_for_start: any = '';
  date_for_end: any = '';
  serviceman_name: any = '';
  salesman_name: any = '';

  //紀錄
  remark: any = '';

  userJson:any

  getUserJson():void{
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
  }

  ngOnInit(): void {
    this.editRecordForm = this.fb.group({
      //status: new FormControl(),
      remark: new FormControl(),
    });
    //取得人員資訊
    this.getUserJson()

    //取得bonita_task_id(審核用task_id)
    this.bonita_task_id = this.route.snapshot.paramMap.get('bonita_task_id')
    console.log("bonita_task_id",this.bonita_task_id) //61445

    //取得該id資料
    this.getOneProject();

    //取得紀錄資料
    this.getPMrecord()
  }

  projectDatas: any;
  /** 
  * @brief 取得單一專案資料
  *
  * @param p_id 專案id
  * @return 回傳有無成功取得. */
  getOneProject(): void {
    //取得id
    this.p_id = this.route.snapshot.paramMap.get('p_id');
    //print id
    //console.log(this.p_id);
    //server getOne
    this.HttpApiService.getOneProjectListRequest(this.p_id).
      subscribe(project => {
        this.projectDatas = project;
        console.log("取得的id=")
        console.log(this.projectDatas.body)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //送審按鈕
  pmReviewRes:any
  /** 
  * @brief 將單據送審
  *
  * @param p_id 專案id
  * @param account 使用者帳號
  * @param bonita_task_id Bonita任務id
  * @param modelInput 同意/退回 json檔
  * @return 回傳有無成功取得. */
  submitPmCase():void {
    //let modelInput:any = { 'modelInput' : {} }
    let gmApprovalStatus:any = { 'gmApprovalStatus' : true}
    //modelInput['modelInput'] = gmApprovalStatus
    console.log(gmApprovalStatus)
    console.log(JSON.stringify(gmApprovalStatus))

    if(this.remark == '' || this.remark == undefined || this.remark == null){
      Swal.fire(
        {
          title: `回覆意見未填寫`,
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
          reverseButtons: true
        }
      )
    }else{
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
          /*動作程式 */
          this.HttpApiService.PmReviewCase(this.userJson.account,this.bonita_task_id,gmApprovalStatus).subscribe(res => {
            console.log(this.userJson.account,this.bonita_task_id)
            console.log("送審res",res)
            this.pmReviewRes = res
            if(this.pmReviewRes.code == 200 && 204 ){
              this.uploadTransactionRecordRequests(this.p_id,'確認完工','最高主管送審專案')
  
              let projectManagerDatas: any = {};
              projectManagerDatas['status'] = "已完工";
              projectManagerDatas['date_for_start'] = this.projectDatas.body.date_for_start;
              projectManagerDatas['date_for_end'] = this.projectDatas.body.date_for_end;
              projectManagerDatas['date_for_delivery'] = this.projectDatas.body.date_for_delivery;
              this.HttpApiService.updateProjectRequest_t(this.p_id,projectManagerDatas).
                subscribe(project => {
                  console.log('project修改狀態成功',project)
                  //location.href = '/main/projectinfo/project-manager'
                },
                  (err: any) => {
                    console.log('err:', err);
                  }
                );
  
              Swal.fire(
                {
                  title: `此專案已確認完工！`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                  reverseButtons: true
                }
              ).then((result) =>{
                if (result.isConfirmed) {
                  window.location.assign(`main/pm-audit`);
                }
              })
            }else{
              this.uploadTransactionRecordRequests(this.p_id,'確認完工失敗','最高主管送審專案')
              Swal.fire(
                {
                  title: `完工失敗，請重試！`,
                  icon: 'error',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#FF5151',
                  reverseButtons: true
                }
              ).then((result) =>{
                if (result.isConfirmed) {
                  window.location.assign(`main/pm-audit`);
                }
              })
            }
            
          },
          (err: any) => {
            console.log('err:', err);
            this.uploadTransactionRecordRequests(this.p_id,'確認完工失敗','最高主管送審專案')
            Swal.fire(
              {
                title: `完工失敗，請重試！`,
                text:'伺服器發生未知錯誤，請聯絡網管人員',
                icon: 'error',
                confirmButtonText: '確認!',
                confirmButtonColor: '#FF5151',
                reverseButtons: true
              }
            ).then((result) =>{
              if (result.isConfirmed) {
                window.location.assign(`main/pm-audit`);
              }
            })
          })
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            {
              title:'已取消',
              text:'此項目未被送出',
              icon:'error',
              confirmButtonText: '確認!',
              confirmButtonColor: '#FF5151',
            }
          )
        }
      })
    }
    
    
  }

  //退回按鈕
  pmBackRes:any
  /** 
  * @brief 將單據退回
  *
  * @param p_id 專案id
  * @param account 使用者帳號
  * @param bonita_task_id Bonita任務id
  * @param modelInput 同意/退回 json檔
  * @return 回傳有無成功取得. */
  sendBackPmCase():void {
    //let modelInput:any = { 'modelInput' : {} }
    let gmApprovalStatus:any = { 'gmApprovalStatus' : false}
    //modelInput['modelInput'] = gmApprovalStatus
    console.log(gmApprovalStatus)
    console.log(JSON.stringify(gmApprovalStatus))

    if(this.remark == '' || this.remark == undefined || this.remark == null){
      Swal.fire(
        {
          title: `退回意見未填寫`,
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
          reverseButtons: true
        }
      )
    }else{
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
          this.HttpApiService.PmReviewCase(this.userJson.account,this.bonita_task_id,gmApprovalStatus).subscribe(res => {
            console.log(this.userJson.account,this.bonita_task_id)
            console.log("res",res)
            this.pmBackRes = res
            if(this.pmBackRes.code == 200 && 204){
              this.uploadTransactionRecordRequests(this.p_id,'退回','送審專案',this.remark)
              let projectManagerDatas: any = {};
              projectManagerDatas['status'] = "執行中";
              projectManagerDatas['date_for_start'] = this.projectDatas.body.date_for_start;
              projectManagerDatas['date_for_end'] = this.projectDatas.body.date_for_end;
              projectManagerDatas['date_for_delivery'] = this.projectDatas.body.date_for_delivery;
              this.HttpApiService.updateProjectRequest_t(this.p_id,projectManagerDatas).
              subscribe(project => {
                console.log('修改project狀態成功',project)
                //location.href = '/main/projectinfo/project-manager'
              },
                (err: any) => {
                  console.log('err:', err);
                }
              );
  
              Swal.fire(
                {
                  title: `此專案已退回！`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                  reverseButtons: true
                }
              ).then((result) =>{
                if (result.isConfirmed) {
                  window.location.assign(`main/pm-audit`);
                }
              })
            }else{
              this.uploadTransactionRecordRequests(this.p_id,'退回失敗','送審專案',this.remark)
              Swal.fire(
                {
                  title: `完工失敗，請重試！`,
                  text:'伺服器發生未知錯誤，請聯絡網管人員',
                  icon: 'error',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                  reverseButtons: true
                }
              ).then((result) =>{
                if (result.isConfirmed) {
                  window.location.assign(`main/pm-audit`);
                }
              })
            }
            
            //location.href = '/main/pm-audit'
          },
          (err: any) => {
            this.uploadTransactionRecordRequests(this.p_id,'退回失敗','送審專案',this.remark)
            console.log('err:', err);
            Swal.fire(
              {
                title: `完工失敗，請重試！`,
                text:'伺服器發生未知錯誤，請聯絡網管人員',
                icon: 'error',
                confirmButtonText: '確認!',
                confirmButtonColor: '#64c270',
                reverseButtons: true
              }
            ).then((result) =>{
              if (result.isConfirmed) {
                window.location.assign(`main/pm-audit`);
              }
            })
          })
          
          //location.href = '/main/pm-audit'
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title:'已取消',
            text:'此項目未被送出',
            icon:'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
          }
          )
        }
      })
    }
    
    
  }

  /** 
  * @brief 更新專案資料
  *
  * @param status 專案狀態
  * @return 回傳有無成功更新. */
  updateProject(status: any): void {
    let projectManagerDatas: any = {};
    projectManagerDatas['p_id'] = this.projectDatas.message.p_id;//對照p_id
    projectManagerDatas['code'] = this.projectDatas.message.code;
    projectManagerDatas['type'] = this.projectDatas.message.type;
    projectManagerDatas['name'] = this.projectDatas.message.name;
    projectManagerDatas['customer_name'] = this.projectDatas.message.customer_name;
    projectManagerDatas['date_for_start'] = this.projectDatas.message.date_for_start;
    projectManagerDatas['date_for_end'] = this.projectDatas.message.date_for_end;
    projectManagerDatas['projectman_name'] = this.projectDatas.message.projectman_name;
    projectManagerDatas['serviceman_name'] = this.projectDatas.message.serviceman_name;
    projectManagerDatas['salesman_name'] = this.projectDatas.message.salesman_name;
    projectManagerDatas['project_member'] = this.projectDatas.message.project_member;
    if (status == "start") {
      projectManagerDatas['status'] = "執行中";
    }
    console.log("新資料")
    console.log(projectManagerDatas);
    this.HttpApiService.updateProjectRequest(projectManagerDatas).
      subscribe(project => {
        location.href = '/main/projectinfo/project-manager'
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

   /** 
  * @brief 產生一筆新的transaction_record資料格式
  *
  * @param p_id 專案id
  * @param actor 紀錄之動作
  * @param content 紀錄之行為
  * @param remark 紀錄之內容
  * @return 回傳有無成功新增. */
  uploadTransactionRecordRequests(p_id: any,actor:any,content:any,remark?:any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = p_id
    trManagerDatas['actor'] = actor
    trManagerDatas['content'] = content
    trManagerDatas['remark'] = remark
    trManagerDatas['creater'] = this.userJson.account_id
    console.log(trManagerDatas)
    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
          .subscribe(taskuserRequest => {
            console.log(taskuserRequest)
            console.log('成功紀錄')
          },
            (err: any) => {
              console.log('err:', err);
            }
          );
  }

  /** 
  * @brief 取得PM專案經理送審回覆意見
  *
  * @param p_id 專案id
  * @return 回傳有無成功取得. */
  pmReocrdData:any[] = []
  getPMrecord():void{
    this.HttpApiService.getOneTransactionRecordRequest_t(this.p_id).subscribe(res =>{
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)
      
      for(let i in this.interviewDatas){
        if(this.interviewDatas[i].actor == "PM送審"){
          this.pmReocrdData.push(this.interviewDatas[i].remark)
          this.pmReocrdData.push(this.interviewDatas[i].create_time)
        }
      }
      console.log('pm 送審回覆意見',this.pmReocrdData)
    })
  }

  projectLink(){
    location.href=`/main/projectinfo/project-manager-edit/${this.projectDatas.body.p_id}`
  }


  //紀錄彈跳視窗
  doPostInterview(item: any): void {
    this.dialog.open(ProjectInterviewDialogComponent, {
      data: {
        p_id: item
      }
    });
  }

  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();
  interviewcol: string[] = ['actor','content', 'creater_name', 'create_time'];
  //取得訪問紀錄interview資料--------------------------------------------------------
  interviewRequest: any;
  interviewDatas: any;
  getInterviewRequest(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.p_id).subscribe(res =>{
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)
      this.interviewDataSource.data = this.interviewDatas
      this.interviewDataSource.sort = this.sort
      this.interviewDataSource.paginator = this.paginator
    })
  }

  interBtn = false
  //紀錄按鈕狀態
  interviewBtnStatus():void{
    this.interBtn = !this.interBtn
    this.getInterviewRequest()
  }

  test(): void {
    console.log(this.remark)
  }

  //離開修改頁面
  // 選擇單項
  cancelItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.history.back();

  }

  //編輯任務彈跳視窗
  doPostFile(): void {
    this.dialog.open(FileUploadDialogComponent, {
      data: {
        documents_id: this.p_id
      }
    });
  }
}
