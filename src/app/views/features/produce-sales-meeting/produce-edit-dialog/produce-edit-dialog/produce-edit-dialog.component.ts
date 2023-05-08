import { SwalEventService } from 'src/app/api/swal-event.service';
import { HttpApiService } from './../../../../../api/http-api.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Model } from './../../../../../shared/models/model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'

//部門
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
  selector: 'app-produce-edit-dialog',
  templateUrl: './produce-edit-dialog.component.html',
  styleUrls: ['./produce-edit-dialog.component.scss']
})
export class ProduceEditDialogComponent implements OnInit {

  taskList = [{ "id": "9ba83ec0-d9de-4a53-b80d-50526c1c4239", "name": "-", "hierarchy": '0' }]
  t_id: any
  user_id: any;
  taskname: any;
  isReadOnly: any;

  addForm: FormGroup;
  @Input() title!: string;
  @Input() selectedItem!: Model;

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private SwalEvent: SwalEventService,
    @Inject(MAT_DIALOG_DATA) private taskdata: any
  ) {
    this.addForm = this.fb.group({
      //task_user
      user_id: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      //task_user
      user_id: new FormControl(),
    });
    this.t_id = this.taskdata.t_id
    this.taskname = this.taskdata.taskname
    this.isReadOnly = this.taskdata.isReadOnly
    console.log(this.isReadOnly)
    this.getAllUserName()//get{id:,name:}
    this.getDepartmentList()
    this.getTaskUserRequest()
  }

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
        for (var i in taskuserRequest.body.task) {
          if (taskuserRequest.body.task[i].principal) {
            this.taskPrincipalDatas.push(taskuserRequest.body.task[i])
          }
          else {
            this.taskUserDatas.push(taskuserRequest.body.task[i])
          }
        }

        //console.log("舊的主要負責人", this.taskPrincipalDatas)
        //console.log("舊的參與人員", this.taskUserDatas)

        this.taskPrincipaltaskDatas = this.taskPrincipalDatas[0].tu_id
        this.taskPrincipalIdDatas = this.taskPrincipalDatas[0].account_id
        this.taskPrincipalNameDatas = this.taskPrincipalDatas[0].name

        for (var i in this.taskUserDatas) {
          this.taskUsertaskDatas.push(this.taskUserDatas[i].tu_id)
          this.taskUserIdDatas.push(this.taskUserDatas[i].account_id)
          this.num++
          this.taskUserNameDatas.push(this.taskUserDatas[i].name)
        }

        //console.log(this.taskUsertaskDatas)
        //console.log("舊的參與人員名字", this.taskUserNameDatas)
        //console.log("舊的參與人員tu_id", this.taskUsertaskDatas[0])
        for (let i in this.taskPrincipalDatas) {
          //console.log(this.taskPrincipalDatas[i].user_id)
          //this.getOneUserRequest(this.taskPrincipalDatas[i].account_id)
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
        console.log(oneUserRequest)
        this.oneUserDatas = oneUserRequest
        this.chairman_name = this.oneUserDatas.body.name
        //console.log(this.oneUserDatas)
      })
  }
  //選擇人員
  userid = ''
  // selectUserList: any[] = []//id
  // selectUserNameList: any[] = []//name
  addSelectUser() {
    //this.user_id=''
    if (this.userid != '') {
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
    }
    else{
      this.SwalEvent.adduserError()
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
        //console.log("任務負責人成功修改")
        //console.log(taskuserRequest)
      })


    for (var i in this.taskUsertaskDatas) {
      //console.log(this.taskUsertaskDatas[i])
      //刪除
      //this.deletetaskuserDatas.task_user.push({"tu_id" :this.taskUsertaskDatas[i]})
      let taskUserBody: any = {}
      taskUserBody = { 'tu_id': this.taskUsertaskDatas[i] }
      //console.log(taskUserBody)
      this.HttpApiService.deleteTaskUserRequest(this.taskUsertaskDatas[i], taskUserBody)
        .subscribe(res => {
          //console.log("tu_id", this.taskUsertaskDatas[i])
          //console.log("成功刪除task_user", res)
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
    //console.log(this.uploadtaskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
      .subscribe(taskuserRequest => {
        //console.log("成功新增task_user")
        //console.log(taskuserRequest)
      })
    //setTimeout(() => { this.editurl() }, 1000);
  }

  updateDatas(): void {
    let updateTaskUser: any = {}
    updateTaskUser['principal'] = true
    updateTaskUser['tu_id'] = this.taskPrincipaltaskDatas
    updateTaskUser['task_id'] = this.t_id
    updateTaskUser['user_id'] = this.taskPrincipalIdDatas
    //console.log(updateTaskUser)
    this.updatetaskuserDatas.task_user.push(updateTaskUser)
    this.HttpApiService.updatepluralTaskUserRequest(this.updatetaskuserDatas)
      .subscribe(taskuserRequest => {
        //console.log("任務負責人成功修改")
        //console.log(taskuserRequest)
      })


    for (var i in this.taskUsertaskDatas) {
      //console.log(this.taskUsertaskDatas[i])
      //刪除
      //this.deletetaskuserDatas.task_user.push({"tu_id" :this.taskUsertaskDatas[i]})
      let taskUserBody: any = {}
      taskUserBody = { 'tu_id': this.taskUsertaskDatas[i] }
      //console.log(taskUserBody)
      this.HttpApiService.deleteTaskUserRequest(this.taskUsertaskDatas[i], taskUserBody)
        .subscribe(res => {
          //console.log("tu_id", this.taskUsertaskDatas[i])
          //console.log("成功刪除task_user", res)
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
    //console.log(this.uploadtaskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.uploadtaskuserDatas)
      .subscribe(taskuserRequest => {
        //console.log("成功新增task_user")
        //console.log(taskuserRequest)
      })
    //setTimeout(() => { this.editurl() }, 1000);
    Swal.fire({
      title: `新增成功！`,
      icon: 'success',
      confirmButtonText: '確認!',
      confirmButtonColor: '#64c270',
      reverseButtons: true
    })
  }
}