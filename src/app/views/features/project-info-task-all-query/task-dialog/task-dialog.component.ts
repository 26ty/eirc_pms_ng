import { Component, OnInit, Inject } from '@angular/core';
import { HttpApiService } from './../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  lastdata: any;
  last_date_start: any;
  last_date_completion: any;

  constructor(
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private taskdata: any
  ) {

  }

  ngOnInit(): void {
    this.getOneTestTask();
  }

  p_code = this.taskdata.name
  // taskDatas: any;
  taskData: any

  testtaskDatas: any;
  //取得任務one task資料----------------------------------------------------
  getOneTestTask(): void {
    this.HttpApiService.getOneTaskListRequest(this.taskdata.t_id).
      subscribe(testtaskRequest => {
        this.testtaskDatas = testtaskRequest.body.task
        //console.log(this.testtaskDatas.body.last_task)
        // this.HttpApiService.getOneTaskRequest_t(this.testtaskDatas.body.last_task).subscribe(lastDatas => {
        //   this.lastdata = lastDatas
        //   this.last_date_start = this.lastdata.body.date_for_estimated_start
        //   this.last_date_completion = this.lastdata.body.date_for_estimated_completion
        // })
        console.log(this.testtaskDatas)
      })
    //console.log(this.last_date_start)
    //console.log(this.last_date_completion)
  }

}
