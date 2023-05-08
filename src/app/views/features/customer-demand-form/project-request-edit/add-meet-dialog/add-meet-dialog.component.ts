import { HttpApiService } from './../../../../../api/http-api.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalEventService } from 'src/app/api/swal-event.service';
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
  selector: 'app-add-meet-dialog',
  templateUrl: './add-meet-dialog.component.html',
  styleUrls: ['./add-meet-dialog.component.scss']
})
export class AddMeetDialogComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) private csDatas: any
  ) {
    this.addMeetForm = this.fb.group({
      m_name: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      room: new FormControl(),
      documents_id: new FormControl(),
      chairman_id: new FormControl(),
      user_id: new FormControl(),
    });
  }

  //編輯頁面id
  c_id: any = ''
  serviceman_name: any;
  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    this.c_id = this.csDatas.c_id
    console.log(this.c_id)
    //window.opener.location.reload();
    this.addMeetForm = new FormGroup({
      m_name: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
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
        for (var i in accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(accountdatas.body.accounts[i])
            }
          }
        }
      })
  }

  user_id = '';
  accountListDatas: any
  num = 0;
  selectedList: any[] = [];
  addSelectedUserList() {

    this.HttpApiService.getAccountList().subscribe(res => {
      this.accountListDatas = res.body.accounts

      for (let i in this.accountListDatas) {
        if (this.user_id == this.accountListDatas[i].account_id) {
          this.selectedList.push({
            account_id: this.user_id,
            name: this.accountListDatas[i].name,
            dep: this.accountListDatas[i].dep_name
          })
          this.num++;
          console.log(this.selectedList)
        }
      }
    })

  }

  //刪除人員
  deleteSelectedUserList(data: any) {
    for (var i = this.selectedList.length - 1; i >= 0; i--) {
      if (data == i) {
        this.selectedList.splice(i, 1)
        this.num--
      }
    }
    console.log(this.selectedList)
  }

  resetSelectValues() {
    this.selectedList = []
    this.num = 0;
    console.log(this.selectedList)
  }

  //取得此次新增的m_id
  m_id: any;
  room_option: any[] = ['大會議室', '小會議室', '會客室', 'VIP室', '竹北辦公室', '中壢辦公室', '台中辦公室', '餐廳', '其他'];
  //chairman_option:any[] = ['董事長','總經理','硬體部門主管','軟體部門主管','技術部主管','財務部主管']
  //attendees_option:any[] = ['禚執政','李明勳','王獻儀','徐嘉新','高連俊','林中庸','林智遠']
  time_option: any[] = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18']

  //雙向綁訂
  m_name = ''
  date_for_start = ''
  time_for_start = 0
  time_for_end = 0
  room = ''
  documents_id = ''
  //user_id = ''
  chairman_id = ''
  chairman = false

  //新增會議-----------------------------------------------------------------------------
  meetId: any//抓此筆新增的m_id
  meetRequest: any;
  //meetDatas:any
  addMeetRequest(): void {
    var hrs = -(new Date().getTimezoneOffset() / 60)
    let meetDatas: any = {}
    meetDatas['m_name'] = this.m_name;
    var date = new Date(this.date_for_start)
    date.setHours(date.getHours() + hrs)
    meetDatas['date_for_start'] = date
    meetDatas['time_for_start'] = Number(this.time_for_start);
    meetDatas['time_for_end'] = Number(this.time_for_end);
    meetDatas['documents_id'] = this.csDatas.c_id;
    meetDatas['room'] = this.room;
    console.log(meetDatas)

    this.HttpApiService.uploadMeetingRequest_t(meetDatas)
      .subscribe(
        meetRequest => {
          this.meetId = meetRequest
          console.log(meetRequest)
          console.log("成功", this.meetId.body)//m_id
          //this.getMeetRequest()
          //會議主席
          let attendeeDatas_c: any = {}
          attendeeDatas_c['meet_id'] = this.meetId.body;
          attendeeDatas_c['user_id'] = this.chairman_id;
          attendeeDatas_c['chairman'] = true;//預設
          attendeeDatas_c['receive_email'] = false
          console.log(attendeeDatas_c)

          //一般參與人員
          let attendeeDatas: any = {}
          for (let i = 0; i <= this.selectedList.length - 1; i++) {
            attendeeDatas['meet_id'] = this.meetId.body;
            attendeeDatas['user_id'] = this.selectedList[i].account_id;
            attendeeDatas['chairman'] = false;
            attendeeDatas['receive_email'] = false
            console.log(attendeeDatas)
          }
          this.addAttendeeRequest(attendeeDatas_c)

        },
        (err: any) => {
          console.log('err:', err);
        }

      );
    //this.getMeetRequest()

  }

  addAttendeeRequest(chairmanData: any): void {

    this.HttpApiService.uploadAttendeeRequest_t(chairmanData)
      .subscribe(
        attendeeRequest => {
          console.log("成功新增會議主席", attendeeRequest)

          let attendeeDatas: any = {}
          for (let i = 0; i <= this.selectedList.length - 1; i++) {
            attendeeDatas['meet_id'] = this.meetId.body;
            attendeeDatas['user_id'] = this.selectedList[i].account_id;
            attendeeDatas['chairman'] = false;
            attendeeDatas['receive_email'] = false
            this.HttpApiService.uploadAttendeeRequest_t(attendeeDatas)
              .subscribe(
                attendeesRequest => {
                  console.log("成功新增會議參與人員", attendeesRequest)

                },
                (err: any) => {
                  console.log('err:', err);
                }
              );
          }
          //this.SwalService.loadingAlertbackproject("新增會議中..",750,this.c_id)
          //一般參與人員

          // this.SwalService.loadingAlertbackproject("新增會議中..",1000,this.c_id)
          if (attendeeRequest.code == 200) {
            setTimeout(() => { this.editurl() }, 2000);
          }

        },
        (err: any) => {
          console.log('err:', err);
        }

      );


  }

  // 跳轉頁面------------------------------------------
  editurl(): void {
    //window.location.assign(`main/projectinfo/project-manager-edit/${this.c_id}`);
    this.SwalService.uploadTransactionRecordRequests(this.csDatas.c_id, "新增", "客需單會議", this.userJson.account_id)
    this.SwalService.loadingAlertbackCR("新增會議中..", 1000, this.c_id)
  }

  addUser(): void {
    this.meetId = this.meetRequest
    console.log("要新增attendee的m_id", this.meetId)
    let attendeeDatas: any = {}
    attendeeDatas['meet_id'] = this.meetId;
    attendeeDatas['user_id'] = this.user_id;
    attendeeDatas['chairman'] = false;
    attendeeDatas['receive_email'] = false
    console.log(attendeeDatas)
    //this.addAttendeeRequest(attendeeDatas)
  }



  //產生一筆新的transaction_record資料格式-------------------------------------------
  // uploadTransactionRecordRequests(c_id: any): void {
  //   let trManagerDatas: any = {};//接收資料
  //   trManagerDatas['document_id'] = c_id
  //   trManagerDatas['actor'] = '新增'
  //   trManagerDatas['content'] = '專案會議'
  //   trManagerDatas['creater'] = this.userJson.account_id
  //   //trManagerDatas['remark'] = this.remark
  //   console.log("trManagerDatas",trManagerDatas)
  //   this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
  //         .subscribe(taskuserRequest => {
  //           console.log(taskuserRequest)
  //           console.log('成功新增會議紀錄')
  //         },
  //           (err: any) => {
  //             console.log('err:', err);
  //           }
  //         );
  // }

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
  }
}
