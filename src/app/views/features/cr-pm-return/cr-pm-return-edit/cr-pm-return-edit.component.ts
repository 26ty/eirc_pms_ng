import { Component, OnInit } from '@angular/core';
import { HttpApiService } from './../../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FileUploadDialogComponent } from './../../task-return/task-return-edit/file-upload-dialog/file-upload-dialog.component';
@Component({
  selector: 'app-cr-pm-return-edit',
  templateUrl: './cr-pm-return-edit.component.html',
  styleUrls: ['./cr-pm-return-edit.component.scss']
})
export class CrPmReturnEditComponent implements OnInit {

  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  c_id: any = '';
  code: any = '';
  name: any = '';
  customer_id: any = '';
  subject: any = '';
  remark: any = '';
  create_time: any = '';
  date_for_expected: any = '';
  ngOnInit(): void {
    //取得該id資料
    this.getOneProject();
  }

  projectDatas: any;
  //取得該id之project資料---------------------------------------
  getOneProject(): void {
    //取得id
    this.c_id = this.route.snapshot.paramMap.get('c_id');
    //print id
    //console.log(this.p_id);
    //server getOne
    this.HttpApiService.getOneCustomerRequest(this.c_id).
      subscribe(project => {
        this.projectDatas = project;
        console.log("取得的id=")
        console.log(this.projectDatas.message.c_id)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  updateProject(status: any): void {
    let projectManagerDatas: any = {};
    projectManagerDatas['c_id'] = this.projectDatas.message.c_id;//對照p_id
    projectManagerDatas['code'] = this.projectDatas.message.code;
    projectManagerDatas['customer_id'] = this.projectDatas.message.customer_id;
    projectManagerDatas['subject'] = this.projectDatas.message.subject;
    projectManagerDatas['remark'] = this.projectDatas.message.remark;
    projectManagerDatas['create_time'] = this.projectDatas.message.create_time;
    projectManagerDatas['date_for_expected'] = this.projectDatas.message.date_for_expected;
    console.log("新資料")
    console.log(projectManagerDatas);
    this.HttpApiService.updateProjectRequest(projectManagerDatas).
      subscribe(project => {
        location.href = '/main/projectinfo/project-manager'
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  //離開修改頁面
  // 選擇單項
  cancelItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.history.back();
  }

}
