import { HttpApiService } from './../../../../api/http-api.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//swal
import Swal from 'sweetalert2'
import { Console } from 'console';
import { SwalEventService } from 'src/app/api/swal-event.service';

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

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private SwalService: SwalEventService,
    @Inject(MAT_DIALOG_DATA) private taskdata: any
  ) {
    this.editTaskForm = this.fb.group({
      code: new FormControl(),
      date_for_start: new FormControl(),
      // projectman_id: new FormControl(),
      //task_user
      user_id: new FormControl(),

      date_for_end: new FormControl(),
      salesman_id: new FormControl(),
      internal_order: new FormControl(),
      external_order: new FormControl(),
      machine_finished_number: new FormControl(),
      machine_english: new FormControl(),
    });
  }

  editTaskForm: FormGroup; //編輯task
  t_id: any;
  p_id: any;
  code: any;
  status: any;
  date_for_start: any;
  projectman_id: any;
  aduitbtn: any;
  data: any;

  date_for_end: any;
  salesman_name: any;
  internal_order: any;
  external_order: any;
  machine_finished_number: any;
  machine_english: any;
  salesman_id: any;

  taskList = [{ "id": "9ba83ec0-d9de-4a53-b80d-50526c1c4239", "name": "-", "hierarchy": '0' }]

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)
    this.t_id = this.taskdata.data.t_id
    this.p_id = this.taskdata.data.p_id
    this.code = this.taskdata.data.code


    this.date_for_start = this.taskdata.data.date_for_start
    // this.projectman_id = this.taskdata.data.projectman_id
    //console.log(this.taskdata.data)
    this.editTaskForm = new FormGroup({
      code: new FormControl(),
      date_for_start: new FormControl(),
      // projectman_id: new FormControl(),
      //task_user
      user_id: new FormControl(),

      date_for_end: new FormControl(),
      salesman_id: new FormControl(),
      internal_order: new FormControl(),
      external_order: new FormControl(),
      machine_finished_number: new FormControl(),
      machine_english: new FormControl(),
    })
    this.getProjectRequest()
    this.getAllUserName()//get{id:,name:}
    this.getDepartmentList()
    this.getTaskUserRequest()
  }

  isReadOnly = false
  getProjectRequest(): void {
    this.HttpApiService.getOneProjectRequest_t(this.p_id).
      subscribe(projectRequest => {
        console.log(projectRequest)
        var projectdata: any = projectRequest

        this.date_for_end = projectdata.body.date_for_end
        this.internal_order = projectdata.body.internal_order
        this.external_order = projectdata.body.external_order
        this.machine_finished_number = projectdata.body.machine_finished_number
        this.machine_english = projectdata.body.machine_english
        this.salesman_id = projectdata.body.salesman_id

        this.status = projectdata.body.status
        if (this.userJson.account_id == '8a7ca412-8536-4158-8989-63349c8072c6' && this.status == "未審核") {
          this.aduitbtn = 'true'
        }
        if (this.status == "已審核") {
          this.aduitbtn = 'false'
          this.isReadOnly = true
        }
        console.log(this.userJson.account_id, this.status)
        console.log(this.aduitbtn)
      })
  }

  //loading
  dialogLoading() {
    Swal.fire({
      title: '載入中...',
      html: '請稍等',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2500,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

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
    //console.log(this.accountgroup)
  }

  user_id = ''
  userList: any
  //列出所有username
  getAllUserName(): void {
    this.HttpApiService.getAccountRequest()
      .subscribe(userRequest => {
        this.userList = userRequest.body.accounts
        //console.log(this.userList)
        // this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
      })
    //console.log(this.userList)
  }

  testtaskDatas: any;
  //取得任務one task資料----------------------------------------------------
  getOneTestTask(t_id: any): void {
    this.HttpApiService.getOneTaskRequest_t(t_id).
      subscribe(testtaskRequest => {
        this.testtaskDatas = testtaskRequest;
        //console.log(this.testtaskDatas.body.last_task)
      })
    //console.log(this.last_date_start)
    //console.log(this.last_date_completion)
  }

  //列出所有此專案任務人
  getAllTaskName(): void {
    this.HttpApiService.getTaskListUserRequest(this.p_id)
      .subscribe(taskRequest => {
        var taskdatas: any = taskRequest
        if (taskdatas.body.task[0]) {
          for (var i in taskdatas.body.task) {
            this.taskList.push({ "id": taskdatas.body.task[i].t_id, "name": taskdatas.body.task[i].t_name, "hierarchy": taskdatas.body.task[i].hierarchy })
          }
        }
      })
  }

  num = 0
  taskRequest: any;
  taskDatas: any;
  //principal
  taskPrincipalDatas: any[] = [];//{[],[],[]}
  taskPrincipaltaskDatas: any

  taskPrincipalIdDatas: any
  taskPrincipalNameDatas: any
  //user
  taskUserDatas: any[] = [];//{[],[],[]}
  taskUsertaskDatas: any[] = []

  taskUserIdDatas: any[] = [];//[id,id,id,id]
  taskUserNameDatas: any[] = []//[name,name,name,name]

  getTaskUserRequest(): void {
    this.HttpApiService.getOneTaskListRequest(this.t_id)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        for (var i in taskuserRequest.body.task) {
          if (taskuserRequest.body.task[i].name) {
            this.taskUserDatas.push(taskuserRequest.body.task[i])
          }
        }
        console.log("舊的參與人員", this.taskUserDatas)
        console.log("舊的參與人員名字", this.taskUserNameDatas)

        for (var i in this.taskUserDatas) {
          this.taskUsertaskDatas.push(this.taskUserDatas[i].tu_id)
          this.taskUserIdDatas.push(this.taskUserDatas[i].account_id)
          this.num++
          this.taskUserNameDatas.push(this.taskUserDatas[i].name)
        }

      })
  }

  // getAllTaskUserRequest(): void {
  //   this.HttpApiService.getTaskUserRequest_t(1, 20)
  //     .subscribe(taskRequest => {
  //       this.taskDatas = taskRequest.body.task_user
  //       for (var i in this.taskDatas) {
  //         //console.log(this.taskDatas[i])
  //         if (this.taskDatas[i].task_id == this.t_id) {
  //           if (this.taskDatas[i].principal == true) {
  //             this.taskPrincipalDatas.push(this.taskDatas[i])
  //           } else {
  //             this.taskUserDatas.push(this.taskDatas[i])
  //           }
  //         }
  //       }
  //     })
  // }

  //選擇人員
  userid = ''
  selectUserList: any[] = []//id
  selectUserNameList: any[] = []//name
  addSelectUser() {
    //this.user_id=''
    this.taskUserIdDatas.push(this.userid)
    this.num++;
    //console.log(this.taskUserIdDatas)//id陣列
    this.taskUserNameDatas = []
    for (let i = 0; i <= this.taskUserIdDatas.length - 1; i++) {
      for (let j in this.userList) {
        if (this.taskUserIdDatas[i] == this.userList[j].account_id) {

          this.taskUserNameDatas.push(this.userList[j].name)
        }
      }
    }
    //console.log(this.taskUserIdDatas)
    //console.log(this.taskUserNameDatas)//名字陣列
    this.userid = ''
  }

  //刪除人員
  deleteSelectUser(data: any) {
    //console.log(this.taskUserNameDatas)
    for (var i = this.taskUserNameDatas.length - 1; i >= 0; i--) {
      if (data == i) {
        //console.log(i)//2,1,0
        this.taskUserNameDatas.splice(i, 1)
        this.taskUserIdDatas.splice(i, 1)
        this.num--
      }
      //console.log(i)//2,1,0
      //this.selectUserNameList
    }
    //console.log(this.taskUserIdDatas)
    //console.log(this.taskUserNameDatas)//名字陣列
  }

  //更新任務資料----------------------------------------------------
  updateProjectRequest(status: any): void {
    this.SwalService.loadingAlertNoback("儲存中..", 4000)
    let projectManagerDatas: any = {}
    projectManagerDatas['code'] = this.code
    this.date_for_start = new Date(this.date_for_start)
    this.date_for_start.setHours(this.date_for_start.getHours() + 8) //加八小時
    projectManagerDatas['date_for_start'] = this.date_for_start
    projectManagerDatas['projectman_id'] = this.salesman_id
    projectManagerDatas['type'] = '專案授權書'
    projectManagerDatas['origin_id'] = '7f7daf49-ccb2-4ee4-9ad4-dec3d7b7bb4f'
    projectManagerDatas['p_name'] = '專案授權書'
    projectManagerDatas['status'] = status
    projectManagerDatas['customer_code'] = "00000000-0000-0000-0000-000000000000"
    projectManagerDatas['customer_id'] = "00000000-0000-0000-0000-000000000000"
    //projectManagerDatas['salesman_id'] = "00000000-0000-0000-0000-000000000000"
    projectManagerDatas['serviceman_id'] = "00000000-0000-0000-0000-000000000000"

    this.date_for_end = new Date(this.date_for_end)
    this.date_for_end.setHours(this.date_for_end.getHours() + 8) //加八小時
    projectManagerDatas['date_for_end'] = this.date_for_end
    projectManagerDatas['internal_order'] = this.internal_order
    projectManagerDatas['external_order'] = this.external_order
    projectManagerDatas['machine_finished_number'] = this.machine_finished_number
    projectManagerDatas['machine_english'] = this.machine_english
    projectManagerDatas['salesman_id'] = this.salesman_id
    if (status == '已審核') {
      projectManagerDatas['serviceman_id'] = '8a7ca412-8536-4158-8989-63349c8072c6'
      projectManagerDatas['date_for_check'] = new Date()
    }

    this.HttpApiService.updateProjectRequest_t(this.p_id, projectManagerDatas).subscribe(projectRequest => {
      this.updateDatas()
      setTimeout(() => { this.editurl() }, 2000);
    }, (err: any) => {
      console.log('err:', err)
    })
  }
  uploadtaskuserDatas: any = { "task_user": [] }
  updatetaskuserDatas: any = { "task_user": [] }
  updateTaskUserRequest(): void {

    let updateTaskUser: any = {}
    updateTaskUser['principal'] = true
    updateTaskUser['tu_id'] = this.taskPrincipaltaskDatas
    updateTaskUser['task_id'] = this.t_id
    updateTaskUser['user_id'] = this.taskPrincipalIdDatas
    //console.log(updateTaskUser)
    this.updatetaskuserDatas.task_user.push(updateTaskUser)
    this.HttpApiService.updatepluralTaskUserRequest(this.updatetaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log("任務負責人成功修改")
        console.log(taskuserRequest)
      })


    for (var i in this.taskUsertaskDatas) {
      console.log(this.taskUsertaskDatas[i])
      //刪除
      //this.deletetaskuserDatas.task_user.push({"tu_id" :this.taskUsertaskDatas[i]})
      let taskUserBody: any = {}
      taskUserBody = { 'tu_id': this.taskUsertaskDatas[i] }
      console.log(taskUserBody)
      this.HttpApiService.deleteTaskUserRequest(this.taskUsertaskDatas[i], taskUserBody)
        .subscribe(res => {
          console.log("tu_id", this.taskUsertaskDatas[i])
          console.log("成功刪除task_user", res)
        },
          (err: any) => {
            console.log('err:', err);
          }
        );
    }

    //console.log("this.deletetaskuserDatas", this.deletetaskuserDatas)
    //console.log("this.deletetaskuserDatas", JSON.stringify(this.deletetaskuserDatas))

    for (var i in this.taskUserNameDatas) {
      let newTaskUser: any = {}
      newTaskUser['task_id'] = this.t_id
      newTaskUser['principal'] = false
      newTaskUser['user_id'] = this.taskUserIdDatas[i]
      this.uploadtaskuserDatas.task_user.push(newTaskUser)
      //新增
    }
    console.log(this.uploadtaskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log("成功新增task_user")
        console.log(taskuserRequest)
      })
    //setTimeout(() => { this.editurl() }, 1000);
  }

  updateDatas(): void {

    for (var i in this.taskUsertaskDatas) {
      console.log(this.taskUsertaskDatas[i])
      //刪除
      //this.deletetaskuserDatas.task_user.push({"tu_id" :this.taskUsertaskDatas[i]})
      let taskUserBody: any = {}
      taskUserBody = { 'tu_id': this.taskUsertaskDatas[i] }
      console.log(taskUserBody)
      this.HttpApiService.deleteTaskUserRequest(this.taskUsertaskDatas[i], taskUserBody)
        .subscribe(res => {
          console.log("tu_id", this.taskUsertaskDatas[i])
          console.log("成功刪除task_user", res)
        },
          (err: any) => {
            console.log('err:', err);
          }
        );
    }

    //console.log("this.deletetaskuserDatas", this.deletetaskuserDatas)
    //console.log("this.deletetaskuserDatas", JSON.stringify(this.deletetaskuserDatas))

    for (var i in this.taskUserNameDatas) {
      let newTaskUser: any = {}
      newTaskUser['task_id'] = this.t_id
      newTaskUser['principal'] = false
      newTaskUser['user_id'] = this.taskUserIdDatas[i]
      this.uploadtaskuserDatas.task_user.push(newTaskUser)
      //新增
    }
    console.log(this.uploadtaskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log("成功新增task_user")
        console.log(taskuserRequest)
        //this.editurl()
      })
  }


  // 跳轉頁面------------------------------------------
  editurl(): void {
    window.location.assign(`main/projectinfo/project-audit-form`);
  }

  aduit(): void {
    this.updateProjectRequest('已審核')
  }

  systememail: any = ''
  systempassword: any = ''
  sendemail(): void {
    // {
    //   "host": "smtp.gmail.com", //HOST(根據寄件人信箱的不同，用的HOST可能會不一樣，這邊用的是GMAIL，所以用GMAIL的HOST)
    //   "port": "587", //PORT號(根據HOST的不同，用的PORT會不一樣)
    //   "name": "HTA後台系統", //寄件人名稱
    //   "username": "C108118221@nkust.edu.tw", //寄件人信箱
    //   "password": "", //寄件人信箱密碼
    //   "to": "yufang9088@gmail.com", //收件人信箱
    //   "subject": "HTA後台通知", //主旨
    //   "body": "<html><body><h1>Hello World!</h1><a href='http://www.google.com'>超連結測試</a></body></html>" //郵件內容(給HTML)
    // }
    let emailRequest: any = {}
    emailRequest['host'] = this.systememail
    emailRequest['port'] = ''
    emailRequest['name'] = 'HTA後台系統'
    emailRequest['username'] = this.systememail
    emailRequest['password'] = this.systempassword
    emailRequest['to'] = 'james@hta.com.tw'
    emailRequest['subject'] = ''
    emailRequest['body'] = ''
    this.HttpApiService.SendEmailRequest_t(emailRequest)
      .subscribe(res => {
        console.log('成功', res)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  reset() {
    //幫輸入欄位增加統一的類別或name後再reset會比較好
    this.selectUserList = []
    this.selectUserNameList = []
    this.taskUserNameDatas = []
    this.num = 0
  }

}
