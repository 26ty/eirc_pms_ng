import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department, EditDepartment } from './../../../admin/models/organization';
import { OrganizationService } from './../../../_services/organization.service';
import { AdminHttpApiService } from '../../admin-api/admin-http-api.service';
import { HttpApiService } from './../../../api/http-api.service';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

interface Account {
  account_id: string;
  name: string;
  bonita_user_id: string;
  dep_name: string;
}

interface AccountGroup {
  disabled?: boolean;
  name: string;
  account: Account[];
}

@Component({
  selector: 'app-department-edit-dialog',
  templateUrl: './department-edit-dialog.component.html',
  styleUrls: ['./department-edit-dialog.component.scss']
})

export class DepartmentEditDialogComponent implements OnInit {

  editForm: FormGroup; //編輯task


  d_id: any
  constructor(
    private fb: FormBuilder,
    public adminHttpApiService: AdminHttpApiService,
    private route: ActivatedRoute,
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private taskdata: any
  ) {
    this.editForm = this.fb.group({
      name: new FormControl(),
      eng_name: new FormControl(),
      introduction: new FormControl(),
      email: new FormControl(),
      fax: new FormControl(),
      tel: new FormControl(),
      displayName: new FormControl(),
      manager: new FormControl(),
      parent_group_id: new FormControl(),
      bonita_parent_group_id: new FormControl()
    })
  }


  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    this.d_id = this.taskdata.d_id
    console.log(this.d_id)
    this.editForm = new FormGroup({
      name: new FormControl(),
      eng_name: new FormControl(),
      introduction: new FormControl(),
      email: new FormControl(),
      fax: new FormControl(),
      tel: new FormControl(),
      //displayName:new FormControl(),
      manager: new FormControl(),
      parent_group_id: new FormControl(),
      bonita_parent_group_id: new FormControl()
    })

    //取得單一部門
    this.getOneDepartmentData()
    //取得部門資料
    this.getDepartmentList()
    //取得部門列表資料 下拉選單
    this.getDepartmentDataList()
  }

  //取得user列表-------------------------------------------------------------------------
  accountControl = new FormControl();
  accountgroup: AccountGroup[] = []
  getDepartmentList(): void {
    this.HttpApiService.getDepartmentList()
      .subscribe(departmentRequest => {
        var departmentdatas: any = departmentRequest
        for (var i in departmentdatas.body.department) {
          this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "account": [] })
        }
        this.getAccountList()
      })
  }

  getAccountList(): void {
    this.HttpApiService.getAccountList()
      .subscribe(AccountRequest => {
        var accountdatas: any = AccountRequest
        for (var i in accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(accountdatas.body.accounts[i])
            }
          }
        }
      })
    console.log(this.accountgroup)
  }

  //取得部門資料列表 下拉選單
  departmentData: any
  totalCount: any
  getDepartmentDataList() {
    this.adminHttpApiService.getDepartmentUserList().subscribe(
      res => {
        this.departmentData = res.body.department
        console.log(this.departmentData)

      }
    )
  }

  //取得單一部門
  OneDepartmentData: any
  getOneDepartmentData() {
    this.adminHttpApiService.getOneDepartment(this.d_id).subscribe(
      res => {
        this.OneDepartmentData = res
        console.log(res)
      }
    )
  }

  name: any
  eng_name: any
  introduction: any
  email: any
  fax: any
  tel: any
  //displayName:any
  manager: any
  //parent_group_id:any
  bonita_parent_group_id: any

  updateDepartment() {
    let updateDepartment: any = {}

    updateDepartment['account'] = this.userJson.account
    updateDepartment['name'] = this.OneDepartmentData.body.name
    updateDepartment['eng_name'] = this.OneDepartmentData.body.eng_name
    updateDepartment['introduction'] = this.OneDepartmentData.body.introduction
    // updateDepartment['email'] = this.email
    updateDepartment['fax'] = this.OneDepartmentData.body.fax
    updateDepartment['tel'] = this.OneDepartmentData.body.tel
    updateDepartment['bonita_parent_group_id'] = this.OneDepartmentData.body.bonita_parent_group_id
    updateDepartment['displayName'] = this.OneDepartmentData.body.name
    updateDepartment['manager'] = this.OneDepartmentData.body.manager

    console.log(updateDepartment)
    this.adminHttpApiService.updateDepartment(this.d_id, updateDepartment).subscribe(
      res => {
        console.log("成功修改資料", res)
        this.uploadTransactionRecordRequests()
        location.href = 'admin/department'

      }
    )
  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = 'fa965615-2d7d-4d74-8937-fcf7a82be49c' //部門type uuid
    trManagerDatas['actor'] = '編輯'
    trManagerDatas['content'] = '部門資料'
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
  /*
    "account":"james", //帳號(必填)
    "manager": "00000000-0000-0000-0000-000000000000", //(必填)
    "name": "test",//(必填)
    "eng_name":"",
    "introduction":"",
    "fax":"",
    "tel":"",
    "displayName":"", //bonita顯示的部門名稱
    "parent_group_id":"" //bonita父部門ID
  */
}
