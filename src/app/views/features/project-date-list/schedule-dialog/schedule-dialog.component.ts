import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpApiService } from './../../../../api/http-api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProjectManagerRequest } from './../../../../shared/models/model';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent implements OnInit {

  editInnerForm: FormGroup;
  @Input() title!: string;
  @Input() selectedItem!: ProjectManagerRequest;
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private projectdata: any
  ) {
    this.editInnerForm = this.fb.group({
      inner_id: new FormControl(),
      date_for_pay: new FormControl(),
      date_for_check: new FormControl(),
      date_for_delivery: new FormControl()
    });
  }

  p_id: any;
  inner_id: any;
  customer_name: any = '';
  date_for_pay: any;
  date_for_check: any;
  date_for_delivery: any;

  ngOnInit(): void {
    this.getProjectManagerRequsts();

    this.editInnerForm = new FormGroup({
      inner_id: new FormControl(),
      date_for_pay: new FormControl(),
      date_for_check: new FormControl(),
      date_for_delivery: new FormControl()
    });
  }

  projectManagerRequests: any;
  projectDatas: any;

  /** 
  * @brief 取得單一專案(one project)資料
  *
  * @param p_id 取得網址列支專案id 作為此函式之參數
  * @return 回傳有無成功取得專案資料. */
  getProjectManagerRequsts(): void {
    this.HttpApiService.getOneProjectListRequest(this.projectdata.p_id)
      .subscribe(projectManagerRequests => {
        this.projectDatas = projectManagerRequests.body;
        console.log(this.projectDatas)
        
        if (this.projectDatas.date_for_pay == "0001-01-01T00:00:00Z") {
          this.projectDatas.date_for_pay = ''
        }
        if (this.projectDatas.date_for_check == "0001-01-01T00:00:00Z") {
          this.projectDatas.date_for_check = ''
        }
        if (this.projectDatas.date_for_delivery == "0001-01-01T00:00:00Z") {
          this.projectDatas.date_for_delivery = ''
        }
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  newInnerDatas: any;
  /** 
  * @brief 修改單一專案(one project)資料
  *
  * @param newInnerDatas 修改專案JSON
  * @return 回傳有無成功修改專案資料. */
  updateInnerRequest(): void {
    let newInnerDatas: any = {};//接收新資料陣列
    newInnerDatas['p_id'] = this.projectDatas.p_id;

    this.date_for_pay = new Date(this.projectDatas.date_for_pay)
    this.date_for_pay.setHours(this.date_for_pay.getHours() + 8) //加八小時
    newInnerDatas['date_for_pay'] = this.date_for_pay;

    this.date_for_check = new Date(this.projectDatas.date_for_check)
    this.date_for_check.setHours(this.date_for_check.getHours() + 8) //加八小時
    newInnerDatas['date_for_check'] = this.date_for_check;

    this.date_for_delivery = new Date(this.projectDatas.date_for_delivery)
    this.date_for_delivery.setHours(this.date_for_delivery.getHours() + 8) //加八小時
    newInnerDatas['date_for_delivery'] = this.date_for_delivery;

    newInnerDatas['date_for_start'] = this.projectDatas.date_for_start;
    newInnerDatas['date_for_end'] = this.projectDatas.date_for_end;

    newInnerDatas['inner_id'] = this.projectDatas.inner_id;


    console.log("取得資料陣列=")
    console.log(newInnerDatas);
    this.HttpApiService.updateProjectRequest_t(this.projectdata.p_id, newInnerDatas)
      .subscribe(project => {

        console.log("修改project",project)
        Swal.fire(
          {
            title: `修改成功!`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) =>{
          if (result.isConfirmed) {
            window.location.assign(`main/project-date-list`);
          }
        })
      },
        (err: any) => {
          console.log('err:', err);
        }
      );

    const backUrl = `main/project-date-list`

    //location.href=backUrl;
  }
}
