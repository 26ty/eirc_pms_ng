import { HttpApiService } from 'src/app/api/http-api.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalEventService } from 'src/app/api/swal-event.service';
import Swal from 'sweetalert2'
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

interface Account {
  account_id: string;
  name: string;
  bonita_user_id: string;
  dep_name: string;
}

interface AccountGroup {
  disabled?: boolean;
  name: string;
  account: Account[];
}

export const MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-calendar-add-dialog',
  templateUrl: './calendar-add-dialog.component.html',
  styleUrls: ['./calendar-add-dialog.component.scss']
})
export class CalendarAddDialogComponent implements OnInit {

  toppings = new FormControl();

  toppingList: string[] = ['營運部', '業務部', '生產部', '財務部', '總經理', '董事長'];

  meetChairMan: string[] = ['admin'];
  addMeetForm: FormGroup;

  @Input() title!: string;

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private SwalService: SwalEventService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private projectDatas: any
  ) {
    this.addMeetForm = this.fb.group({
      m_name: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      repeattime: new FormControl(),
      room: new FormControl(),
      documents_id: new FormControl(),
      chairman_id: new FormControl(),
      user_id: new FormControl(),
    });
  }

  //編輯頁面id
  p_id: any = "00000000-0000-0000-0000-000000000000"

  serviceman_name: any;
  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    // console.log(this.userJson)

    //this.projectDatas.p_id = this.p_id
    // console.log(this.projectDatas)
    //window.opener.location.reload();
    this.addMeetForm = new FormGroup({
      m_name: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      repeattime: new FormControl(),
      room: new FormControl(),
      documents_id: new FormControl(),
      chairman_id: new FormControl(),
      user_id: new FormControl(),
    });

    //取得部門資料
    this.getDepartmentList()
  }

  //取得user列表-------------------------------------------------------------------------
  accountControl = new FormControl();
  accountgroup: AccountGroup[] = []
  getDepartmentList(): void {
    this.HttpApiService.getDepartmentList()
      .subscribe(departmentRequest => {
        var departmentdatas: any = departmentRequest
        for (var i in departmentdatas.body.department) {
          this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "account": [] })
        }
        this.getAccountList()
      })
  }

  getAccountList(): void {
    this.HttpApiService.getAccountList()
      .subscribe(AccountRequest => {
        var accountdatas: any = AccountRequest
        this.accountListDatas = accountdatas.body.accounts
        for (var i in accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(accountdatas.body.accounts[i])
            }
          }
        }
        console.log(accountdatas)
      })
  }

  user_id = '';
  accountListDatas: any
  num = 0;
  selectedList: any[] = [];
  result_selectedList: any[] = [];
  addSelectedUserList() {
    if (this.user_id) {
      for (let i in this.accountListDatas) {
        if (this.user_id == this.accountListDatas[i].account_id) {
          this.selectedList.push({
            account_id: this.user_id,
            name: this.accountListDatas[i].name,
            dep: this.accountListDatas[i].dep_name
          })
          this.selectedList.forEach((selectedList) => {
            if (!this.result_selectedList.find(r => r.account_id === selectedList.account_id)) {
              this.result_selectedList.push(selectedList);
            }
            this.num = this.result_selectedList.length
          })
        }
      }
    }
  }

  //刪除人員
  deleteSelectedUserList(data: any) {
    for (var i = this.result_selectedList.length - 1; i >= 0; i--) {
      if (data == i) {
        this.selectedList.splice(i, 1)
        this.num--
      }
    }
    // console.log(this.selectedList)
  }

  resetSelectValues() {
    this.selectedList = []
    this.num = 0;
    this.result_selectedList = []
    // console.log(this.selectedList)
  }

  //取得此次新增的m_id
  m_id: any;
  room_option: any[] = ['大會議室', '小會議室', '會客室', 'VIP室', '竹北辦公室', '中壢辦公室', '台中辦公室', '餐廳', '其他'];
  //chairman_option:any[] = ['董事長','總經理','硬體部門主管','軟體部門主管','技術部主管','財務部主管']
  //attendees_option:any[] = ['禚執政','李明勳','王獻儀','徐嘉新','高連俊','林中庸','林智遠']
  time_option: any[] = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']

  //雙向綁訂
  m_name: any
  date_for_start: any
  time_for_start: any
  time_for_end: any
  room: any
  documents_id: any
  //user_id = ''
  chairman_id: any
  chairman = false
  repeattime = 0

  testarray: any[] = []
  newedata = true

  /** 
  * @brief 確認欄位填寫正確防呆機制
  * @param converttime 切割時間欄位
  * @param time_for_start 轉換起始時間格式
  * @param time_for_end 轉換結束時間格式
  * */
  foolproofmeeting(): void {
    //// console.log(this.repeattime, this.date_for_start)
    this.newedata = true
    // for (var i = 0; i <= this.repeattime; i++) {
    //   var hrs = -(new Date().getTimezoneOffset() / 60)
    //   var date = new Date(this.date_for_start)
    //   date.setHours(date.getHours() + hrs + 24 * 7 * Number(i))
    //   this.testarray.push(date)
    // }

    var converttime = this.time_for_start.split(':')
    this.time_for_start = Number(converttime[0] + '.' + converttime[1])
    var converttime = this.time_for_end.split(':')
    this.time_for_end = Number(converttime[0] + '.' + converttime[1])

    //// console.log(this.testarray)
    var hrs = -(new Date().getTimezoneOffset() / 60)
    var date = new Date(this.date_for_start)
    date.setHours(date.getHours() + hrs)
    for (var j in this.projectDatas) {
      //// console.log(this.projectDatas[j].room, this.room)
      //// console.log(new Date(this.projectDatas[j].date_for_start).getTime(), date.getTime())
      for (var i = 0; i <= this.repeattime; i++) {
        var repeat_date = date
        repeat_date.setDate(date.getDate() + this.repeattime * 7)
        if (this.room == this.projectDatas[j].room && repeat_date.getTime() == new Date(this.projectDatas[j].date_for_start).getTime()) {
          //// console.log("qq")
          if (this.time_for_start < this.projectDatas[j].time_for_start && this.time_for_end <= this.projectDatas[j].time_for_start) {
            //// console.log("yl3")
          }
          else if (this.time_for_start >= this.projectDatas[j].time_for_end && this.time_for_end > this.projectDatas[j].time_for_start) {
            //// console.log("j03")
          }
          else {
            this.newedata = false
          }
        }

      }
    }
    if (this.m_name && this.date_for_start && this.time_for_start && this.time_for_end && this.chairman_id) {
      if (this.newedata == true) {
        //// console.log("成功")
        this.addMeetRequest()
        //this.testtime()
      }
      else {
        Swal.fire({
          icon: 'error',
          title: '請確認同會議室時段是否衝突!?',
          //text: 'Something went wrong!',
        })

        //this.addMeetRequest()
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: '資料填寫不完全',
        //text: 'Something went wrong!',
      })
    }
    // if(this.newedata == true){
    //   this.addMeetRequest()
    // }
  }

  //新增會議-----------------------------------------------------------------------------
  meetId: any//抓此筆新增的m_id
  meetRequest: any;
  //meetDatas:any

  /** 
  * @brief 新增會議並重複數週
  * @param meetDatas 會議json格式
  * @param date 暫存起始時間依照重複週數延續
  * */
  addMeetRequest(): void {
    this.SwalService.loadingAlertNoback("新增中..", 3000)
    var hrs = -(new Date().getTimezoneOffset() / 60)
    for (var i = 0; i <= this.repeattime; i++) {
      let meetDatas: any = {}
      meetDatas['m_name'] = this.m_name;
      var date = new Date(this.date_for_start)
      date.setHours(date.getHours() + hrs + 24 * 7 * Number(i))
      meetDatas['date_for_start'] = date
      meetDatas['time_for_start'] = Number(this.time_for_start);
      meetDatas['time_for_end'] = Number(this.time_for_end);
      meetDatas['documents_id'] = this.p_id;
      meetDatas['room'] = this.room;
      // console.log(meetDatas)

      this.HttpApiService.uploadMeetingRequest_t(meetDatas)
        .subscribe(
          meetRequest => {
            this.meetId = meetRequest
            console.log(meetRequest)
            console.log("成功", this.meetId.body)//m_id
            this.SwalService.uploadTransactionRecordRequests(this.p_id, "新增", "專案會議", this.userJson.account_id)
            //this.getMeetRequest()
            //會議主席
            let attendeeDatas_c: any = {}
            attendeeDatas_c['meet_id'] = this.meetId.body;
            attendeeDatas_c['user_id'] = this.chairman_id;
            attendeeDatas_c['chairman'] = true;//預設
            attendeeDatas_c['receive_email'] = false//預設
            // console.log(attendeeDatas_c)
            //this.addAttendeeRequest(attendeeDatas_c)

            //一般參與人員
            let attendeeDatas: any = {}
            for (let i = 0; i <= this.selectedList.length - 1; i++) {
              attendeeDatas['meet_id'] = this.meetId.body;
              attendeeDatas['user_id'] = this.selectedList[i].account_id;
              attendeeDatas['chairman'] = false;
              attendeeDatas['receive_email'] = false//預設
              // console.log(attendeeDatas)


              // if(i == this.selectedList.length - 1){
              //   this.SwalService.uploadTransactionRecordRequests(this.projectDatas.p_id,"新增","專案會議",this.userJson.account_id)

              // }
            }
            this.addAttendeeRequest(this.meetId.body, attendeeDatas_c)

            //setTimeout(() => { this.editurl() }, 2000);
            // const backUrl = `main/projectinfo/project-manager-edit/${this.p_id}`
            // location.href=backUrl;
            //this.SwalService.loadingAlertbackproject("新增會議中..",750,this.p_id)
          },
          (err: any) => {
            // console.log('err:', err);
          }

        );
      //this.testarray.push(date)
    }
  }

  addAttendeeRequest(m_id: any, chairmanData: any): void {

    this.HttpApiService.uploadAttendeeRequest_t(chairmanData)
      .subscribe(
        attendeeRequest => {
          // console.log("成功新增會議主席", attendeeRequest)

          let attendeeDatas: any = {}
          for (let i = 0; i <= this.selectedList.length - 1; i++) {
            attendeeDatas['meet_id'] = m_id;
            attendeeDatas['user_id'] = this.selectedList[i].account_id;
            attendeeDatas['chairman'] = false;
            attendeeDatas['receive_email'] = false//預設
            this.HttpApiService.uploadAttendeeRequest_t(attendeeDatas)
              .subscribe(
                attendeesRequest => {
                  // console.log("成功新增會議參與人員", attendeesRequest)

                },
                (err: any) => {
                  // console.log('err:', err);
                }
              );
          }
          //this.SwalService.loadingAlertbackproject("新增會議中..",750,this.p_id)
          //一般參與人員

          // this.SwalService.loadingAlertbackproject("新增會議中..",1000,this.p_id)

        },
        (err: any) => {
          // console.log('err:', err);
        }

      );
    this.SwalService.loadingAlertNoback("新增會議中..", 2000)
    setTimeout(() => { this.editurl() }, 2000);
    //this.getMeetRequest()
    //const backUrl = `main/projectinfo/project-manager-edit/${this.p_id}`
    //location.href=backUrl;
  }

  // 跳轉頁面------------------------------------------
  editurl(): void {
    window.location.assign(`/main/project-meeting-calendar`);
  }

  addUser(): void {
    this.meetId = this.meetRequest
    // console.log("要新增attendee的m_id", this.meetId)
    let attendeeDatas: any = {}
    attendeeDatas['meet_id'] = this.meetId;
    attendeeDatas['user_id'] = this.user_id;
    attendeeDatas['chairman'] = false;
    attendeeDatas['receive_email'] = false//預設
    // console.log(attendeeDatas)
    //this.addAttendeeRequest(attendeeDatas)
  }



  //產生一筆新的transaction_record資料格式-------------------------------------------
  // uploadTransactionRecordRequests(p_id: any): void {
  //   let trManagerDatas: any = {};//接收資料
  //   trManagerDatas['document_id'] = p_id
  //   trManagerDatas['actor'] = '新增'
  //   trManagerDatas['content'] = '專案會議'
  //   trManagerDatas['creater'] = this.userJson.account_id
  //   //trManagerDatas['remark'] = this.remark
  //   // console.log("trManagerDatas",trManagerDatas)
  //   this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
  //         .subscribe(taskuserRequest => {
  //           // console.log(taskuserRequest)
  //           // console.log('成功新增會議紀錄')
  //         },
  //           (err: any) => {
  //             // console.log('err:', err);
  //           }
  //         );
  // }

  //發送通知-----------------------------------------------------
  sendemail(): void {
    Swal.fire({
      text: "確定要發送通知嗎",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      cancelButtonText: '取消',
      confirmButtonText: '確定',
      reverseButtons: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '載入中...',
          html: '請稍等',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        //this.uploadProjectDatas()
      }
    })
  }

  // 送出
  submit(formValue: any) {
    // if (formValue.new_password !== formValue.confirm_password) {
    //   alert('請確認密碼');
    //   return;
    // }
    if (this.addMeetForm.valid) {
      //   this.updateMemberPassword(member);

    } else {
      this.markFormGroupTouched(this.addMeetForm);
    }
  }

  // 將formgroup改為觸碰狀態
  private markFormGroupTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  reset() {
    //幫輸入欄位增加統一的類別或name後再reset會比較好
    this.m_name = ''
    this.date_for_start = ''
    this.time_for_start = 0
    this.time_for_end = 0
    this.room = ''
    this.documents_id = ''
    this.user_id = ''
    this.chairman_id = ''
    this.chairman = false
    this.selectedList = []
    //this.selectUserNameList = []
    this.num = 0
    this.result_selectedList = []
  }
}
