import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpApiService } from './../../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalEventService } from 'src/app/api/swal-event.service';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export interface PeriodicElement1 {
  name: string;
  description: string;
  before_id: string;
  principal: string;
  time_for_start: string;
  time_for_done: string;
  labor_hour: string;
  last_task: string;
}

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
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {

  addForm: FormGroup;
  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  departments: FormGroup;

  @Input() title!: string;


  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private httpApiService: HttpApiService,
    private SwalService: SwalEventService,
    @Inject(MAT_DIALOG_DATA) private CRDatas: any
  ) {
    this.addForm = this.fb.group({

      t_name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      principal_id: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      last_task: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      date_for_estimated_start: ['', [Validators.required]],
      date_for_estimated_completion: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      file: ['', [Validators.required]],
    }
    );
    this.departments = fb2.group({
      department1: false,
      department2: false,
      department3: false,
      department4: false,
      department5: false,
      department6: false,
    });
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }

  userJson: any
  ngOnInit(): void {

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    //this.getTaskRequest(this.CRDatas.c_id);
    this.c_id = this.CRDatas.c_id
    this.bonita_case_id = this.CRDatas.bonita_case_id
    this.account = this.CRDatas.account

    console.log(this.c_id)
    console.log(this.bonita_case_id)
    console.log(this.account)

    //取得部門資料
    this.getDepartmentList();
    //取得all user資料
    this.getAllUserName()

    this.getAllTaskName()

  }


  // 送出
  submit(formValue: any) {
    // if (formValue.new_password !== formValue.confirm_password) {
    //   alert('請確認密碼');
    //   return;
    // }
    if (this.addForm.valid) {
      //   this.updateMemberPassword(member);

    } else {
      this.markFormGroupTouched(this.addForm);
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


  userList: any[] = []
  selectUserList: any[] = [] //id 陣列 
  taskList = [{ "id": "00000000-0000-0000-0000-000000000000", "name": "-", "hierarchy": '0' }]

  addproject: any = {};
  c_id: any;
  bonita_case_id: any = ''
  account: any = ''
  //雙向綁定
  //task表
  t_name: any;
  //code: any;
  principal_id: any; //主要負責人id task_user.principal = true
  remark: any;
  last_task = "00000000-0000-0000-0000-000000000000";
  user_id: any;
  date_for_estimated_start: any;
  date_for_estimated_completion: any;
  landmark = false;
  file = true;

  //列出所有username
  getAllUserName(): void {
    for (var pagenum = 1; pagenum <= 92; pagenum++) {
      this.httpApiService.getAccountRequest_t(pagenum, 1)
        .subscribe(userRequest => {
          this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
        })
    }
  }

  //列出所有此客需單任務
  getAllTaskName(): void {
    this.httpApiService.getTaskListUserRequest(this.c_id)
      .subscribe(taskRequest => {
        console.log(taskRequest)
        var taskdatas: any = taskRequest
        if (taskdatas.body.task[0]) {
          for (var i in taskdatas.body.task) {
            this.taskList.push({ "id": taskdatas.body.task[i].t_id, "name": taskdatas.body.task[i].t_name, "hierarchy": taskdatas.body.task[i].hierarchy })
          }
        }
      })
    //console.log("最新 taskList",this.taskList)
  }


  addTaskRes: any
  addtId: any

  uploadtaskDatas: any = { "task": [] }
  uploadtaskuserDatas: any = { "task_user": [] }
  submitA1: any = {}
  addTaskRequest(): void {
    var hierarchy
    for (var i in this.taskList) {
      if (this.taskList[i].id == this.last_task) {
        hierarchy = Number(this.taskList[i].hierarchy) + 1
      }
    }

    let taskManagerDatas: any = {}
    taskManagerDatas['documents_id'] = this.c_id
    taskManagerDatas['t_name'] = this.t_name
    taskManagerDatas['remark'] = this.remark
    taskManagerDatas['last_task'] = this.last_task
    this.date_for_estimated_start.setHours(this.date_for_estimated_start.getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_start'] = this.date_for_estimated_start
    this.date_for_estimated_completion.setHours(this.date_for_estimated_completion.getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_completion'] = this.date_for_estimated_completion
    taskManagerDatas['origin_id'] = "443bd223-d750-409c-961a-93375052b186"// 寫死為客需單來源
    taskManagerDatas['file'] = this.file
    taskManagerDatas['landmark'] = this.landmark
    taskManagerDatas['hierarchy'] = hierarchy
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"


    console.log("taskManagerDatas", taskManagerDatas)
    this.uploadtaskDatas.task.push(taskManagerDatas)
    this.httpApiService.uploadpluralTaskRequest(this.uploadtaskDatas).subscribe(addTaskRes => {
      this.addtId = addTaskRes//為了取得新增task的body{id}
      console.log('成功新增task', this.addtId)
      let taskUserDatas: any = {}
      taskUserDatas['principal'] = true //主要負責人true
      taskUserDatas['task_id'] = this.addtId.body[0]
      taskUserDatas['user_id'] = this.principal_id
      taskUserDatas['status'] = '待回報'
      console.log("taskUserDatas", taskUserDatas)
      this.uploadtaskuserDatas.task_user.push(taskUserDatas)
      //this.addTaskUserRequest(taskUserDatas)

    })

    for (var i in this.accountdatas.body.accounts) {
      if (this.accountdatas.body.accounts[i].account_id == this.principal_id) {
        //console.log('same')
        this.submitA1['designee'] = Number(this.accountdatas.body.accounts[i].bonita_user_id)
        console.log(this.submitA1)
        this.getTaskReturnList();
        break;
      }
    }


  }


  //產生一筆新的transaction_record 紀錄資料格式-------------------------------------------
  uploadTransactionRecordRequests(): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = this.c_id
    trManagerDatas['actor'] = '新增任務'
    trManagerDatas['content'] = '客需單'
    trManagerDatas['creater'] = this.userJson.account_id

    this.httpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        //console.log(taskuserRequest)
        console.log('成功')
      }
      );
  }

  //取得bonita_task_id
  getTaskReturnList() {
    this.httpApiService.getTaskReturnList(this.account, this.bonita_case_id, this.userJson.bonita_user_id).subscribe(res => {
      console.log('取得bonita_task_id', res)
      this.addBonitaTask(res.body)
    }

    )
  }

  //新建bonita任務
  addBonitaTask(bonita_task_id: any) {
    this.httpApiService.ReviewCRForm(this.account, bonita_task_id, this.submitA1).subscribe(res => {
      console.log("新建bonita任務", res)
      this.addTaskUserRequest()
      this.uploadTransactionRecordRequests()

    })
  }

  myControl = new FormControl();
  //取得Task資料---------------------------------------------------------------------------------------------------------------------------------------------------------------
  taskname: any[] = [];
  taskDatas: any;
  //叫出編輯資料
  editTaskDatas: any;
  getTaskRequest(t_id: string): void {

    this.httpApiService.getOneTestTaskRequest(t_id).
      subscribe(testtask => {
        this.taskDatas = testtask;

        console.log('testtask', testtask)
        console.log('taskDatas', this.taskDatas.message.detail)

        for (var a in this.taskDatas.message.detail) {
          this.taskname.push(a)
        }

      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //新增task_user表
  // addTaskUserRequest(): void {
  //   console.log(this.uploadtaskuserDatas)
  //   this.httpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
  //     .subscribe(taskuserRequest => {
  //       console.log("成功")
  //       console.log(taskuserRequest)
  //       setTimeout(() => { this.editurl() }, 2000);
  //     })
  // }

  //新增task_user表
  addTaskUserRequest(): void {
    console.log(this.uploadtaskuserDatas)
    this.httpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log("成功")
        console.log(taskuserRequest)
        this.SwalService.loadingAlertbackCR("新增任務中..", 750, this.c_id)
      })
    //this.SwalService.loadingAlertbackproject('新增任務成功！..',1500,this.p_id)
    //setTimeout(() => { this.editurl() }, 5000);
  }

  //取得user列表-------------------------------------------------------------------------
  accountControl = new FormControl();
  accountgroup: AccountGroup[] = []
  getDepartmentList(): void {
    this.httpApiService.getDepartmentList()
      .subscribe(departmentRequest => {
        var departmentdatas: any = departmentRequest
        for (var i in departmentdatas.body.department) {
          this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "account": [] })
        }
        this.getAccountList()
      })
  }


  accountdatas: any
  getAccountList(): void {
    this.httpApiService.getAccountList()
      .subscribe(AccountRequest => {
        this.accountdatas = AccountRequest
        for (var i in this.accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == this.accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(this.accountdatas.body.accounts[i])
            }
          }
        }
      })
  }

  // 跳轉頁面------------------------------------------
  editurl(): void {
    this.SwalService.uploadTransactionRecordRequests(this.c_id, "編輯", "新增客需單任務", this.userJson.account_id)
    this.SwalService.loadingAlertbackCR("新增任務中..", 1000, this.c_id)
  }



}
