import { AccountId } from './../../../../../shared/models/models';
import { HttpApiService } from './../../../../../api/http-api.service';
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

@Component({
  selector: 'app-work-submit-dialog',
  templateUrl: './work-submit-dialog.component.html',
  styleUrls: ['./work-submit-dialog.component.scss']
})
export class WorkSubmitDialogComponent implements OnInit {

  isLinear = false;
  addForm: FormGroup;

  displayedColumns: string[] = ['nature', 'h_title', 'date_for_start', 'time_for_start', 'time_for_end', 'laborhour', 'action_edit', 'action_copy', 'action_delete'];
  laborHourDataSource = new MatTableDataSource();
  totalCount!: number;
  t_id: any
  tu_id: any
  //t_id = 'a689b65a-f357-4801-8264-b4cdb6bd2675';//先寫死辣
  //account_id:any
  //account_id = 'd65f3750-07cc-4f46-a62c-b2eb374ed8be'//吳
  //@Input() title!: string;
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
      h_title: new FormControl(),
      content: new FormControl(),
      nature: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      laborhour: new FormControl(),
    });
  }

  userJson: any
  ngOnInit(): void {
    // console.log(window.localStorage.getItem(TOKEN_KEY))
    // console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    console.log(this.testtaskdatas)
    this.t_id = this.testtaskdatas.t_id
    this.tu_id = this.testtaskdatas.tu_id
    this.h_title = this.testtaskdatas.title
    console.log("t_id", this.t_id)

    this.category = this.testtaskdatas.tu_id

    this.getLaborHourRequest()

    this.addForm = new FormGroup({
      h_title: new FormControl(),
      content: new FormControl(),
      nature: new FormControl(),
      date_for_start: new FormControl(),
      time_for_start: new FormControl(),
      time_for_end: new FormControl(),
      laborhour: new FormControl(),
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

  origin_id = '443bd223-d750-409c-961a-93375052b186'
  workType_option: any[] = [
    {
      key: "-",
      value: "",
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
      value: "",
    }
  ];
  workNature_option: any[] = ['設計', '組裝', '試機', '維修', '出差', '教育訓練', '開會', '客戶', '資料整理', '銀行', '待專案啟動', 'PT人員', '其他'];
  workTime_option: any[] = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  laborHour_option: any[] = ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];

  //新增工時
  LaborHourRequest: any
  hrs = -(new Date().getTimezoneOffset() / 60)
  addLaborHourRequest(): void {
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
    LaborHourData['laborhour'] = Number(this.time_for_end) - Number(this.time_for_start);
    LaborHourData['creater'] = this.userJson.account_id
    console.log(LaborHourData);//console資料
    this.HttpApiService.uploadLaborHourRequest(LaborHourData).subscribe(
      res => {
        this.LaborHourRequest = res
        console.log("工時提報成功", res)
        if (this.LaborHourRequest.code == 200) {
          Toast.fire({
            icon: 'success',
            title: '新增成功'
          })
          this.addForm.reset()
          this.time_for_start = 17
          this.time_for_end = 19
          this.laborhour = this.time_for_end - this.time_for_start
          this.getLaborHourRequest()
          this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報', '客需單任務工時', this.userJson.account_id)
        } else {
          this.addForm.markAllAsTouched()
          this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報失敗', '客需單任務工時', this.userJson.account_id)
          Swal.fire(
            {
              title: `工時提報失敗`,
              icon: 'error',
              confirmButtonText: '確認!',
              reverseButtons: true
            }
          )
        }

      },
      (err: any) => {
        console.log('err:', err);
        this.SwalService.uploadTransactionRecordRequests(this.tu_id, 'TM提報失敗', '客需單任務工時', this.userJson.account_id)
      }
    );
    //slocation.href='main/task-return/171/1';
  }

  //取得全部laborhour參數設定---------------------------------
  laborHourRequest: any;
  laborHourDatas: any;
  getLaborHourRequest(): void {
    this.HttpApiService.getLaborHourListByUserId(this.userJson.account_id, this.t_id)
      .subscribe(laborHourRequest => {
        this.laborHourDatas = laborHourRequest.body.labor_hour
        this.showData(this.laborHourDatas);
        console.log(this.laborHourDatas)
        //console.log(typeof (this.laborHourDatas[0].time_for_start))
      });
  }

  // 顯示資料
  labortotalCount: any;
  showData(data: any) {
    console.log(data)
    this.laborHourDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.laborHourDataSource.sort = this.sort;
    this.laborHourDataSource.paginator = this.paginator;
  }

  //下拉選單更改
  selectedValue(): void {
    this.getTaskRequestByOriginId()
  }

  //專案負責人option
  task_option: any[] = [];
  taskDatas: any;
  getTaskRequestByOriginId(): void {
    this.HttpApiService.getTaskRequestByOriginIdUserId(this.origin_id, this.userJson.account_id, 1)
      .subscribe(TaskRequest => {
        console.log(TaskRequest)
        this.task_option = [];
        this.taskDatas = TaskRequest.body.task
        console.log(this.taskDatas)
        for (let i in this.taskDatas) {
          this.task_option.push({ key: this.taskDatas[i].t_name, value: this.taskDatas[i].tu_id })
          this.task_option = [...new Set(this.task_option)]
        }
      });
    console.log(this.task_option)
  }

  laborHourData: any
  //編輯工時彈跳視窗
  doPostEdit(item: any): void {
    this.btnEditClick()
    this.h_id = item
    this.HttpApiService.getOneLaborHourRequest(this.h_id)
      .subscribe(LaborhourRequest => {
        this.laborHourData = LaborhourRequest.body
        this.category = this.laborHourData.category
        this.h_title = this.laborHourData.title
        this.content = this.laborHourData.content
        this.nature = this.laborHourData.nature
        this.date_for_start = this.laborHourData.date_for_start
        this.time_for_start = this.laborHourData.time_for_start
        this.time_for_end = this.laborHourData.time_for_end
        this.laborhour = this.laborHourData.laborhour
      });
  }


  //編輯工時彈跳視窗
  doPostCopy(item: any): void {
    this.btnResetClick()
    this.h_id = item
    this.HttpApiService.getOneLaborHourRequest(this.h_id)
      .subscribe(LaborhourRequest => {
        this.laborHourData = LaborhourRequest.body
        this.category = this.laborHourData.category
        this.h_title = this.laborHourData.title
        this.content = this.laborHourData.content
        this.nature = this.laborHourData.nature
        this.date_for_start = this.laborHourData.date_for_start
        this.time_for_start = this.laborHourData.time_for_start
        this.time_for_end = this.laborHourData.time_for_end
        this.laborhour = this.laborHourData.laborhour
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
    LaborHourData['laborhour'] = Number(this.laborhour);
    console.log(LaborHourData);//console資料
    this.HttpApiService.updateLaborHourRequest(this.h_id, LaborHourData).subscribe(
      LaborHourRequest => {
        if (LaborHourRequest.code == 200) {
          Toast.fire({
            icon: 'success',
            title: '更新成功'
          })
          this.btnResetClick()
          this.addForm.reset()
          this.time_for_start = 8
          this.time_for_end = 12
          this.laborhour = this.time_for_end - this.time_for_start
          this.getLaborHourRequest()
        } else {
          this.addForm.markAllAsTouched()
        }

      },
      (err: any) => {
        console.log('err:', err);
      }
    );

  }

  //按鈕狀態先給false
  btnStatus = false;//預設儲存
  //異動處理按鈕點擊事件
  btnEditClick() {
    this.btnStatus = true;
  }

  btnResetClick() {
    this.btnStatus = false;
  }

}


