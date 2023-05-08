import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/api/http-api.service';
import { AdminHttpApiService } from '../../admin-api/admin-http-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  selector: 'app-user-new-dialog',
  templateUrl: './user-new-dialog.component.html',
  styleUrls: ['./user-new-dialog.component.scss']
})
export class UserNewDialogComponent implements OnInit {

  addForm: FormGroup;
  myControl = new FormControl();
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private AdminApiService: AdminHttpApiService
  ) { 
    this.addForm = this.fb.group({
      account:new FormControl(),
      name:new FormControl(),
      password:new FormControl(),
      dep:new FormControl(),
      phone:new FormControl(),
      email:new FormControl(),
      bonita_manager_id:new FormControl(),
      jobtitle_id:new FormControl()
    })
  }

  userJson: any
  tokenJson:any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    const tokenstring = window.localStorage.getItem(TOKEN_KEY) //取得session values(使用者資訊)
    //this.tokenJson = JSON.parse(String(tokenstring)) //取得session將其轉為Json格式
    this.tokenJson = tokenstring
    console.log(tokenstring)
    
    this.getDepartmentDataList()
    this.getUserDataList()
    this.getJobTitleDataList()

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
          this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "account": []})
        }
        this.getAccountList()
      })
  }

  accountdatas:any

  creater_name:any
  creater_dep:any
  getAccountList(): void {
    this.HttpApiService.getAccountList()
      .subscribe(AccountRequest => {
        console.log(AccountRequest)
        this.accountdatas= AccountRequest
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
        console.log(this.creater_name,this.creater_dep)
        console.log(this.accountgroup)
      })
  }

  // POST新增人員 雙向綁定
  account:any
  name:any
  password:any
  dep:any
  phone:any
  email:any
  bonita_manager_id:any
  // res
  addUserRes:any
  addUserRequest():void {
    let addUserDatas:any = {}
    addUserDatas['account'] = this.account
    addUserDatas['name'] = this.name
    addUserDatas['password'] = this.password
    addUserDatas['dep'] = this.dep
    addUserDatas['phone'] = this.phone
    addUserDatas['email'] = this.email
    addUserDatas['bonita_manager_id'] = this.bonita_manager_id
    console.log("新增人員JSON",addUserDatas)
    this.AdminApiService.uploadUser(this.userJson.account,addUserDatas,this.tokenJson).subscribe(
      res => {
        this.addUserRes = res
        console.log("POST新增人員 res",this.addUserRes)
        this.addPersonnelAffiliationRequest(this.addUserRes.body)
      }
    )
    
  }

  // POST新增人員隸屬 雙向綁定
  user_id:any
  department_id:any
  jobtitle_id:any
  bonita_role_id:any
  bonita_group_id:any
  bonita_user_id:any
  creater:any
  //res
  addPerAffRes:any
  test:any
  addPersonnelAffiliationRequest(userId:any):void{
    let addPerAffDatas:any = {}

    this.AdminApiService.getUser().subscribe(
      res => {
        this.test = res.body.accounts
        console.log("user資料",this.test)
        for(let i in this.test){
          if(userId == this.test[i].account_id){
            addPerAffDatas['bonita_user_id'] = this.test[i].bonita_user_id//要新增的人bonita_user_id
          }
        }
        addPerAffDatas['user_id'] = userId //取得新增user的res.body
        // addPerAffDatas['bonita_user_id'] = '140'
        // console.log("user資料",this.usersData[0].account_id)
        addPerAffDatas['department_id'] = this.dep
        // addPerAffDatas['bonita_group_id'] = this.bonita_group_id//部門
        for(let i in this.departmentData){
          if(this.dep == this.departmentData[i].d_id){
            addPerAffDatas['bonita_group_id'] = this.departmentData[i].bonita_group_id//部門
          }
        }
        console.log("部門資料",this.departmentData[0].manager_name)
        addPerAffDatas['jobtitle_id'] = this.jobtitle_id
        // addPerAffDatas['bonita_role_id'] = this.bonita_role_id //職稱
        for(let i in this.jobTitleData){
          if(this.jobtitle_id == this.jobTitleData[i].j_id){
            addPerAffDatas['bonita_role_id'] = this.jobTitleData[i]. bonita_role_id//職稱
          }
        }
        console.log("職稱資料",this.jobTitleData)
        console.log(JSON.stringify(addPerAffDatas))
        addPerAffDatas['creater'] = this.userJson.account_id
        console.log("新增人員隸屬JSON",addPerAffDatas)

        this.AdminApiService.uploadPersonnelAffiliation(this.userJson.account,addPerAffDatas).subscribe(
          res => {
            this.addPerAffRes = res
            console.log("POST新增人員隸屬 res",this.addPerAffRes)
            if(this.addPerAffRes.code == 200 ){
              Swal.fire(
                {
                  title: `新增成功!`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.assign(`admin/user`);
                }
              })
            }else{
              Swal.fire(
                {
                  title: `新增失敗!`,
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
    )
    
    
    
  }

  testperson(userId:any):void{
    let addPerAffDatas:any = {}

    this.AdminApiService.getUser().subscribe(
      res => {
        this.test = res.body.accounts
        console.log("user資料",this.test)
        for(let i in this.test){
          if(userId == this.test[i].account_id){
            addPerAffDatas['bonita_user_id'] = this.test[i].bonita_user_id//要新增的人bonita_user_id
          }
        }
      }
    )
    
    addPerAffDatas['user_id'] = userId //取得新增user的res.body
    // addPerAffDatas['bonita_user_id'] = '140'
    // console.log("user資料",this.usersData[0].account_id)
    addPerAffDatas['department_id'] = this.dep
    // addPerAffDatas['bonita_group_id'] = this.bonita_group_id//部門
    for(let i in this.departmentData){
      if(this.dep == this.departmentData[i].d_id){
        addPerAffDatas['bonita_group_id'] = this.departmentData[i].bonita_group_id//部門
      }
    }
    console.log("部門資料",this.departmentData[0].manager_name)
    addPerAffDatas['jobtitle_id'] = this.jobtitle_id
    // addPerAffDatas['bonita_role_id'] = this.bonita_role_id //職稱
    for(let i in this.jobTitleData){
      if(this.jobtitle_id == this.jobTitleData[i].j_id){
        addPerAffDatas['bonita_role_id'] = this.jobTitleData[i]. bonita_role_id//職稱
      }
    }
    console.log("職稱資料",this.jobTitleData)
    console.log(JSON.stringify(addPerAffDatas))
    addPerAffDatas['creater'] = this.userJson.account_id
    console.log("新增人員隸屬JSON",addPerAffDatas)
    this.AdminApiService.uploadPersonnelAffiliation(this.userJson.account,addPerAffDatas).subscribe(
      res => {
        this.addPerAffRes = res
        console.log("POST新增人員隸屬 res",this.addPerAffRes)
        // Swal.fire(
        //   {
        //     title: `新增成功!`,
        //     icon: 'success',
        //     confirmButtonText: '確認!',
        //     confirmButtonColor: '#64c270',
        //   }
        // ).then((result) => {
        //   if (result.isConfirmed) {
        //     window.location.assign(`admin/user`);
        //   }
        // })
      }
    )
  }
  /*
  POST新增人員JSON格式
  {
    "account":"test", //帳號(必填，且不可更改也不可重複)
    "name": "test",   //名字(必填)
    "password":"12345", //密碼(必填)
    "dep": "cc4ce299-d063-4a94-94fa-7d046504388c", //隸屬部門(必填，但以後會刪除，可給00000000-0000-0000-0000-000000000000)
    "phone": "123", //電話(選填)
    "email": "123", //email(選填)
    "bonita_manager_id": "" //直屬主管，給bonita_user_id(選填)
  }
  POST新增人員隸屬JSON格式
  {
    "user_id":"d0ad270d-0744-41eb-b4f7-461000f395d1", //account_id
    "department_id": "cc4ce299-d063-4a94-94fa-7d046504388c", //(不可給00000000-0000-0000-0000-000000000000)
    "jobtitle_id":"00f8beb5-9f93-46ca-8324-49a9f01c41ea", //(不可給00000000-0000-0000-0000-000000000000)
    "bonita_role_id":"1",   //從要新增的職稱來bonita_role_id
    "bonita_group_id":"68", //從要新增的部門來bonita_group_id
    "bonita_user_id":"134", //從要新增的人員來bonita_user_id
    "creater": "cc4ce299-d063-4a94-94fa-7d046504388c"
  }
  */
  // 取得user資料
  usersData:any
  getUserDataList(){
    this.AdminApiService.getUser(1).subscribe(
      res => {
        this.usersData = res.body.accounts
        console.log("user資料",this.usersData)
      }
    )
  }
  // 取得部門資料
  departmentData:any
  getDepartmentDataList(){
    this.AdminApiService.getDepartmentUserList().subscribe(
      res => {
        this.departmentData = res.body.department
        console.log("部門資料",this.departmentData)
      }
    )
  }

  // 取得職稱資料
  jobTitleData:any
  getJobTitleDataList(){
    this.AdminApiService.getJobTitle(1).subscribe(
      res => {
        this.jobTitleData = res.body.jobtitle
        console.log("職稱資料",this.jobTitleData)
      }
    )
  }
}
