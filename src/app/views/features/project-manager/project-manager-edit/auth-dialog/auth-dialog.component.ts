import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpApiService } from './../../../../../api/http-api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
    private HttpApiService: HttpApiService
  ) {
    this.authForm = this.fb.group({

    });
  }

  ngOnInit(): void {

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
  accountListDatas:any
  num = 0;
  selectedList: any[] = [];
  addSelectedUserList() {
    
    this.HttpApiService.getAccountList().subscribe(res => {
      this.accountListDatas = res.body.accounts
      for(let i in this.accountListDatas){
        if(this.selected_id == this.accountListDatas[i].account_id){
          // console.log(this.accountListDatas[i].name)
          this.selectedList.push({ 
            account_id :this.selected_id , 
            name :this.accountListDatas[i].name,
            dep : this.accountListDatas[i].dep_name
          })
          this.num++;
          console.log(this.selectedList)
        }
      }
    })
    
  }

  //刪除人員
  deleteSelectedUserList(data: any) {
    //console.log(this.taskUserNameDatas)
    for (var i = this.selectedList.length - 1; i >= 0; i--) {
      if (data == i) {
        //console.log(i)//2,1,0
        this.selectedList.splice(i, 1)
        this.num--
      }
      //console.log(i)//2,1,0
      //this.selectUserNameList
    }
    console.log(this.selectedList)//名字陣列
  }

  resetSelectValues() {
    this.selectedList = []
    this.num = 0;
    console.log(this.selectedList)
  }



}
