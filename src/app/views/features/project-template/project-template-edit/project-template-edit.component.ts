import { HttpApiService } from './../../../../api/http-api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SwalEventService } from 'src/app/api/swal-event.service';
import Swal from 'sweetalert2'

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-project-template-edit',
  templateUrl: './project-template-edit.component.html',
  styleUrls: ['./project-template-edit.component.scss']
})
export class ProjectTemplateEditComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);

  // 時間格式
  formatStr = 'YYYY-MM-d hh:mm:ss';

  // 年分
  year: any;

  // table 資料
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['code', 't_name', 'date_for_estimated_start', 'date_for_estimated_completion', 'landmark', 'default_date', 'default_labor_hour', 'last_task_name', 'action_edit', 'action_delete'];

  editProjectTemplateForm: FormGroup;
  editTaskTemplateForm: FormGroup;
  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private HttpApiService: HttpApiService,
    private SwalEvent: SwalEventService
  ) {

    this.editProjectTemplateForm = this.fb.group({
      pt_code: new FormControl(),
      pt_name: new FormControl(),
      pt_remark: new FormControl()
    })

    this.editTaskTemplateForm = this.fb.group({
      t_name: new FormControl(),
      last_task: new FormControl(),
      landmark: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      default_date: new FormControl(),
      default_labor_hour: new FormControl(),
    })
  }

  pt_id: any;
  taskDatas: any[] = [{
    't_name': "-", 't_id': "00000000-0000-0000-0000-000000000000", 'date_for_estimated_start': new Date(), 'date_for_estimated_completion': new Date()
  }]

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
    this.setPaginator();
    this.pt_id = this.route.snapshot.paramMap.get('pt_id')
    console.log(this.pt_id)

    this.editProjectTemplateForm = new FormGroup({
      pt_code: new FormControl(),
      pt_name: new FormControl(),
      pt_remark: new FormControl()
    })

    this.editTaskTemplateForm = new FormGroup({
      t_name: new FormControl(),
      last_task: new FormControl(),
      landmark: new FormControl(),
      date_for_estimated_start: new FormControl(),
      date_for_estimated_completion: new FormControl(),
      default_date: new FormControl(),
      default_labor_hour: new FormControl(),
    })

    this.getEditProjectTemplateRequest()

    this.getTaskTemplate()

    //console.log("taskDatas",this.taskDatas)

    //this.deleteProjectTaskTemplateRequest(this.pt_id)
  }

  projectTemplateDatas: any;
  getEditProjectTemplateRequest(): void {
    this.HttpApiService.getOneProjectRequest_t(this.pt_id).subscribe(
      projectTemplateRequest => {
        this.projectTemplateDatas = projectTemplateRequest
        console.log(this.projectTemplateDatas)
      },
      (err: any) => {
        console.log('err:', err);
      }
    )
  }

  updateProjectTemplateRequest(): void {
    let projectTemplateDatas: any = {};
    projectTemplateDatas['code'] = this.projectTemplateDatas.body.code;
    projectTemplateDatas['p_name'] = this.projectTemplateDatas.body.p_name;
    //projectTemplateDatas['pt_remark'] = this.projectTemplateDatas.body.pt_remark;
    this.HttpApiService.updateProjectRequest_t(this.pt_id, projectTemplateDatas).subscribe(
      projectTemplate => {
        console.log("更新成功")
        //this.getEditProjectTemplateRequest()
        Swal.fire(
          {
            title: `更新成功`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.assign(`main/projectinfo/project-template`);
          }
        })
        // location.href = '/main/projectinfo/project-template'
      },
      (err: any) => {
        console.log('err:', err);
      }
    )
  }

  t_id: any;
  task_id: any;
  code: any;
  t_name: any;
  last_task: any;
  landmark: any;
  date_for_estimated_start: any;
  date_for_estimated_completion: any;
  date_for_end: any
  //天數
  default_date: any;
  default_labor_hour: any;

  //datenum:any;
  //labor_hour
  laborhour: any;
  //StoS
  //StoF
  taskTemplatDatas: any
  testtask: any[] = []
  //取得專案範本任務列表
  getTaskTemplate(): void {
    this.HttpApiService.getTemplateTaskListUserRequest(this.pt_id).subscribe(
      taskTemplateRequest => {
        this.taskTemplatDatas = taskTemplateRequest.body.task
        console.log(taskTemplateRequest)
        

        // var date_for_start = this.taskDatas[i].date_for_estimated_start //start(new date) + 1
        // var date_for_end = new Date()// end = start
        // date_for_end.setDate(date_for_end.getDate() + Number(this.datenum)) // 結束日 + 輸入天數

        // for(let i in this.taskTemplatDatas){//b[2.3]
        //   for(let j in this.taskDatas){//a[0]
        //     if(this.taskTemplatDatas[i].t_id != this.taskDatas[j].t_id){
        //       this.taskDatas.push({
        //         't_id':this.taskTemplatDatas[i].t_id,
        //         't_name':this.taskTemplatDatas[i].t_name,
        //         'last_task':this.taskTemplatDatas[i].last_task,//uuid
        //         'landmark':this.taskTemplatDatas[i].landmark,
        //         'date_for_estimated_start':this.taskTemplatDatas[i].date_for_estimated_start,
        //         'date_for_estimated_end':this.taskTemplatDatas[i].date_for_estimated_end,
        //         //labor_hour
        //         'laborhour':this.taskTemplatDatas[i].laborhour
        //       })
        //     }
        //   }

        // }
        this.testtask = this.taskDatas.concat(this.taskTemplatDatas);

        console.log("testtask", this.testtask)
        this.taskDatas = this.testtask
        console.log("taskDatas", this.taskDatas)

        this.showData(this.testtask)
      }
    )
  }

  // 新增任務
  uploadtaskDatas: any = { "task": [] }
  addTaskRequest(): void {
    for (let i in this.taskDatas) {
      if (this.last_task == this.taskDatas[i].t_id) {

        // var date_for_start = this.taskDatas[i].date_for_estimated_start //start(new date) + 1
        // var date_for_end = new Date()// end = start
        // date_for_end.setDate(date_for_end.getDate() + Number(this.datenum)) // 結束日 + 輸入天數
        if (this.last_task == '00000000-0000-0000-0000-000000000000') {
          var date_for_start = new Date() //start(new date) + 1
          var date_for_end = new Date(this.taskDatas[i].date_for_estimated_completion)
          date_for_end.setDate(date_for_end.getDate() + Number(this.default_date)) // 結束日 + 輸入天數
        } else {
          var date_for_start = new Date(this.taskDatas[i].date_for_estimated_completion) //start(new date) + 1
          date_for_start.setDate(date_for_start.getDate() + 1)
          var date_for_end = new Date(this.taskDatas[i].date_for_estimated_completion)
          date_for_end.setDate(date_for_start.getDate() + Number(this.default_date)) // 結束日 + 輸入天數
        }


        let taskTemplateDatas: any = {};
        taskTemplateDatas['origin_id'] = 'ef242726-7b97-4943-9318-5eb27c1bb8b5' //寫死為project範本
        taskTemplateDatas['documents_id'] = this.pt_id
        taskTemplateDatas['t_name'] = this.t_name
        taskTemplateDatas['last_task'] = this.last_task
        taskTemplateDatas['todo_type_id'] = "00000000-0000-0000-0000-000000000000"
        taskTemplateDatas['date_for_actual_completion'] = ""
        taskTemplateDatas['date_for_estimated_start'] = date_for_start
        taskTemplateDatas['date_for_estimated_completion'] = date_for_end
        taskTemplateDatas['landmark'] = this.landmark
        taskTemplateDatas['default_date'] = Number(this.default_date)
        taskTemplateDatas['default_labor_hour'] = Number(this.default_labor_hour)
        this.uploadtaskDatas.task.push(taskTemplateDatas)

        console.log(this.uploadtaskDatas)

        let laborTemplateDatas: any = {};
        laborTemplateDatas['laborhour'] = this.laborhour

        console.log("taskTemplateDatas", taskTemplateDatas)
        console.log("laborTemplateDatas", laborTemplateDatas)

        this.HttpApiService.uploadpluralTaskRequest(this.uploadtaskDatas).subscribe(
          taskRequest => {
            this.task_id = taskRequest
            console.log(this.task_id)
            console.log(this.task_id.body)
            //this.getTaskTemplate()
            Swal.fire(
              {
                title: `新增成功`,
                icon: 'success',
                confirmButtonText: '確認!',
                confirmButtonColor: '#64c270',
                reverseButtons: true
              }
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.assign(`main/projectinfo/project-template-edit/${this.pt_id}`);
              }
            })
            // location.href = '/main/projectinfo/project-template-edit/' + this.pt_id
            //this.getTaskTemplate()
            // this.Datas.push({

            // })
          }
        )

      }
    }
    console.log("taskDatas", this.taskDatas)
  }

  editTaskTemplateDatas: any;
  edit_t_id: any
  //取得編輯任務資料
  doPostTaskTemplateEdit(t_id: any): void {
    this.btnEditClick() //this.btnStatus = true;
    this.edit_t_id = t_id
    this.HttpApiService.getOneTaskRequest_t(t_id).subscribe(
      taskTemplateRequest => {
        this.editTaskTemplateDatas = taskTemplateRequest.body
        this.t_name = this.editTaskTemplateDatas.t_name
        this.last_task = this.editTaskTemplateDatas.last_task
        this.landmark = this.editTaskTemplateDatas.landmark
        this.date_for_estimated_start = this.editTaskTemplateDatas.date_for_estimated_start
        this.date_for_estimated_completion = this.editTaskTemplateDatas.date_for_estimated_completion
        this.default_date = this.editTaskTemplateDatas.default_date
        this.default_labor_hour = this.editTaskTemplateDatas.default_labor_hour
      }
    )
  }

  updateTaskTemplateRequest(t_id: any): void {
    for (let i in this.taskDatas) {
      if (this.last_task == this.taskDatas[i].t_id) {
        if (this.last_task == '00000000-0000-0000-0000-000000000000') {
          var date_for_start = new Date() //start(new date) + 1
          var date_for_end = new Date(this.taskDatas[i].date_for_estimated_completion)
          date_for_end.setDate(date_for_end.getDate() + Number(this.default_date)) // 結束日 + 輸入天數
        } else {
          var date_for_start = new Date(this.taskDatas[i].date_for_estimated_completion) //start(new date) + 1
          date_for_start.setDate(date_for_start.getDate() + 1)
          var date_for_end = new Date(this.taskDatas[i].date_for_estimated_completion)
          date_for_end.setDate(date_for_start.getDate() + Number(this.default_date)) // 結束日 + 輸入天數
        }

        let taskTemplate: any = { "task": [] };
        let taskTemplateDatas: any = {};
        taskTemplateDatas['t_id'] = t_id
        taskTemplateDatas['t_name'] = this.t_name
        taskTemplateDatas['last_task'] = this.last_task
        taskTemplateDatas['date_for_estimated_start'] = date_for_start
        taskTemplateDatas['date_for_estimated_completion'] = date_for_end
        taskTemplateDatas['landmark'] = this.landmark
        taskTemplateDatas['default_date'] = Number(this.default_date)
        taskTemplateDatas['default_labor_hour'] = Number(this.default_labor_hour)
        taskTemplate.task.push(taskTemplateDatas)
        console.log("taskTemplate", taskTemplate)

        this.HttpApiService.updateOneTaskRequest(taskTemplate).subscribe(
          taskRequest => {
            console.log(taskRequest)
            console.log(t_id)

            Swal.fire(
              {
                title: `更新成功`,
                icon: 'success',
                confirmButtonText: '確認!',
                confirmButtonColor: '#64c270',
                reverseButtons: true
              }
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.assign(`main/projectinfo/project-template-edit/${this.pt_id}`);
              }
            })
            // location.href = '/main/projectinfo/project-template-edit/' + this.pt_id
            // this.getTaskTemplate()

          },
          (err: any) => {
            console.log('err:', err);
          }
        )

      }
    }
    console.log("taskDatas", this.taskDatas)
  }

  //按鈕狀態先給false
  btnStatus = false;//預設儲存
  //異動處理按鈕點擊事件
  btnEditClick() {
    this.btnStatus = true;
  }

  //刪除表格任務
  deleteTaskTemplateRequest(id: any, code: any): void {
    console.log("delete t_id", id)
    Swal.fire({
      title: `您是否確定要刪除${code}?`,
      text: "送出後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '送出!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.HttpApiService.deleteTaskRequest_t(id).subscribe(
          deleteTaskTemplateRequest => {
            console.log("deleteTaskRequest 刪除成功!", deleteTaskTemplateRequest)

            Swal.fire(
              {
                title: `已刪除!`,
                icon: 'success',
                confirmButtonColor: '#64c270',
              }
            ).then((result) => {
              window.location.assign(`main/projectinfo/project-template-edit/${this.pt_id}`)
            })
            
          }
        )


        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            title: `已取消`,
            icon: 'warning',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
          }
        )
      }
    })

    // if (confirm(`是否確定要刪除任務${code}?`) == true) {

    //   this.HttpApiService.deleteTaskRequest_t(id).subscribe(
    //     deleteTaskTemplateRequest => {
    //       console.log("deleteTaskRequest", deleteTaskTemplateRequest)
    //     }
    //   )
    //   alert("已刪除!")
    //   location.href = '/main/projectinfo/project-template-edit/' + this.pt_id
    // } else {
    //   alert("已取消!")
    // }

  }
  //刪除範本同時刪掉任務
  taskTotal: any
  deleteTaskDatas: any
  deleteProjectTemplateRequest(id: any): void {
    console.log("delete t_id", id)
    Swal.fire({
      title: `是否確定要刪除此專案範本?`,
      text: "送出後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '送出!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.deleteProjectTaskTemplateRequest(id)
        this.HttpApiService.deleteProjectTemplateRequest_t(id).subscribe(
          deleteProjectTemplateRequest => {
            console.log("deleteProjectRequest", deleteProjectTemplateRequest)

          })


        Swal.fire(
          {
            title: `已刪除!`,
            icon: 'success',
            confirmButtonColor: '#64c270',
          }
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            title: `已取消`,
            icon: 'warning',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
          }
        )
      }
    })

    // if (confirm(`是否確定要刪除此專案範本?`) == true) {
    //   this.deleteProjectTaskTemplateRequest(id)
    //   this.HttpApiService.deleteProjectTemplateRequest_t(id).subscribe(
    //     deleteProjectTemplateRequest => {
    //       console.log("deleteProjectRequest", deleteProjectTemplateRequest)

    //     })

    //   alert("已刪除!")
    //   //setTimeout(() => {this.projectTemplateUrl()},5000);
    //   //location.href = '/main/projectinfo/project-template'
    // } else {
    //   alert("已取消!")
    // }

  }

  //刪除專案範本內任務
  deleteProjectTaskTemplateRequest(id: any): void {
    this.HttpApiService.getTaskListLast(id, 1)
      .subscribe(taskRequest => {
        this.taskTotal = taskRequest.body.total
        console.log(this.taskTotal)
        if (this.taskTotal >= 20) {
          for (var j = 1; j <= (this.taskTotal / 20); j++) {
            this.HttpApiService.getTaskListLast(id, (j + 1)).subscribe(
              othertaskRequest => {
                this.deleteTaskDatas = othertaskRequest.body.task
                for (let i in this.deleteTaskDatas) {
                  this.HttpApiService.deleteTaskRequest_t(this.deleteTaskDatas[i].t_id).subscribe(
                    res => {
                      console.log("delete task res", res)
                    }
                  )
                }

              })
            console.log(j)
          }
        } else {
          console.log("fuck")
          this.HttpApiService.getTaskListLast(id, 1).subscribe(
            othertaskRequest => {
              this.deleteTaskDatas = othertaskRequest.body.task
              console.log(this.deleteTaskDatas)
              // for(let i in this.deleteTaskDatas){
              //   this.HttpApiService.deleteTaskRequest_t(this.deleteTaskDatas[i].t_id).subscribe(
              //     res => {
              //       console.log("delete task res",res)
              //     }
              //   )
              // }
            })
        }
      })
  }

  projectTemplateUrl(): void {
    window.location.assign('main/projectinfo/project-template')
  }

  btnResetClick() {
    this.btnStatus = false;
  }

  ngAfterViewInit() {
    // 設定資料排序
    this.dataSource.sort = this.sort;

    // 執行顯示資料
    setTimeout(() => {
      //this.showData();
    }, 0);
  }

  // 顯示資料
  showData(data: any) {
    this.totalCount = data.length;
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
  }

  // 設定分頁器參數
  setPaginator() {
    // 設定顯示筆數資訊文字
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `第 ${startIndex + 1} - ${endIndex} 筆、共 ${length} 筆`;
    };

    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }

  // 過濾資料
  filterData() {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      // return data.BuyerPartyID.indexOf(filter) !== -1;
      // return data.BuyerPartyID.toLowerCase().includes(filter) || data.ID.includes(filter) || data.InvoiceNO_KUT.toLowerCase().includes(filter);
      return this.getCheckIncludes(data, ['ObjectID', 'ID', 'InvoiceNO_KUT'], filter);
    };
  }

  // 取得要過濾哪些欄位 array資料  titles要過濾的欄位名稱 keyword關鍵字
  getCheckIncludes(array: any, titles: string[], keyword: string) {
    // console.log(array);
    return titles.some(i => {
      return array[i].toLowerCase().includes(keyword.toLowerCase());
    });
  }

  // filter 輸入關鍵字
  keyupSearch(event: any) {
    this.dataSource.filter = event.toLowerCase();
  }


  // 檢查月份 未完成
  checkMonth(month: number) {
    const thisYear = new Date(this.now).getFullYear();
    const thisMonth = new Date(this.now).getMonth();
    const selectYear = new Date(this.year).getFullYear();
    return;
    if (thisYear !== selectYear) {
      return false;
    }
    const currentDate = new Date();
    currentDate.setFullYear(thisYear);
    currentDate.setMonth(month - 1);
    currentDate.setDate(+1);
    currentDate.setHours(0, 0, 1);
    console.log(currentDate);
    const myFormattedDate = this.pipe.transform(currentDate, this.formatStr);
    console.log(myFormattedDate);

    return
  }

  // 選擇月份時關閉
  closeDatePicker(elem: MatDatepicker<any>, value: any) {
    this.year = value;
    elem.close();
  }

  cancelEdit() {
    window.location.assign('main/projectinfo/project-template');
  }


  //刪除所有資料------------------------------------------------------------
  deleteDatas(pt_id: any): void {

    Swal.fire({
      title: `是否確定要刪除此專案範本?`,
      text: "送出後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '送出!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.deletProjectTemplateDatas(pt_id)
        this.deletTaskDatas(pt_id)
        Swal.fire(
          {
            title: `已刪除`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.assign('main/projectinfo/project-template');
          }
        })


      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            title: `已取消`,
            icon: 'warning',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
          }
        )
      }
    })

    // if (confirm("是否確定要刪除?") == true) {
    //   this.deletProjectTemplateDatas(pt_id)
    //   this.deletTaskDatas(pt_id)
    //   alert("已刪除!");
    // } else {
    //   alert("無法刪除!");
    // }
  }
  //刪除該id之project資料------------------------------------------------------------
  deletProjectTemplateDatas(pt_id: any): void {
    this.HttpApiService.deleteProjectRequest_t(pt_id)
      .subscribe(ptRequest => {
        console.log(ptRequest)
      })
  }
  total: any
  //刪除該id之所有task資料------------------------------------------------------------
  deletTaskDatas(pt_id: any): void {
    this.HttpApiService.getTaskListLast(pt_id, 1)
      .subscribe(taskRequest => {
        for (var i in taskRequest.body.task) {
          this.HttpApiService.deleteTaskRequest_t(taskRequest.body.task[i].t_id)
            .subscribe(deletetaskRequest => {
              console.log(deletetaskRequest)
            })
        }
        this.total = taskRequest.body.total
        for (var j = 1; j <= (this.total / 20); j++) {
          this.HttpApiService.getTaskRequest_t((j + 1), 20)
            .subscribe(othertaskRequest => {
              for (var i in othertaskRequest.body.task) {
                this.HttpApiService.deleteTaskRequest_t(othertaskRequest.body.task[i].t_id)
                  .subscribe(deleteothertaskRequest => {
                    console.log(deleteothertaskRequest)
                  })
              }
            })
        }
      });
  }


}
