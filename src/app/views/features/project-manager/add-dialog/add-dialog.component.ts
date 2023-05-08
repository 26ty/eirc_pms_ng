import { AccountId } from './../../../../shared/models/models';
import { HttpApiService } from './../../../../api/http-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//swal
import Swal from 'sweetalert2'
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
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})

export class AddDialogComponent implements OnInit {

  myVar: number;

  addForm: FormGroup;
  @Input() title!: string;
  myControl = new FormControl();

  code: any;
  type: any;
  p_name: any;
  projectman_id: any;
  create_time = new Date().getFullYear();
  date_for_start: any;
  date_for_end: any;
  creater_name:any
  creater_dep:any
  userList: any[] = [];
  test: any;

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private SwalEvent: SwalEventService
  ) {
    this.addForm = this.fb.group({
      code: ['', [Validators.required]],
      type: ['', [Validators.required]],
      p_name:  ['', [Validators.required]],
      projectman_id: ['', [Validators.required]],
      date_for_start:  ['', [Validators.required]],
      date_for_end: ['', [Validators.required]],
      selectedTempalet: ['', [Validators.required]],
    });
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)
    // this.addForm = new FormGroup({
    //   code: new FormControl(),
    //   type: new FormControl(),
    //   p_name: new FormControl(),
    //   projectman_id: new FormControl(),
    //   date_for_start: new FormControl(),
    //   date_for_end: new FormControl()
    // })
    //this.getAllUserName()

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

  accountdatas:any
  getAccountList(): void {
    this.HttpApiService.getAccountList()
      .subscribe(AccountRequest => {
        console.log(AccountRequest)
        this.accountdatas= AccountRequest
        for (var i in this.accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == this.accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(this.accountdatas.body.accounts[i])
            }
          }
        }

        for (let i in this.accountdatas.body.accounts) {
          if (this.userJson.account_id == this.accountdatas.body.accounts[i].account_id) {
            this.creater_name = this.accountdatas.body.accounts[i].name
            this.creater_dep = this.accountdatas.body.accounts[i].dep_name
          }
        }
        console.log(this.creater_name,this.creater_dep)
      })
  }

  //選擇專案種類type-----------------------------------------------------------------------
  type_status:boolean = false
  selectProjectType(){
    this.code =''
    this.p_name = ''
    this.type_status = false
    if(this.type == 'Repeat Order'){
      this.getProjectTemplateRequest() //跑出專案範本全選項
      this.type_status = !this.type_status
    }else{
      this.PTarray=[]
    }
  }
  //取得全部專案範本-----------------------------------------------------------------------
  projectTemplateData: any
  PTarray:any[]=[]
  selectedTempalet:any//選擇的範本資料
  getProjectTemplateRequest(){
    this.PTarray=[]
    this.HttpApiService.getProjectTemplateRequest_t(1).subscribe(
      res => {
        this.projectTemplateData = res.body.project
        console.log("專案範本資料",this.projectTemplateData)
        for(let i in this.projectTemplateData){
          // this.PTarray=[]
          this.PTarray.push({'pt_id':this.projectTemplateData[i].p_id,'p_name':this.projectTemplateData[i].p_name})
        }
        console.log(this.PTarray)
      }
    )
  }

  //取得單一專案範本資料-----------------------------------------------------------------------
  projectTemplateDatas: any;
  getOneProjectTemplateRequest(pt_id:any): void {
    this.HttpApiService.getOneProjectRequest_t(pt_id).subscribe(
      res => {
        this.projectTemplateDatas = res.body
        console.log("選擇的範本資料",this.projectTemplateDatas)
        this.p_name = this.projectTemplateDatas.p_name
        this.code = this.projectTemplateDatas.code
        console.log(this.code,this.p_name)
      },
      (err: any) => {
        console.log('err:', err);
      }
    )
  }

  //取得單一專案範本任務資料-----------------------------------------------------------------------
  taskTemplatDatas:any
  uploadetaskRes:any
  uploadPTtaskDatas: any = {"task": []}
  uploadPTtaskuserDatas: any = {"task_user": []}
  getProjectTaskData(pt_id:any,document_id:any){
    

    this.HttpApiService.getTaskList(pt_id, 2).subscribe(
      res => {
        this.taskTemplatDatas = res.body.task
        console.log("選擇的範本任務資料",this.taskTemplatDatas)
        
        for(let i in this.taskTemplatDatas){
          this.uploadPTtaskDatas = {"task": []}
          var hierarchy
          for(var j in this.taskList){
            if(this.taskList[j].id == this.last_task){
              hierarchy = Number(this.taskList[j].hierarchy) + 1
            }
          }
          // this.taskTemplatDatas[i].code = ''
          // this.taskTemplatDatas[i].create_time = ''

          let taskManagerDatas: any = {}
          taskManagerDatas['documents_id'] = document_id
          taskManagerDatas['t_name'] = this.taskTemplatDatas[i].t_name
          
          taskManagerDatas['last_task'] = this.taskTemplatDatas[i].last_task//e04============
          taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
          taskManagerDatas['date_for_estimated_start'] = this.taskTemplatDatas[i].date_for_estimated_start
          taskManagerDatas['date_for_estimated_completion'] = this.taskTemplatDatas[i].date_for_estimated_completion
          taskManagerDatas['origin_id'] = "1e6913f5-55be-413a-94a5-68f8cc67d5b2"// project來源
          taskManagerDatas['file'] = false
          taskManagerDatas['landmark'] = this.taskTemplatDatas[i].landmark
          taskManagerDatas['hierarchy'] = hierarchy
          console.log("taskManagerDatas",taskManagerDatas)
          this.uploadPTtaskDatas.task.push(taskManagerDatas)
          console.log("要新增進去的task",this.uploadPTtaskDatas)
          this.HttpApiService.uploadpluralTaskRequest(this.uploadPTtaskDatas).subscribe(
            res => {
              console.log("新增任務res",res)
              this.uploadetaskRes = res
              // console.log("新增任務成功id",this.uploadetaskRes.body)
              this.uploadPTtaskuserDatas= {"task_user": []}
              let taskUserDatas:any = {}
              taskUserDatas['principal'] = true //主要負責人true
              taskUserDatas['task_id'] = this.uploadetaskRes.body[0] // t_id
              taskUserDatas['user_id'] = '00000000-0000-0000-0000-000000000000'
              console.log("taskUserDatas",taskUserDatas)
              this.uploadPTtaskuserDatas.task_user.push(taskUserDatas)
              console.log("要新增進去的taskuser",this.uploadPTtaskuserDatas)
              this.SwalEvent.loadingAlertNoback('請稍等...', 1500)
              this.HttpApiService.uploadpluralTaskUserRequest(this.uploadPTtaskuserDatas)
              .subscribe(taskuserRequest =>{
                console.log("新增task_user res",taskuserRequest)
                window.location.assign(`main/projectinfo/project-manager-edit/${document_id}`);
              })
            }
          )
        }
      },
      (err: any) => {
        console.log('err:', err);
      }
    )
  }
  
  projectType_option: any[] = ['一般專案', 'Repeat Order', '正式專案', '年度專案', '修改案',
    '開發中專案', '開發案', '出機待驗收', '已驗收待結案'];
  //列出所有username
  getAllUserName(): void {
    for (var pagenum = 1; pagenum <= 92; pagenum++) {
      this.HttpApiService.getAccountRequest_t(pagenum, 1)
        .subscribe(userRequest => {
          this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
        })
    }
    console.log()
  }

  addProjectType(){
    console.log(this.selectedTempalet)
    if(this.selectedTempalet == null || this.selectedTempalet == undefined ){
      this.addAllRequest()
    }else{
      //this.getOneProjectTemplateRequest(this.selectedTempalet)
      let projectTemplateDatas:any = {}
      projectTemplateDatas['code'] = this.code
      projectTemplateDatas['type'] = this.type
      projectTemplateDatas['p_name'] = this.p_name
      projectTemplateDatas["customer_id"] = "00000000-0000-0000-0000-000000000000" //此階段還未新增
      projectTemplateDatas["salesman_id"] = "00000000-0000-0000-0000-000000000000"
      projectTemplateDatas["serviceman_id"] = "00000000-0000-0000-0000-000000000000"
      projectTemplateDatas["inner_id"] = "-"
      projectTemplateDatas['projectman_id'] = this.projectman_id

      this.date_for_start.setHours(this.date_for_start.getHours() + 8) //加八小時
      projectTemplateDatas['date_for_start'] = this.date_for_start
      this.date_for_end.setHours(this.date_for_end.getHours() + 8) //加八小時
      projectTemplateDatas['date_for_end'] = this.date_for_end

      projectTemplateDatas["creater"] = this.userJson.account_id
      projectTemplateDatas["status"] = "建檔中"
      projectTemplateDatas["origin_id"] = this.project_type_id
      console.log(projectTemplateDatas)
      this.HttpApiService.uploadProjectRequest_t(projectTemplateDatas).subscribe(
        res => {
          //取範本任務
          console.log("新增project成功",res)
          this.getProjectTaskData(this.selectedTempalet,res.body)
          this.uploadTransactionRecordRequests(res.body)
        }
      )
      
    }
  }
  p_id: any
  project_type_id = '1e6913f5-55be-413a-94a5-68f8cc67d5b2'
  //新增專案
  addAllRequest(): void {
    let projectManagerDatas: any = {};//接收資料
    projectManagerDatas['code'] = this.code
    projectManagerDatas['type'] = this.type
    projectManagerDatas['p_name'] = this.p_name
    projectManagerDatas["customer_id"] = "00000000-0000-0000-0000-000000000000" //此階段還未新增
    projectManagerDatas["salesman_id"] = "00000000-0000-0000-0000-000000000000"
    projectManagerDatas["serviceman_id"] = "00000000-0000-0000-0000-000000000000"
    projectManagerDatas["inner_id"] = "-"
    projectManagerDatas['projectman_id'] = this.projectman_id

    this.date_for_start.setHours(this.date_for_start.getHours() + 8) //加八小時
    projectManagerDatas['date_for_start'] = this.date_for_start
    this.date_for_end.setHours(this.date_for_end.getHours() + 8) //加八小時
    projectManagerDatas['date_for_end'] = this.date_for_end

    projectManagerDatas["creater"] = this.userJson.account_id
    projectManagerDatas["status"] = "建檔中"
    projectManagerDatas["origin_id"] = this.project_type_id
    console.log(projectManagerDatas)
    this.HttpApiService.uploadProjectRequest_t(projectManagerDatas).subscribe(Request => {
      this.p_id = Request
      this.addTaskRequest(this.p_id.body,this.p_id.body)
      this.uploadTransactionRecordRequests(this.p_id.body)

      //window.location.assign(`main/projectinfo/project-manager-edit/${this.p_id.body}`);
      console.log('成功', Request)

      //新增專案負責任務
    }, (err: any) => {
      console.log('err:', err)
    })

  }

  //task表
  t_name: any;
  //code:any;
  principal_id:any; //主要負責人id task_user.principal = true
  last_task = "00000000-0000-0000-0000-000000000000";
  taskList = [{"id": "00000000-0000-0000-0000-000000000000", "name": "-", "hierarchy": '0'}]

  addTaskRes:any
  addtId:any

  uploadtaskDatas: any = {"task": []}
  uploadtaskuserDatas: any = {"task_user": []}
  addTaskRequest(documents_id:any,pid:any): void {
    var hierarchy
    for(var i in this.taskList){
      if(this.taskList[i].id == this.last_task){
        hierarchy = Number(this.taskList[i].hierarchy) + 1
      }
    }
    let taskManagerDatas: any = {}
    taskManagerDatas['documents_id'] = documents_id
    taskManagerDatas['t_name'] = '專案負責'
    //taskManagerDatas['remark'] = this.remark
    taskManagerDatas['last_task'] = this.last_task
    this.date_for_start.setHours(this.date_for_start.getHours() + 8) //date_for_start
    taskManagerDatas['date_for_estimated_start'] = this.date_for_start
    this.date_for_end.setHours(this.date_for_end.getHours() + 8) //date_for_end
    taskManagerDatas['date_for_estimated_completion'] = this.date_for_end
    taskManagerDatas['origin_id'] = "1e6913f5-55be-413a-94a5-68f8cc67d5b2"// project來源
    taskManagerDatas['file'] = false
    taskManagerDatas['landmark'] = false
    taskManagerDatas['hierarchy'] = hierarchy
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    console.log("taskManagerDatas",taskManagerDatas)
    this.uploadtaskDatas.task.push(taskManagerDatas)
    this.HttpApiService.uploadpluralTaskRequest(this.uploadtaskDatas).subscribe(addTaskRes => {
      
      this.addtId = addTaskRes//為了取得新增task的body{id}
      console.log('成功新增task',this.addtId)
      let taskUserDatas:any = {}
      taskUserDatas['principal'] = true //主要負責人true
      taskUserDatas['task_id'] = this.addtId.body[0] // t_id
      taskUserDatas['user_id'] = this.projectman_id
      console.log("taskUserDatas",taskUserDatas)
      this.uploadtaskuserDatas.task_user.push(taskUserDatas)
      this.SwalEvent.loadingAlertNoback('請稍等...', 1500)
      this.HttpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
      .subscribe(taskuserRequest =>{
      console.log("成功新增task_user",taskuserRequest)
      window.location.assign(`main/projectinfo/project-manager-edit/${pid}`);
      
    })
      //this.SwalService.loadingAlertbackproject('新增任務成功！..',1500,this.p_id)
    }, (err: any) => {
      console.log('err:', err)
    })
  }
  
  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(p_id: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = p_id
    trManagerDatas['actor'] = '新增'
    trManagerDatas['content'] = '專案'
    trManagerDatas['creater'] = this.userJson.account_id

    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log('成功紀錄',taskuserRequest)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

}
