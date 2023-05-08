import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department, EditDepartment } from './../../../admin/models/organization';
import { OrganizationService } from './../../../_services/organization.service';
import { AdminHttpApiService } from '../../admin-api/admin-http-api.service';
import { HttpApiService } from './../../../api/http-api.service';
import Swal from 'sweetalert2'

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
  selector: 'app-department-new-dialog',
  templateUrl: './department-new-dialog.component.html',
  styleUrls: ['./department-new-dialog.component.scss']
})
export class DepartmentNewDialogComponent implements OnInit {

  addForm: FormGroup; //編輯task


  constructor(
    private fb: FormBuilder,
    public adminHttpApiService: AdminHttpApiService,
    private route: ActivatedRoute,
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private taskdata: any
  ) {
    this.addForm = this.fb.group({
      name: new FormControl(),
      eng_name: new FormControl(),
      introduction: new FormControl(),
      email: new FormControl(),
      fax: new FormControl(),
      tel: new FormControl(),
      displayName: new FormControl(),
      manager: new FormControl(),
      bonita_parent_group_id: new FormControl(),
      //bonita_parent_group_id:new FormControl()
    })
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    this.addForm = new FormGroup({
      name: new FormControl(),
      eng_name: new FormControl(),
      introduction: new FormControl(),
      email: new FormControl(),
      fax: new FormControl(),
      tel: new FormControl(),
      //displayName:new FormControl(),
      manager: new FormControl(),
      bonita_parent_group_id: new FormControl(),
      //bonita_parent_group_id:new FormControl()
    })

    //取得部門資料
    this.getDepartmentList()
    //取得部門列表資料
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

  //取得部門資料列表
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

  name: any
  eng_name: any
  introduction: any
  email: any
  fax: any
  tel: any
  //displayName:any
  manager: any
  bonita_parent_group_id: any
  // bonita_parent_group_id:any
  addDepartment() {
    let addDepartment: any = {}

    addDepartment['account'] = this.userJson.account
    addDepartment['name'] = this.name
    addDepartment['eng_name'] = this.eng_name
    addDepartment['introduction'] = this.introduction
    // addDepartment['email'] = this.email
    addDepartment['fax'] = this.fax
    addDepartment['tel'] = this.tel
    addDepartment['bonita_parent_group_id'] = this.bonita_parent_group_id
    addDepartment['displayName'] = this.name
    addDepartment['manager'] = this.manager

    console.log(addDepartment)
    this.adminHttpApiService.uploadDepartment(addDepartment).subscribe(
      res => {
        console.log("成功新增資料", res)

        if (res.code == 200) {
          this.uploadTransactionRecordRequests()

          Swal.fire(
            {
              title: `新增成功!`,
              icon: 'success',
              confirmButtonText: '確認!',
              confirmButtonColor: '#64c270',
            }
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.assign(`admin/department`);
            }
          })
        } else {
          Swal.fire(
            {
              title: `新增失敗!`,
              icon: 'error',
              confirmButtonText: '確認!',
              confirmButtonColor: '#FF5151',
            }
          )
        }

      }
    )
  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = 'fa965615-2d7d-4d74-8937-fcf7a82be49c' //部門type uuid
    trManagerDatas['actor'] = '新增'
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

}
