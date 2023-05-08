import { Component, OnInit } from '@angular/core';

//延伸範本
export interface PeriodicElement {
  task_code: string;
  task_name: string;
  pre_date: string;
  milestone: string;
  content: string;
  appendix: string;
  edit_btn: string;
  delete_btn: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {task_code: 'P0001-1',task_name: '專案規格流程確認',pre_date: '2.0',milestone: '',content: '',appendix: '', edit_btn: '', delete_btn:''},
  {task_code: 'P0002',task_name: '專案規格流程',pre_date: '4.0',milestone: '',content: '',appendix: '', edit_btn: '', delete_btn:''},
];

@Component({
  selector: 'app-project-task-template-add',
  templateUrl: './project-task-template-add.component.html',
  styleUrls: ['./project-task-template-add.component.scss']
})
export class ProjectTaskTemplateAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cancelAdd() {
    window.location.assign('main/projectinfo/project-task-template');
  }

  //延伸範本
  displayedColumns: string[] = ['task_code', 'task_name', 'pre_date', 'milestone', 'content', 'appendix', 'edit_btn', 'delete_btn'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

}
