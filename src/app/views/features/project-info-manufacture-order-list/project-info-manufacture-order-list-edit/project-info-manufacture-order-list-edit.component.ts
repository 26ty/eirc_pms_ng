import { HttpApiService } from './../../../../api/http-api.service';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { recordData } from './../../../../shared/data/record-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2'
import { SwalEventService } from 'src/app/api/swal-event.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

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
  selector: 'app-project-info-manufacture-order-list-edit',
  templateUrl: './project-info-manufacture-order-list-edit.component.html',
  styleUrls: ['./project-info-manufacture-order-list-edit.component.scss']
})
export class ProjectInfoManufactureOrderListEditComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('interviewSortSort') interviewSortSort!: MatSort;
  @ViewChild('authDialog') authDialog!: TemplateRef<any>;

  Datas: any;
  //雙向綁定
  m_id: any = ''
  document_code: any = ''

  receiptForm: FormGroup;
  campaignOne: FormGroup;
  campaignTwo: FormGroup;

  // table 資料
  dataSource = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();

  interviewcol: string[] = ['create_time', 'creater_name', 'content', 'remark'];

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
    private httpApiService: HttpApiService,
    private route: ActivatedRoute,
    private SwalEvent: SwalEventService,
    public dialog: MatDialog,
  ) {

    this.receiptForm = this.fb.group({
      project_id: [''],
      code: [''],
      document_code: [''],
      order_name: ['', [Validators.required]],
      project_detail: [''],//專案代號
      amount: ['', [Validators.required]],
      customer_id: [''],
      shipment_location: [''],
      date_for_open: [''],//必填
      date_for_close: [''],//必填
      date_for_estimated_shipment: [''],
      inner_id: [''],//內部訂單編號
      other_document_code: [''],//其他相關單據
      remark: ['', [Validators.required]],
      sales_assistant_id: ['', [Validators.required]],
      recipient_id: ['', [Validators.required]],
      salesman_id: ['', [Validators.required]],
    }
    );

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
    this.SwalEvent.loadingAlertNoback('請稍等...', 500)

    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    this.getProjectInfoManufacture();
    //取得部門資料
    this.getDepartmentList();
    //取得all user資料
    this.getAllUserName();
    this.displayedColumns3 = this.displayedColumnsObj3.map(i => i.en);
    this.getInterviewRequest()
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
      this.httpApiService.getAccountRequest_t(pagenum, 1)
        .subscribe(userRequest => {
          //console.log(userRequest)
          this.userList.push({ "id": userRequest.body.accounts[0].account_id, "name": userRequest.body.accounts[0].name })
          this.a.push({ test: pagenum, tt: pagenum })
        })
    }
  }

  permission = true

  //取得該id之製令資料---------------------------------------
  taskUserList: any[] = []
  getProjectInfoManufacture(): void {
    //取得id
    this.m_id = this.route.snapshot.paramMap.get('m_id');
    this.document_code = this.route.snapshot.paramMap.get('document_code');

    //print id
    console.log(this.m_id);
    //server getOne
    this.httpApiService.getOneProjectInfoManufacture(this.m_id).
      subscribe(res => {
        this.Datas = res;
        console.log(this.Datas);

        for (let i in this.Datas.body.manufacture_user) {
          console.log(this.Datas.body.manufacture_user[i].name)
          this.taskUserList.push(this.Datas.body.manufacture_user[i].name)
        }

        console.log(this.Datas.body.date_for_estimated_shipment);
        if (this.Datas.body.date_for_estimated_shipment == '0001-01-01T00:00:00Z') {
          const date = new Date();
          console.log('date', date)
          this.Datas.body.date_for_estimated_shipment = date
          // console.log(this.Datas.body.date_for_estimated_shipment);
        }

        if (this.Datas.body.creater == this.userJson.account_id) {
          this.permission = false
          console.log(this.permission)
        }


        if (this.Datas.body.bonita_case_id) {
          this.getrestartManufactureForm(this.Datas.body.bonita_case_id)
        }

      }
      );
  }

  //更新製令資料---------------------------------------
  updateProjectInfoManufacture(status: any): void {

    let projectInfoManufactureData: any = {};//接收資料的陣列

    projectInfoManufactureData['project_detail'] = this.Datas.body.project_detail;
    projectInfoManufactureData['order_name'] = this.Datas.body.order_name;
    projectInfoManufactureData['amount'] = Number(this.Datas.body.amount);
    projectInfoManufactureData['customer_id'] = this.Datas.body.customer_id;
    projectInfoManufactureData['shipment_location'] = this.Datas.body.shipment_location;
    projectInfoManufactureData['date_for_open'] = this.Datas.body.date_for_open;
    projectInfoManufactureData['date_for_close'] = this.Datas.body.date_for_close;
    projectInfoManufactureData['date_for_estimated_shipment'] = this.Datas.body.date_for_estimated_shipment;
    projectInfoManufactureData['inner_id'] = this.Datas.body.inner_id;//內部訂單
    projectInfoManufactureData['other_document_code'] = this.Datas.body.other_document_code//其他相關單據
    projectInfoManufactureData['remark'] = this.Datas.body.remark;

    projectInfoManufactureData['sales_assistant_id'] = this.Datas.body.sales_assistant_id;
    projectInfoManufactureData['recipient_id'] = this.Datas.body.recipient_id;
    projectInfoManufactureData['salesman_id'] = this.Datas.body.salesman_id;
    projectInfoManufactureData['status'] = status;
    projectInfoManufactureData['creater'] = this.userJson.account_id

    console.log(projectInfoManufactureData);

    this.httpApiService.updateProjectInfoManufacture(this.m_id, projectInfoManufactureData).
      subscribe(MO => {
        console.log(MO)

        if (MO.code == 200 && status == "編輯中") {
          Swal.fire({
            title: '已儲存!',
            icon: 'success',
            cancelButtonText: '確認!',
            confirmButtonColor: '#64c270'
          })


        }

      }
      );

    //location.href = 'main/project-C/project-info-manufacture-order-list';
  }

  startC2: any = {}

  //C2啟單
  startC2Bonita(): void {


    if (this.receiptForm.valid
      && this.Datas.body.creater_name != '00000000-0000-0000-0000-000000000000'
      && this.Datas.body.sales_assistant_id != '00000000-0000-0000-0000-000000000000'
      && this.Datas.body.recipient_id != '00000000-0000-0000-0000-000000000000') {
      //起單
      this.startC2 = {}
      this.startC2['account'] = this.userJson.account

      //業務助理
      for (var i in this.accountdatas.body.accounts) {
        if (this.accountdatas.body.accounts[i].account_id == this.Datas.body.sales_assistant_id) {
          console.log('same')
          this.startC2['assistant'] = this.accountdatas.body.accounts[i].bonita_user_id
        }
      }

      //收文者
      for (var i in this.accountdatas.body.accounts) {
        if (this.accountdatas.body.accounts[i].account_id == this.Datas.body.recipient_id) {
          console.log('same')
          this.startC2['recipient'] = this.accountdatas.body.accounts[i].bonita_user_id
        }
      }

      console.log("startC2 %j", this.startC2)

      //確認視窗
      Swal.fire({
        title: '您是否確定要啟動單據?',
        //text: "啟動後即不可返回!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '啟動!',
        cancelButtonText: '取消!',
        confirmButtonColor: '#64c270',
        cancelButtonColor: '#FF5151',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          /*動作程式 */
          //啟動單據
          this.httpApiService.startManufactureForm(this.m_id, this.startC2).subscribe(res => {
            console.log(res)
            //送審任務

            //更新製令
            this.updateProjectInfoManufacture('主管審核中')
            //新增紀錄
            this.uploadTransactionRecordRequests(this.m_id, '啟動')
          })

          Swal.fire({
            title: '已啟動!',
            icon: 'success',
            text: '此製令送往單位主管.',
            cancelButtonText: '確認!',
            confirmButtonColor: '#64c270',
          }).then((result) => {
            if (result.isConfirmed) {
              location.href = '/main/project-C/project-info-manufacture-order-list'
            }
          })

          //location.href = '/main/pm-return'
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: '已取消!',
            icon: 'error',
            cancelButtonText: '確認!',
            confirmButtonColor: '#3085d6'
          }

          )
        }
      })
    } else {
      Swal.fire({
        title: '啟動失敗!',
        icon: 'error',
        text: '請確認製令資料完整性.',
        cancelButtonText: '確認!',
        confirmButtonColor: '#3085d6'
      }
      )
    }


  }

  restart_case_id = ''
  restart_task_id: any
  //重啟單
  getrestartManufactureForm(bonita_case_id: any) {
    this.httpApiService.getrestartManufactureForm(this.userJson.account, bonita_case_id).subscribe(
      res => {
        console.log('bonita重啟單', res)
        this.restart_case_id = res.body
        // this.restart_case_id = bonita_case_id
        if (res.code == 200) {
          this.restart_task_id = res.body
        }

        console.log(this.restart_case_id)
      }
    )
  }

  //重啟按鈕
  resubmitCase(): void {



    if (this.receiptForm.valid
      && this.Datas.body.creater_name != '00000000-0000-0000-0000-000000000000'
      && this.Datas.body.sales_assistant_id != '00000000-0000-0000-0000-000000000000'
      && this.Datas.body.recipient_id != '00000000-0000-0000-0000-000000000000') {
      //起單
      this.startC2 = {}
      // this.startC2['account'] = this.userJson.account

      //業務助理
      for (var i in this.accountdatas.body.accounts) {
        if (this.accountdatas.body.accounts[i].account_id == this.Datas.body.sales_assistant_id) {
          console.log('same')
          this.startC2['assistant'] = this.accountdatas.body.accounts[i].bonita_user_id
        }
      }

      //收文者
      for (var i in this.accountdatas.body.accounts) {
        if (this.accountdatas.body.accounts[i].account_id == this.Datas.body.recipient_id) {
          console.log('same')
          this.startC2['recipient'] = this.accountdatas.body.accounts[i].bonita_user_id
        }
      }

      console.log("startC2 %j", this.startC2)

      Swal.fire({
        title: '您是否確定要重新啟單?',
        text: "重新啟單後即不可返回!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '重新啟單!',
        cancelButtonText: '取消!',
        confirmButtonColor: '#64c270',
        cancelButtonColor: '#FF5151',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          /*動作程式 */
          console.log('bonita任務id', this.restart_task_id)
          this.httpApiService.reviewManufactureForm(this.userJson.account, this.restart_task_id, this.startC2).subscribe(res => {
            console.log(this.userJson.account, this.restart_task_id, this.startC2)
            console.log("res", res)

            if (res.code == 200) {
              Swal.fire(
                {
                  title: `此製令送往單位主管`,
                  icon: 'success',
                  confirmButtonText: '確認!',
                  confirmButtonColor: '#64c270',
                  reverseButtons: true
                }
              ).then((result) => {
                if (result.isConfirmed) {
                  location.href = '/main/project-C/project-info-manufacture-order-list'
                }
              })

              //更新製令
              this.updateProjectInfoManufacture('主管審核中')
              /*新增審核紀錄 */
              this.uploadTransactionRecordRequests(this.m_id, '業務重新啟單')
            }



          })



          //location.href = '/main/cr-return-director'
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            {
              title: '已取消',
              text: '此製令未被重新啟單',
              icon: 'error',
              confirmButtonText: '確認!',
              confirmButtonColor: '#FF5151',
            }
          )
        }
      })


    } else {
      Swal.fire({
        title: '啟動失敗!',
        icon: 'error',
        text: '請確認製令資料完整性.',
        cancelButtonText: '確認!',
        confirmButtonColor: '#3085d6'
      }
      )
    }



  }

  //刪除
  deleteProjectInfoManufacturet(): void {
    // if (confirm("是否確定要刪除?") == true) {

    //   this.httpApiService.deleteProjectInfoManufacturet(this.m_id).subscribe();

    //   const backUrl = 'main/project-C/project-info-manufacture-order-list'
    //   location.href = backUrl;
    //   alert("已刪除!");
    // } else {
    //   alert("無法刪除!");
    // }

    Swal.fire({
      title: '您是否確定要刪除?',
      text: "刪除後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*動作程式 */
        this.httpApiService.deleteProjectInfoManufacturet(this.m_id).subscribe();

        //const backUrl = `main/project-A/project-request`
        //location.href = backUrl;
        Swal.fire(
          {
            title: `此製令已刪除`,
            icon: 'success',
            confirmButtonText: '確認!',
            confirmButtonColor: '#64c270',
            reverseButtons: true
          }
        ).then((result) => {
          if (result.isConfirmed) {
            location.href = '/main/project-C/project-info-manufacture-order-list'
          }
        })
        //location.href = 'main/project-A/project-request'
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          text: '此製令未被刪除',
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
        }
        )
      }
    })


  }

  //產生一筆新的transaction_record 紀錄資料格式-------------------------------------------
  uploadTransactionRecordRequests(m_id: any, actor: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = m_id
    trManagerDatas['actor'] = actor
    trManagerDatas['content'] = '製令'
    trManagerDatas['creater'] = this.userJson.account_id

    this.httpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        console.log('成功')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //取得user列表-------------------------------------------------------------------------
  accountControl = new FormControl();
  accountgroup: AccountGroup[] = []
  getDepartmentList(): void {
    this.httpApiService.getDepartmentList()
      .subscribe(departmentRequest => {
        var departmentdatas: any = departmentRequest
        for (var i in departmentdatas.body.department) {
          this.accountgroup.push({ "name": departmentdatas.body.department[i].name, "account": [] })
        }
        this.getAccountList()
      })
  }

  accountdatas: any
  getAccountList(): void {
    this.httpApiService.getAccountList()
      .subscribe(AccountRequest => {
        this.accountdatas = AccountRequest
        for (var i in this.accountdatas.body.accounts) {
          for (var j in this.accountgroup) {
            if (this.accountgroup[j].name == this.accountdatas.body.accounts[i].dep_name) {
              this.accountgroup[j].account.push(this.accountdatas.body.accounts[i])
            }
          }
        }
      })
  }

  //取得訪問紀錄interview資料--------------------------------------------------------
  interviewRequest: any;
  interviewDatas: any;
  department_interview: any[] = []
  getInterviewRequest(): void {
    this.httpApiService.getOneTransactionRecordRequest_t(this.m_id).subscribe(res => {
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)
      this.interviewDataSource.data = this.interviewDatas
      this.interviewDataSource.sort = this.interviewSortSort
      this.interviewDataSource.paginator = this.paginator


      for (let i in this.interviewDatas) {
        if (this.interviewDatas[i].actor == '單位主管審核') {
          this.department_interview[0] = this.interviewDatas[i]
        } else if (this.interviewDatas[i].actor == '總經理審核') {
          this.department_interview[1] = this.interviewDatas[i]
        } else if (this.interviewDatas[i].actor == '儲存製令單號') {
          this.department_interview[2] = this.interviewDatas[i]
        }


      }
    })
  }


  //權限設定
  authItem(item: any) {
    this.dialog.open(AuthDialogComponent, {
      data: {
        m_id: item
      }
    });

    console.log(item)
  }



}
