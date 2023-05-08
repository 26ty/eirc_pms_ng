import { TaskRequest } from './../../../../../shared/models/model';
import { HttpApiService } from './../../../../../api/http-api.service';
import { Component, OnInit ,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-case-dialog',
  templateUrl: './case-dialog.component.html',
  styleUrls: ['./case-dialog.component.scss']
})

export class CaseDialogComponent implements OnInit {

  constructor(
    private HttpApiService:HttpApiService,
    @Inject(MAT_DIALOG_DATA) private testtaskDatas:any,
    @Inject(MAT_DIALOG_DATA) private projectDatas:any
  ) { }

  //url參數--------------------------------------------------

  //projectDatas裡的id 彈跳視窗沒有url 所以不能抓url的id
  p_id:any;

  //拿來接projectDatas裡的id
  p_ids:any=''

  //取得的任務名稱
  name:any;
  
  ngOnInit(): void {

    //this.task_name=this.testtaskDatas.name
    //console.log("取得的任務名稱",this.task_name)
    //console.log("p_id", this.projectDatas.p_id)//取得專案id!!!!!!!!
    this.p_ids = this.projectDatas.p_id
    this.t_id = this.testtaskDatas.t_id
    this.name = this.testtaskDatas.name
    console.log(this.t_id)
    console.log(this.name)
    this.getOneTask(this.t_id)
  }


  //雙向綁定--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  t_id:any;
  t_name: any;
  remark: any;
  last_task: any;
  user_id: any;
  date_for_estimated_start: any;
  date_for_estimated_completion: any;
  principal = false;
  landmark = false;
  file = true;

  myControl = new FormControl();
  //取得任務new_one_task資料---------------------------------------------------------------------------------------------------------------------------------------------------------------
  testtaskRequest: any;
  taskname: any[] = [];

  //叫出編輯資料
  oneTaskDatas:any;
  //取得單一任務資料
  getOneTask(t_id:string): void {
    this.HttpApiService.getOneTaskRequest_t(t_id).
      subscribe(TaskRequest => {
        this.oneTaskDatas = TaskRequest;
        console.log(this.oneTaskDatas.body)


      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }


}
