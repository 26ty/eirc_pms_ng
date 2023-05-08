import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpApiService } from './../../../../../api/http-api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

export const MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {


  authForm: FormGroup;

  @Input() title!: string;

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private MDatas: any,
    private httpApiService: HttpApiService,
  ) {
    this.authForm = this.fb.group({

    });
  }

  ngOnInit(): void {
    this.m_id = this.MDatas.m_id

    //取得部門資料
    this.getDepartmentList()
    //取得製令成員資料
    this.getSelectedUserList()

  }

  m_id: any


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
  }


  selected_id = '';
  accountListDatas: any
  num = 0;
  selectedList: any[] = [];

  //取得副本人員
  getSelectedUserList() {
    this.selectedList = []

    this.HttpApiService.getProjectInfoManufactureUser(this.m_id).subscribe(Request => {
      console.log(Request)

      for (let i in Request.body.ManufactureAccount) {
        // console.log(this.accountListDatas[i].name)
        this.selectedList.push({
          mu_id: Request.body.ManufactureAccount[i].mu_id,
          account_id: Request.body.ManufactureAccount[i].user_id,
          name: Request.body.ManufactureAccount[i].name,
          dep: Request.body.ManufactureAccount[i].Deps[0].department_name
        })
        this.num++;
        console.log(this.selectedList)
      }
      console.log(this.selectedList)


    })

  }


  //新增人員
  addSelectedUserList() {

    this.HttpApiService.getAccountList().subscribe(res => {
      this.accountListDatas = res.body.accounts
      for (let i in this.accountListDatas) {
        if (this.selected_id == this.accountListDatas[i].account_id) {
          let uploadData: any = {};//接收資料
          uploadData['manufacture_id'] = this.m_id
          uploadData['user_id'] = this.selected_id

          this.httpApiService.uploadProjectInfoManufactureUser(uploadData).subscribe(Request => {
            console.log(Request)
            if (Request.code == 200) {
              //取得製令成員資料
              this.getSelectedUserList()
            }


          })
          break;

          // console.log(this.accountListDatas[i].name)
          // this.selectedList.push({
          //   account_id: this.selected_id,
          //   name: this.accountListDatas[i].name,
          //   dep: this.accountListDatas[i].dep_name
          // })
          // this.num++;
          // console.log(this.selectedList)


        }
      }




    })

  }

  //刪除人員
  deleteSelectedUserList(data: any) {
    //console.log(this.taskUserNameDatas)
    // for (var i = this.selectedList.length - 1; i >= 0; i--) {
    //   if (data == i) {
    //     //console.log(i)//2,1,0
    //     this.selectedList.splice(i, 1)
    //     this.num--
    //   }
    //   //console.log(i)//2,1,0
    //   //this.selectUserNameList
    // }

    this.httpApiService.deleteProjectInfoManufactureUser(this.selectedList[data].mu_id).subscribe(Request => {
      console.log(Request)
      if (Request.code == 200) {
        //取得製令成員資料
        this.getSelectedUserList()
      }

    })

    console.log(this.selectedList)//名字陣列
  }

  resetSelectValues() {
    this.selectedList = []
    this.num = 0;
    console.log(this.selectedList)
  }

  save() {

    // for (var i in this.selectedList) {
    //   let uploadData: any = {};//接收資料
    //   uploadData['manufacture_id'] = this.m_id
    //   uploadData['user_id'] = this.selectedList[i].account_id

    //   this.httpApiService.uploadProjectInfoManufactureUser(uploadData).subscribe(Request => {
    //     console.log(Request)

    //   })
    // }
    location.href = 'main/project-C/project-info-manufacture-order-list-edit/' + this.m_id

  }



}
