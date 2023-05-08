import { HttpApiService } from './../../../../api/http-api.service';
import { SwalEventService } from 'src/app/api/swal-event.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'

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
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  // isLinear = false;
  addForm: FormGroup;
  // editTaskForm:FormGroup; //編輯task
  @Input() title!: string;

  user_id: any;
  date_for_start: any;
  projectman_id: any;
  code: any;
  //task_user 表
  principal = false;

  date_for_end: any;
  salesman_name: any;
  internal_order: any;
  external_order: any;
  machine_finished_number: any;
  machine_english: any;
  salesman_id:any;

  p_id: any;
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private SwalService: SwalEventService,
  ) {
    this.addForm = this.fb.group({
      code: new FormControl(),
      date_for_start: new FormControl(),
      //projectman_id: new FormControl(),

      date_for_end: new FormControl(),
      salesman_id: new FormControl(),
      internal_order: new FormControl(),
      external_order: new FormControl(),
      machine_finished_number: new FormControl(),
      machine_english: new FormControl(),
      //task_user
      user_id: new FormControl(),
    });
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式

    this.addForm = this.fb.group({
      code: new FormControl(),
      date_for_start: new FormControl(),
      // projectman_id: new FormControl(),

      date_for_end: new FormControl(),
      salesman_id: new FormControl(),
      internal_order: new FormControl(),
      external_order: new FormControl(),
      machine_finished_number: new FormControl(),
      machine_english: new FormControl(),
      //task_user
      user_id: new FormControl(),
    });
    this.getAllUserName()//get{id:,name:}
    //this.getAllTaskName()
    //console.log(this.projectDatas.p_id)
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
    console.log(this.accountgroup)
  }

  projectType_option: any[] = ['一般專案', 'Repeat Order', '正式專案', '年度專案', '修改案',
    '開發中專案', '開發案', '出機待驗收', '已驗收待結案'];
  userList: any
  taskList = [{ "id": "e4d7833a-3983-4dd1-a942-a46636a497b2", "name": "-", "hierarchy": '0' }]
  //列出所有username
  getAllUserName(): void {
    this.HttpApiService.getAccountRequest()
      .subscribe(userRequest => {
        this.userList = userRequest.body.accounts
        console.log(this.userList)
        // this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
      })
    //console.log(this.userList)
  }

  userid = ''
  num = 0
  selectUserList: any[] = [] //id 陣列 
  selectUserNameList: any[] = [] //name 陣列
  addSelectUser() {
    //this.user_id=''
    this.selectUserList.push(this.userid)
    this.num++;
    console.log(this.selectUserList)//id陣列 uuid

    this.selectUserNameList = []
    for (let i = 0; i <= this.selectUserList.length - 1; i++) { //run uuid list
      for (let j in this.userList) {
        if (this.selectUserList[i] == this.userList[j].account_id) {
          this.selectUserNameList.push(this.userList[j].name)
        }
      }
    }

    // for(let i in this.selectUserList){
    //   console.log(this.selectUserList[i])
    // }
    console.log(this.selectUserNameList)//名字陣列
    //this.userid = ''
  }


  deleteSelectUser(data: any) {
    console.log(this.selectUserNameList)
    for (var i = this.selectUserNameList.length - 1; i >= 0; i--) {
      if (data == i) {
        console.log(i)//2,1,0
        this.selectUserNameList.splice(i, 1)
        this.selectUserList.splice(i, 1)
        this.num--
      }
      //console.log(i)//2,1,0
      //this.selectUserNameList
    }
  }

  addTaskRes: any
  addtId: any

  checkProjectData(): void {
    if(this.code && this.date_for_start && this.date_for_end && this.internal_order && this.external_order
      && this.machine_finished_number && this.machine_english && this.salesman_id){
        this.addProjectRequest()
      }
    else{
      Swal.fire({
        icon: 'error',
        title: '資料填寫不完全',
        //text: 'Something went wrong!',
      })
    }
  }

  addProjectRequest(): void {
    this.SwalService.loadingAlertNoback("新增中..", 3000)
    let projectManagerDatas: any = {}
    projectManagerDatas['code'] = this.code
    this.date_for_start = new Date(this.date_for_start)
    this.date_for_start.setHours(this.date_for_start.getHours() + 8) //加八小時
    projectManagerDatas['date_for_start'] = this.date_for_start
    projectManagerDatas['projectman_id'] = this.salesman_id
    projectManagerDatas['type'] = '專案授權書'
    projectManagerDatas['origin_id'] = '7f7daf49-ccb2-4ee4-9ad4-dec3d7b7bb4f'
    projectManagerDatas['p_name'] = '專案授權書'
    projectManagerDatas['status'] = "未審核"
    projectManagerDatas['creater'] = this.userJson.account_id
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
    
    
    console.log(projectManagerDatas)

    console.log(JSON.stringify(projectManagerDatas))

    this.HttpApiService.uploadProjectRequest_t(projectManagerDatas).subscribe(projectRequest => {
      let projectData: any = projectRequest
      this.p_id = projectData.body
      console.log('成功新增project', projectData, this.p_id)
      this.uploadTaskRequests(this.p_id)
    }, (err: any) => {
      console.log('err:', err)
    })
  }

  taskDatas: any = { "task": [] }
  uploadTaskRequests(p_id: any): void {
    let taskManagerDatas: any = {};//接收資料
    taskManagerDatas['documents_id'] = p_id
    taskManagerDatas['t_name'] = '專案授權書'
    taskManagerDatas['default_date'] = 2
    taskManagerDatas['default_labor_hour'] = 2
    taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['origin_id'] = '7f7daf49-ccb2-4ee4-9ad4-dec3d7b7bb4f'
    taskManagerDatas['date_for_estimated_start'] = this.date_for_start
    taskManagerDatas['date_for_actual_completion'] = ""
    taskManagerDatas['date_for_estimated_completion'] = this.date_for_start
    this.taskDatas.task.push(taskManagerDatas)
    console.log(this.taskDatas)
    this.HttpApiService.uploadpluralTaskRequest(this.taskDatas)
      .subscribe(taskRequest => {
        console.log('成功', taskRequest)
        var taskidDatas: any = taskRequest

        this.addTaskUserRequest(taskidDatas.body)
        setTimeout(() => { this.editurl() }, 1000);
      })
  }

  test(): void {
    console.log(this.selectUserList)
  }
  uploadtaskuserDatas: any = { "task_user": [] }
  //新增task_user表
  addTaskUserRequest(taskidDatas: any): void {
    console.log("e04")
    if (this.selectUserList[0]) {
      for (let i in this.selectUserList) {
        let taskUsersDatas: any = {}
        taskUsersDatas['principal'] = false //次要負責人false
        taskUsersDatas['task_id'] = taskidDatas[0]
        taskUsersDatas['user_id'] = this.selectUserList[i]
        this.uploadtaskuserDatas.task_user.push(taskUsersDatas)
      }
      console.log(this.uploadtaskuserDatas)
      this.HttpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
        .subscribe(taskuserRequest => {
          console.log("成功")
          console.log(taskuserRequest)
          
        })
    }
  }
  // 跳轉頁面------------------------------------------
  editurl(): void {
    window.location.assign(`main/projectinfo/project-audit-form`);
  }

  reset() {
    //幫輸入欄位增加統一的類別或name後再reset會比較好
    this.selectUserList = []
    this.selectUserNameList = []
    this.num = 0
  }

}