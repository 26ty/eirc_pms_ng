import { HttpApiService } from './../../../../api/http-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { recordData } from './../../../../shared/data/record-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-manufacture-order-qc-edit',
  templateUrl: './manufacture-order-qc-edit.component.html',
  styleUrls: ['./manufacture-order-qc-edit.component.scss']
})
export class ManufactureOrderQcEditComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  Datas: any;
  //雙向綁定
  m_id: any = ''
  bonita_task_id: any = ''
  document_code: any = ''
  tr_remark: any = ''

  editTrForm: FormGroup;
  campaignOne: FormGroup;
  campaignTwo: FormGroup;

  // table 資料
  dataSource = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();

  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);

  // 時間格式
  formatStr = 'YYYY-MM-d hh:mm:ss';

  // 年分
  year: any;

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;


  displayedColumnsObj3: any[] = [
    { cn: '時間', en: 'record_date' },
    { cn: '部門', en: 'department' },
    { cn: '內容', en: 'record_content' },
  ];

  displayedColumns3!: string[];

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
  ) {

    this.editTrForm = this.fb.group({
      tr_remark: new FormControl(),
    });

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    //console.log(this.userJson)
    this.m_id = this.route.snapshot.paramMap.get('m_id');
    this.bonita_task_id = this.route.snapshot.paramMap.get('bonita_task_id');
    this.editTrForm = this.fb.group({
      tr_remark: new FormControl(),
    });
    this.getManufactureManufactureReturnList(this.userJson.account, this.userJson.bonita_user_id)
    //取得部門資料
    this.getDepartmentList();
    //取得all user資料
    this.getAllUserName();
    this.displayedColumns3 = this.displayedColumnsObj3.map(i => i.en);
  }

  // 選擇月份時關閉
  closeDatePicker(elem: MatDatepicker<any>, value: any) {
    this.year = value;
    elem.close();
  }

  showData3() {
    this.totalCount = recordData.length;
    this.dataSource3.data = recordData;
    this.dataSource3.paginator = this.paginator;
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

  userMReturnData: any
  oneMReturnData: any
  // //MRerurnTotal: any
  // //C2獲取使用者可執行的單 (單位主管審核)
  // getManufactureReturnRequest(account: any, userId: any): void {
  //   //console.log(account, userId)
  //   this.HttpApiService.getManufactureReturnList(account, userId).subscribe(res => {
  //     console.log("res", res)
  //     this.userMReturnData = res
  //     for (var i in this.userMReturnData.body) {
  //       if (this.userMReturnData.body[i].m_id == this.m_id) {
  //         this.oneMReturnData = this.userMReturnData.body[i]
  //       }
  //     }
  //     console.log(this.oneMReturnData)
  //   })
  // }

  // userMMReturnData: any
  // MMRerurnTotal: any
  //C2獲取使用者可執行的單 (單位主管審核)
  getManufactureManufactureReturnList(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getManufactureManufactureReturnList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userMReturnData = res
      for (var i in this.userMReturnData.body) {
        if (this.userMReturnData.body[i].m_id == this.m_id) {
          this.oneMReturnData = this.userMReturnData.body[i]
        }
      }
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

  //更新製令資料---------------------------------------
  updateProjectInfoManufacture(status: any): void {

    let projectInfoManufactureData: any = {};//接收資料的陣列
    projectInfoManufactureData['status'] = status;

    //重傳日期
    projectInfoManufactureData['date_for_open'] = this.oneMReturnData.date_for_open;
    projectInfoManufactureData['date_for_close'] = this.oneMReturnData.date_for_close;
    projectInfoManufactureData['date_for_estimated_shipment'] = this.oneMReturnData.date_for_estimated_shipment;

    console.log(projectInfoManufactureData);

    this.HttpApiService.updateProjectInfoManufacture(this.m_id, projectInfoManufactureData).
      subscribe(MO => {
        console.log(MO)
      }
      );

    //location.href = 'main/project-C/project-info-manufacture-order-list';
  }

  AgreeCase(): void {
    let reviewData: any = {
      "status": true
    }

    Swal.fire({
      title: '您是否確定要送審?',
      text: "送出後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '送出!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.HttpApiService.reviewManufactureForm(this.userJson.account, this.bonita_task_id, reviewData).subscribe(res => {
          console.log(this.userJson.account, this.bonita_task_id, reviewData)
          console.log("res", res)
          //更新製令資料庫
          this.updateProjectInfoManufacture('核准中')
          /*新增審核紀錄 */
          this.uploadTransactionRecordRequests(this.m_id, '生管-製造-審核')

        })

        Swal.fire(
          {
            title: `此製令送已送往最高主管`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            location.href = '/main/manufacture-order-qc'
          }
        })

        //location.href = '/main/cr-return-director'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: '已取消',
          text: '此製令未被送出',
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
        }

        )
      }
    })
  }

  //退回
  returnCase(): void {
    let reviewData: any = { 'status': false }

    console.log(reviewData)

    Swal.fire({
      title: '您是否確定要退回?',
      text: "退回後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '退回!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.HttpApiService.reviewManufactureForm(this.userJson.account, this.bonita_task_id, reviewData).subscribe(res => {
          console.log("res", res)
          //更新製令資料庫
          this.updateProjectInfoManufacture('編輯中')
          /*新增審核紀錄 */
          this.uploadTransactionRecordRequests(this.m_id, '退回')

        })

        Swal.fire(
          {
            title: `此製令已退回給業務`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            location.href = '/main/manufacture-order-qc'
          }
        })

        //location.href = '/main/cr-return-director'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            title: '此製令未被退回',
            icon: 'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
          }
        )
      }
    })


  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(m_id: any, actor: any): void {
    let recordData: any = {};//接收資料
    recordData['document_id'] = m_id
    recordData['actor'] = actor
    recordData['content'] = '製令'
    recordData['creater'] = this.userJson.account_id
    recordData['remark'] = this.tr_remark

    this.HttpApiService.uploadTransactionRecordRequest_t(recordData)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        console.log('成功')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

}
