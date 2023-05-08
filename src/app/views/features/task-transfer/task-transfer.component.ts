import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatTableDataSource } from '@angular/material/table';
import { HttpApiService } from './../../../api/http-api.service';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalEventService } from 'src/app/api/swal-event.service';
import Swal from 'sweetalert2'

const USER_KEY = 'auth-user';

interface Account {
  account_id: string;
  name: string;
  bonita_user_id: string;
  dep_name: string;
  e_name: string;
}

interface AccountGroup {
  disabled?: boolean;
  name: string;
  account: Account[];
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-task-transfer',
  templateUrl: './task-transfer.component.html',
  styleUrls: ['./task-transfer.component.scss']
})
export class TaskTransferComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  transferForm: FormGroup;
  taskForm: FormGroup;

  //breadcrumb
  items: MenuItem[];
  home: MenuItem;

  selectedValue = ['select', 'code', 't_name', 't_status'];

  // MatPaginator Inputs
  totalCount!: number;
  // table 資料
  dataSource = new MatTableDataSource<any>();

  bonita_user_id: any
  account_id: any

  constructor(
    private HttpApiService: HttpApiService,
    private fb: FormBuilder,
    private SwalEvent: SwalEventService
  ) {
    this.transferForm = this.fb.group({
      bonita_user_id: ['', [Validators.required]],
    });

    this.taskForm = this.fb.group({
      account_id: ['', [Validators.required]],
    });
  }

  userJson: any

  ngOnInit(): void {

    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式

    this.items = [
      { label: '任務轉移' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/main/dashboard' };

    // this.getTaskTransferRequest(this.userJson.account, this.userJson.bonita_user_id)

    //取得部門資料
    this.getDepartmentList();

  }

  //取得待審核單據(任務轉移)
  taskTransferData: any
  taskTransferData_t: any[]
  taskTransferTotal: any
  getTaskTransferRequest(): void {
    console.log(this.account_id)
    this.HttpApiService.getTaskTransferRequest(this.userJson.account, this.account_id).subscribe(res => {
      console.log("res", res)
      this.taskTransferData = res
      console.log("任務轉移筆數", this.taskTransferData.body.length)
      this.taskTransferTotal = this.taskTransferData.body.length
      console.log("任務轉移", this.taskTransferData.body)

      // for (let i in this.taskTransferData.body) {
      //   console.log(this.taskTransferData.body[i])
      //   console.log(this.taskTransferData.body[i].bonita_task_name)
      //   if (this.taskTransferData.body[i].bonita_task_name != "新增任務" && this.taskTransferData.body[i].bonita_task_name != "專案終止") {
      //     console.log(this.taskTransferData.body[i])
      //     this.taskTransferData_t.push(
      //       {

      //       }
      //     )
      //   }
      // }
      // console.log(this.taskTransferData_t)
      console.log(this.taskTransferData)
      this.showData(this.taskTransferData.body)
    })
  }

  showData(data: any) {
    this.totalCount = data.length;
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
  }

  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  taskTransferdata: any
  taskUserdatas: any = { "task_user": [] }
  taskIDdatas: any = { "task_user": [] }
  taskTransferdatas: any = { "transfer_task": [] }

  taskTransfer() {
    this.taskTransferdata = this.selection.selected
    console.log(this.taskTransferdata.length)

    for (var i: number = 0; i < this.taskTransferdata.length; i++) {
      console.log(this.taskTransferdata[i].bonita_task_id)

      this.taskTransferdatas.transfer_task.push(
        {
          "bonita_task_id": this.taskTransferdata[i].bonita_task_id,
          "bonita_user_id": this.bonita_user_id[0]
        }
      )
      if (this.taskTransferdata[i].t_id) {
        this.taskUserdatas.task_user.push(
          {
            "tu_id": this.taskTransferdata[i].tu_id,
            "user_id": this.bonita_user_id[1]
          }
        )
      }

    }
    console.log(this.bonita_user_id)
    console.log(this.taskTransferdatas)
    console.log(this.taskUserdatas)

    if (this.transferForm.valid) {
      Swal.fire({
        title: '您是否確定要將任務移轉?',
        // text: "移轉後即不可返回!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '移轉!',
        cancelButtonText: '取消!',
        confirmButtonColor: '#64c270',
        cancelButtonColor: '#FF5151',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          /*動作程式 */

          this.HttpApiService.taskTransferRequest(this.userJson.account, this.taskTransferdatas)
            .subscribe(res => {
              console.log(res)
              if (res.code == 200) {

                this.updatepluralTaskUserRequest()

                Swal.fire(
                  {
                    title: `任務已移轉`,
                    icon: 'success',
                    confirmButtonText: '確認!',
                    confirmButtonColor: '#64c270',
                    reverseButtons: true
                  }
                ).then((result) => {
                  if (result.isConfirmed) {
                    location.href = '/main/task-transfer'
                  }
                })
              }
            })

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: '已取消!',
            icon: 'error',
            cancelButtonText: '確認!',
            confirmButtonColor: '#FF5151',
          }
          )
        }
      })
    } else {
      Swal.fire(
        {
          title: `請選擇任務移轉人`,
          icon: 'error',
          cancelButtonText: '確認!',
          confirmButtonColor: '#FF5151'
        }
      )
    }


  }


  //修改任務負責人
  updatepluralTaskUserRequest() {


    // this.HttpApiService.deletepluralTaskUserRequest(this.taskUserdatas)
    //   .subscribe(res => {
    //     console.log(res.code)

    //   })
    this.HttpApiService.updatepluralTaskUserRequest(this.taskUserdatas)
      .subscribe(res => {
        console.log(res.code)
      })

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

}
