import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpApiService } from './../../../../../api/http-api.service';

export interface PeriodicElement1 {
  name: string;
  date_for_estimated_start: string;
  date_for_estimated_completion: string;
  date_for_actual_completion: string;
  principal: string;
  file: boolean;
  labor_hour: number;
  remark: string;
  action_edit: string;
  action_detail: string;
}

const ELEMENT_DATA_1: PeriodicElement1[] = [
  { name: '機台產銷會議', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台內部訂單', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台-BOM[光學]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台-BOM[機械]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台-發包圖面[機械]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台-BOM[電控]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台發包[請購]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台發包[採購]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台組裝前會議', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台入料完成(含選配)', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '光學校正完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '軟體(Vision)完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '軟體(Motion)完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台組立完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台試機完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台入庫(含選配)', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台出機', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '機台裝機', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
  { name: '正式BOM產出', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', labor_hour: 0, file: false, remark: '', action_edit: '', action_detail: '' },
];

/*假資料假TABLE*/
export interface caseDetailElement {
  workTime: string;
  description: string;
  creatTime: string;
}

const ELEMENT_DATA: caseDetailElement[] = [
  { description: '	BP5100電氣圖面修改', workTime: '6', creatTime: '2021-07-18' },
  { description: '	BP5100電氣圖面修改', workTime: '21', creatTime: '2021-07-20' },
  { description: '	BP5100資料整理', workTime: '15', creatTime: '2021-07-22' },
  { description: '	BP5100資料整理', workTime: '10', creatTime: '2021-07-30' },
];

@Component({
  selector: 'app-worktime-dialog',
  templateUrl: './worktime-dialog.component.html',
  styleUrls: ['./worktime-dialog.component.scss']
})
export class WorktimeDialogComponent implements OnInit {

  displayedColumn: string[] = ['creatTime', 'workTime', 'description'];
  datasSource = ELEMENT_DATA;

  constructor(
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private testtaskDatas: any,
    @Inject(MAT_DIALOG_DATA) private projectDatas: any
  ) { }

  //編輯頁面id
  p_id: any;
  p_ids: any = ''
  task_name: any;
  ngOnInit(): void {

    this.task_name = this.testtaskDatas.name
    //console.log("p_id", this.projectDatas.p_id)//取得專案id!!!!!!!!
    this.p_ids = this.projectDatas.p_id

    this.getEditProject();
  }

  //p_id:any = '';
  task_id: any = '';
  //projectDatas: any;
  //取得該id之project資料---------------------------------------
  getEditProject(): void {

    //取得id
    //this.p_id = this.route.snapshot.paramMap.get('p_id');
    this.HttpApiService.getOneProjectRequest(this.p_ids).
      subscribe(project => {
        this.projectDatas = project;
        //console.log("task_id",this.projectDatas.message.task_id)
        this.getOneTestTask(this.projectDatas.message.task_id)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  //雙向綁定--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  t_id: any;
  name = ''//任務名稱
  date_for_estimated_start = ''//預計起始日
  date_for_estimated_completion = ''//預計完成日
  date_for_actual_completion = ''//實際完成日
  principal: any[] = []//負責人
  labor_hour = 0;//工時
  //appendix_principal = ''//附件負責人XX
  remark = ''//任務描述

  //取得任務new_one_task資料---------------------------------------------------------------------------------------------------------------------------------------------------------------
  testtaskRequest: any;
  taskname: any[] = [];

  //叫出編輯資料
  editTaskDatas: any;
  editTaskDatasIndex: any;
  //取得單一任務資料
  getOneTestTask(t_id: string): void {
    this.HttpApiService.getOneTestTaskRequest(t_id).
      subscribe(testtask => {
        this.testtaskDatas = testtask;
        // console.log("testtaskDatas.message.detail",this.testtaskDatas.message.detail)
        // console.log("message t_id",this.testtaskDatas.message.t_id)
        //console.log("testtaskDatas.message.detail",this.testtaskDatas.message)

        for (var a in this.testtaskDatas.message.detail) {
          this.taskname.push(a)
        }
        // console.log(this.taskname)//任務名稱

        //資料排序 用ELEMENT_DATA_1包資料
        for (var i in this.taskname) {
          for (var j in this.taskname) {
            if (ELEMENT_DATA_1[i].name == this.taskname[j]) {
              ELEMENT_DATA_1[i].date_for_estimated_start = this.testtaskDatas.message.detail[this.taskname[j]].date_for_estimated_start
              ELEMENT_DATA_1[i].date_for_estimated_completion = this.testtaskDatas.message.detail[this.taskname[j]].date_for_estimated_completion
              ELEMENT_DATA_1[i].date_for_actual_completion = this.testtaskDatas.message.detail[this.taskname[j]].date_for_actual_completion
              ELEMENT_DATA_1[i].principal = this.testtaskDatas.message.detail[this.taskname[j]].principal
              ELEMENT_DATA_1[i].labor_hour = this.testtaskDatas.message.detail[this.taskname[j]].labor_hour
              //ELEMENT_DATA_1[i].appendix_principal = this.testtaskDatas.message.detail[this.taskname[j]].appendix_principal
              ELEMENT_DATA_1[i].remark = this.testtaskDatas.message.detail[this.taskname[j]].remark
            }
          }
        }

        this.editTaskDatas = ELEMENT_DATA_1;
        //console.log(this.editTaskDatas)
        // console.log("包element陣列", this.editTaskDatas)
        // console.log("包element陣列0",this.editTaskDatas[0])
        // console.log("包element陣列0的name",this.editTaskDatas[0].remark)
        // console.log(this.task_name)//抓到的name---->從init拿

        //用取得的名字取得該所引值index 到前端去對比顯示該筆任務
        for (var i in this.taskname) {
          if (this.task_name == this.editTaskDatas[i].name) {
            this.editTaskDatasIndex = i
            //console.log(this.editTaskDatasIndex)
          }
        }
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

}
