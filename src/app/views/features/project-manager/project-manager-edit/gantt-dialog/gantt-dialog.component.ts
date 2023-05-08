import { HttpApiService } from 'src/app/api/http-api.service';
import { Component, Input, OnInit, Inject,HostBinding } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {
//   GanttBarClickEvent,
//   GanttViewType,
//   GanttDragEvent,
//   GanttLineClickEvent,
//   GanttLinkDragEvent,
//   GanttItem,
//   GanttPrintService,
//   NgxGanttComponent,
//   GanttSelectedEvent
// } from 'ngx-gantt';
// import { of } from 'rxjs';
// import { delay, startWith } from 'rxjs/operators';
// import { ThyNotifyService } from 'ngx-tethys/notify';


export interface GanttItem{
  hierarchy?:any,
  last_task?:any,
  id:string,
  title:string,
  start:any,
  end:any,
  children?:GanttItem[]
}

@Component({
  selector: 'app-gantt-dialog',
  templateUrl: './gantt-dialog.component.html',
  styleUrls: ['./gantt-dialog.component.scss']
})
export class GanttDialogComponent implements OnInit {

  // groups: GanttGroup[] = [
  //   { id: '000000', title: 'Group-0' },
  //   { id: '000001', title: 'Group-1' }
  // ];
  // items: GanttItem[] = [
  //   { id: '000000', title: 'Task 0', start: 1627729997, end: 1628421197, group_id: '000000' },
  //   { id: '000001', title: 'Task 1', start: 1617361997, end: 1625483597, group_id: '000001' }
  // ];

 

  
  constructor(
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private dopostdata: any
  ) { }

  ngOnInit(): void {
    console.log("items",this.items)
    
    console.log("items",JSON.stringify(this.items, null, '\t'))

    this.getTaskRequsts()
    console.log("sortdatas",this.sortdatas)
  }

  //取得任務all task資料--------------------------------------
  //請求task參數
  testtaskRequest: any;
  testtaskDatas: any;
  totaltask: any;
  getTaskRequsts(): void {
    this.HttpApiService.getTaskListUserRequest(this.dopostdata.p_id)
      .subscribe(testtaskRequest => {
        console.log(testtaskRequest)
        this.sortTask(testtaskRequest)
        this.testtaskDatas = testtaskRequest.body.task
        this.totaltask = testtaskRequest.body.total
        //console.log(this.sortdatas)
        console.log("testtaskDatas有人名的任務列表", this.testtaskDatas)
      });
  }

  //排序task資料--------------------------------------
  items: GanttItem[] = [];
  taskDatas: any[] = [];
  // sortdatas: GanttItem[] = []// {}
  sortdatas:GanttItem[] = [];
  // sortdatas: any = {}
  // temporary:GanttItem[] = [];
  temporary:any = [];
  stringSortDatas: any
  sortTask(taskDatas: any): void {
    var taskdatas: any = taskDatas
    console.log(taskDatas)
    var hierarchy: number = 0
    for (var i = taskdatas.body.task.length - 1; i >= 0; i--) {
      if (taskdatas.body.task[i].hierarchy >= hierarchy) {
        hierarchy = Number(taskdatas.body.task[i].hierarchy)
      }
      var re = /-/gi;
      var ans = taskdatas.body.task[i].date_for_estimated_start.replace(re,'/')
      console.log(ans)
      this.temporary.push(
        {
            "hierarchy": taskdatas.body.task[i].hierarchy,
            "last_task": taskdatas.body.task[i].last_task,
            // "code": taskdatas.body.task[i].code,
            "id": taskdatas.body.task[i].t_id,
            "title": taskdatas.body.task[i].t_name,
            // "name": taskdatas.body.task[i].name,
            "start": Date.parse(taskdatas.body.task[i].date_for_estimated_start),
            "end": Date.parse(taskdatas.body.task[i].date_for_estimated_completion),
            // "date_for_actual_completion": taskdatas.body.task[i].date_for_actual_completion.split("T")[0].replace(re,'/'),
            // "status": taskdatas.body.task[i].status,
            // "remark": taskdatas.body.task[i].remark,
            
            
            "children": []
          // "data": {
            
          // },
          // ,
        }
      )
    }
    for (var i = hierarchy; i > 0; i--) {
      for (var j = this.temporary.length - 1; j >= 0; j--) {
        if (this.temporary[j].hierarchy == i) {
          for (var x = 0; x < this.temporary.length; x++) {
            if (this.temporary[j].last_task == this.temporary[x].id) {
              this.temporary[x].children.push(
                this.temporary[j]
              )
            }
          }
        }
      }
    }
    console.log("temporary",this.temporary)
    for (var i: number = 0; i < this.temporary.length; i++) {
      if (this.temporary[i].hierarchy == 1) {
        this.sortdatas.push(
          this.temporary[i]
        )
      }
    }

    console.log("temporary",this.temporary)
    console.log("temporary",JSON.stringify(this.temporary, null, '\t'))
    this.items=[
      { hierarchy:1,last_task:"00000000-0000-0000-0000-000000000000",id: '3144927c-83a8-41e2-9718-d0ce6666bb0e', title: '專案負責', start: 1657670400000, end: 1661904000000, children: []},
      { hierarchy:1,last_task:"00000000-0000-0000-0000-000000000000",id: '3144927c-83a8-41e2-9719-d0ce6666bb0e', title: '客服負責', start: 1658620800000, end: 1659916800000, children: []},
      { hierarchy:1,last_task:"00000000-0000-0000-0000-000000000000",id: '3144927c-83a8-41e2-9710-d0ce6666bb0e', title: '業務負責', start: 1658102400000, end: 1659225600000, children: [
        { hierarchy:1,last_task:"00000000-0000-0000-0000-000000000000",id: '3144927c-83a8-41e2-9710-d0ce6666bb0e', title: '業務子任務1', start: 1659139200000, end: 1660608000000, children: []}
      ]}
    ]

    this.items = this.sortdatas
    
    console.log("item",this.items)
    console.log("sortdatas",this.sortdatas)
    console.log("items型別",typeof(this.items))
    console.log("sortdatas型別",typeof(this.sortdatas))
    console.log("items",JSON.stringify(this.items, null, '\t'))
    console.log("sortdatas",JSON.stringify(this.sortdatas, null, '\t'))
    this.stringSortDatas = JSON.stringify(this.sortdatas, null, '\t')

  

  }

}
