import { SwalEventService } from 'src/app/api/swal-event.service';
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpApiService } from 'src/app/api/http-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2'
import { parse } from 'path';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-person-daily-work-modify',
  templateUrl: './person-daily-work-modify.component.html',
  styleUrls: ['./person-daily-work-modify.component.scss']
})
export class PersonDailyWorkModifyComponent implements OnInit {

  addForm: FormGroup;
  selectForm: FormGroup;
  displayedColumns: string[] = ['nature', 'h_title', 'date_for_start', 'time_for_start', 'time_for_end', 'action_edit', 'action_delete', 'action_file'];
  laborHourDataSource = new MatTableDataSource();
  totalCount!: number;
  t_id: any
  tu_id: any
  origin: any
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private SwalService: SwalEventService,
  ) {
    this.selectForm = this.fb.group({
      origin_id: new FormControl(),
      category: new FormControl()
    });
    this.addForm = this.fb.group({
      //origin_id: new FormControl(),
      //category: new FormControl(),
      h_title: new FormControl(),
      content: new FormControl(),
      nature: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      laborhour: new FormControl(),
    });
  }

  userJson: any
  ngOnInit(): void {
    // console.log(window.localStorage.getItem(TOKEN_KEY))
    // console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
    //this.getLaborHourRequest()
    this.selectForm = new FormGroup({
      origin_id: new FormControl(),
      category: new FormControl()
    });
    this.addForm = new FormGroup({
      //origin_id: new FormControl(),
      //category: new FormControl(),
      h_title: new FormControl(),
      content: new FormControl(),
      nature: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      laborhour: new FormControl(),
    });
  }

  h_id = ''
  category = ''
  h_title = ''
  content = ''
  nature = ''
  date_for_start: any
  time_for_start = 17
  time_for_end = 19
  laborhour = this.time_for_end - this.time_for_start

  origin_id = ''
  workType_option: any[] = [
    {
      key: "-",
      value: "",
    },
    {
      key: "客需單",
      value: "443bd223-d750-409c-961a-93375052b186",
    },
    {
      key: "客需單會簽",
      value: "9CB49D83-74CF-4E14-9288-3B735EA0687E",
    },
    {
      key: "產銷專案",
      value: "5451f88e-6d83-44c6-96c3-cd1d049249f7",
    },
    {
      key: "專案任務",
      value: "1e6913f5-55be-413a-94a5-68f8cc67d5b2",
    },
    {
      key: "會議",
      value: "e1494235-02a9-4a2f-b112-22661194e89a",
    },
    {
      key: "待辦事項",
      value: "05410602-165a-4eab-8938-54392fdd571f",
    }/*,
    {
      key: "治具需求單",
      value: "",
    },
    {
    key: "會議",
    value: "",
    }, 
    {
      key: "CRM",
      value: "",
    }*/
  ];
  workNature_option: any[] = ['設計', '組裝', '試機', '維修', '出差', '教育訓練', '開會', '客戶', '資料整理', '銀行', '待專案啟動', 'PT人員', '其他'];
  workTime_option: any[] = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  laborHour_option: any[] = ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];


  LaborHourRequest: any
  hrs = -(new Date().getTimezoneOffset() / 60)
  /** 
  * @brief 新增工時
  *
  * @param LaborHourData 工時資料
  * @return 回傳有無成功新增. */
  addLaborHourRequest(): void {
    //接收工時資料之陣列
    let LaborHourData: any = {};
    LaborHourData['category'] = this.category;
    LaborHourData['title'] = this.h_title;
    LaborHourData['content'] = this.content;
    LaborHourData['nature'] = this.nature;
    this.date_for_start = new Date(this.date_for_start)
    this.date_for_start.setHours(this.date_for_start.getHours() + this.hrs);
    LaborHourData['date_for_start'] = this.date_for_start;
    LaborHourData['time_for_start'] = Number(this.time_for_start);
    LaborHourData['time_for_end'] = Number(this.time_for_end);
    // LaborHourData['laborhour'] = Number(this.time_for_end) - Number(this.time_for_start);
    LaborHourData['laborhour'] = parseFloat(String(this.laborhour));
    LaborHourData['creater'] = this.userJson.account_id

    // console.log(LaborHourData);//console資料
    //呼叫新增公時api並帶入工時資料陣列
    this.HttpApiService.uploadLaborHourRequest(LaborHourData).subscribe(
      res => {
        this.LaborHourRequest = res
        console.log("工時提報成功", res)
        if (this.LaborHourRequest.code == 200) {
          //this.category = ''
          this.h_title = ''
          this.content = ''
          this.nature = ''
          this.date_for_start = ''
          this.time_for_start = 17
          this.time_for_end = 19
          this.laborhour = this.time_for_end - this.time_for_start
          this.getLaborHourRequest(this.category)
          this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報', '專案任務工時', this.userJson.account_id)
          this.btnStatus = false;

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: '提報成功'
          })
        } else {
          this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報失敗', '專案任務工時', this.userJson.account_id)
          Swal.fire(
            {
              title: `工時提報失敗`,
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
        this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報失敗', '專案任務工時', this.userJson.account_id)
      }
    );
    //slocation.href='main/task-return/171/1';
  }

  /** 
  * @brief 取得專案工時列表
  *
  * @param account_id 使用者帳號
  * @param category 工時類別
  * @return 回傳有無成功取得. */
  laborHourRequest: any;
  laborHourDatas: any;
  getLaborHourRequest(category: any): void {
    console.log(category)
    this.HttpApiService.getLaborHourByCategory(this.userJson.account_id, category)
      .subscribe(laborHourRequest => {
        this.laborHourDatas = laborHourRequest.body
        this.showData(this.laborHourDatas);
        console.log(this.laborHourDatas)
        if (this.laborHourDatas.length == 0) {
          Swal.fire(
            {
              title: `此項目還未提報工時資料`,
              icon: 'warning',
              confirmButtonText: '確認!',
              confirmButtonColor: '#FF5151',
              reverseButtons: true
            }
          )
        }
        //console.log(typeof (this.laborHourDatas[0].time_for_start))
      });
  }

  // 顯示資料
  labortotalCount: any;
  showData(data: any) {
    console.log(data)
    this.laborHourDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.laborHourDataSource.sort = this.sort;
    this.laborHourDataSource.paginator = this.paginator;
  }

  
  // selectedValue(): void {
  //   this.h_title = ''
  //   this.content = ''
  //   this.nature = ''
  //   this.date_for_start = ''
  //   this.time_for_start = 17
  //   this.time_for_end = 19
  //   this.laborhour = this.time_for_end - this.time_for_start
  //   this.getTaskRequestByOriginId()

  // }

  /** 
  * @brief 選擇工時類別
  *
  * @return 回傳有無成功取得. */
  selectedTidOriginValue(): void {
    this.getTidValue()
  }

  /** 
  * @brief 選擇該工時類別之項目
  *
  * @return 回傳有無成功取得. */
  selectedTidValue(): void {
    this.getLaborHourRequest(this.category)
    console.log(this.category)
  }

  tId_option: any[] = [];
  tIdDatas: any
  meetDatas: any
  /** 
  * @brief 獲取該工時項目以提報工時列表
  *
  * @param origin_id 該工時類別id
  * @param account_id 使用者id
  * @return 回傳有無成功取得. */
  getTidValue(): void {
    this.tId_option = []
    if (this.origin_id == '1e6913f5-55be-413a-94a5-68f8cc67d5b2') { // 專案
      this.HttpApiService.getTaskRequestByOriginIdUserId(this.origin_id, this.userJson.account_id, 1)
        .subscribe(TaskRequest => {
          console.log(TaskRequest)
          this.task_option = [];
          this.tIdDatas = TaskRequest.body.task
          console.log(this.tIdDatas)
          if (this.tIdDatas.length == 0) {
            Swal.fire(
              {
                title: `此項目類別未提報工時!`,
                icon: 'info',
                confirmButtonText: '確認!',
                confirmButtonColor: '#FF5151',
                reverseButtons: true
              }
            )
          } else {
            for (let i in this.tIdDatas) {

              this.tId_option.push({ super_name: this.tIdDatas[i].p_name, sub_name: this.tIdDatas[i].t_name, value: this.tIdDatas[i].tu_id, t_id: this.tIdDatas[i].t_id })
              this.tId_option = [...new Set(this.tId_option)]
            }
          }

        });
    } else if (this.origin_id == 'e1494235-02a9-4a2f-b112-22661194e89a') { //會議
      this.task_option = [];
      this.HttpApiService.getMeetingListUserByUserID(this.userJson.account_id, 1).subscribe(
        res => {
          console.log(res)
          this.meetDatas = res.body.meeting
          for (let i in this.meetDatas) {
            this.tId_option.push({ sub_name: this.meetDatas[i].m_name, value: this.meetDatas[i].m_id })
          }
          this.tId_option = [...new Set(this.tId_option)]
          console.log(this.tId_option)
        }
      )
    } else {
      this.HttpApiService.getTaskRequestByOriginIdUserId(this.origin_id, this.userJson.account_id, 1)
        .subscribe(TaskRequest => {
          console.log("TaskRequest", TaskRequest)
          this.task_option = [];
          this.taskDatas = TaskRequest.body.task
          console.log("TaskRequest.body.task", this.taskDatas)
          for (let i in this.taskDatas) {
            this.tId_option.push({ super_name: this.taskDatas[i].p_name, sub_name: this.taskDatas[i].t_name, value: this.taskDatas[i].tu_id, tID: this.taskDatas[i].t_id })
          }
          this.tId_option = [...new Set(this.tId_option)]
          console.log(this.tId_option)
        });
    }

    console.log(this.tId_option)
  }
  //

  task_option: any[] = [];
  taskDatas: any;
  /** 
  * @brief 取得專案負責人列表(option)
  *
  * @param origin_id 該工時類別id
  * @param account_id 使用者id
  * @return 回傳有無成功取得. */
  getTaskRequestByOriginId(): void {
    this.HttpApiService.getTaskRequestByOriginIdUserId(this.origin_id, this.userJson.account_id, 1)
      .subscribe(TaskRequest => {
        console.log(TaskRequest)
        this.task_option = [];
        this.taskDatas = TaskRequest.body.task
        console.log(this.taskDatas)
        for (let i in this.taskDatas) {
          this.task_option.push({ p_name: this.taskDatas[i].p_name, key: this.taskDatas[i].t_name, value: this.taskDatas[i].tu_id, t_id: this.taskDatas[i].t_id })
          this.task_option = [...new Set(this.task_option)]
        }
      });
    console.log(this.task_option)
  }

  laborHourData: any
  day: any
  modify_status = false
  /** 
  * @brief 編輯工時彈跳視窗 判斷是否超過可自行修改之天數
  *
  * @param h_id 工時id
  * @return 回傳有無成功更新. */
  doPostEdit(item: any): void {
    this.btnEditClick()
    this.h_id = item
    this.HttpApiService.getOneLaborHourRequest(this.h_id)
      .subscribe(LaborhourRequest => {
        this.laborHourData = LaborhourRequest.body
        this.category = this.laborHourData.category
        this.h_title = this.laborHourData.title
        this.content = this.laborHourData.content
        this.nature = this.laborHourData.nature
        this.date_for_start = this.laborHourData.date_for_start
        this.time_for_start = this.laborHourData.time_for_start
        this.time_for_end = this.laborHourData.time_for_end
        this.laborhour = this.laborHourData.laborhour

        console.log("欲更改工時提報日",this.laborHourData.date_for_start)

        //一天的毫秒數
        let oneDayLong = 24 * 60 * 60 * 1000

        //創建今日日期
        this.day = new Date()
        //今日的毫秒數
        var today = Date.parse(this.day) 
        console.log("今日日期",this.day)
        console.log("today", today)

        //宣告提報日日期
        var startDay = this.laborHourData.date_for_start
        //把提報日的日期轉為毫秒
        startDay = Date.parse(startDay)
        console.log("startDay", startDay)

        //計算從 提報工時日 到 今日 的天數
        var rangeDay = (today - startDay) / oneDayLong

        console.log("today - startDay =", Math.floor(rangeDay)) // 向下取整數

        //如果大於3日就需異動工時
        if (Math.floor(rangeDay) > 3) {

          //將按鈕狀態改為異動工時之狀態
          this.modify_status = true

          Swal.fire(
            {
              title: `此筆工時需送審異動送審`,
              text: '超過可自行修改天數！',
              icon: 'warning',
              confirmButtonText: '確認!',
              confirmButtonColor: '#64c270',
              reverseButtons: true
            }
          )

        } else {

          //維持自行更新工時之狀態
          this.modify_status = false
        }
      });
  }


  /** 
  * @brief 刪除工時
  *
  * @param labor_id 工時id
  * @return 回傳有無成功取得. */
  deleteLaborHour(labor_id:any){
    Swal.fire({
      title: '您是否確定要刪除此工時?',
      text: "刪除後無法恢復!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.HttpApiService.deleteLaborHourRequest(labor_id).subscribe(
          res => {
            console.log("刪除工時res",res)
            if(res.code == 200){
              Swal.fire(
                {
                  title: `已刪除`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                  reverseButtons: true
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  this.getLaborHourRequest(this.category)
                }
              })

              
            }else{
              Swal.fire(
                {
                  title: `刪除失敗`,
                  icon: 'warning',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                }
              )
            }
          }
        )
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          '已取消!',
          '此工時未被刪除',
          'error'
        )
      }
    })

    
  }

  /** 
  * @brief 更新&工時
  *
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  updateLaborHourRequest(): void {
    let LaborHourData: any = {};//接收資料的陣列
    LaborHourData['category'] = this.category;
    LaborHourData['title'] = this.h_title;
    LaborHourData['content'] = this.content;
    LaborHourData['nature'] = this.nature;
    this.date_for_start = new Date(this.date_for_start)
    this.date_for_start.setHours(this.date_for_start.getHours() + this.hrs);
    LaborHourData['date_for_start'] = this.date_for_start;
    LaborHourData['time_for_start'] = Number(this.time_for_start);
    LaborHourData['time_for_end'] = Number(this.time_for_end);
    LaborHourData['laborhour'] = Number(this.laborhour);

    console.log(this.category)
    console.log(LaborHourData);//console資料
    this.HttpApiService.updateLaborHourRequest(this.h_id, LaborHourData).subscribe(
      LaborHourRequest => {
        // this.category = ''
        this.h_title = ''
        this.content = ''
        this.nature = ''
        this.date_for_start = ''
        this.time_for_start = 8
        this.time_for_end = 12
        this.laborhour = this.time_for_end - this.time_for_start
        this.getLaborHourRequest(this.category)
        this.btnStatus = false;
        this.SwalService.uploadTransactionRecordRequests(this.category, '異動', '專案任務工時', this.userJson.account_id)

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: '更新成功'
        })
      },
      (err: any) => {
        console.log('err:', err);
      }
    );

  }


  btnStatus = false;//預設儲存狀態(false)
  /** 
  * @brief 儲存工時&異動工時按鈕狀態事件
  * */
  btnEditClick() {
    this.btnStatus = true;
  }

  /** 
  * @brief 清除工時
  * */
  btnResetClick() {
    this.category = ''
    this.h_title = ''
    this.content = ''
    this.nature = ''
    this.date_for_start = ''
    this.date_for_start = ''
    this.time_for_start = 17
    this.time_for_end = 19
    this.laborhour = this.time_for_end - this.time_for_start
    this.btnStatus = false;
  }


  /** 
  * @brief 新增異動工時資料
  *
  * @param uploadLaborHourModifyDatas  異動工時資料之陣列
  * @param account 使用者帳號
  * @return 回傳有無成功取得. */
  addLaborHourModifyRequest() {
    let uploadLaborHourModifyDatas: any = {}
    uploadLaborHourModifyDatas['hour_id'] = this.h_id
    uploadLaborHourModifyDatas['category'] = this.category;
    uploadLaborHourModifyDatas['title'] = this.h_title;
    uploadLaborHourModifyDatas['content'] = this.content;
    uploadLaborHourModifyDatas['nature'] = this.nature;
    this.date_for_start = new Date(this.date_for_start)
    this.date_for_start.setHours(this.date_for_start.getHours() + this.hrs);
    uploadLaborHourModifyDatas['date_for_start'] = this.date_for_start;
    uploadLaborHourModifyDatas['time_for_start'] = Number(this.time_for_start);
    uploadLaborHourModifyDatas['time_for_end'] = Number(this.time_for_end);
    uploadLaborHourModifyDatas['laborhour'] = parseFloat(String(this.laborhour));
    uploadLaborHourModifyDatas['creater'] = this.userJson.account_id
    console.log(uploadLaborHourModifyDatas);//console資料
    this.HttpApiService.uploadLaborHourModifyRequest(uploadLaborHourModifyDatas, this.userJson.account).subscribe(
      res => {
        console.log("新增異動工時res", res)
        console.log("新增異動工時者", this.userJson.account)
        if (res.code !== 200) {
          this.modify_status = false
          this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報失敗', '專案任務異動工時', this.userJson.account_id)
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
              location.href = 'main/person-daily-work-modify'
            }
          })
        } else if (res.code == 200) {
          this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報', '專案任務異動工時', this.userJson.account_id)
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
              location.href = 'main/person-daily-work-modify'
            }
          })
        }
      }
    )
  }
}
