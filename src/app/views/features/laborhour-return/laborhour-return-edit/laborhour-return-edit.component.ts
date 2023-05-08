import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/api/http-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Component({
  selector: 'app-laborhour-return-edit',
  templateUrl: './laborhour-return-edit.component.html',
  styleUrls: ['./laborhour-return-edit.component.scss']
})
export class LaborhourReturnEditComponent implements OnInit {

  addForm: FormGroup;
  workNature_option: any[] = ['設計', '組裝', '試機', '維修', '出差', '教育訓練', '開會', '客戶', '資料整理', '銀行', '待專案啟動', 'PT人員', '其他'];
  workTime_option: any[] = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  laborHour_option: any[] = ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];

  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.addForm = this.fb.group({
      // origin_id: new FormControl(),
      // category: new FormControl(),
      title: new FormControl(),
      content: new FormControl(),
      nature: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      laborhour: new FormControl(),
    });
  }



  bonita_case_id: any
  ngOnInit(): void {
    this.getUserJson()
    this.bonita_case_id = this.route.snapshot.paramMap.get('bonita_case_id');
    console.log(this.bonita_case_id)

    //取得個人已提報異動工時
    this.getByUserIdList(this.userJson.account_id)

    //取得重送工時id
    this.getLaborResendTaskId()

    //取得異動紀錄重新送審資料
    this.getByUserReIdList(this.userJson.account, this.bonita_case_id)

  }

  userJson: any
  getUserJson(): void {
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
  }

  title: any
  content: any
  nature: any
  date_for_start: any
  time_for_start: any
  time_for_end: any
  laborhour: any

  sendBackStatusType: any = '7278b671-ad00-4ef2-b608-376a1f8c3967' //待審核
  hrs = -(new Date().getTimezoneOffset() / 60)
  /** 
  * @brief 新增異動工時資料
  * @param hm_id 欲異動工時id
  * @return 回傳有無成功更新. */
  updateLaborHourModifyRequest(hm_id: any) {
    let gmApprovalStatus: any = { 'status': false }
    console.log(gmApprovalStatus)

    let statusType: any = { 'status_type_id': this.sendBackStatusType }
    console.log(statusType)
    let uploadLaborHourModifyDatas: any = {}
    // uploadLaborHourModifyDatas['hour_id'] = this.h_id
    // uploadLaborHourModifyDatas['category'] = this.category;
    uploadLaborHourModifyDatas['title'] = this.onelaborData[0].title;
    uploadLaborHourModifyDatas['content'] = this.onelaborData[0].content;
    uploadLaborHourModifyDatas['nature'] = this.onelaborData[0].nature;
    this.date_for_start = new Date(this.onelaborData[0].date_for_start)
    this.date_for_start.setHours(this.date_for_start.getHours() + this.hrs);
    uploadLaborHourModifyDatas['date_for_start'] = this.date_for_start;
    uploadLaborHourModifyDatas['time_for_start'] = Number(this.onelaborData[0].time_for_start);
    uploadLaborHourModifyDatas['time_for_end'] = Number(this.onelaborData[0].time_for_end);
    uploadLaborHourModifyDatas['laborhour'] =parseFloat(String(this.onelaborData[0].laborhour));
    // uploadLaborHourModifyDatas['laborhour'] = Number(this.onelaborData[0].time_for_end) - Number(this.onelaborData[0].time_for_start);
    uploadLaborHourModifyDatas['creater'] = this.userJson.account_id
    console.log(uploadLaborHourModifyDatas);//console資料
    this.HttpApiService.updateLaborHourModifyRequest(hm_id, uploadLaborHourModifyDatas).subscribe(
      res => {
        console.log("修改異動工時res", res)
        console.log("修改異動工時者", this.userJson.account)
        if (res.code !== 200) {
          // this.modify_status = false
          // this.SwalService.uploadTransactionRecordRequests(this.tu_id,'TM提報失敗','專案任務異動工時',this.userJson.account_id)
          Swal.fire(
            {
              title: `異動工時送審失敗`,
              text: '請檢查內容是否有正確填寫！',
              icon: 'error',
              confirmButtonText: '確認!',
              confirmButtonColor: '#FF5151',
              reverseButtons: true
            }
          ).then((result) => {
            if (result.isConfirmed) {
              location.href = 'main/laborhour-return'
            }
          })
        } else if (res.code == 200) {
          // this.SwalService.uploadTransactionRecordRequests(this.tu_id,'TM提報','專案任務異動工時',this.userJson.account_id)
          //改狀態 及 送審
          this.HttpApiService.getLaborBonitaCaseList(this.userJson.account, this.bonita_case_id).subscribe(res => {
            console.log("labor_hour_modify res", res.body)
            this.HttpApiService.LaborReviewTask(this.userJson.account, res.body, gmApprovalStatus).subscribe(
              res => {
                console.log("重新送審工時res", res)

              })
          })


          Swal.fire(
            {
              title: `異動工時已成功送審`,
              text: '待直屬主管審核方能修改工時！',
              icon: 'success',
              confirmButtonText: '確認!',
              confirmButtonColor: '#64c270',
              reverseButtons: true
            }
          ).then((result) => {
            if (result.isConfirmed) {
              this.HttpApiService.UpdatedLaborStatus(hm_id, statusType).subscribe(
                res => {
                  console.log("修改工時狀態待審核res", res)
                  location.href = 'main/laborhour-return'
                })

            }
          })
        }
      }
    )
  }
  //個人已提報異動工時
  userLaborHourModifyData: any
  userLaborHourModifyTotal: any
  //選取單一筆
  onelaborData: any[] = []
  /** 
  * @brief 取得個人已提報異動工時
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getByUserIdList(userId: any) {
    this.HttpApiService.getByUserIdListRequest(userId).subscribe(res => {
      console.log("labor_hour_modify res", res.body.labor_hour_modify)
      this.userLaborHourModifyData = res.body.labor_hour_modify
      console.log("個人已提報異動工時", this.userLaborHourModifyData)
      this.userLaborHourModifyTotal = res.body.labor_hour_modify.length
      console.log("個人已提報異動工時筆數", this.userLaborHourModifyTotal)

      for (let i in this.userLaborHourModifyData) {
        if (this.bonita_case_id == this.userLaborHourModifyData[i].bonita_case_id) {
          this.onelaborData.push(this.userLaborHourModifyData[i])
        }
      }
      console.log("取得單一個人已提報異動工時 onelaborData", this.onelaborData[0].hm_id)

      this.getTopManagerReturn(this.onelaborData[0].hm_id)
    })
  }

  userReLaborHourModifyData: any
  userReLaborHourModifyTotal: any
  /** 
  * @brief 獲取使用者可執行的單 (取得異動紀錄重新送審的工時資料)
  * @param account 使用者帳號
  * @param bonita_case_id bonita重送任務id
  * @return 回傳有無成功取得. */
  getByUserReIdList(account: any, bonita_case_id: any) {
    this.HttpApiService.getLaborBonitaCaseList(account, bonita_case_id).subscribe(res => {
      console.log("labor_hour_modify res", res.body)
      // this.userReLaborHourModifyData = res.body.labor_hour_modify
      // console.log("個人異動紀錄重新送審", this.userReLaborHourModifyData)
      // this.userReLaborHourModifyTotal = res.body.labor_hour_modify.length
      // console.log("個人異動紀錄重新送審", this.userReLaborHourModifyTotal)
    })
  }

  //宣告訪問紀錄interview的dataSource  PM
  interviewDataSource = new MatTableDataSource();
  interviewcol: string[] = ['create_time', 'creater_name', 'actor', 'content'];
  interviewDatas: any
  TopManagerReturnData: any[] = []
  /** 
  * @brief 取得主管送審回覆意見
  * @param hm_id 異動工時id
  * @return 回傳有無成功取得. */
  getTopManagerReturn(id:any): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(id).subscribe(res => {
      console.log(res)
      this.TopManagerReturnData.push(res.body.transaction_record[0])
      console.log(this.TopManagerReturnData)
    })
  }

  task_id: any
    /** 
  * @brief 取得重送工時id
  * @param account 使用者帳號
  * @param bonita_case_id bonita單據id
  * @return 回傳有無成功取得. */
  getLaborResendTaskId() {
    this.HttpApiService.getLaborBonitaCaseList(this.userJson.account, this.bonita_case_id).subscribe(
      res => {
        this.task_id = res.body
        console.log("重新送審的taskId", this.task_id)
      }
    )
  }
}
