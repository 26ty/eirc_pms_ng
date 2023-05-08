
import { TaskRequest } from './../../../../../shared/models/model';
import { HttpApiService } from './../../../../../api/http-api.service';
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

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})

export class EditDialogComponent implements OnInit {

  editTaskForm: FormGroup; //編輯task
  editChairmanForm: FormGroup;//編輯主席
  @Input()
  title!: string;
  @Input() selectedItem!: TaskRequest;

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private SwalService: SwalEventService,
    // @Inject(MAT_DIALOG_DATA) private testtaskDatas:any,
    // @Inject(MAT_DIALOG_DATA) private projectDatas:any
    @Inject(MAT_DIALOG_DATA) private taskdata: any
  ) {
    this.editTaskForm = this.fb.group({
      code: new FormControl(),
      t_name: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      date_for_actual_completion: new FormControl(),
      principal: new FormControl(),
      appendix_principal: new FormControl(),
      remark: new FormControl(),
      labor_hour: new FormControl(),
      last_task: new FormControl(),
      landmark: new FormControl(),
      sales_order_number: new FormControl(),
      last_date_start: new FormControl(),
      last_date_completion: new FormControl(),
    });
    this.editChairmanForm = this.fb.group({
      taskPrincipalIdDatas: new FormControl(),
      user_id: new FormControl()
    })
  }

  code: any
  principal_id: any; //主要負責人id task_user.principal = true
  t_name: any;
  remark: any;
  last_task: any;
  landmark: any;
  date_for_estimated_start: any;
  date_for_estimated_completion: any;
  last_date_start: any;
  last_date_completion: any;
  file: any;
  taskList = [{ "id": "9ba83ec0-d9de-4a53-b80d-50526c1c4239", "name": "-", "hierarchy": '0' }]
  lastdata: any;
  //編輯頁面id
  p_id: string;
  task_name: any;
  t_id: any;

  ngOnInit(): void {
    this.dialogLoading()

    this.t_id = this.taskdata.t_id
    this.p_id = this.taskdata.p_id
    //this.test()
    this.editTaskForm = new FormGroup({
      code: new FormControl(),
      t_name: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      date_for_actual_completion: new FormControl(),
      principal: new FormControl(),
      appendix_principal: new FormControl(),
      remark: new FormControl(),
      labor_hour: new FormControl(),
      last_task: new FormControl(),
      landmark: new FormControl(),
      sales_order_number: new FormControl(),
      last_date_start: new FormControl(),
      last_date_completion: new FormControl(),
    });
    this.editChairmanForm = new FormGroup({
      taskPrincipalIdDatas: new FormControl(),
      user_id: new FormControl()
    })

    //console.log(this.t_id)
    this.getOneTestTask(this.t_id)
    //取得所有參與人員資料
    this.getTaskUserRequest()

    this.getAllUserName()//get{id:,name:}
    this.getAllTaskName()
    //取得部門資料
    this.getDepartmentList()
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
    console.log(this.accountgroup)
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
        console.log("testtaskDatas", this.testtaskDatas.body)
        if (this.testtaskDatas.body.last_task != '00000000-0000-0000-0000-000000000000') {
          this.HttpApiService.getOneTaskRequest_t(this.testtaskDatas.body.last_task).subscribe(lastDatas => {
            this.lastdata = lastDatas
            console.log(this.lastdata)

            this.last_date_start = this.lastdata.body.date_for_estimated_start
            this.last_date_completion = this.lastdata.body.date_for_estimated_completion


          })
        }

        //console.log(this.testtaskDatas)
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

  oneUserRequest: any;
  oneUserDatas: any;
  chairman_name: any
  //取得單一user 主席
  getOneUserRequest(u_id: any): void {
    //console.log(u_id)
    this.HttpApiService.getAccountOneRequest_t(u_id)
      .subscribe(oneUserRequest => {
        this.oneUserDatas = oneUserRequest
        this.chairman_name = this.oneUserDatas.body.name
        console.log(this.oneUserDatas)
      })
  }
  //選擇人員
  userid = ''
  // selectUserList: any[] = []//id
  // selectUserNameList: any[] = []//name
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
    console.log(this.taskUserIdDatas)
    console.log(this.taskUserNameDatas)//名字陣列
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
    console.log(this.taskUserIdDatas)
    console.log(this.taskUserNameDatas)//名字陣列
  }

  addtId: any
  updateTaskDatas: any = { "task": [] }
  uploadtaskuserDatas: any = { "task_user": [] }
  updatetaskuserDatas: any = { "task_user": [] }
  deletetaskuserDatas: any = { "task_user": [] }
  test1: any
  test2: any
  //更新任務資料----------------------------------------------------
  updateTaskRequest(): void {
    var hierarchy
    for (var i in this.taskList) {
      if (this.taskList[i].id == this.testtaskDatas.body.last_task) {
        hierarchy = Number(this.taskList[i].hierarchy) + 1
      }
    }
    let taskManagerDatas: any = {}
    taskManagerDatas['t_id'] = this.t_id
    taskManagerDatas['documents_id'] = this.p_id
    taskManagerDatas['t_name'] = this.testtaskDatas.body.t_name
    taskManagerDatas['remark'] = this.testtaskDatas.body.remark
    taskManagerDatas['last_task'] = this.testtaskDatas.body.last_task
    taskManagerDatas['landmark'] = this.testtaskDatas.body.landmark

    console.log(this.testtaskDatas.body.date_for_estimated_start)
    console.log(new Date(this.testtaskDatas.body.date_for_estimated_start))

    this.date_for_estimated_start = new Date(this.testtaskDatas.body.date_for_estimated_start)
    this.date_for_estimated_start.setHours(this.date_for_estimated_start.getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_start'] = this.date_for_estimated_start
    // this.testtaskDatas.body.date_for_estimated_start.setHours(this.testtaskDatas.body.date_for_estimated_start.getHours() + 8) //加八小時
    // taskManagerDatas['date_for_estimated_start'] = this.testtaskDatas.body.date_for_estimated_start
    
    this.date_for_estimated_completion = new Date(this.testtaskDatas.body.date_for_estimated_completion)
    this.date_for_estimated_completion.setHours(this.date_for_estimated_completion.getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_completion'] = this.date_for_estimated_completion
    // this.testtaskDatas.body.date_for_estimated_completion.setHours(this.testtaskDatas.body.date_for_estimated_completion.getHours() + 8) //加八小時
    // taskManagerDatas['date_for_estimated_completion'] = this.testtaskDatas.body.date_for_estimated_completion

    taskManagerDatas['origin_id'] = "1e6913f5-55be-413a-94a5-68f8cc67d5b2"// 寫死為project來源
    taskManagerDatas['file'] = this.testtaskDatas.body.file
    taskManagerDatas['landmark'] = this.testtaskDatas.body.landmark
    taskManagerDatas['hierarchy'] = hierarchy
    //console.log("taskManagerDatas",taskManagerDatas)
    this.updateTaskDatas.task.push(taskManagerDatas)
    this.HttpApiService.updatepluralTaskRequest(this.updateTaskDatas).subscribe(addTaskRes => {
      this.addtId = addTaskRes//為了取得新增task的body{id}

      this.test()
    }, (err: any) => {
      console.log('err:', err)
    })
  }

  test(): void {
    let updateTaskUser: any = {}
    updateTaskUser['principal'] = true
    updateTaskUser['tu_id'] = this.taskPrincipaltaskDatas
    updateTaskUser['task_id'] = this.t_id
    updateTaskUser['user_id'] = this.taskPrincipalIdDatas
    console.log(updateTaskUser)
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
        this.SwalService.loadingAlertbackproject("編輯任務中..", 750, this.p_id)
      })
    //setTimeout(() => { this.editurl() }, 1000);
  }

  //修改task_user表
  // updateTaskUserRequest(): void {
  //   console.log(this.uploadtaskuserDatas)
  //   this.HttpApiService.updatepluralTaskRequest(this.uploadtaskuserDatas)
  //     .subscribe(taskuserRequest => {
  //       console.log("成功")
  //       console.log(taskuserRequest)
  //     })
  //   //setTimeout(() => { this.editurl() }, 1000);
  // }
  // 跳轉頁面------------------------------------------
  editurl(): void {
    window.location.assign(`main/projectinfo/project-manager-edit/${this.p_id}`);
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
