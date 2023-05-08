import { AdminHttpApiService } from './../../admin-api/admin-http-api.service';
import { HttpApiService } from './../../../api/http-api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//swal
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
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  editForm: FormGroup;
  myControl = new FormControl();
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private AdminApiService: AdminHttpApiService,
    @Inject(MAT_DIALOG_DATA) private userdata: any
  ) {
    this.editForm = this.fb.group({
      account: new FormControl(),
      name: new FormControl(),
      password: new FormControl(),
      dep: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      bonita_manager_id: new FormControl(),
      jobtitle_id: new FormControl()
    })
  }

  userJson: any
  tokenJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    const tokenstring = window.localStorage.getItem(TOKEN_KEY) //取得session values(使用者資訊)
    //this.tokenJson = JSON.parse(String(tokenstring)) //取得session將其轉為Json格式
    this.tokenJson = tokenstring
    console.log(tokenstring)

    console.log(this.userdata.user_id, this.userdata.bonita_user_id) //單筆user_id

    this.getDepartmentDataList()
    this.getJobTitleDataList()

    //取得單一使用者資料
    this.getOneUserRequest()
    //取得單一使用者職稱資料
    this.getOnePARequest()
    //取得部門資料
    this.getDepartmentList()
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

  accountdatas: any

  creater_name: any
  creater_dep: any
  getAccountList(): void {
    this.HttpApiService.getAccountList()
      .subscribe(AccountRequest => {
        console.log(AccountRequest)
        this.accountdatas = AccountRequest
        console.log(this.accountdatas.body.accounts)
        for (var i in this.accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == this.accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(this.accountdatas.body.accounts[i])
            }
          }
        }

        for (let i in this.accountdatas.body.accounts) {
          if (this.userJson.account_id == this.accountdatas.body.accounts[i].account_id) {
            this.creater_name = this.accountdatas.body.accounts[i].name
            this.creater_dep = this.accountdatas.body.accounts[i].dep_name
          }
        }
        console.log(this.creater_name, this.creater_dep)
        console.log(this.accountgroup)
      })
  }

  oneUserData: any
  userData: any
  getOneUserRequest() {
    this.AdminApiService.getOneUser(this.userdata.user_id).subscribe(
      res => {
        this.oneUserData = res
        console.log("單一使用者資料", this.oneUserData.body)
        this.userData = this.oneUserData.body
      }
    )

  }


  onePAData: any
  paId: any
  getOnePARequest() {
    this.AdminApiService.getOneUserPA(this.userdata.user_id).subscribe(
      res => {
        this.onePAData = res
        console.log("單一使用者+職稱 資料", this.onePAData)
        console.log(this.onePAData.body[0].jobtitle_id)
        this.paId = this.onePAData.body[0].pa_id
      }
    )
  }
  // Patch人員 雙向綁定
  account: any
  name: any
  password: any
  dep: any
  phone: any
  email: any
  bonita_manager_id: any
  updateRequest: any
  updateUserRequest() {
    let updateUserDatas: any = {}
    updateUserDatas['account'] = this.userData.account
    updateUserDatas['name'] = this.userData.name
    updateUserDatas['dep'] = this.onePAData.body[0].department_id
    updateUserDatas['phone'] = this.userData.phone
    updateUserDatas['email'] = this.userData.email
    updateUserDatas['status'] = true
    updateUserDatas['bonita_manager_id'] = this.userData.bonita_manager_id
    console.log("修改人員資料", updateUserDatas)
    this.AdminApiService.updateUser(this.userdata.user_id, this.userJson.account, updateUserDatas).subscribe(
      res => {
        this.updateRequest = res
        console.log("修改user res", this.updateRequest)
        this.updatePersonnelAffiliationRequest(this.paId, this.userJson.account)
        // if(this.updateRequest.code == 200 ){
        //   Swal.fire(
        //     {
        //       title: `修改成功!`,
        //       icon: 'success',
        //       confirmButtonText: '確認!',
        //       confirmButtonColor: '#64c270',
        //     }
        //   ).then((result) => {
        //     if (result.isConfirmed) {
        //       window.location.assign(`admin/user`);
        //     }
        //   })
        // }else{
        //   Swal.fire(
        //     {
        //       title: `修改失敗!`,
        //       icon: 'error',
        //       confirmButtonText: '確認!',
        //       confirmButtonColor: '#FF5151',
        //     }
        //   ).then((result) => {
        //     if (result.isConfirmed) {
        //       window.location.assign(`admin/user`);
        //     }
        //   })
        // }
      }
    )
  }
  // Patch人員隸屬 雙向綁定
  user_id: any
  department_id: any
  jobtitle_id: any
  bonita_role_id: any
  bonita_group_id: any
  bonita_user_id: any
  creater: any

  updatePerAffRes: any
  updatePersonnelAffiliationRequest(paId: any, account: any): void {
    let updatePADatas: any = {}
    updatePADatas['user_id'] = this.userdata.user_id
    updatePADatas['department_id'] = this.onePAData.body[0].department_id
    updatePADatas['jobtitle_id'] = this.onePAData.body[0].jobtitle_id
    // updatePADatas['bonita_role_id'] = 
    //updatePADatas['bonita_group_id'] = 
    updatePADatas['bonita_user_id'] = this.userdata.bonita_user_id
    updatePADatas['creater'] = this.userJson.account_id
    for (let i in this.jobTitleData) {
      if (this.jobtitle_id == this.jobTitleData[i].j_id) {
        updatePADatas['bonita_role_id'] = this.jobTitleData[i].bonita_role_id//職稱
      }
    }

    for (let i in this.departmentData) {
      if (this.dep == this.departmentData[i].d_id) {
        updatePADatas['bonita_group_id'] = this.departmentData[i].bonita_group_id//部門
      }
    }

    console.log("PATCH編輯人員隸屬Body", updatePADatas)
    this.AdminApiService.updatePersonnelAffiliation(paId, account, updatePADatas).subscribe(
      res => {
        this.updatePerAffRes = res
        console.log("PATCH編輯人員隸屬 res", this.updatePerAffRes)
        if (this.updatePerAffRes.code == 200) {
          Swal.fire(
            {
              title: `編輯成功!`,
              icon: 'success',
              confirmButtonText: '確認!',
              confirmButtonColor: '#64c270',
            }
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.assign(`admin/user`);
            }
          })
        } else {
          Swal.fire(
            {
              title: `編輯失敗!`,
              icon: 'error',
              confirmButtonText: '確認!',
              confirmButtonColor: '#FF5151',
            }
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.assign(`admin/user`);
            }
          })
        }
      }
    )
  }

  // 取得部門資料
  departmentData: any
  getDepartmentDataList() {
    this.AdminApiService.getDepartmentUserList().subscribe(
      res => {
        this.departmentData = res.body.department
        console.log("部門資料", this.departmentData)
      }
    )
  }

  // 取得職稱資料
  jobTitleData: any
  getJobTitleDataList() {
    this.AdminApiService.getJobTitle(1).subscribe(
      res => {
        this.jobTitleData = res.body.jobtitle
        console.log("職稱資料", this.jobTitleData)
      }
    )
  }
}
