import { HttpApiService } from './../../../../../api/http-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'

interface Option {
  label: string;
  value: any;
}

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';



@Component({
  selector: 'app-produce-add-dialog',
  templateUrl: './produce-add-dialog.component.html',
  styleUrls: ['./produce-add-dialog.component.scss']
})
export class ProduceAddDialogComponent implements OnInit {

  addForm: FormGroup;
  @Input() title!: string;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  // table 資料
  dataSource = new MatTableDataSource<any>();

  hrs = -(new Date().getTimezoneOffset() / 60)
  customerDatas: any[] = [];
  customer_code: any = '';
  project_code: any = '無';
  demand_content: any = '無';

  p_id: any = '';
  t_id: any = '';

  origin_id: any = '5451f88e-6d83-44c6-96c3-cd1d049249f7';//產銷
  task_origin_id: any = '1e6913f5-55be-413a-94a5-68f8cc67d5b2'//專案

  //預設總任務
  taskname: any[] = [
    '機台產銷會議', '機台內部訂單', '機台-BOM[光學]', '機台-BOM[機械]', '機台-發包圖面[機械]', '機台-BOM[電控]', '機台發包[請購]', '機台發包[採購]', '機台組裝前會議', '機台入料完成(含選配)', '光學校正完成', '軟體(Vision)完成', '軟體(Motion)完成', '機台組立完成', '機台試機完成', '機台入庫(含選配)', '機台出機', '機台裝機', '正式BOM產出',
    '客戶圖面提供', '治具BOM(設計完成)', '治具內部訂單', '治具發包', '治具入料', '治具組裝完成', '治具預交日', '治具sample提供',
    '機械氣泡圖', '電控電路圖', '機械試驗報告書', '電控試驗報告書', 'Vision試驗報告書', 'Motion試驗報告書', '機械操作手冊', '電控操作手冊', 'Vision操作手冊', 'Motion操作手冊',
    'strip', 'magazing', 'boat', 'tray', 'IC', 'drawing', '其他',
    '配盤', '骨架',
  ];

