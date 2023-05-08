import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpApiService } from './../../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

const ELEMENT_DATA_1: PeriodicElement1[] = [
  {
    name: '',
    description: '',
    before_id: '',
    principal: '',
    time_for_start: '',
    time_for_done: '',
    labor_hour: '',
    last_task: ''
  }
];


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
    @Inject(MAT_DIALOG_DATA) private taskdata: any,
  ) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      before_id: [, [Validators.required]],
      principal: [, [Validators.required]],
      time_for_start: ['', [Validators.required]],
      time_for_done: ['', [Validators.required]],
      labor_hour: ['', [Validators.required]],
      last_task: ['', [Validators.required]],
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

  ngOnInit(): void {
    this.getTaskRequest(this.taskdata.t_id);
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


  addproject: any = {};
  //雙向綁定
  name: any = ''
  description: any = ''
  brfore_id: any = ''
  principal: any = ''
  time_for_start: any = ''
  tome_for_done: any = ''
  labor_hour: any = ''

  addAllRequests(): void {

    let a: any = {};

    // this.taskDatas.message.detail[this.name].name = this.name
    // this.taskDatas.message.detail[this.name].description = this.description
    // this.taskDatas.message.detail[this.name].before_id = this.brfore_id
    // this.taskDatas.message.detail[this.name].principal = this.principal
    // this.taskDatas.message.detail[this.name].time_for_start = ''
    // this.taskDatas.message.detail[this.name].time_for_done = ''
    // this.taskDatas.message.detail[this.name].labor_hour = this.labor_hour

    // console.log('this.taskDatas.message', this.taskDatas.message)

    a = {
      'name': this.name,
      'description': this.description,
      'before_id': this.brfore_id,
      'principal': this.principal,
      'time_for_start': '',
      'time_for_done': '',
      'labor_hour': this.labor_hour,
      'last_task': this.last_task
    }

    console.log('a', a)

    this.taskDatas.message.detail[this.name] = a

    console.log('this.taskDatas', this.taskDatas)

    this.httpApiService.updateTestTaskRequest(this.taskDatas.message)
      .subscribe(taskRequest => {
        console.log(taskRequest)
        console.log('成功');
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  myControl = new FormControl();
  last_task = ''
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

}
