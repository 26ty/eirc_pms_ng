import { HttpApiService } from '../../../../../api/http-api.service';
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SwalEventService } from 'src/app/api/swal-event.service';
import Swal from 'sweetalert2'

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

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-work-submit-dialog',
  templateUrl: './work-submit-dialog.component.html',
  styleUrls: ['./work-submit-dialog.component.scss']
})

export class WorkSubmitDialogComponent implements OnInit {

  isLinear = false;
  addForm: FormGroup;

  displayedColumns: string[] = ['user_name', 'date_for_estimated_completion', 'action_edit', 'action_delete'];
  CSDataSource = new MatTableDataSource();
  totalCount!: number;
  //@Input() title!: string;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@Inject(MAT_DIALOG_DATA) private CountersignData: any;
  @ViewChild('workDetailDialogComponent') sourceDialog!: TemplateRef<any>;



  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private CSDatas: any,
    private SwalService: SwalEventService,
  ) {


    const today = new Date();
  }

  cd_id = ''
  cs_id = ''
  d_id = ''
  account_id = ''
  bonita_task_id = ''
  Users: any

  today = new Date
  // date_for_estimated_completion = this.today
  date_for_estimated_completion: Date
  remark: any
  department_name: any
  user_id: any

  ngOnInit(): void {

    console.log(this.CSDatas)
    this.cd_id = this.CSDatas.cd_id
    this.cs_id = this.CSDatas.cs_id
    this.department_name = this.CSDatas.d_name
    this.d_id = this.CSDatas.d_id
    this.account_id = this.CSDatas.account_id
    this.bonita_task_id = this.CSDatas.bonita_task_id
    this.Users = this.CSDatas.user
    console.log(this.Users, this.CSDatas.user)



    this.getCSUserRequest()

    //this.getCSUserRequest()
    //取得all user資料
    this.getAllUserName();
    //取得部門資料
    // this.getDepartmentList();

    this.addForm = this.fb.group({
      date_for_estimated_completion: [this.today, [Validators.required]],
      remark: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      creater: [this.account_id],
      countersign_id: [this.cs_id],
    });
    // this.addForm.patchValue({
    //   date_for_estimated_completion: this.today,
    //   creater: this.account_id,
    //   countersign_id: this.cs_id,
    // });
  }




  //新增會簽人員
  addCSuserRequest(): void {
    if (this.addForm.valid) {
      let CSData: any = {};//接收資料的陣列

      CSData['countersign_id'] = this.cs_id;
      CSData['date_for_estimated_completion'] = this.date_for_estimated_completion;
      CSData['remark'] = this.remark;
      CSData['user_id'] = this.user_id;
      CSData['creater'] = this.account_id;
      CSData['date_for_completion'] = '0001-01-01T00:00:00Z';

      console.log(this.addForm.value)

      console.log("this.CSData", CSData);//console資料

      this.HttpApiService.uploadCountersignUserRequest(this.addForm.value).subscribe(
        CSuserRequest => {

          if (CSuserRequest.code == 200) {
            Toast.fire({
              icon: 'success',
              title: '指派成功'
            })
            this.addForm.reset()
            this.addForm.patchValue({
              date_for_estimated_completion: this.today,
              creater: this.account_id,
              countersign_id: this.cs_id,
            });
            console.log(this.addForm.value)
            this.getCSUserRequest()
          }
        }
      );
    } else {
      this.addForm.markAllAsTouched()
    }


  }

  //修改會簽人員
  updateCountersignUserRequest(): void {
    if (this.addForm.valid) {
      let CSData: any = {};//接收資料的陣列

      CSData['date_for_estimated_completion'] = this.date_for_estimated_completion;
      CSData['remark'] = this.remark;
      CSData['user_id'] = this.user_id;

      console.log(CSData);//console資料
      this.HttpApiService.updateCountersignUserRequest(this.cu_id, this.addForm.value).subscribe(
        CSRequest => {

          if (CSRequest.code == 200) {

            Toast.fire({
              icon: 'success',
              title: '修改成功'
            })
            this.btnResetClick()

            this.reset()
            // this.addForm.reset()
            // this.addForm.patchValue({
            //   date_for_estimated_completion: this.today,
            //   creater: this.account_id,
            //   countersign_id: this.cs_id,
            // });
            this.getCSUserRequest()
          }

        },
        (err: any) => {
          console.log('err:', err);
        }
      );

    } else {
      this.addForm.markAllAsTouched()
    }

  }

  reset() {
    this.addForm.reset()
    this.addForm.patchValue({
      date_for_estimated_completion: this.today,
      creater: this.account_id,
      countersign_id: this.cs_id,
    });
  }

  //刪除會簽人員

  deleteCSuserRequest(id: any): void {

    this.HttpApiService.deleteCountersignUserRequest(id).subscribe(
      CSuserRequest => {
        console.log(CSuserRequest)

        this.getCSUserRequest()
      }
    );
    //slocation.href='main/task-return/171/1';
  }

  //取得全部cs參數設定---------------------------------
  CSUserRequest: any;
  CSUserDatas: any;
  getCSUserRequest(): void {
    this.HttpApiService.getCountersignRequestByCsID(this.cd_id, this.cs_id)
      .subscribe(CSUserRequest => {
        this.CSUserDatas = CSUserRequest.body.countersign_user
        this.showData(this.CSUserDatas);
        console.log(this.CSUserDatas)
      });
  }

  // 顯示資料
  showData(data: any) {
    console.log(data)
    this.CSDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.CSDataSource.sort = this.sort;
    this.CSDataSource.paginator = this.paginator;
  }

  cu_id = ''
  CSRequest: any
  //編輯工時彈跳視窗
  doPostEdit(item: any): void {
    this.btnEditClick()
    this.cu_id = item
    this.HttpApiService.getOneCountersignRequest(this.cu_id)
      .subscribe(CSRequest => {
        console.log(CSRequest)
        this.CSRequest = CSRequest.body.countersign_user[0]
        this.date_for_estimated_completion = this.CSRequest.date_for_estimated_completion;
        this.remark = this.CSRequest.remark;
        this.user_id = this.CSRequest.user_id;
        this.department_name = this.CSRequest.d_name

        this.addForm.patchValue({
          date_for_estimated_completion: this.CSRequest.date_for_estimated_completion,
          creater: this.account_id,
          countersign_id: this.cs_id,
          remark: this.CSRequest.remark,
          user_id: this.CSRequest.user_id
        });
      });
  }



  //取得user name
  userList: any[] = [];
  a: any[] = [];
  getAllUserName(): void {
    for (var pagenum = 1; pagenum <= 92; pagenum++) {
      this.HttpApiService.getAccountRequest_t(pagenum, 1)
        .subscribe(userRequest => {
          //console.log(userRequest)
          this.userList.push({ "id": userRequest.body.accounts[0].account_id, "name": userRequest.body.accounts[0].name })
          this.a.push({ test: pagenum, tt: pagenum })
        })
    }
  }

  //取得user列表-------------------------------------------------------------------------
  accountControl = new FormControl();
  accountgroup: AccountGroup[] = []
  getDepartmentList(): void {
    this.HttpApiService.getDepartmentList()
      .subscribe(departmentRequest => {
        var departmentdatas: any = departmentRequest
        for (var i in departmentdatas.body.department) {
          if (departmentdatas.body.department[i].name == this.department_name) {
            this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "account": [] })
          }

        }
        this.getDepartmentAccountList()
      })
  }

  getDepartmentAccountList(): void {
    this.HttpApiService.getDepartmentAccountList(this.d_id)
      .subscribe(AccountRequest => {
        console.log(AccountRequest)
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

  loadingAlertbackCRcountersign() {
    this.SwalService.loadingAlertbackCRcountersign("重新整理中..", 750, this.cd_id, this.bonita_task_id)
  }

  //按鈕狀態先給false
  btnStatus = false;//預設儲存
  //異動處理按鈕點擊事件
  btnEditClick() {
    this.btnStatus = true;
  }

  btnResetClick() {
    this.btnStatus = false;
  }

  // reset(): void {
  //   this.date_for_estimated_completion = this.today
  //   this.remark = ''
  //   //this.department_name = ''
  //   this.user_id = ''
  // }

}


