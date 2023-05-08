import { TaskRequest } from '../../../../../shared/models/model';
import { HttpApiService } from '../../../../../api/http-api.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {

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
  ) {
    this.editTaskForm = this.fb.group({
      name: new FormControl(),
      before_id: new FormControl(),
      principal: new FormControl(),
      labor_hour: new FormControl(),
      description: new FormControl(),
      time_for_done: new FormControl(),
      time_for_start: new FormControl(),
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

  //編輯頁面id
  task_name: any;
  ngOnInit(): void {
    //this.p_id = this.route.snapshot.paramMap.get('p_id');
    this.task_name = this.taskdata.name

    this.getOneTaskRequest(this.taskdata.t_id);

    this.editTaskForm = new FormGroup({
      name: new FormControl(),
      before_id: new FormControl(),
      principal: new FormControl(),
      labor_hour: new FormControl(),
      description: new FormControl(),
      time_for_done: new FormControl(),
      time_for_start: new FormControl(),
    });
  }

  //p_id:any = '';
  task_id: any = '';
  //projectDatas: any;

  //雙向綁定--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  t_id: any;

  name: any = ''
  description: any = ''
  brfore_id: any = ''
  principal: any = ''
  time_for_start: any = ''
  tome_for_done: any = ''
  labor_hour: any = ''

  myControl = new FormControl();

  //取得任務new_one_task資料---------------------------------------------------------------------------------------------------------------------------------------------------------------
  testtaskRequest: any;
  taskname: any[] = [];

  //叫出編輯資料
  editTaskDatas: any;

  taskDatas: any;
  taskData: any

  getOneTaskRequest(t_id: string): void {
    this.HttpApiService.getOneTestTaskRequest(t_id)
      .subscribe(taskRequest => {

        this.taskDatas = taskRequest;
        this.editTaskDatas = this.taskDatas.message.detail[this.taskdata.name];

      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }


  //皆更新後的task資料----------------------------------------------
  newTaskDatas: any;

  updateTaskRequest(): void {
    let a: any = {};

    a = {
      'name': this.editTaskDatas.name,
      'description': this.editTaskDatas.description,
      'before_id': this.editTaskDatas.brfore_id,
      'principal': this.editTaskDatas.principal,
      'time_for_start': this.editTaskDatas.time_for_start,
      'time_for_done': this.editTaskDatas.time_for_done,
      'labor_hour': this.editTaskDatas.labor_hour
    }


    this.taskDatas.message.detail[this.taskdata.name]

    //console.log(this.newTaskDatas);
    this.HttpApiService.updateTestTaskRequest(this.taskDatas.message).
      subscribe(testtask => {
      },
        (err: any) => {
          console.log('err:', err);
        }
      );


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
