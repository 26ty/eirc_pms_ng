import { Injectable } from '@angular/core';
import { HttpApiService } from '../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export interface AccountGroup {
  name: string;
  account: Account[];
}
export interface Account{
  name: string;
  dep_name?: string;
}

export const _filter = (opt: Account[], value: string): Account[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.name.toLowerCase().includes(filterValue));
};

@Injectable({
  providedIn: 'root'
})
export class FuncService {

  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });


  stateGroupOptions: Observable<AccountGroup[]>;

  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
  ) { }

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
    //console.log(this.accountgroup)
  }

  SerchAccount() {
    this.getDepartmentList()
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value)),
    );
  }

  private _filterGroup(value: string): AccountGroup[] {
    if (value) {
      return this.accountgroup
        .map(group => ({name: group.name, account: _filter(group.account, value)}))
        .filter(group => group.account.length > 0);
    }

    return this.accountgroup;
  }











  p_id:any
  projectDatas: any;
  //取得one project資料---------------------------------------
  getEditProject(p_id:any,data:any): void {
    //取得id
    //this.p_id = this.route.snapshot.paramMap.get('p_id');
    //連接api server
    this.HttpApiService.getOneProjectRequest_t(p_id).
      subscribe(projectres => {
        data = projectres;
        console.log(data)

        //取得creater name
        //this.getOneUserName(this.projectDatas.body.creater)


      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }


  // userList: any[] = [];
  // //a: any[] = [];
  // getAllUserName(List:any[]): void {
  //   for (var pagenum = 1; pagenum <= 92; pagenum++) {
  //     this.HttpApiService.getAccountRequest_t(pagenum, 1)
  //       .subscribe(userRequest => {
  //         //console.log(userRequest)
  //         List.push({ "id": userRequest.body.accounts[0].account_id, "name": userRequest.body.accounts[0].name })
  //         //this.a.push({ test: pagenum, tt: pagenum })
  //       })
  //   }
  //   // console.log(this.userList)
  //   // this.test(this.userList)

  //   // // console.log(typeof(this.userList))
  //   // console.log(this.a)
  //   // console.log(this.a[0])
  //   // for(var i in this.userList){
  //   //   console.log(i)
  //   // }
  // }



}
