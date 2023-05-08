import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
//swal
import Swal from 'sweetalert2'
import { SwalEventService } from 'src/app/api/swal-event.service';
import { HttpApiService } from './../../../../api/http-api.service';

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

interface Option {
  label: string;
  value: any;
}

@Component({
  selector: 'app-repeat-order',
  templateUrl: './repeat-order.component.html',
  styleUrls: ['./repeat-order.component.scss']
})
export class RepeatOrderComponent implements OnInit {

  addForm: FormGroup;
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  myControl = new FormControl();
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private SwalEvent: SwalEventService
  ) {
    this.addForm = this.fb.group({
      selectedTempalet: ['', [Validators.required]],
      summary_description: ['', [Validators.required]],
    });
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    this.getProduceSalesDatas()
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  produceSalesDatas: any
  TemplateArray: any[] = []
  p_idArray: any[] = [];
  selectedTempalet: any
  getProduceSalesDatas() {
    this.HttpApiService.getProduceSalesListRequest_t(1, 20)
      .subscribe(projectRequest => {
        this.produceSalesDatas = projectRequest.body.project
        console.log(this.produceSalesDatas)
        for (let i in this.produceSalesDatas) {
          if (this.produceSalesDatas[i].status == '待專案啟動' || this.produceSalesDatas[i].status == '執行中') {
            this.TemplateArray.push({ 'id': this.produceSalesDatas[i].p_id, 'name': this.produceSalesDatas[i].p_name })
            this.options.push(this.produceSalesDatas[i].p_name)
            this.p_idArray.push(this.produceSalesDatas[i].p_id)
          }
        }
        //console.log(this.TemplateArray)
      })
  }

  p_name: any
  code: any
  summary_description: any
  //取得單一專案範本資料-----------------------------------------------------------------------
  projectTemplateDatas: any;
  getOneProjectTemplateRequest(pt_id: any): void {
    this.HttpApiService.getOneProjectRequest_t(pt_id).subscribe(
      res => {
        this.projectTemplateDatas = res.body
        console.log("選擇的範本資料", this.projectTemplateDatas)
        this.summary_description = this.projectTemplateDatas.summary_description
        this.code = this.projectTemplateDatas.code
        console.log(this.summary_description)
      },
      (err: any) => {
        console.log('err:', err);
      }
    )
  }
  newp_id: any = ''
  search(): void {
    this.newp_id = ''
    for (var i in this.options) {
      if (this.options[i] == this.selectedTempalet) {
        this.newp_id = this.p_idArray[i]
        console.log(this.newp_id)
      }
    }
    if (this.newp_id == '') {
      Swal.fire({
        text: "請確認填寫內容",
        icon: 'warning',
        //confirmButtonColor: '#3085d6',
        confirmButtonColor: '#64c270',
        confirmButtonText: '確定',
      })
    }
    else {
      this.HttpApiService.getOneProjectRequest_t(this.newp_id)
        .subscribe(projectManager => {
          console.log(projectManager)
          var projectData: any = projectManager
          //this.copytoadd(projectData.body)
        })
    }
  }

  date_for_start: any;
  texttest: any;
  copytoadd(): void {
    //console.log(projectdata)
    //this.getalltask(projectdata.p_id, 'test')
    Swal.fire({
      title: `您是否確定要複製專案?`,
      //text: "啟動後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `確定!`,
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '載入中...',
          html: '新增專案中',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        this.p_id = this.newp_id
        this.inquireproject(this.p_id)
      }
    })
  }

  inquireproject(p_id: any) {
    this.HttpApiService.getOneProjectRequest_t(p_id)
      .subscribe(projectRequest => {
        var projectDatas: any = projectRequest
        this.uploadproject(projectDatas.body)
      })
  }

  hrs = -(new Date().getTimezoneOffset() / 60)
  p_id: any
  uploadproject(projectdata: any): void {
    console.log(projectdata)
    let projectManagerDatas: any = {};//接收資料
    for (var i in projectdata) {
      if (i != 'p_id') {
        projectManagerDatas[`${i}`] = projectdata[i]
      }
      if (i == 'code') {
        var codeyear = String(new Date().getFullYear())
        var codemonth = String(new Date().getMonth() + 1)
        if (codemonth.length < 2) {
          codemonth = '0' + codemonth
        }
        var codedate = String(new Date().getDate())
        if (codedate.length < 2) {
          codedate = '0' + codedate
        }
        projectManagerDatas['code'] = codeyear + codemonth + codedate + "-XXXX"
      }
      projectManagerDatas['status'] = '產銷建檔中'
      // var date_for_start = new Date()
      // date_for_start.setHours(date_for_start.getHours() + this.hrs);
      // projectManagerDatas['date_for_start'] = date_for_start
    }
    console.log(projectManagerDatas)
    this.HttpApiService.uploadProjectRequest_t(projectManagerDatas)
      .subscribe(projectRequest => {
        let projectData: any = projectRequest
        this.p_id = projectData.body
        console.log(projectData)
        console.log("成功")
        this.getalltask(projectdata.p_id, this.p_id)
        setTimeout(() => { this.uploadTransactionRecordRequests(this.p_id) }, 2000);
      },
        (err: any) => {
          console.log('err:', err);
        });
  }
  getalltask(p_id: any, newp_id: any): void {
    this.HttpApiService.getTaskListUserRequest(p_id)
      .subscribe(taskRequest => {
        let taskData: any = taskRequest.body.task
        this.uploadTask(newp_id, taskData)
        console.log(taskData)
      })
  }

  taskDatas: any = { "task": [] }
  uploadTask(p_id: any, taskdata: any): void {
    for (var i in taskdata) {
      if (taskdata[Number(i)]['t_name'] != '治具' && taskdata[Number(i)]['t_name'] != '書面資料' && taskdata[Number(i)]['t_name'] != '試機需求部品' && taskdata[Number(i)]['t_name'] != '其他列') {
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['documents_id'] = p_id
        taskManagerDatas['t_name'] = taskdata[Number(i)]['t_name']
        taskManagerDatas['default_date'] = 2
        taskManagerDatas['default_labor_hour'] = 2
        taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
        taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
        taskManagerDatas['origin_id'] = taskdata[Number(i)]['origin_id']
        taskManagerDatas['date_for_estimated_start'] = taskdata[Number(i)]['date_for_estimated_start']
        taskManagerDatas['date_for_actual_completion'] = ""
        taskManagerDatas['date_for_estimated_completion'] = taskdata[Number(i)]['date_for_estimated_completion']
        taskManagerDatas['hierarchy'] = 1
        taskManagerDatas['quantity'] = taskdata[Number(i)]['quantity']
        taskManagerDatas['file'] = taskdata[Number(i)]['file']
        this.taskDatas.task.push(taskManagerDatas)
      }
    }
    console.log(this.taskDatas)
    this.HttpApiService.uploadpluralTaskRequest(this.taskDatas)
      .subscribe(taskRequest => {
        var taskidDatas: any = taskRequest
        this.uploadTaskUserDatas(taskidDatas.body, taskdata)
      })
  }

  taskuserDatas: any = { "task_user": [] }
  //產生一筆新的task_user資料格式-------------------------------------------
  uploadTaskUserDatas(taskidDatas: any, taskdata: any): void {
    this.taskuserDatas = { "task_user": [] }
    var j = 0
    for (var i in taskdata) {
      if (taskdata[Number(i)]['t_name'] != '治具' && taskdata[Number(i)]['t_name'] != '書面資料' && taskdata[Number(i)]['t_name'] != '試機需求部品' && taskdata[Number(i)]['t_name'] != '其他列') {
        let taskuserManagerDatas: any = {};//接收資料
        taskuserManagerDatas['task_id'] = taskidDatas[j]
        taskuserManagerDatas['user_id'] = taskdata[Number(i)]['account_id']
        taskuserManagerDatas['principal'] = true
        j = j + 1
        this.taskuserDatas.task_user.push(taskuserManagerDatas)
      }
    }
    console.log(this.taskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.taskuserDatas)
      .subscribe(taskuserRequest => {
        console.log('成功')
        //setTimeout(() => { this.editurl() }, 5000);
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(p_id: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = p_id
    trManagerDatas['actor'] = "新建"
    trManagerDatas['content'] = "專案"
    trManagerDatas['creater'] = this.userJson.account_id

    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log('成功')
        this.editurl()
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  // 跳轉頁面------------------------------------------
  editurl(): void {
    window.location.assign(`main/projectinfo/produce-sales-meeting-edit/${this.p_id}`);
  }

}
