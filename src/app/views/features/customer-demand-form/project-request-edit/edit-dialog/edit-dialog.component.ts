import { TaskRequest } from './../../../../../shared/models/model';
import { HttpApiService } from './../../../../../api/http-api.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

export interface PeriodicElement1 {
  name: string;
  before_id: string;
  principal: string;
  labor_hour: string;
  description: string;
  time_for_done: string;
  time_for_start: string;
}

const ELEMENT_DATA_1: PeriodicElement1[] = [

];

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})

export class EditDialogComponent implements OnInit {

  editForm: FormGroup;

  editTaskForm: FormGroup; //編輯task
  @Input()
  title!: string;
  @Input() selectedItem!: TaskRequest;


  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private taskdata: any,
    private SwalService: SwalEventService,
  ) {
    this.editTaskForm = this.fb.group({
      code: new FormControl(),
      t_name: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      date_for_actual_completion: new FormControl(),
      principal: new FormControl(),
      remark: new FormControl(),
      labor_hour: new FormControl(),
      last_task: new FormControl(),
      landmark: new FormControl(),
      sales_order_number: new FormControl(),
      last_date_start: new FormControl(),
      last_date_completion: new FormControl(),
    });
  }

  //雙向綁訂------------------------------------------------
  // t_id:any;
  //name:any='';
  // description:any='';
  // time_for_start:any='';
  // time_for_done:any='';
  // principal:any='';
  // labor_hour:any='';

  ngOnInit(): void {
    this.t_id = this.taskdata.t_id
    this.c_id = this.taskdata.c_id
    this.getOneTestTask(this.t_id)
    this.getAllTaskName()
    //取得所有參與人員資料
    // this.getAllTaskUserRequest()
    //取得所有參與人員資料
    this.getTaskUserRequest()

    this.getAllTaskName()
    //取得部門資料
    this.getDepartmentList()

    this.editTaskForm = this.fb.group({
      code: new FormControl(),
      t_name: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      date_for_actual_completion: new FormControl(),
      principal: new FormControl(),
      remark: new FormControl(),
      labor_hour: new FormControl(),
      last_task: new FormControl(),
      landmark: new FormControl(),
      sales_order_number: new FormControl(),
      last_date_start: new FormControl(),
      last_date_completion: new FormControl(),
      taskPrincipalIdDatas: new FormControl(),
    });
  }

  //雙向綁定--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  t_name: any;
  remark: any;
  last_task: any;
  landmark: any;
  date_for_estimated_start: any;
  date_for_estimated_completion: any;
  last_date_start: any;
  last_date_completion: any;
  file: any;
  taskList = [{ "id": "00000000-0000-0000-0000-000000000000", "name": "-", "hierarchy": '0' }]
  lastdata: any;
  //編輯頁面id
  c_id: any;
  task_name: any;
  t_id: any;

  myControl = new FormControl();



  testtaskDatas: any;
  //取得任務one task資料----------------------------------------------------
  getOneTestTask(t_id: any): void {

    this.HttpApiService.getOneTaskRequest_t(t_id).
      subscribe(testtaskRequest => {
        this.testtaskDatas = testtaskRequest;
        console.log(this.testtaskDatas.body.last_task)
        this.HttpApiService.getOneTaskRequest_t(this.testtaskDatas.body.last_task).subscribe(lastDatas => {
          this.lastdata = lastDatas
          this.last_date_start = this.lastdata.body.date_for_estimated_start
          this.last_date_completion = this.lastdata.body.date_for_estimated_completion
        })
        //console.log(this.testtaskDatas)
      })
    //console.log(this.last_date_start)
    //console.log(this.last_date_completion)
  }

  //列出所有此客需單任務人
  getAllTaskName(): void {
    this.HttpApiService.getTaskListUserRequest(this.c_id)
      .subscribe(taskRequest => {
        var taskdatas: any = taskRequest
        if (taskdatas.body.task[0]) {
          for (var i in taskdatas.body.task) {
            this.taskList.push({ "id": taskdatas.body.task[i].t_id, "name": taskdatas.body.task[i].t_name, "hierarchy": taskdatas.body.task[i].hierarchy })
          }
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
    console.log(this.accountgroup)
  }

  user_id = ''
  userList: any[] = []

  //列出所有username
  getAllUserName(): void {
    for (var pagenum = 1; pagenum <= 92; pagenum++) {
      this.HttpApiService.getAccountRequest_t(pagenum, 1)
        .subscribe(userRequest => {
          this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
        })
      //console.log("userList",this.userList)
    }
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
        console.log(taskuserRequest.body.task)
        for (var i in taskuserRequest.body.task) {
          if (taskuserRequest.body.task[i].principal) {
            this.taskPrincipalDatas.push(taskuserRequest.body.task[i])
          }
          else {
            this.taskUserDatas.push(taskuserRequest.body.task[i])
          }
        }

        console.log("舊的主要負責人", this.taskPrincipalDatas)
        console.log("舊的參與人員", this.taskUserDatas)

        this.taskPrincipaltaskDatas = this.taskPrincipalDatas[0].tu_id
        this.taskPrincipalIdDatas = this.taskPrincipalDatas[0].account_id
        this.taskPrincipalNameDatas = this.taskPrincipalDatas[0].name

        for (var i in this.taskUserDatas) {
          this.taskUsertaskDatas.push(this.taskUserDatas[i].tu_id)
          this.taskUserIdDatas.push(this.taskUserDatas[i].account_id)
          this.num++
          this.taskUserNameDatas.push(this.taskUserDatas[i].name)
        }

        console.log(this.taskUsertaskDatas)
        console.log("舊的參與人員名字", this.taskUserNameDatas)
        console.log("舊的參與人員tu_id", this.taskUsertaskDatas[0])
        for (let i in this.taskPrincipalDatas) {
          //console.log(this.taskPrincipalDatas[i].user_id)
          this.getOneUserRequest(this.taskPrincipalDatas[i].account_id)
        }

      })
  }

  // getAllTaskUserRequest(): void {
  //   this.getAllUserName()//get{id:,name:}
  //   this.HttpApiService.getTaskUserRequest_t(1, 15)
  //     .subscribe(taskRequest => {
  //       //console.log(taskRequest)
  //       this.taskDatas = taskRequest.body.task_user
  //       //console.log(this.taskDatas)
  //       //console.log(this.t_id)
  //       //篩選出跟此m_id有關的task
  //       for (var i in this.taskDatas) {
  //         //console.log(this.taskDatas[i])
  //         if (this.taskDatas[i].task_id == this.t_id) {
  //           if (this.taskDatas[i].principal == true) {
  //             this.taskPrincipalDatas.push(this.taskDatas[i])
  //           } else {
  //             this.taskUserDatas.push(this.taskDatas[i])
  //             //console.log(this.taskDatas[i])
  //           }

  //         }
  //         //console.log(this.taskPrincipalDatas)
  //         //console.log(this.taskUserDatas)
  //       }
  //       //會議主席id陣列
  //       for (var i in this.taskPrincipalDatas) {
  //         for (var j in this.userList) {
  //           if (this.taskPrincipalDatas[i].user_id == this.userList[j].id) {
  //             this.taskPrincipaltaskDatas = this.taskPrincipalDatas[i].tu_id
  //             this.taskPrincipalIdDatas = this.userList[j].id
  //             this.taskPrincipalNameDatas = this.userList[j].name
  //           }
  //         }
  //       }
  //       //console.log(this.taskPrincipalDatas)
  //       //會議參與人員id陣列
  //       for (var i in this.taskUserDatas) {
  //         for (var j in this.userList) {
  //           if (this.taskUserDatas[i].user_id == this.userList[j].id) {
  //             this.taskUsertaskDatas.push(this.taskUserDatas[i].tu_id)
  //             this.taskUserIdDatas.push(this.userList[j].id)
  //             this.num++
  //             this.taskUserNameDatas.push(this.userList[j].name)
  //           }
  //         }
  //       }
  //       //console.log(this.taskPrincipaltaskDatas)
  //       // console.log("會議主席人員ID List", this.taskPrincipalIdDatas)
  //       // console.log("會議主席人員Name List", this.taskPrincipalNameDatas)
  //       //console.log(this.taskUsertaskDatas)
  //       // console.log("會議參與人員ID List", this.taskUserIdDatas)
  //       // console.log("會議參與人員Name List", this.taskUserNameDatas)
  //       for (let i in this.taskPrincipalDatas) {
  //         //console.log(this.taskPrincipalDatas[i].user_id)
  //         this.getOneUserRequest(this.taskPrincipalDatas[i].user_id)
  //       }

  //     })
  // }

  oneUserRequest: any;
  oneUserDatas: any;
  chairman_name: any
  //取得單一user 主席
  getOneUserRequest(u_id: any): void {
    this.HttpApiService.getAccountOneRequest_t(u_id)
      .subscribe(oneUserRequest => {
        this.oneUserDatas = oneUserRequest
        this.chairman_name = this.oneUserDatas.body.name
        //console.log(this.oneUserDatas)
      })
  }


  //皆更新後的task資料----------------------------------------------
  newTaskDatas: any;

  updateTaskDatas: any = { "task": [] }
  //更新任務資料----------------------------------------------------
  updateTaskRequest(): void {

    var hierarchy
    for (var i in this.taskList) {
      if (this.taskList[i].id == this.testtaskDatas.body.last_task) {
        hierarchy = Number(this.taskList[i].hierarchy) + 1
      }
    }

    let taskManagerDatas: any = {}
    taskManagerDatas['t_id'] = this.testtaskDatas.body.t_id
    taskManagerDatas['t_name'] = this.testtaskDatas.body.t_name
    taskManagerDatas['remark'] = this.testtaskDatas.body.remark
    taskManagerDatas['last_task'] = this.testtaskDatas.body.last_task
    taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
    //taskManagerDatas['landmark'] = this.landmark
    //this.date_for_estimated_start.setHours(this.date_for_estimated_start.getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_start'] = this.testtaskDatas.body.date_for_estimated_start
    //this.date_for_estimated_completion.setHours(this.date_for_estimated_completion.getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_completion'] = this.testtaskDatas.body.date_for_estimated_completion
    taskManagerDatas['file'] = this.testtaskDatas.body.file
    taskManagerDatas['landmark'] = this.testtaskDatas.body.landmark
    taskManagerDatas['hierarchy'] = hierarchy

    this.updateTaskDatas.task.push(taskManagerDatas)
    console.log("taskManagerDatas", taskManagerDatas)
    console.log(this.testtaskDatas.body)

    this.HttpApiService.updatepluralTaskRequest(this.updateTaskDatas)
      .subscribe(Request => {
        console.log('成功', Request)
      }, (err: any) => {
        console.log('err:', err)
      })
    this.updateTaskUserRequest()
    //const backUrl = `main/project-A/project-request-edit/${this.c_id}`
    //location.href = backUrl;
  }

  uploadtaskuserDatas: any = { "task_user": [] }
  updatetaskuserDatas: any = { "task_user": [] }
  updateTaskUserRequest(): void {
    let updateTaskUser: any = {}
    updateTaskUser['tu_id'] = this.taskPrincipaltaskDatas
    updateTaskUser['task_id'] = this.t_id
    updateTaskUser['user_id'] = this.taskPrincipalIdDatas
    this.updatetaskuserDatas.task_user.push(updateTaskUser)
    this.HttpApiService.updatepluralTaskUserRequest(this.updatetaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log("成功")
        console.log(taskuserRequest)
      })
    for (var i in this.taskUsertaskDatas) {
      //console.log(this.taskUsertaskDatas[i])
      //刪除
      this.HttpApiService.deleteTaskUserRequest_t(this.taskUsertaskDatas[i])
        .subscribe(res => {
          console.log("成功", res)
        },
          (err: any) => {
            console.log('err:', err);
          }
        );
    }
    for (var i in this.taskUserNameDatas) {
      let newTaskUser: any = {}
      newTaskUser['task_id'] = this.t_id
      newTaskUser['user_id'] = this.taskUserIdDatas[i]
      this.uploadtaskuserDatas.task_user.push(newTaskUser)
      //新增
    }
    this.HttpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
      .subscribe(taskuserRequest => {
        console.log("成功")
        console.log(taskuserRequest)
        this.SwalService.loadingAlertbackCR("編輯任務中..", 750, this.c_id)
      })
  }


  // form倒入資料
  setForm() {
    this.editTaskForm.setValue({
      name: this.selectedItem.name,
      description: this.selectedItem.description,
      time_for_start: this.selectedItem.time_for_start,
      time_for_done: this.selectedItem.time_for_done,
      principal: this.selectedItem.principal
    });
  }

  // 還原原資料
  resetForm() {
    this.setForm();
  }

  // 送出
  submit(formValue: any) {
    // if (formValue.new_password !== formValue.confirm_password) {
    //   alert('請確認密碼');
    //   return;
    // }
    if (this.editTaskForm.valid) {
      //   this.updateMemberPassword(member);

    } else {
      this.markFormGroupTouched(this.editTaskForm);
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

}
