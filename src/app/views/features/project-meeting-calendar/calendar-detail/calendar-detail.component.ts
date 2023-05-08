import { HttpApiService } from 'src/app/api/http-api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.scss']
})
export class CalendarDetailComponent implements OnInit {

  editMeetForm: FormGroup; //編輯會議
  editChairmanForm: FormGroup;//編輯主席
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private SwalService: SwalEventService,
    @Inject(MAT_DIALOG_DATA) private meetdata: any
  ) {
    this.editMeetForm = this.fb.group({
      m_name: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      chairman: new FormControl(),
      room: new FormControl()
    });

    this.editChairmanForm = this.fb.group({
      attendeePrincipalIdDatas: new FormControl(),
      user_id: new FormControl()
    })
  }

  p_id: any;
  userJson: any
  ngOnInit(): void {

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.meetdata)

    this.m_id = this.meetdata.m_id
    // // console.log("m_id", this.m_id)
    this.p_id = this.meetdata.p_id
    // // console.log("p_id", this.p_id)
    this.time_for_start = this.meetdata.time_for_start
    this.time_for_end = this.meetdata.time_for_end
    this.editMeetForm = new FormGroup({
      m_name: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      chairman: new FormControl(),
      room: new FormControl()
    });
    this.editChairmanForm = new FormGroup({
      attendeePrincipalIdDatas: new FormControl(),
      user_id: new FormControl()
    })

    this.getAllUserName()//get{id:,name:}

    this.getOneMeetingRequest();
    // //取得所有參與人員資料
    // this.getAllAttendeeRequest()


    // //取得部門資料
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

  //雙向綁訂------------------------------------------------------
  m_id: any;
  m_name: any = '';
  date_for_start = ''
  time_for_start = ''
  time_for_end = ''
  chairman: any = '';
  room: any = '';
  attendees: any = '';
  chairman_id = ''

  room_option: any[] = ['大會議室', '小會議室', '會客室', 'VIP室', '竹北辦公室', '中壢辦公室', '台中辦公室', '餐廳', '其他'];
  time_option: any[] = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']

  //接Meet資料------------------------------------
  meetRequest: any;
  //changmeetDatas: any;
  meetDatas: any;
  receive_email: any = false;
  attendeePrincipalEmail: any
  //取得單一Meet資料
  getOneMeetingRequest(): void {
    this.HttpApiService.getOneMeetingRequest_t(this.m_id)
      .subscribe(meetRequest => {
        this.meetDatas = meetRequest;
        if (String(this.meetDatas.body.time_for_start).indexOf('.') == 1) {
          var converttime = String(this.meetDatas.body.time_for_start).split('.')
          this.meetDatas.body.time_for_start = '0' + String(converttime[0]) + ':30'
        }
        else if (String(this.meetDatas.body.time_for_start).indexOf('.') == 2) {
          var converttime = String(this.meetDatas.body.time_for_start).split('.')
          this.meetDatas.body.time_for_start = String(converttime[0]) + ':30'
        }
        else {
          this.meetDatas.body.time_for_start = String(this.meetDatas.body.time_for_start) + ':00'
        }
        if (String(this.meetDatas.body.time_for_end).indexOf('.') == 1) {
          var converttime = String(this.meetDatas.body.time_for_end).split('.')
          this.meetDatas.body.time_for_end = '0' + String(converttime[0]) + ':30'
        }
        else if (String(this.meetDatas.body.time_for_end).indexOf('.') == 2) {
          var converttime = String(this.meetDatas.body.time_for_end).split('.')
          this.meetDatas.body.time_for_end = String(converttime[0]) + ':30'
        }
        else {
          this.meetDatas.body.time_for_end = String(this.meetDatas.body.time_for_end) + ':00'
        }
        // console.log(this.meetDatas)
        // // console.log(this.meetDatas.body.date_for_start)
      },
        (err: any) => {
          // // console.log('err:', err);
        }
      );

    this.HttpApiService.getOneMeetingUserRequest(this.m_id)
      .subscribe(mRequest => {
        this.meetDatas = mRequest
        // // console.log(this.meetDatas.body.account_id)
        this.attendeePrincipalattendeeDatas = this.meetDatas.body.a_id
        this.attendeePrincipalIdDatas = this.meetDatas.body.account_id
        this.attendeePrincipalNameDatas = this.meetDatas.body.name
        this.receive_email = this.meetDatas.body.receive_email
        this.attendeePrincipalEmail = this.meetDatas.body.email
        for (var i in this.meetDatas.body.Participant) {
          var email = false
          if (this.meetDatas.body.Participant[i].email == true) {
            email = true
          }
          this.attendeeUserDatas.push({
            "a_id": this.meetDatas.body.Participant[i].a_id,
            "user_id": this.meetDatas.body.Participant[i].participant_id,
            "user_name": this.meetDatas.body.Participant[i].participant_name,
            "receive_email": this.meetDatas.body.Participant[i].receive_email,
            "email": this.meetDatas.body.Participant[i].email
          })
          this.attendeeUserattendeeDatas.push(this.meetDatas.body.Participant[i].a_id)
          this.attendeeUserIdDatas.push(this.meetDatas.body.Participant[i].participant_id)
          this.attendeeUserNameDatas.push(this.meetDatas.body.Participant[i].participant_name)
          this.attendeeUserEmailDatas.push(this.meetDatas.body.Participant[i].email)
          this.num++
        }
        // console.log(this.attendeeUserDatas)
        // // console.log(this.attendeePrincipalIdDatas)
      })
    //// // console.log(this.attendeePrincipalIdDatas)
  }


  user_id = ''
  userList: any[] = []
  AllUserList: any
  //列出所有username
  getAllUserName(): void {
    this.HttpApiService.getAccountList().subscribe(res => {
      this.AllUserList = res.body.accounts
      // // console.log(res)

      //取得所有參與人員資料
      //this.getAllAttendeeRequest()

    })
    // for (var pagenum = 1; pagenum <= 92; pagenum++) {
    //   this.HttpApiService.getAccountRequest_t(pagenum, 1)
    //     .subscribe(userRequest => {
    //       this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
    //     })
    //   //// // console.log("userList",this.userList)
    // }
  }

  //取得會議參與人attendee（主席）（非主席陣列）
  num = 0
  attendeeRequest: any;
  attendeeDatas: any;
  //principal
  attendeePrincipalDatas: any[] = [];//{[],[],[]}
  attendeePrincipalattendeeDatas: any
  attendeePrincipalIdDatas: any
  attendeePrincipalNameDatas: any
  //user
  attendeeUserDatas: any[] = [];//{[],[],[]}
  attendeeUserattendeeDatas: any[] = []
  attendeeUserIdDatas: any[] = [];//[id,id,id,id]
  attendeeUserNameDatas: any[] = []//[name,name,name,name]
  attendeeUserEmailDatas: any[] = []//[email,email,email,email]
  //attendeeUserDatas:any[] = []
  getAllAttendeeRequest(): void {

    //取得部門資料
    this.getDepartmentList()

    this.HttpApiService.getAttendeeRequest_t(1, 10)
      .subscribe(attendeeRequest => {
        this.attendeeDatas = attendeeRequest.body.attendee
        // // console.log(this.attendeeDatas)

        //篩選出跟此m_id有關的attendee
        for (var i in this.attendeeDatas) {
          //// // console.log(this.attendeeDatas[i])
          if (this.attendeeDatas[i].meet_id == this.m_id) {

            //判斷是否為主席
            if (this.attendeeDatas[i].chairman == true) {

              this.attendeePrincipalDatas.push(this.attendeeDatas[i])

            } else {

              this.attendeeUserDatas.push(this.attendeeDatas[i])

            }

          }
        }

        // // console.log("Principal", this.attendeePrincipalDatas)
        // // console.log("attendeeUser", this.attendeeUserDatas)
        // // console.log("this.AllUserList", this.AllUserList)
        //會議主席id陣列f
        for (var i in this.attendeePrincipalDatas) {
          for (var j in this.AllUserList) {
            if (this.attendeePrincipalDatas[i].user_id == this.AllUserList[j].account_id) {
              this.attendeePrincipalattendeeDatas = this.attendeePrincipalDatas[i].a_id
              this.attendeePrincipalIdDatas = this.AllUserList[j].account_id
              this.attendeePrincipalNameDatas = this.AllUserList[j].name
            }
          }
        }
        // // console.log("會議主席id", this.attendeePrincipalIdDatas)
        // // console.log(this.attendeePrincipalDatas)


        //會議參與人員id陣列
        for (var i in this.attendeeUserDatas) {
          for (var j in this.AllUserList) {
            if (this.attendeeUserDatas[i].user_id == this.AllUserList[j].account_id) {
              this.attendeeUserattendeeDatas.push(this.attendeeUserDatas[i].a_id)
              this.attendeeUserIdDatas.push(this.AllUserList[j].account_id)
              this.num++
              this.attendeeUserNameDatas.push(this.AllUserList[j].name)
            }
          }
        }
        // // console.log(this.attendeePrincipalattendeeDatas)
        // // console.log("會議主席人員ID List", this.attendeePrincipalIdDatas)
        // // console.log("會議主席人員Name List", this.attendeePrincipalNameDatas)
        // // console.log(this.attendeeUserattendeeDatas)
        // // console.log("會議參與人員ID List", this.attendeeUserIdDatas)
        // // console.log("會議參與人員Name List", this.attendeeUserNameDatas)

        //this.getOneUserRequest(this.attendeePrincipalIdDatas)
        // for (let i in this.attendeePrincipalDatas) {
        //   // // console.log(this.attendeePrincipalDatas[i].user_id)
        //   this.getOneUserRequest(this.attendeePrincipalDatas[i].user_id)
        // }

      })
  }

  // oneUserRequest: any;
  // oneUserDatas: any;
  // chairman_name: any
  // //取得單一user 主席
  // getOneUserRequest(u_id: any): void {
  //   this.HttpApiService.getAccountOneRequest_t(u_id)
  //     .subscribe(oneUserRequest => {
  //       this.oneUserDatas = oneUserRequest
  //       //this.chairman_name = this.oneUserDatas.body.name
  //       // // console.log(this.oneUserDatas,this.chairman_name)
  //     })
  // }


  /** 
  * @brief 判斷是否需要通知舊有人員
  * @param meetDatas 會議json格式
  * @param systememail 寄件者信箱
  * @param systempassword 寄件者密碼
  * @param sendstate 判斷通知狀態
  * */
  systememail = 'htaeirctest@gmail.com'
  systempassword = 'czwucttwoqkijzas' //固定
  ReceiveEmail(): void {
    //var meeting_time = String(window.location.href)
    this.receive_email = true
    this.sendEmail(this.attendeePrincipalEmail)
    if (this.sendstate == 'oldtogether') {
      for (var i in this.attendeeUserDatas) {
        //// console.log(this.attendeeUserDatas[i])
        //// console.log(this.attendeeUserDatas[i].email)
        this.sendEmail(this.attendeeUserDatas[i].email)
      }
    }
    else if (this.sendstate == 'onlynew') {
      for (var i in this.attendeeUserDatas) {
        if (this.attendeeUserDatas[i].a_id == '') {
          this.sendEmail(this.attendeeUserDatas[i].email)
        }
      }
    }
    this.updateMeetRequest()
  }

  /** 
  * @brief 寄送EMAIL
  * @param emailRequest 寄送EMAIL的json格式
  * */
  sendEmail(email: any): void {
    let emailRequest: any = {}
    emailRequest['username'] = this.systememail //寄件者信箱
    emailRequest['password'] = this.systempassword 
    emailRequest['to'] = 'c108118213@nkust.edu.tw' //收件者信箱
    emailRequest['subject'] = '會議發送通知' 
    emailRequest['body'] = `<html><body><h2>你好!</h2><h4>會議（${this.meetDatas.body.m_name}）已發送，請確認會議內容${email}</h4></body></html>` //信件內容
    emailRequest['host'] = 'smtp.gmail.com'
    emailRequest['port'] = '587'
    emailRequest['name'] = 'HTA後台系統'
    this.HttpApiService.SendEmailRequest_t(emailRequest)
      .subscribe(res => {
        // console.log('成功', res)
      },
        (err: any) => {
          // console.log('err:', err);
        }
      );
  }



  //選擇人員
  userid = ''
  accountListDatas: any
  // selectUserList: any[] = []//id
  // selectUserNameList: any[] = []//name
  selectedList: any[] = [];
  addSelectUser() {
    //this.user_id=''
    //this.attendeeUserNameDatas = []
    this.HttpApiService.getAccountRequest().subscribe(res => {
      this.accountListDatas = res.body.accounts
      for (let i in this.accountListDatas) {
        if (this.user_id == this.accountListDatas[i].account_id) {
          this.attendeeUserIdDatas.push(this.user_id)
          this.attendeeUserDatas.push({
            "a_id": "",
            "user_id": this.accountListDatas[i].account_id,
            "user_name": this.accountListDatas[i].name,

            "email": this.accountListDatas[i].email,
            "receive_email": false,
          })
          this.num++;
          this.attendeeUserIdDatas = [...new Set(this.attendeeUserIdDatas)]
          this.attendeeUserDatas = [...new Set(this.attendeeUserDatas)]
          // // console.log("新會議參與人員id", this.attendeeUserIdDatas)//userid陣列
          this.attendeeUserNameDatas.push(this.accountListDatas[i].name)
          this.attendeeUserNameDatas = [...new Set(this.attendeeUserNameDatas)]
          // // console.log("新會議參與人員name", this.attendeeUserNameDatas)//名字陣列
          // this.selectedList.push({ 
          //   account_id :this.user_id , 
          //   name :this.accountListDatas[i].name,
          //   dep : this.accountListDatas[i].dep_name
          // })
        }
      }
      // console.log(this.attendeeUserDatas)
    })

  }

  //刪除人員
  deleteSelectUser(data: any) {
    //// // console.log(this.attendeeUserNameDatas)
    for (var i = this.attendeeUserNameDatas.length - 1; i >= 0; i--) {
      if (data == i) {
        // // console.log(i)//2,1,0
        this.attendeeUserNameDatas.splice(i, 1)
        this.attendeeUserIdDatas.splice(i, 1)
        this.attendeeUserDatas.splice(i, 1)
        this.num--
      }
      //// // console.log(i)//2,1,0
      //this.selectUserNameList
    }
    // console.log(this.attendeeUserDatas)
  }

  test(): void {
    var origin = [1, 2, 'a', 3, 1, 'b', 'a'];
    var result = origin.filter(function (element, index, arr) {
      return arr.indexOf(element) === index;
    });
    var repeat = origin.filter(function (element, index, arr) {
      return arr.indexOf(element) !== index;
    });

    // console.log(result); // [1, 2, "a", 3, "b"]
    // console.log(repeat); // [1, "a"]
  }
  //接更改後的Meet資料-------------------------------
  newMeetDatas: any;
  updateMeetRequest(): void {
    this.SwalService.loadingAlertNoback("編輯中..", 3000)
    let newMeetDatas: any = {};
    
    newMeetDatas['m_id'] = this.meetDatas.body.m_id;
    newMeetDatas['m_name'] = this.meetDatas.body.m_name;
    var hrs = -(new Date().getTimezoneOffset() / 60) //以UTC時間為基準設置時差
    var date = new Date(this.meetDatas.body.date_for_start)  
    date.setHours(date.getHours() + hrs)
    newMeetDatas['date_for_start'] = date
    var converttime = this.time_for_start.split(':')
    this.time_for_start = converttime[0] + '.' + converttime[1]
    var converttime = this.time_for_end.split(':')
    this.time_for_end = converttime[0] + '.' + converttime[1]

    newMeetDatas['time_for_start'] = Number(this.time_for_start);
    newMeetDatas['time_for_end'] = Number(this.time_for_end);
    // newMeetDatas['time_for_start'] = String(this.meetDatas.body.time_for_start);
    // newMeetDatas['time_for_end'] = String(this.meetDatas.body.time_for_end);
    newMeetDatas['room'] = this.meetDatas.body.room;
    // // console.log("修改會議陣列=")
    console.log(newMeetDatas);

    this.HttpApiService.updateMeetingRequest_t(this.m_id, newMeetDatas)
      .subscribe(res => {
        // // console.log("成功", res)
      },
        (err: any) => {
          // // console.log('err:', err);
        }
      );
    this.updateAttendeeRequest()
    const backUrl = `main/projectinfo/project-manager-edit/${this.p_id}`
    //location.href = backUrl;
  }

  updateAttendeeData: any = { "attendee": [] }
  updateAttendeeRequest(): void {
    let updateAttendee: any = {}
    updateAttendee['a_id'] = this.attendeePrincipalattendeeDatas //a_id
    updateAttendee['meet_id'] = this.m_id
    updateAttendee['user_id'] = this.attendeePrincipalIdDatas
    updateAttendee['chairman'] = true
    if (this.receive_email) {
      updateAttendee['receive_email'] = true
    }
    else {
      updateAttendee['receive_email'] = false
    }
    this.updateAttendeeData.attendee.push(updateAttendee)
    this.HttpApiService.updateAttendeeRequest_t(this.updateAttendeeData)
      .subscribe(res => {
        // console.log("修改主席成功", res)
      },
        (err: any) => {
          // console.log('修改主席失敗err:', err);
        }
      );
    for (var i in this.attendeeUserattendeeDatas) {
      // // console.log(this.attendeeUserattendeeDatas[i])
      //刪除
      this.HttpApiService.deleteAttendeeRequest_t(this.attendeeUserattendeeDatas[i])
        .subscribe(res => {
          // // console.log("成功刪除參與人員", res)
        },
          (err: any) => {
            // // console.log('err:', err);
          }
        );
    }
    for (var i in this.attendeeUserDatas) {
      let newAttendee: any = {}
      newAttendee['meet_id'] = this.m_id
      newAttendee['user_id'] = this.attendeeUserIdDatas[i]
      updateAttendee['chairman'] = false
      if (this.attendeeUserDatas[i].a_id != '' && this.attendeeUserDatas[i].receive_email == true) {
        newAttendee['receive_email'] = true
      }
      else if (this.sendstate == "oldtogether" || this.sendstate == "onlynew") {
        newAttendee['receive_email'] = true
      }
      else {
        newAttendee['receive_email'] = false
      }
      //新增
      this.HttpApiService.uploadAttendeeRequest_t(newAttendee)
        .subscribe(res => {
          // // console.log("成功新增參與人員", res)
        },
          (err: any) => {
            // // console.log('新增參與人員失敗err:', err);
          }
        );
    }
    setTimeout(() => { this.editurl() }, 2000);
  }

  // 跳轉頁面------------------------------------------
  editurl(): void {
    window.location.assign(`main/project-meeting-calendar`);
    //this.SwalService.uploadTransactionRecordRequests(this.p_id,"編輯","專案會議",this.userJson.account_id)
    //this.SwalService.loadingAlertbackproject("編輯會議中..",1000,this.p_id)
  }

  //發送通知-----------------------------------------------------
  sendstate: any
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
          text: "通知名單確認",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#64c270',
          cancelButtonColor: '#FF5151',
          cancelButtonText: '取消',
          confirmButtonText: '確定',
          reverseButtons: true,
          input: 'checkbox',
          inputPlaceholder: '是否要通知舊有人員',
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
            if (result.value) {
              Swal.fire({ icon: 'success', text: '與舊有成員一併發送完畢' });
              this.sendstate = 'oldtogether'
              this.ReceiveEmail()
            } else {
              Swal.fire({ icon: 'success', text: "發送完畢" });
              this.sendstate = 'onlynew'
              this.ReceiveEmail()
            }
            setTimeout(() => { this.editurl() }, 2000);
          }
        })
      }
    })
  }

  // test():void {
  //   const { value: accept } = await Swal.fire({
  //     title: 'Terms and conditions',
  //     input: 'checkbox',
  //     inputValue: 1,
  //     inputPlaceholder:
  //       'I agree with the terms and conditions',
  //     confirmButtonText:
  //       'Continue <i class="fa fa-arrow-right"></i>',
  //     inputValidator: (result) => {
  //       return !result && 'You need to agree with T&C'
  //     }
  //   })

  //   if (accept) {
  //     Swal.fire('You agreed with T&C :)')
  //   }
  // }
}
