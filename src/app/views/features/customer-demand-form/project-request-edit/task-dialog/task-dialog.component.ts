import { Component, OnInit, Inject } from '@angular/core';
import { HttpApiService } from './../../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  constructor(
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private taskdata: any
  ) {

  }

  ngOnInit(): void {
    this.getOneTaskRequest(this.taskdata.t_id);
  }

  t_id: any = this.taskdata.t_id
  name: any = ''
  description: any = ''
  brfore_id: any = ''
  principal: any = ''
  time_for_start: any = ''
  tome_for_done: any = ''
  labor_hour: any = ''
  last_task = ''

  taskDatas: any;
  taskData: any

  //取得單一任務
  getOneTaskRequest(t_id: string): void {
    this.HttpApiService.getOneTestTaskRequest(t_id)
      .subscribe(taskRequest => {
        console.log('taskRequest', taskRequest)

        this.taskDatas = taskRequest;
        this.taskData = this.taskDatas.message.detail[this.taskdata.name];
        console.log('taskData', this.taskData)

      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

}
