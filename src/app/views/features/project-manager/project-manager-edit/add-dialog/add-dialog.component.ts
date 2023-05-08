import { SwalEventService } from 'src/app/api/swal-event.service';
import { HttpApiService } from './../../../../../api/http-api.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//swal
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
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {

  // isLinear = false;
  addForm: FormGroup;
  // editTaskForm:FormGroup; //編輯task
  @Input() title!: string;

  //task表
  t_name: any;
  //code:any;
  principal_id:any; //主要負責人id task_user.principal = true
  remark: any;
  last_task = "00000000-0000-0000-0000-000000000000";
  user_id: any;
  date_for_estimated_start: any;
  date_for_estimated_completion: any;
  landmark = false;
  file = true;

  //task_user 表
  principal = false;
  
  p_id: any;
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private SwalService:SwalEventService,
    @Inject(MAT_DIALOG_DATA) private projectDatas: any
  ) {
    this.addForm = this.fb.group({
      t_name: new FormControl(),
      remark: new FormControl(),
      last_task: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      principal:new FormControl(),
      landmark:new FormControl(),
      file: new FormControl(),

      //task_user
      user_id: new FormControl(),
    });
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
    //console.log(this.projectDatas.p_id)
    this.p_id = this.projectDatas.p_id
    this.addForm = this.fb.group({
      t_name: new FormControl(),
      remark: new FormControl(),
      last_task: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      principal:new FormControl(),
      landmark:new FormControl(),
      file: new FormControl(),
      //task_user
      user_id: new FormControl(),

    });
    this.getAllUserName()//get{id:,name:}
    this.getAllTaskName()
    //console.log(this.projectDatas.p_id)
    //取得部門資料
    this.getDepartmentList()
  }

  //取得user列表-------------------------------------------------------------------------
  accountControl = new FormControl();
  accountgroup: AccountGroup[] = []
  getDepartmentList(): void {
    this.HttpApiService.getDepartmentList()
    .subscribe(departmentRequest=>{
      var departmentdatas:any = departmentRequest
      for(var i in departmentdatas.body.department){
        this.accountgroup.push({"name":departmentdatas.body.department[i].name,"account":[]})
      }
      this.getAccountList()
    })
  }

  getAccountList(): void {
    this.HttpApiService.getAccountList()
    .subscribe(AccountRequest=>{
      var accountdatas:any = AccountRequest
      for(var i in accountdatas.body.accounts){
        for(var j in this.accountgroup){
          if(this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name){
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
  taskList = [{"id": "00000000-0000-0000-0000-000000000000", "name": "-", "hierarchy": '0'}]
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
  num=0
  selectUserList:any[] = [] //id 陣列 
  selectUserNameList:any[] = [] //name 陣列
  addSelectUser(){
    //this.user_id=''
    this.selectUserList.push(this.userid)
    this.num++;
    console.log(this.selectUserList)//id陣列 uuid

    this.selectUserNameList = []
    for(let i = 0;i <= this.selectUserList.length-1;i++){ //run uuid list
      for(let j in this.userList){
        if(this.selectUserList[i] == this.userList[j].account_id){
          this.selectUserNameList.push(this.userList[j].name)
        }
      }
    }

    // for(let i in this.selectUserList){
    //   console.log(this.selectUserList[i])
    // }
    console.log(this.selectUserNameList)//名字陣列
  }

  deleteSelectUser(data:any){
    console.log(this.selectUserNameList)
    for(var i=this.selectUserNameList.length-1 ;i >=0;i--){
      if(data == i){
        console.log(i)//2,1,0
        this.selectUserNameList.splice(i,1)
        this.selectUserList.splice(i,1)
        this.num--
      }
      //console.log(i)//2,1,0
      //this.selectUserNameList
    }
  }

  //列出所有此專案任務
  getAllTaskName(): void {
    this.HttpApiService.getTaskListUserRequest(this.p_id)
    .subscribe(taskRequest =>{
      console.log(taskRequest)
      var taskdatas: any = taskRequest
      if(taskdatas.body.task[0]){
        for(var i in taskdatas.body.task){
          this.taskList.push({ "id": taskdatas.body.task[i].t_id, "name": taskdatas.body.task[i].t_name, "hierarchy": taskdatas.body.task[i].hierarchy })
        }
      }
    })
    //console.log("最新 taskList",this.taskList)
  }

  addTaskRes:any
  addtId:any

  uploadtaskDatas: any = {"task": []}
  uploadtaskuserDatas: any = {"task_user": []}
  now = Date.now();//
  addTaskRequest(): void {
    var hierarchy
    for(var i in this.taskList){
      if(this.taskList[i].id == this.last_task){
        hierarchy = Number(this.taskList[i].hierarchy) + 1
      }
    }
    let taskManagerDatas: any = {}
    taskManagerDatas['documents_id'] = this.p_id
    taskManagerDatas['t_name'] = this.t_name
    taskManagerDatas['remark'] = this.remark
    taskManagerDatas['last_task'] = this.last_task
    taskManagerDatas['landmark'] = this.landmark
    this.date_for_estimated_start.setHours(this.date_for_estimated_start.getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_start'] = this.date_for_estimated_start
    this.date_for_estimated_completion.setHours(this.date_for_estimated_completion.getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_completion'] = this.date_for_estimated_completion
    taskManagerDatas['date_for_actual_completion'] = new Date(this.now);
    taskManagerDatas['origin_id'] = "1e6913f5-55be-413a-94a5-68f8cc67d5b2"// 寫死為project來源
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    taskManagerDatas['file'] = this.file
    taskManagerDatas['landmark'] = this.landmark
    taskManagerDatas['hierarchy'] = hierarchy
    console.log("taskManagerDatas",taskManagerDatas)
    this.uploadtaskDatas.task.push(taskManagerDatas)
    this.HttpApiService.uploadpluralTaskRequest(this.uploadtaskDatas).subscribe(addTaskRes => {
      this.SwalService.uploadTransactionRecordRequests(this.p_id,'新增', '專案任務',this.userJson.account_id)
      this.addtId = addTaskRes//為了取得新增task的body{id}
      console.log('成功新增task',this.addtId)
      let taskUserDatas:any = {}
      taskUserDatas['principal'] = true //主要負責人true
      taskUserDatas['task_id'] = this.addtId.body[0]
      taskUserDatas['user_id'] = this.principal_id
      console.log("taskUserDatas",taskUserDatas)
      this.uploadtaskuserDatas.task_user.push(taskUserDatas)
      //this.addTaskUserRequest(taskUserDatas)
      for(let i in this.selectUserList) {
        let taskUsersDatas:any = {}
        taskUsersDatas['principal'] = false //次要負責人false
        taskUsersDatas['task_id'] = this.addtId.body[0] //t_id
        taskUsersDatas['user_id'] = this.selectUserList[i]
        this.uploadtaskuserDatas.task_user.push(taskUsersDatas)
        //this.addTaskUserRequest(taskUsersDatas)
      }
      //console.log(taskUsersDatas)
      this.addTaskUserRequest()
      //setTimeout(() => { this.editurl() }, 5000);
      
      //this.SwalService.loadingAlertbackproject('新增任務成功！..',1500,this.p_id)
    }, (err: any) => {
      console.log('err:', err)
    })
  }
  
  //新增task_user表
  addTaskUserRequest(): void {
    console.log(this.uploadtaskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
    .subscribe(taskuserRequest =>{
      console.log("成功")
      console.log(taskuserRequest)
      this.SwalService.loadingAlertbackproject("新增任務中..",750,this.p_id)
      
    })
    //this.SwalService.loadingAlertbackproject('新增任務成功！..',1500,this.p_id)
    //setTimeout(() => { this.editurl() }, 5000);
  }
  // 跳轉頁面------------------------------------------
  editurl(): void {
    window.location.assign(`main/projectinfo/project-manager-edit/${this.p_id}`);
  }

  reset() {
    //幫輸入欄位增加統一的類別或name後再reset會比較好
    this.selectUserList=[]
    this.selectUserNameList=[]
    this.num=0
  }

}