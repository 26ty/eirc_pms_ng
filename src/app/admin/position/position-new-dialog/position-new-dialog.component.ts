import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { Jobtitlement, EditJobtitlement } from './../../../admin/models/organization';
import { OrganizationService } from './../../../_services/organization.service';
import { AdminHttpApiService } from '../../admin-api/admin-http-api.service';
import { HttpApiService } from './../../../api/http-api.service';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-position-new-dialog',
  templateUrl: './position-new-dialog.component.html',
  styleUrls: ['./position-new-dialog.component.scss']
})
export class PositionNewDialogComponent implements OnInit {

  addForm: FormGroup; //編輯task
  name:any;
  bonita_role_id:any;
  creater:any;

  constructor(
    private fb: FormBuilder,
    public adminHttpApiService:AdminHttpApiService,
    private route: ActivatedRoute,
    private HttpApiService:HttpApiService,
    @Inject(MAT_DIALOG_DATA) private taskdata: any
    ) {
      this.addForm = this.fb.group({
        name: new FormControl(),
        bonita_role_id:new FormControl(),
        creater:new FormControl()
      })
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    this.addForm = new FormGroup({
      name: new FormControl(),
      bonita_role_id:new FormControl(),
      creater:new FormControl()
    })
  }
  test(): void {
    console.log(this.bonita_role_id)
  }
  addJobtitlement(){
    let addJobtitlement:any = {}

    addJobtitlement['creater'] = this.userJson.account_id
    addJobtitlement['name'] = this.name
    if(this.bonita_role_id == true){
      addJobtitlement['bonita_role_id'] = "1"
    }
    else{
      addJobtitlement['bonita_role_id'] = "2"
    }
    console.log(addJobtitlement)
    this.adminHttpApiService.uploadJobTitle(addJobtitlement).subscribe(
      res => {
        console.log("成功新增資料",res)
        //this.uploadTransactionRecordRequests()
        location.href='admin/position'
      }
    )
  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = 'fa965615-2d7d-4d74-8937-fcf7a82be49c' //部門type uuid
    trManagerDatas['actor'] = '新增'
    trManagerDatas['content'] = '職稱資料'
    trManagerDatas['creater'] = this.userJson.account_id

    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        console.log('成功新增紀錄')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
}
