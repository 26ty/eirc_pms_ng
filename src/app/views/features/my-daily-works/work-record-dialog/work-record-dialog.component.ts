import { AccountId } from './../../../../shared/models/models';
import { HttpApiService } from 'src/app/api/http-api.service';
import { Location } from '@angular/common';
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SwalEventService } from 'src/app/api/swal-event.service';
import Swal from 'sweetalert2'

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-work-record-dialog',
  templateUrl: './work-record-dialog.component.html',
  styleUrls: ['./work-record-dialog.component.scss']
})
export class WorkRecordDialogComponent implements OnInit {

  
  isLinear = false;
  addForm: FormGroup;

  displayedColumns: string[] = ['nature', 'h_title', 'date_for_start', 'time_for_start', 'time_for_end', 'action_edit', 'action_copy'];
  laborHourDataSource = new MatTableDataSource();
  totalCount!: number;
  t_id: any
  tu_id: any
  day: any
  work_item: any
  work_id: any
  month: any
  year: any
  labor_date: any //工時大表來的日期

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('workDetailDialogComponent') sourceDialog!: TemplateRef<any>;
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private SwalService: SwalEventService,
    @Inject(MAT_DIALOG_DATA) private testtaskdatas: any
  ) {
    this.addForm = this.fb.group({
      origin_id: new FormControl(),
      category: new FormControl(),
    });
  }

  userJson:any
  today:any
  ngOnInit(): void {

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    //彈跳視窗取得的資料
    console.log(this.testtaskdatas)

    //工時大表 日期 工作項目 項目id
    this.day = this.testtaskdatas.day + 1
    this.work_item = this.testtaskdatas.items
    this.work_id = this.testtaskdatas.workId //origin_id
    this.category = this.testtaskdatas.cat //category
    this.month = this.testtaskdatas.month
    if (this.month < 10) {
      this.month = `0${this.testtaskdatas.month}`
    }
    if (this.day < 10) {
      this.day = `0${this.day}`
    }
    console.log(`day:${this.day},month:${this.month},work_item:${this.work_item},work_id:${this.work_id},category:${this.category}`)


    //取得當年
    let dt = new Date();
    this.year = dt.getFullYear()
    console.log(this.year)

    this.labor_date = new Date(`${this.year}-${this.month}-${this.day}`)
    console.log(this.labor_date) //工時表日期


    if(this.work_id == '443bd223-d750-409c-961a-93375052b186' || this.work_id == '1e6913f5-55be-413a-94a5-68f8cc67d5b2'){
      this.getMyDailyWorkRequest(`${this.year}-${this.month}-${this.day}`,this.testtaskdatas.cat)
    }else{
      this.getMyDailyWorkRequest(`${this.year}-${this.month}-${this.day}`,this.testtaskdatas.cat)
    }
    this.today = `${this.year}-${this.month}-${this.day}`

    //專案任務帶回報頁面工時列表
    this.getLaborHourRequest()


    this.addForm = new FormGroup({
      origin_id: new FormControl(),
      category: new FormControl(),
    });

  }

  h_id = ''
  category = ''
  h_title = ''
  content = ''
  nature = ''
  date_for_start: any
  time_for_start = 17
  time_for_end = 19
  laborhour = this.time_for_end - this.time_for_start

  origin_id = ''
  workType_option: any[] = [
    {
      key: "-",
      value: "",
    },
    {
      key:"部門事務",
      value:"8203f5f9-5e90-4e71-b8c0-4ec37a31e283"
    },
    {
      key:'Daily Report',
      value:'eb7a4d6f-c6c7-41b5-9c3c-63dbf10360cc'
    },
    {
      key: "客需單",
      value: "443bd223-d750-409c-961a-93375052b186",
    },
    {
      key: "產銷專案",
      value: "5451f88e-6d83-44c6-96c3-cd1d049249f7",
    },
    {
      key: "專案任務",
      value: "1e6913f5-55be-413a-94a5-68f8cc67d5b2",
    },
    {
      key: "治具需求單",
      value: "",
    },
    {
      key: "會議",
      value: "",
    },
    {
      key: "CRM",
      value: "",
    },
    {
      key: "待辦事項",
      value: "05410602-165a-4eab-8938-54392fdd571f",
    },
    {
      key: "其他",
      value: "a7c8f7ed-0c20-4ffe-8a09-c13621709847"
    }
  ];

  other_option: any[] = [

  ]
  workNature_option: any[] = ['設計', '組裝', '試機', '維修', '出差', '教育訓練', '開會', '客戶', '資料整理', '銀行', '待專案啟動', 'PT人員', '其他'];
  workTime_option: any[] = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  laborHour_option: any[] = ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];

  //新增工時
  LaborHourRequest: any
  hrs = -(new Date().getTimezoneOffset() / 60)
  addLaborHourRequest(): void {
    let LaborHourData: any = {};//接收資料的陣列
    // if(this.work_item){
    //   LaborHourData['category'] = this.work_item
    // }
    LaborHourData['category'] = this.category;
    LaborHourData['title'] = this.h_title;
    // if(this.work_item){
    //   LaborHourData['content'] = this.work_item
    // }
    LaborHourData['content'] = this.content;

    LaborHourData['nature'] = this.nature;
    this.date_for_start = new Date(this.date_for_start)
    this.date_for_start.setHours(this.date_for_start.getHours() + this.hrs);
    LaborHourData['date_for_start'] = this.date_for_start;
    LaborHourData['time_for_start'] = Number(this.time_for_start);
    LaborHourData['time_for_end'] = Number(this.time_for_end);
    //LaborHourData['laborhour'] = Number(this.time_for_end) - Number(this.time_for_start);
    LaborHourData['laborhour'] = parseFloat(String(this.laborhour));
    LaborHourData['creater'] = this.userJson.account_id
    console.log(LaborHourData);//console資料
    if (this.origin_id == '' || this.origin_id == null || this.origin_id == undefined || this.category == '' || this.category == null || this.category == undefined) {

      Swal.fire(
        {
          title: `工時類別或項目未確實填寫!`,
          icon: 'error',
          confirmButtonText: '確認!',
          reverseButtons: true
        }
      )
    } else {
      this.HttpApiService.uploadLaborHourRequest(LaborHourData).subscribe(
        res => {
          this.LaborHourRequest = res
          console.log("工時提報res", res)
          if (this.LaborHourRequest.code == 200) {
            //this.category = ''
            this.h_title = ''
            this.content = ''
            this.nature = ''
            this.date_for_start = ''
            this.time_for_start = 17
            this.time_for_end = 19
            this.laborhour = this.time_for_end - this.time_for_start
            // if(this.work_item){
            //   this.getMyDailyWorkRequest(`${this.year}-${this.month}-${this.day}`)
            // }
            if (this.work_item) {
              if(this.work_id == '443bd223-d750-409c-961a-93375052b186' || this.work_id == '1e6913f5-55be-413a-94a5-68f8cc67d5b2'){
                this.getMyDailyWorkRequest(`${this.year}-${this.month}-${this.day}`,this.testtaskdatas.cat)
              }else{
                this.getMyDailyWorkRequest(`${this.year}-${this.month}-${this.day}`,this.work_id)
              }
            } else {
              this.getLaborHourRequest()
            }


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
              title: '提報成功'
            })
            this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報', '專案任務工時', this.userJson.account_id)
          } else {
            this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報失敗', '專案任務工時', this.userJson.account_id)
            if (this.content == '' || this.content == null || this.content == undefined) {
              Swal.fire(
                {
                  title: `工時提報失敗`,
                  text: `工時內容未確實填寫`,
                  icon: 'error',
                  confirmButtonText: '確認!',
                  reverseButtons: true
                }
              )
            } else {
              Swal.fire(
                {
                  title: `工時提報失敗`,
                  text: '未填寫完整',
                  icon: 'error',
                  confirmButtonText: '確認!',
                  reverseButtons: true
                }
              )
            }

          }

        },
        (err: any) => {
          console.log('err:', err);
          this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報失敗', '專案任務工時', this.userJson.account_id)
          Swal.fire(
            {
              title: `工時提報失敗`,
              text: '未填寫完整',
              icon: 'error',
              confirmButtonText: '確認!',
              reverseButtons: true
            }
          )
        }
      );
    }
    //slocation.href='main/task-return/171/1';
  }

  //取得全部laborhour參數設定---------------------------------
  laborHourRequest: any;
  laborHourDatas: any;
  taskuserDatas: any
  tidSelected: any
  getLaborHourRequest(): void {
    this.HttpApiService.getLaborHourListByUserId(this.userJson.account_id, this.t_id)
      .subscribe(laborHourRequest => {
        this.laborHourDatas = laborHourRequest.body.labor_hour
        this.showData(this.laborHourDatas);
        console.log(this.laborHourDatas)
        //console.log(typeof (this.laborHourDatas[0].time_for_start))
      });
  }

  getMyDailyWorkRequest(day: any,cat_id:any): void {
    this.HttpApiService.getLaborHourByCategoryList(this.userJson.account_id, cat_id, day).subscribe(
      res => {
        console.log(cat_id)
        console.log(res)
        this.laborHourDatas = res.body
        this.showData(this.laborHourDatas);
        console.log(this.laborHourDatas)
      })
  }

  // 顯示資料
  labortotalCount: any;
  showData(data: any) {
    console.log(data)
    this.laborHourDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    // this.totalCount = data.length;//計算資料長度
    this.laborHourDataSource.sort = this.sort;
    this.laborHourDataSource.paginator = this.paginator;
  }

  // selectCateCory(test:any):void{
  //   this.getLaborHourRequest(test)
  // }

  //下拉選單更改
  selectedValue(): void {
    this.getTaskRequestByOriginId()
  }

  //專案負責人option
  task_option: any[] = [];
  taskDatas: any;
  getTaskRequestByOriginId(): void {
    //this.task_option= [];
    //退入部門事務
    if(this.origin_id == '8203f5f9-5e90-4e71-b8c0-4ec37a31e283'){ //部門事務 要顯示出部門任務
      this.task_option = [];
      console.log(this.origin_id)
      this.HttpApiService.getTaskRequestByOriginIdUserId('1e6913f5-55be-413a-94a5-68f8cc67d5b2', this.userJson.account_id, 1) //先預設專案任務 應該要加上ＣＲＭ
      .subscribe(TaskRequest => {
        console.log("TaskRequest",TaskRequest)
        this.task_option = [];
        this.taskDatas = TaskRequest.body.task
        console.log("TaskRequest.body.task",this.taskDatas)
        for (let i in this.taskDatas) {
          this.task_option.push({p_name: this.taskDatas[i].p_name, key: this.taskDatas[i].t_name, value: this.taskDatas[i].tu_id ,tID :this.taskDatas[i].t_id })
          //this.task_option = [...new Set(this.task_option)]
        }
        
        this.task_option = [...new Set(this.task_option)]
        console.log(this.task_option)
      });
    }else{
      this.HttpApiService.getTaskRequestByOriginIdUserId(this.origin_id, this.userJson.account_id, 1)
      .subscribe(TaskRequest => {
        console.log("TaskRequest",TaskRequest)
        this.task_option = [];
        this.taskDatas = TaskRequest.body.task
        console.log("TaskRequest.body.task",this.taskDatas)
        for (let i in this.taskDatas) {
          this.task_option.push({p_name: this.taskDatas[i].p_name, key: this.taskDatas[i].t_name, value: this.taskDatas[i].tu_id ,tID :this.taskDatas[i].t_id })
          // this.task_option = [...new Set(this.task_option)]
          // console.log(this.task_option)
        }
        this.task_option = [...new Set(this.task_option)]
        console.log(this.task_option)
      });
    
    }
    // if(this.origin_id == 'a7c8f7ed-0c20-4ffe-8a09-c13621709847'){ //其他
    //   this.task_option = [];
    //   this.task_option = [
    //     {
    //       p_name:'部門事務',
    //       key:'',
    //       value:'8203f5f9-5e90-4e71-b8c0-4ec37a31e283'
    //     },
    //     {
    //       p_name:'Daily Report',
    //       key:'',
    //       value:'eb7a4d6f-c6c7-41b5-9c3c-63dbf10360cc'
    //     }
    //     {
    //       p_name:'參與會議',
    //       key:'',
    //       value:'e1494235-02a9-4a2f-b112-22661194e89a'
    //     },
    //     {
    //       p_name:'待辦事項',
    //       key:'',
    //       value:'05410602-165a-4eab-8938-54392fdd571f'
    //     },
    //     {
    //       p_name:'國定/例假',
    //       key:'',
    //       value:'c140f6bc-5bb5-4976-b14b-4860bdcd8576'
    //     },
    //     {
    //       p_name:'特別休假',
    //       key:'',
    //       value:'f78aceab-81bf-4118-8934-f1d379c9577b'
    //     },
    //     {
    //       p_name:'病假',
    //       key:'',
    //       value:'01203792-203d-4c0b-8268-b4662036281b'
    //     },
    //     {
    //       p_name:'事假',
    //       key:'',
    //       value:'a149835a-dd04-408f-8576-850744c52f38'
    //     },
    //     {
    //       p_name:'其他(婚/喪)',
    //       key:'',
    //       value:'5d1f8cad-47e5-4587-8830-10d45e4cd8e7'
    //     },
    //     {
    //       p_name:'輪休',
    //       key:'',
    //       value:'c1f2a4fd-54ff-4639-9180-553dcb76bf85'
    //     }
    //   ]
    
    
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

  laborHourData: any
  //編輯工時彈跳視窗
  doPostEdit(item: any): void {
    this.btnEditClick()
    this.h_id = item
    this.HttpApiService.getOneLaborHourRequest(this.h_id)
      .subscribe(LaborhourRequest => {
        console.log(LaborhourRequest.body)
        this.laborHourData = LaborhourRequest.body
        this.category = this.laborHourData.category //catgory會消失
        this.h_title = this.laborHourData.title
        this.content = this.laborHourData.content
        this.nature = this.laborHourData.nature
        this.date_for_start = this.laborHourData.date_for_start
        this.time_for_start = this.laborHourData.time_for_start
        this.time_for_end = this.laborHourData.time_for_end
        this.laborhour = this.laborHourData.laborhour


      });
  }

  laborHourCopyData: any
  //編輯工時彈跳視窗
  doPostCopy(item: any): void {
    this.btnCopyClick()
    this.h_id = item
    this.HttpApiService.getOneLaborHourRequest(this.h_id)
      .subscribe(LaborhourRequest => {
        console.log(LaborhourRequest.body)
        this.laborHourCopyData = LaborhourRequest.body
        this.category = this.laborHourCopyData.category
        this.h_title = this.laborHourCopyData.title
        this.content = this.laborHourCopyData.content
        this.nature = this.laborHourCopyData.nature
        this.date_for_start = this.laborHourCopyData.date_for_start
        this.time_for_start = this.laborHourCopyData.time_for_start
        this.time_for_end = this.laborHourCopyData.time_for_end
        this.laborhour = this.laborHourCopyData.laborhour


      });
  }

  //修改工時
  updateLaborHourRequest(): void {
 
    let LaborHourData: any = {};//接收資料的陣列
    LaborHourData['category'] = this.category;
    LaborHourData['title'] = this.h_title;
    LaborHourData['content'] = this.content;
    LaborHourData['nature'] = this.nature;
    this.date_for_start = new Date(this.date_for_start)
    this.date_for_start.setHours(this.date_for_start.getHours() + this.hrs);
    LaborHourData['date_for_start'] = this.date_for_start;
    LaborHourData['time_for_start'] = Number(this.time_for_start);
    LaborHourData['time_for_end'] = Number(this.time_for_end);
    LaborHourData['laborhour'] = parseFloat(String(this.laborhour));
    console.log(LaborHourData);//console資料
    console.log("origin_id", this.origin_id)
    console.log("category", this.category)
    if (this.origin_id == '' || this.origin_id == null || this.origin_id == undefined) {
      Swal.fire(
        {
          title: `工時類別或項目未確實填寫!`,
          icon: 'error',
          confirmButtonText: '確認!',
          reverseButtons: true
        }
      )
    } else {
      this.HttpApiService.updateLaborHourRequest(this.h_id, LaborHourData).subscribe(
        LaborHourRequest => {
          // this.category = ''
          this.h_title = ''
          this.content = ''
          this.nature = ''
          this.date_for_start = ''
          this.time_for_start = 17
          this.time_for_end = 19
          this.laborhour = 2

          console.log("work_item",this.work_item)
          console.log("work_id",this.work_id)
          if (this.work_id) {
            if(this.work_id == '443bd223-d750-409c-961a-93375052b186' || this.work_id == '1e6913f5-55be-413a-94a5-68f8cc67d5b2'){
              this.getMyDailyWorkRequest(`${this.year}-${this.month}-${this.day}`,this.testtaskdatas.cat)
            }else{
              this.getMyDailyWorkRequest(`${this.year}-${this.month}-${this.day}`,this.category)
            }
            
          } else {
            this.getLaborHourRequest()
          }
          // if(this.work_item){
          //   this.getMyDailyWorkRequest(`${this.year}-${this.month}-${this.day}`)
          // }

          console.log(LaborHourRequest)
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
          this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM異動', '專案任務工時', this.userJson.account_id)
        },
        (err: any) => {
          console.log('err:', err);
          this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM異動失敗', '專案任務工時', this.userJson.account_id)
          Swal.fire(
            {
              title: `工時更新失敗`,
              text: '未填寫完整',
              icon: 'error',
              confirmButtonText: '確認!',
              reverseButtons: true
            }
          )
        }
      );
    }


  }


  closeDialog() {
    this.dialog.afterAllClosed.subscribe(() => {
      console.log('目前已經沒有dialog了');
      window.location.reload();
    });
  }


}
