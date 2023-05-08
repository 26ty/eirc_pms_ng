import { taskData } from './../../../shared/data/task-data';
import { TypeDialogComponent } from './type-dialog/type-dialog.component';
import { HttpApiService } from './../../../api/http-api.service';
import { Component, OnInit ,ViewChild, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//swal
import Swal from 'sweetalert2'

import { MatDialog } from '@angular/material/dialog';


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
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  addForm: FormGroup;
  totalCount:any
  //task表
  t_id:any
  todo_type_id:any
  t_name:any
  remark:any
  date_for_estimated_start: any;
  date_for_estimated_completion: any;
  landmark :any = true;//暫時當重要性
  todo_status:any = false;

  //task_user 表
  principal = false;
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    public dialog: MatDialog,
  ) { 
    this.addForm = this.fb.group({
      todo_type_id:new FormControl(),
      t_name:new FormControl(),
      remark:new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      landmark:new FormControl(),
      todo_status:new FormControl(),
    })
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    this.getTaskRequest()

    this.getUserTypeList()
  }

  important_value:any[] = [
    {name:'一般',value:false},
    {name:'重要',value:true},
  ]

  status_value:any[] = [
    {name:'未完成',value:false},
    {name:'已完成',value:true},
  ]

  //宣告任務的dataSource
  taskDataSource = new MatTableDataSource();
  teskcol = ['todo_status','t_type','t_name', 'remark', 'date_for_estimated_start', 'date_for_estimated_completion', 'landmark','action_edit','action_copy','action_delete'];
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  taskDatas:any
  toDoTaskDatas:any[] = []
  origin_id = '05410602-165a-4eab-8938-54392fdd571f'

  getTaskRequest(){
    this.HttpApiService.getTaskByOriginIDAndUserID(this.origin_id,this.userJson.account_id).
    subscribe(res => {
      console.log(res)
      this.taskDatas = res.body.task
      console.log(this.taskDatas)
      this.showData(this.taskDatas)
    })
    // this.toDoTaskDatas = []
    // this.HttpApiService.getAllTaskListLast(1).subscribe(
    //   res => {
    //     console.log("all task",res.body.task)
    //     this.taskDatas = res.body.task
        

    //     for(let i in this.taskDatas){
    //       // if(this.taskDatas[i].landmark == null || this.taskDatas[i].landmark == undefined){
    //       //   this.taskDatas[i].landmark == false
    //       // }
    //       if(this.taskDatas[i].origin_id == '05410602-165a-4eab-8938-54392fdd571f'){
    //         this.toDoTaskDatas.push(this.taskDatas[i])
    //       }
    //     }
    //     console.log("toDoTaskDatas",this.toDoTaskDatas)
    //     this.showData(this.toDoTaskDatas)
    //   })
  }

  showData(data: any) {
    this.taskDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.taskDataSource.sort = this.sort;
    this.taskDataSource.paginator = this.paginator;
  }

  addTaskRes:any
  addtId:any
  uploadtaskDatas: any = {"task": []}
  uploadtaskuserDatas: any = {"task_user": []}
  now = Date.now();//
  addTaskRequest(): void {
    
    var hierarchy
    // for(var i in this.taskList){
    //   if(this.taskList[i].id == this.last_task){
    //     hierarchy = Number(this.taskList[i].hierarchy) + 1
    //   }
    // }
    this.uploadtaskDatas = {"task": []}
    this.uploadtaskuserDatas = {"task_user": []}
    let taskManagerDatas: any = {}
    taskManagerDatas['todo_type_id'] = this.todo_type_id
    taskManagerDatas['documents_id'] = '00000000-0000-0000-0000-000000000000'
    taskManagerDatas['t_name'] = this.t_name
    taskManagerDatas['remark'] = this.remark
    taskManagerDatas['last_task'] = '00000000-0000-0000-0000-000000000000'
    taskManagerDatas['landmark'] = this.landmark
    taskManagerDatas['todo_status'] = this.todo_status
    new Date(this.date_for_estimated_start).setHours(new Date(this.date_for_estimated_start).getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_start'] = new Date(this.date_for_estimated_start)
    new Date(this.date_for_estimated_completion).setHours(new Date(this.date_for_estimated_completion).getHours() + 8) //加八小時
    taskManagerDatas['date_for_estimated_completion'] = new Date(this.date_for_estimated_completion)
    // taskManagerDatas['date_for_actual_completion'] = new Date(this.now);
    taskManagerDatas['origin_id'] = "05410602-165a-4eab-8938-54392fdd571f"// 寫死為待辦事項來源
    //taskManagerDatas['landmark'] = this.landmark
    taskManagerDatas['hierarchy'] = 1
    console.log("taskManagerDatas",taskManagerDatas)
    
    this.uploadtaskDatas.task.push(taskManagerDatas)
    console.log("post task json",this.uploadtaskDatas)
    
    this.HttpApiService.uploadpluralTaskRequest(this.uploadtaskDatas).subscribe(addTaskRes => {
      console.log("post task res",addTaskRes)

      if(addTaskRes.code == 200){
        this.t_name = ''
        this.remark = ''
        this.date_for_estimated_start=''
        this.date_for_estimated_completion=''
        this.reset()
        this.addtId = addTaskRes//為了取得新增task的body{id}
        let taskUserDatas:any = {}
        taskUserDatas['principal'] = true //主要負責人true
        taskUserDatas['task_id'] = this.addtId.body[0]
        taskUserDatas['user_id'] = this.userJson.account_id
        console.log("taskUserDatas",taskUserDatas)
        this.uploadtaskuserDatas.task_user.push(taskUserDatas)
        console.log("post task_user json",this.uploadtaskuserDatas)
        this.addTaskUserRequest(this.uploadtaskuserDatas)
        
      }
    })
  }

  //新增task_user表
  addTaskUserRequest(data:any): void {
    console.log(data)
    this.HttpApiService.uploadpluralTaskUserRequest(data)
    .subscribe(taskuserRequest =>{
      console.log("post task_user res",taskuserRequest)
      if(taskuserRequest.code == 200){
        Swal.fire(
          {
            title: `新增待辦事項成功！`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            this.getTaskRequest()
            //window.location.assign(`main/to-do-list`);
            // this.uploadtaskDatas = {"task": []}
            // this.getTaskRequest()
          }
        })
      }
    })
    //this.SwalService.loadingAlertbackproject('新增任務成功！..',1500,this.p_id)
    //setTimeout(() => { this.editurl() }, 5000);
  }

  editTaskDatas:any
  doPostEdit(item: any): void {
    this.btnEditClick()
    this.t_id = item
    this.HttpApiService.getOneTaskRequest_t(this.t_id).subscribe(
      res => {
        this.editTaskDatas = res.body
        console.log(this.editTaskDatas)
        this.t_name = this.editTaskDatas.t_name
        this.remark = this.editTaskDatas.remark
        // this.todo_status = this.editTaskDatas.todo_status
        this.todo_type_id = this.editTaskDatas.todo_type_id
        this.date_for_estimated_start = this.editTaskDatas.date_for_estimated_start
        this.date_for_estimated_completion = this.editTaskDatas.date_for_estimated_completion
        
        if(this.editTaskDatas.landmark == null || this.editTaskDatas.landmark == undefined){
          this.landmark = false
        }else{
          this.landmark = this.editTaskDatas.landmark
        }
        if(this.editTaskDatas.todo_status == null || this.editTaskDatas.todo_status == undefined){
          this.todo_status = false
        }else{
          this.todo_status = this.editTaskDatas.todo_status
        }
      }
    )
  }

  copyTaskDatas:any
  doPostCopy(item: any): void {
    this.btnCopyClick()
    this.t_id = item
    this.HttpApiService.getOneTaskRequest_t(this.t_id).subscribe(
      res => {
        this.copyTaskDatas = res.body
        console.log(this.copyTaskDatas)
        this.todo_status = this.copyTaskDatas.todo_status
        this.todo_type_id = this.copyTaskDatas.todo_type_id
        this.t_name = this.copyTaskDatas.t_name
        this.remark = this.copyTaskDatas.remark
        this.date_for_estimated_start = this.copyTaskDatas.date_for_estimated_start
        this.date_for_estimated_completion = this.copyTaskDatas.date_for_estimated_completion
        
        if(this.copyTaskDatas.landmark == null || this.copyTaskDatas.landmark == undefined){
          this.landmark = false
        }else{
          this.landmark = this.copyTaskDatas.landmark
        }
      }
    )
  }


  //按鈕狀態先給false
  btnStatus = 1;//預設儲存
  //異動處理按鈕點擊事件
  btnEditClick() {
    this.btnStatus = 2;//更新
  }

  btnCopyClick() {
    this.btnStatus = 3;//複製
  }

  reset(){
    this.btnStatus = 1
  }

  updateTaskDatas: any = {"task": []}
  updateTaskRequest(){
    
    let taskEditData:any = {}
    taskEditData['t_id'] = this.t_id
    taskEditData['t_name'] = this.t_name
    taskEditData['remark'] = this.remark
    new Date(this.date_for_estimated_start).setHours(new Date(this.date_for_estimated_start).getHours() + 8) //加八小時
    taskEditData['date_for_estimated_start'] = this.date_for_estimated_start
    new Date(this.date_for_estimated_completion).setHours(new Date(this.date_for_estimated_completion).getHours() + 8) //加八小時
    taskEditData['date_for_estimated_completion'] = this.date_for_estimated_completion
    taskEditData['landmark'] = this.landmark
    taskEditData['todo_type_id'] = this.todo_type_id
    taskEditData['todo_status'] = this.todo_status
    this.updateTaskDatas.task.push(taskEditData)
    console.log(this.updateTaskDatas)
    this.HttpApiService.updatepluralTaskRequest(this.updateTaskDatas).subscribe(
      res=>{
        console.log(res)
        if(res.code == 200){
          console.log("成功修改任務")
          this.btnStatus = 1;
          this.reset()
          this.getTaskRequest()

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'success',
            title: '更新成功'
          })

        }else{
          console.log("修改任務失敗")
        }
      }
    )    
  }


  deleteTaskDatas: any[] = []
  doPostDelete(id:any){
    this.deleteTaskDatas= []
    this.deleteTaskDatas.push({'t_id': id})
    console.log(this.deleteTaskDatas)
    
    Swal.fire({
      title: '您是否確定要刪除此待辦事項?',
      text: "刪除後無法恢復!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.HttpApiService.deletepluralTaskRequest(this.deleteTaskDatas).subscribe(
          res => {
            console.log(res)
            if(res.code == 200){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
      
              Toast.fire({
                icon: 'success',
                title: '刪除成功'
              })
              
              this.getTaskRequest()
            }else{
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
      
              Toast.fire({
                icon: 'error',
                title: '刪除失敗'
              })
            }
          }
        )
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          '已取消!',
          '此待辦事項事項未被刪除',
          'error'
        )
      }
    })
    
  }
  //取得使用者類別列表
  userTypeList:any
  getUserTypeList(){
    this.HttpApiService.getTodoTypeRequest(1).subscribe(
      res => {
        console.log(res.body.todo_type)
        this.userTypeList = res.body.todo_type
      }
    )
  }

  typeOpen() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    ///window.location.assign('main/projectinfo/project-template-add');
    this.dialog.open(TypeDialogComponent)
  }
}
