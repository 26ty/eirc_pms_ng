import { Component, OnInit, Inject } from '@angular/core';
import { HttpApiService } from './../../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-edit-meet-dialog',
  templateUrl: './edit-meet-dialog.component.html',
  styleUrls: ['./edit-meet-dialog.component.scss']
})

export class EditMeetDialogComponent implements OnInit {

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

  c_id: any;
  userJson: any
  ngOnInit(): void {

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    this.m_id = this.meetdata.m_id
    console.log("m_id", this.m_id)
    this.c_id = this.meetdata.c_id
    console.log("c_id", this.c_id)
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
    // this.getDepartmentList()
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
  time_option: any[] = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18']

  //接Meet資料------------------------------------
  meetRequest: any;
  meetDatas: any;
  //取得單一Meet資料
  getOneMeetingRequest(): void {
    this.HttpApiService.getOneMeetingRequest_t(this.m_id)
      .subscribe(meetRequest => {
        this.meetDatas = meetRequest;
        console.log(this.meetDatas.body.date_for_start)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }


  user_id = ''
  userList: any[] = []
  AllUserList: any
  //列出所有username
  getAllUserName(): void {
    this.HttpApiService.getAccountList().subscribe(res => {
      this.AllUserList = res.body.accounts
      console.log(res)

      //取得所有參與人員資料
      this.getAllAttendeeRequest()

    })
    // for (var pagenum = 1; pagenum <= 92; pagenum++) {
    //   this.HttpApiService.getAccountRequest_t(pagenum, 1)
    //     .subscribe(userRequest => {
    //       this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
    //     })
    //   //console.log("userList",this.userList)
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
  getAllAttendeeRequest(): void {

    //取得部門資料
    this.getDepartmentList()

    this.HttpApiService.getAttendeeRequest_t(1, 10)
      .subscribe(attendeeRequest => {
        this.attendeeDatas = attendeeRequest.body.attendee
        console.log(this.attendeeDatas)

        //篩選出跟此m_id有關的attendee
        for (var i in this.attendeeDatas) {
          //console.log(this.attendeeDatas[i])
          if (this.attendeeDatas[i].meet_id == this.m_id) {

            //判斷是否為主席
            if (this.attendeeDatas[i].chairman == true) {

              this.attendeePrincipalDatas.push(this.attendeeDatas[i])

            } else {

              this.attendeeUserDatas.push(this.attendeeDatas[i])

            }

          }
        }

        console.log("Principal", this.attendeePrincipalDatas)
        console.log("attendeeUser", this.attendeeUserDatas)
        console.log("this.AllUserList", this.AllUserList)
        //會議主席id陣列
        for (var i in this.attendeePrincipalDatas) {
          for (var j in this.AllUserList) {
            if (this.attendeePrincipalDatas[i].user_id == this.AllUserList[j].account_id) {
              this.attendeePrincipalattendeeDatas = this.attendeePrincipalDatas[i].a_id
              this.attendeePrincipalIdDatas = this.AllUserList[j].account_id
              this.attendeePrincipalNameDatas = this.AllUserList[j].name
            }
          }
        }
        console.log("會議主席id", this.attendeePrincipalIdDatas)
        console.log(this.attendeePrincipalDatas)


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
        console.log(this.attendeePrincipalattendeeDatas)
        console.log("會議主席人員ID List", this.attendeePrincipalIdDatas)
        console.log("會議主席人員Name List", this.attendeePrincipalNameDatas)
        console.log(this.attendeeUserattendeeDatas)
        console.log("會議參與人員ID List", this.attendeeUserIdDatas)
        console.log("會議參與人員Name List", this.attendeeUserNameDatas)

        //this.getOneUserRequest(this.attendeePrincipalIdDatas)
        // for (let i in this.attendeePrincipalDatas) {
        //   console.log(this.attendeePrincipalDatas[i].user_id)
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
  //       console.log(this.oneUserDatas,this.chairman_name)
  //     })
  // }
  //選擇人員
  userid = ''
  accountListDatas: any
  // selectUserList: any[] = []//id
  // selectUserNameList: any[] = []//name
  selectedList: any[] = [];
  addSelectUser() {
    //this.user_id=''

    //this.attendeeUserNameDatas = []
    this.HttpApiService.getAccountList().subscribe(res => {
      this.accountListDatas = res.body.accounts
      for (let i in this.accountListDatas) {
        if (this.userid == this.accountListDatas[i].account_id) {
          this.attendeeUserIdDatas.push(this.userid)
          this.num++;
          console.log("新會議參與人員id", this.attendeeUserIdDatas)//userid陣列
          this.attendeeUserNameDatas.push(this.accountListDatas[i].name)
          console.log("新會議參與人員name", this.attendeeUserNameDatas)//名字陣列
          // this.selectedList.push({ 
          //   account_id :this.user_id , 
          //   name :this.accountListDatas[i].name,
          //   dep : this.accountListDatas[i].dep_name
          // })
        }
      }
    })

  }

  //刪除人員
  deleteSelectUser(data: any) {
    console.log(this.attendeeUserNameDatas)
    for (var i = this.attendeeUserNameDatas.length - 1; i >= 0; i--) {
      if (data == i) {
        console.log(i)//2,1,0
        this.attendeeUserNameDatas.splice(i, 1)
        this.attendeeUserIdDatas.splice(i, 1)
        this.num--
      }
      //console.log(i)//2,1,0
      //this.selectUserNameList
    }
  }

  //接更改後的Meet資料-------------------------------
  newMeetDatas: any;
  updateMeetRequest(): void {
    let newMeetDatas: any = {};
    newMeetDatas['m_id'] = this.meetDatas.body.m_id;
    newMeetDatas['m_name'] = this.meetDatas.body.m_name;
    newMeetDatas['date_for_start'] = this.meetDatas.body.date_for_start;
    newMeetDatas['time_for_start'] = Number(this.meetDatas.body.time_for_start);
    newMeetDatas['time_for_end'] = Number(this.meetDatas.body.time_for_end);
    newMeetDatas['room'] = this.meetDatas.body.room;
    console.log("修改會議陣列=")
    console.log(newMeetDatas);

    this.HttpApiService.updateMeetingRequest_t(this.m_id, newMeetDatas)
      .subscribe(res => {
        console.log("成功", res)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
    this.updateAttendeeRequest()
    const backUrl = `main/projectinfo/project-manager-edit/${this.c_id}`
    //location.href = backUrl;
  }

  updateAttendeeData: any = {"attendee":[]}
  updateAttendeeRequest(): void {
    let updateAttendee: any = {}
    updateAttendee['a_id'] = this.attendeePrincipalattendeeDatas //a_id
    updateAttendee['meet_id'] = this.m_id
    updateAttendee['user_id'] = this.attendeePrincipalIdDatas
    updateAttendee['chairman'] = true
    updateAttendee['receive_email'] = false
    this.updateAttendeeData.attendee.push(updateAttendee)
    this.HttpApiService.updateAttendeeRequest_t(this.updateAttendeeData)
      .subscribe(res => {
        console.log("修改主席成功", res)
      },
        (err: any) => {
          console.log('修改主席失敗err:', err);
        }
      );
    for (var i in this.attendeeUserattendeeDatas) {
      console.log(this.attendeeUserattendeeDatas[i])
      //刪除
      this.HttpApiService.deleteAttendeeRequest_t(this.attendeeUserattendeeDatas[i])
        .subscribe(res => {
          console.log("成功刪除參與人員", res)
        },
          (err: any) => {
            console.log('err:', err);
          }
        );
    }
    for (var i in this.attendeeUserIdDatas) {
      let newAttendee: any = {}
      newAttendee['meet_id'] = this.m_id
      newAttendee['user_id'] = this.attendeeUserIdDatas[i]
      newAttendee['chairman'] = false;//預設
      newAttendee['receive_email'] = false//預設
      //新增
      this.HttpApiService.uploadAttendeeRequest_t(newAttendee)
        .subscribe(res => {
          console.log("成功新增參與人員", res)
          setTimeout(() => { this.editurl() }, 2000);
        },
          (err: any) => {
            console.log('新增參與人員失敗err:', err);
          }
        );
    }

  }

  // 跳轉頁面------------------------------------------
  editurl(): void {
    //window.location.assign(`main/projectinfo/project-manager-edit/${this.c_id}`);
    this.SwalService.uploadTransactionRecordRequests(this.c_id, "編輯", "專案會議", this.userJson.account_id)
    this.SwalService.loadingAlertbackCR("編輯會議中..", 1000, this.c_id)
  }
}