  //預設任務時間
  taskdate: any = {
    '專案負責': { 'date_for_estimated_start': 0, 'date_for_estimated_completion': 1, 'hierarchy': 1 },
    '客服負責': { 'date_for_estimated_start': 0, 'date_for_estimated_completion': 1, 'hierarchy': 1 },
    '業務負責': { 'date_for_estimated_start': 0, 'date_for_estimated_completion': 1, 'hierarchy': 1 },
    '機台產銷會議': { 'date_for_estimated_start': 0, 'date_for_estimated_completion': 1, 'hierarchy': 1 },
    '機台內部訂單': { 'date_for_estimated_start': 0, 'date_for_estimated_completion': 1, 'hierarchy': 2 },
    '機台-BOM[光學]': { 'date_for_estimated_start': 0, 'date_for_estimated_completion': 1, 'hierarchy': 2 },
    '機台-BOM[機械]': { 'date_for_estimated_start': 0, 'date_for_estimated_completion': 1, 'hierarchy': 2 },
    '機台-BOM[電控]': { 'date_for_estimated_start': 0, 'date_for_estimated_completion': 1, 'hierarchy': 2 },
    '機台發包[請購]': { 'date_for_estimated_start': 2, 'date_for_estimated_completion': 4, 'hierarchy': 2 },
    '機台發包[採購]': { 'date_for_estimated_start': 5, 'date_for_estimated_completion': 10, 'hierarchy': 2 },
    '機台入料完成(含選配)': { 'date_for_estimated_start': 11, 'date_for_estimated_completion': 56, 'hierarchy': 2 },
    '光學校正完成': { 'date_for_estimated_start': 57, 'date_for_estimated_completion': 77, 'hierarchy': 2 },
    '軟體(Vision)完成': { 'date_for_estimated_start': 57, 'date_for_estimated_completion': 77, 'hierarchy': 2 },
    '軟體(Motion)完成': { 'date_for_estimated_start': 57, 'date_for_estimated_completion': 77, 'hierarchy': 2 },
  };

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
  ) {
    this.addForm = this.fb.group({
      creat_at: ['', [Validators.required]],
      select: [, [Validators.required, Validators.minLength(6)]],
      min_length: ['', [Validators.required, Validators.minLength(6)]],
    }
    );
  }
  userJson: any
  ngOnInit() {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    this.getCustomerDatas()
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
  //顯示資料
  showData(data: any) {
    this.dataSource.data = data;//將資料帶入
  }
  // 送出
  submit(formValue: any) {
    if (this.addForm.valid) {
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
  getOptionStyle(opt: Option, filted: Array<Option>): { [key: string]: any } {
    const style: { [key: string]: any } = {};
    style.display = filted.indexOf(opt) < 0 ? 'none' : '';
    return style;
  }
  page: any
  //取得全部Customer資料-------------------------------------------------------------
  getCustomerDatas(): void {
    this.HttpApiService.getCustomerRequest(1, 20)
      .subscribe(cRequests => {
        //this.showData(cRequests.result);
        //console.log(cRequests)
        for (let i in cRequests.body.customer_demand) {
          if (cRequests.body.customer_demand[i].code != undefined) {
            this.options.push(cRequests.body.customer_demand[i].code)
            this.customerDatas.push(cRequests.body.customer_demand[i])
          }
        }
        for (var j = 2; j <= cRequests.body.page; j++) {
          this.HttpApiService.getCustomerRequest(1, 20)
            .subscribe(cRequests => {
              //this.showData(cRequests.result);
              for (let i in cRequests.body.customer_demand) {
                if (cRequests.body.customer_demand[i].code != undefined) {
                  this.options.push(cRequests.body.customer_demand[i].code)
                  this.customerDatas.push(cRequests.body.customer_demand[i])
                }
              }
            })
        }
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //搜尋按鈕---------------------------------------
  project_detail = false
  newproject = false
  searchreuslt = false
  search(): void {
    this.project_detail = true
    this.newproject = true
    this.searchreuslt = false
    this.project_code = '無';
    this.demand_content = '無';
    console.log(this.customer_code)
    for (var i in this.options) {
      if (this.options[i] == this.customer_code) {
        this.searchreuslt = true
        if (this.customerDatas[i].code) {
          this.project_code = this.customerDatas[i].code
        }
        if (this.customerDatas[i].demand_content) {
          this.demand_content = this.customerDatas[i].demand_content
        }
      }
    }
    console.log(this.searchreuslt)
    if (this.searchreuslt == false && this.customer_code != "") {
      Swal.fire({
        icon: 'error',
        title: '該客需單不存在',
        text: '請確認填寫內容',
        confirmButtonText: '確認!',
        confirmButtonColor: '#FF5151',
      })
    }
  }

  sweetalert(): void {
    Swal.fire({
      text: "確定要新增嗎",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      cancelButtonText: '取消',
      confirmButtonText: '確定',
      reverseButtons: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '載入中...',
          html: '請稍等',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        this.uploadProjectDatas()
        // setTimeout(function() {
        //   Swal.fire(
        //     '新增成功!',
        //     '確定後將跳回首頁',
        //     'success'
        //   )
        // }, 3000);
      }
    })
  }

  //新增一筆project資料-------------------------------------------------------------
  uploadProjectDatas(): void {
    let projectManagerDatas: any = {};//接收資料
    if (this.project_code == '無') {
      projectManagerDatas['code'] = '無'
    }
    else {
      projectManagerDatas['code'] = this.project_code
    }
    projectManagerDatas['status'] = "產銷建檔中"
    projectManagerDatas['creater'] = this.userJson.account_id
    projectManagerDatas['origin_id'] = this.origin_id
    projectManagerDatas['customer_id'] = "00000000-0000-0000-0000-000000000000"
    projectManagerDatas['projectman_id'] = "00000000-0000-0000-0000-000000000000"
    projectManagerDatas['salesman_id'] = "00000000-0000-0000-0000-000000000000"
    projectManagerDatas['serviceman_id'] = "00000000-0000-0000-0000-000000000000"
    projectManagerDatas['type'] = "一般專案"
    projectManagerDatas['p_name'] = ' '
    projectManagerDatas['is_template'] = false
    var date_for_start = new Date()
    date_for_start.setHours(date_for_start.getHours() + this.hrs);
    projectManagerDatas['date_for_start'] = date_for_start
    if (this.searchreuslt == false) {
      projectManagerDatas['customer_code'] = ""
    }
    else {
      projectManagerDatas['customer_code'] = this.customer_code
    }
    console.log(projectManagerDatas)
    this.HttpApiService.uploadProjectRequest_t(projectManagerDatas)
      .subscribe(projectRequest => {
        let projectData: any = projectRequest
        this.p_id = projectData.body
        console.log(projectData)
        console.log("成功")
        this.uploadTaskRequests(this.p_id)
      },
        (err: any) => {
          console.log('err:', err);
        });
  }

  taskDatas: any = { "task": [] }
  //產生一筆新的task資料格式-------------------------------------------
  uploadTaskRequests(p_id: any): void {
    for (let i in Object.keys(this.taskdate)) {
      if (this.taskdate[Object.keys(this.taskdate)[i]]['hierarchy'] == 1) {
        var date_start = new Date()
        var date_end = new Date()
        date_start.setDate(date_start.getDate() + this.taskdate[Object.keys(this.taskdate)[i]]['date_for_estimated_start'])
        date_end.setDate(date_end.getDate() + this.taskdate[Object.keys(this.taskdate)[i]]['date_for_estimated_completion'])
        let taskManagerDatas: any = {};//接收資料
        taskManagerDatas['documents_id'] = p_id
        taskManagerDatas['t_name'] = Object.keys(this.taskdate)[i]
        taskManagerDatas['default_date'] = 2
        taskManagerDatas['default_labor_hour'] = 2
        taskManagerDatas['last_task'] = "00000000-0000-0000-0000-000000000000"
        taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
        taskManagerDatas['origin_id'] = this.task_origin_id
        taskManagerDatas['date_for_estimated_start'] = date_start
        taskManagerDatas['date_for_actual_completion'] = ""
        taskManagerDatas['date_for_estimated_completion'] = date_end
        taskManagerDatas['hierarchy'] = this.taskdate[Object.keys(this.taskdate)[i]]['hierarchy']
        this.taskDatas.task.push(taskManagerDatas)
      }
    }
    //console.log(this.taskDatas.task)
    this.HttpApiService.uploadpluralTaskRequest(this.taskDatas)
      .subscribe(taskRequest => {
        console.log('成功', taskRequest)
        //console.log(taskidDatas)
        var taskidDatas: any = taskRequest

        this.uploadTaskUserDatas(taskidDatas.body)
        this.taskDatas = { "task": [] }
        for (let i in Object.keys(this.taskdate)) {
          if (this.taskdate[Object.keys(this.taskdate)[i]]['hierarchy'] == 2) {
            var date_start = new Date()
            var date_end = new Date()
            date_start.setDate(date_start.getDate() + this.taskdate[Object.keys(this.taskdate)[i]]['date_for_estimated_start'])
            date_end.setDate(date_end.getDate() + this.taskdate[Object.keys(this.taskdate)[i]]['date_for_estimated_completion'])
            let taskManagerDatas: any = {};//接收資料
            taskManagerDatas['documents_id'] = p_id
            taskManagerDatas['t_name'] = Object.keys(this.taskdate)[i]
            taskManagerDatas['default_date'] = 2
            taskManagerDatas['default_labor_hour'] = 2
            taskManagerDatas['last_task'] = taskidDatas.body[3]
            taskManagerDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
            taskManagerDatas['origin_id'] = this.task_origin_id
            taskManagerDatas['date_for_estimated_start'] = date_start
            taskManagerDatas['date_for_actual_completion'] = ""
            taskManagerDatas['date_for_estimated_completion'] = date_end
            taskManagerDatas['hierarchy'] = this.taskdate[Object.keys(this.taskdate)[i]]['hierarchy']
            this.taskDatas.task.push(taskManagerDatas)
          }
        }
        this.HttpApiService.uploadpluralTaskRequest(this.taskDatas)
          .subscribe(taskRequest => {
            console.log('成功', taskRequest)
            var taskidDatas: any = taskRequest
            this.uploadTaskUserDatas(taskidDatas.body)
            this.uploadTransactionRecordRequests(this.p_id)
          },
            (err: any) => {
              console.log('err:', err);
            }
          );
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  taskuserDatas: any = { "task_user": [] }
  taskuseridDatas: any
  //產生一筆新的task_user資料格式-------------------------------------------
  uploadTaskUserDatas(taskidDatas: any): void {
    this.taskuserDatas = { "task_user": [] }
    for (var i in taskidDatas) {
      let taskuserManagerDatas: any = {};//接收資料
      taskuserManagerDatas['task_id'] = taskidDatas[i]
      taskuserManagerDatas['user_id'] = '00000000-0000-0000-0000-000000000000'
      taskuserManagerDatas['principal'] = true
      this.taskuserDatas.task_user.push(taskuserManagerDatas)
    }
    this.uploadTaskUserRequests()
  }
  //產生一筆新的taskuser資料格式-------------------------------------------
  uploadTaskUserRequests(): void {
    console.log(this.taskuserDatas)
    this.HttpApiService.uploadpluralTaskUserRequest(this.taskuserDatas)
      .subscribe(taskuserRequest => {
        //console.log(taskuserRequest)
        console.log('成功', taskuserRequest)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
    //setTimeout(() => { this.editurl() }, 5000);
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
        console.log('成功', taskuserRequest)
        setTimeout(() => { this.editurl() }, 1000);
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
