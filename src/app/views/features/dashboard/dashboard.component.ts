import { HttpApiService } from 'src/app/api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CaseDialogComponent } from './case-dialog/case-dialog.component';
import Swal from 'sweetalert2'

import { ListboxModule } from 'primeng/listbox';
import { OrderListModule } from 'primeng/orderlist';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';
const USER_KEY = 'auth-user';

export interface B2List {
  count?: any;
  name?: any;
  router?: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  meetingDataColums: String[] = ['m_name', 'name', 'time_for_start', 'date_for_start', 'room'];
  meetingDataSource = new MatTableDataSource();
  meetingDatatotalCount!: number;

  displayedColumns: string[] = ['status', 'code', 'p_name', 'customer_name', 'date_for_start', 'action_edit'];
  projectDataSource = new MatTableDataSource();
  totalCount!: number;

  taskReturnDisplayedColumns: string[] = ['p_code', 'p_name', 'code', 't_name', 'name', 'date_for_estimated_start', 'date_for_estimated_completion', 'bonita_task_id'];
  taskReturnDataSource = new MatTableDataSource();
  taskReturnTotalCount!: number;

  taskAuditDisplayedColumns: string[] = ['p_code', 'p_name', 'code', 't_name', 'name', 'date_for_estimated_start', 'date_for_estimated_completion', 'bonita_task_id'];
  taskAuditDataSource = new MatTableDataSource();
  taskAudittotalCount!: number;

  projectAuditdisplayedColumns: string[] = ['status', 'code', 'p_name', 'projectman_name', 'date_for_start', 'action_edit'];
  projectAuditprojectDataSource = new MatTableDataSource();
  projectAudittotalCount!: number;

  CRdisplayedColumns: string[] = ['create_time', 'code', 'demand_content', 'salesman_dep', 'salesman_name', 'action_edit'];
  CRdisplayedColumns2: string[] = ['create_time', 'code', 'demand_content', 'salesman_name', 'action_edit'];
  CRDataSource = new MatTableDataSource();
  CRtotalCount!: number;

  CRDataSource_A2 = new MatTableDataSource();
  CRtotalCount_A2!: number;

  CRDataSource_A3 = new MatTableDataSource();
  CRtotalCount_A3!: number;

  CRDataSource_C = new MatTableDataSource();
  CRtotalCount_C!: number;

  CRDataSource_D = new MatTableDataSource();
  CRtotalCount_D!: number;

  CRDataSource_E = new MatTableDataSource();
  CRtotalCount_E!: number;

  CRDataSource_F = new MatTableDataSource();
  CRtotalCount_F!: number;

  CRDataSource_G = new MatTableDataSource();
  CRtotalCount_G!: number;

  CRDataSource_H = new MatTableDataSource();
  CRtotalCount_H!: number;

  CRDataSource_I = new MatTableDataSource();
  CRtotalCount_I!: number;

  CRDataSource_J = new MatTableDataSource();
  CRtotalCount_J!: number;

  CRDataSource_K = new MatTableDataSource();
  CRtotalCount_K!: number;

  CRDataSource_L = new MatTableDataSource();
  CRtotalCount_L!: number;

  CRDataSource_M = new MatTableDataSource();
  CRtotalCount_M!: number;

  CRDataSource_N = new MatTableDataSource();
  CRtotalCount_N!: number;

  CRDataSource_O = new MatTableDataSource();
  CRtotalCount_O!: number;

  CRtaskdisplayedColumns: string[] = ['code', 'subject', 'department', 'poster', 'action_edit'];
  CRDataSource_task = new MatTableDataSource();
  CRtotalCount_task!: number;

  CRDataSource_task_manager = new MatTableDataSource();
  CRtotalCount_task_manager!: number;

  @ViewChild('paginator') paginator!: MatPaginator;
  // @ViewChild('paginator') set matPaginator(paginator: MatPaginator) {
  //     this.meetingDataSource.paginator = paginator;
  //   };
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('paginator4') paginator4!: MatPaginator;
  @ViewChild('paginator5') paginator5!: MatPaginator;
  @ViewChild('paginator6') paginator6!: MatPaginator;
  @ViewChild('paginator7') paginator7!: MatPaginator;
  @ViewChild('paginator8') paginator8!: MatPaginator;
  @ViewChild('paginator9') paginator9!: MatPaginator;
  @ViewChild('paginator10') paginator10!: MatPaginator;
  @ViewChild('paginator_meeting') paginator_meeting!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageEvent!: PageEvent;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
  ) {
    //this.dataSource = new MatTableDataSource([]);
  }

  // swalAlert():void{
  //   swal("Hello world!");
  // }
  mission = false;

  userJson: any
  userToken: any
  userRefrshToken: any
  ngOnInit(): void {
    /*取得使用者資訊*/
    const tokenstring = window.localStorage.getItem(TOKEN_KEY)
    this.userToken = tokenstring

    const re_tokenstring = window.localStorage.getItem(REFRESH_TOKEN_KEY)
    this.userRefrshToken = re_tokenstring

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))

    //驗證使用者有無token
    // this.HttpApiService.verifyToken(this.userToken)
    this.getOneUserMeeting()
    this.getMeetingUser()

    //取得待辦事項
    this.getTaskRequest()

    if (this.userJson != null) {
      //取得所有單據
      this.getUserCase(this.userJson.account, this.userJson.bonita_user_id)
      //取得工時異動
      this.getlabordirectCaseList(this.userJson.account, this.userJson.bonita_user_id)
      //取得個人已提報異動工時
      this.getByUserIdList(this.userJson.account_id)

      //取得PM待回報專案列表
      this.getUserCaseList(this.userJson.account, this.userJson.bonita_user_id)

      //取得TM待回報專案任務列表
      this.getUserTmCaseList(this.userJson.account, this.userJson.bonita_user_id)

      this.getUserTmAuditCaseList(this.userJson.account, this.userJson.bonita_user_id)

      this.getUserPmAuditCaseList(this.userJson.account, this.userJson.bonita_user_id)
      // //取得PM待回報專案列表
      // this.getUserCaseList(this.userJson.account, this.userJson.bonita_user_id)

      // //取得最高主管待完工審核列表
      // this.getUserPmAuditCaseList(this.userJson.account, this.userJson.bonita_user_id)

      // //取得TM待回報專案任務列表
      // this.getUserTmCaseList(this.userJson.account, this.userJson.bonita_user_id)

      // //取得PM會簽任務列表
      // this.getUserPmCounterSignList(this.userJson.account, this.userJson.bonita_user_id)

      // //取得TM待完工專案任務列表
      // this.getUserTmAuditCaseList(this.userJson.account, this.userJson.bonita_user_id)

      // //取得專案任務會簽確認
      // this.getTaskCheckList(this.userJson.account, this.userJson.bonita_user_id)

      // //A1獲取使用者可執行的單 (業務經理審核)
      this.getCrReturnList_A1(this.userJson.account, this.userJson.bonita_user_id)

      // //A2獲取使用者可執行的單 (回覆簽核意見並指定專案經理)
      this.getCrReturnList_A2(this.userJson.account, this.userJson.bonita_user_id)

      // //A3獲取使用者可執行的單 (PM人選確認並負責RD部門勾選)
      this.getCrReturnList_A3(this.userJson.account, this.userJson.bonita_user_id)

      // //C獲取使用者可執行的單 (會簽主管指派各部門人員(可能1人或多人))
      this.getCrReturnList_C(this.userJson.account, this.userJson.bonita_user_id)

      //D獲取使用者可執行的單 (會簽人員送交評估報告)
      this.getCrReturnList_D(this.userJson.account, this.userJson.bonita_user_id)

      //E 獲取使用者可執行的單 (會簽主管審核)
      this.getCrReturnList_E(this.userJson.account, this.userJson.bonita_user_id)

      //F 獲取使用者可執行的單 (PM送審評估報告) Pm待回報客需單
      this.getCrReturnList_F(this.userJson.account, this.userJson.bonita_user_id)

      //G 獲取使用者可執行的單 (業務簽核)
      this.getCrReturnList_G(this.userJson.account, this.userJson.bonita_user_id)

      //H 獲取使用者可執行的單 (業務經理簽核)
      this.getCrReturnList_H(this.userJson.account, this.userJson.bonita_user_id)

      //I 獲取使用者可執行的單 (業務副總簽核)
      this.getCrReturnList_I(this.userJson.account, this.userJson.bonita_user_id)

      //J 獲取使用者可執行的單 (業務經理結案審核)
      this.getCrReturnList_J(this.userJson.account, this.userJson.bonita_user_id)

      //K 獲取使用者可執行的單 (業務副總結案審核)
      this.getCrReturnList_K(this.userJson.account, this.userJson.bonita_user_id)

      //L 獲取使用者可執行的單 (總經理結案審核)
      this.getCrReturnList_L(this.userJson.account, this.userJson.bonita_user_id)

      //M 獲取使用者可執行的單 (回報製令完工)
      this.getCrReturnList_M(this.userJson.account, this.userJson.bonita_user_id)

      //N 獲取使用者可執行的單 (製令結案)
      this.getCrReturnList_N(this.userJson.account, this.userJson.bonita_user_id)

      //O 獲取使用者可執行的單
      this.getCrReturnList_O(this.userJson.account, this.userJson.bonita_user_id)

      //A1獲取使用者可執行的單 (任務完工送審)
      this.getTaskFinishReturnList(this.userJson.account, this.userJson.bonita_user_id)

      //A1獲取使用者可執行的單 (任務直屬主管審核)
      this.getTaskFinishManagerReturnList(this.userJson.account, this.userJson.bonita_user_id)

      // //C2獲取使用者可執行的單 (單位主管審核)
      // this.getManufactureReturnList(this.userJson.account, this.userJson.bonita_user_id)

      // //C2獲取使用者可執行的單 (生管-製造-審核)
      // this.getManufactureManufactureReturnList(this.userJson.account, this.userJson.bonita_user_id)

      // //C2獲取使用者可執行的單 (總經理審核)
      // this.getTopManufactureReturnList(this.userJson.account, this.userJson.bonita_user_id)

      // //C2獲取使用者可執行的單 (確認單號開啟)
      // this.getConfirmManufactureReturnList(this.userJson.account, this.userJson.bonita_user_id)

      // //C2獲取使用者可執行的單 (儲存製令單號)
      // this.getSaveManufactureReturnList(this.userJson.account, this.userJson.bonita_user_id)

      
    }
  }

  getUserMeeting: any
  getOneUserMeeting(): void {
    this.HttpApiService.getMeetingListUserByUserID(this.userJson.account_id, 1).
      subscribe(meetRequest => {
        this.meetingDatas = meetRequest
        //console.log(this.meetingDatas)
        this.getUserMeeting = this.meetingDatas.body.meeting
      })
  }

  totalmeeting: any[] = []
  meetingDatas: any
  totalmeet: any[] = []
  getMeetingUser(): void {
    this.HttpApiService.getMeetingUserRequest_t(1, 20).
      subscribe(meetRequest => {
        this.meetingDatas = meetRequest
        for (var i in this.meetingDatas.body.meeting) {
          if (String(this.meetingDatas.body.meeting[i].time_for_start).indexOf('.') == 1) {
            var converttime = String(this.meetingDatas.body.meeting[i].time_for_start).split('.')
            this.meetingDatas.body.meeting[i].time_for_start = '0' + String(converttime[0]) + ':30'
          }
          else if (String(this.meetingDatas.body.meeting[i].time_for_start).indexOf('.') == 2) {
            var converttime = String(this.meetingDatas.body.meeting[i].time_for_start).split('.')
            this.meetingDatas.body.meeting[i].time_for_start = String(converttime[0]) + ':30'
          }
          else {
            this.meetingDatas.body.meeting[i].time_for_start = String(this.meetingDatas.body.meeting[i].time_for_start) + ':00'
          }
          if (String(this.meetingDatas.body.meeting[i].time_for_end).indexOf('.') == 1) {
            var converttime = String(this.meetingDatas.body.meeting[i].time_for_end).split('.')
            this.meetingDatas.body.meeting[i].time_for_end = '0' + String(converttime[0]) + ':30'
          }
          else if (String(this.meetingDatas.body.meeting[i].time_for_end).indexOf('.') == 2) {
            var converttime = String(this.meetingDatas.body.meeting[i].time_for_end).split('.')
            this.meetingDatas.body.meeting[i].time_for_end = String(converttime[0]) + ':30'
          }
          else {
            this.meetingDatas.body.meeting[i].time_for_end = String(this.meetingDatas.body.meeting[i].time_for_end) + ':00'
          }
        }
        this.meetingDataSource.data = this.meetingDatas.body.meeting
        this.meetingDatatotalCount = this.meetingDatas.body.total
        //this.meetingDataSource.sort = this.meetingDatas.body.total
        this.meetingDataSource.paginator = this.paginator
        // for (var i in this.meetingDatas.body.meeting) {
        //   this.totalmeeting.push({ 'm_id': this.meetingDatas.body.meeting[i].m_id })
        //   this.totalmeet.push({'room': this.meetingDatas.body.meeting[i].room, 'time_for_start': this.meetingDatas.body.meeting[i].time_for_start, 'time_for_end': this.meetingDatas.body.meeting[i].time_for_end, 'date_for_start':this.meetingDatas.body.meeting[i].date_for_start})
        //   //this.getMeetingData(this.meetingDatas.body.meeting[i].m_id)
        // }
        for (var j = 0; j < (this.meetingDatas.body.total / 20); j++) {
          this.HttpApiService.getMeetingUserRequest_t(j + 2, 20)
            .subscribe(meetRequest => {
              this.meetingDatas = meetRequest
              // for (var i in this.meetingDatas.body.meeting) {
              //   this.totalmeeting.push({ 'm_id': this.meetingDatas.body.meeting[i].m_id })
              //   this.totalmeet.push({'room': this.meetingDatas.body.meeting[i].room, 'time_for_start': this.meetingDatas.body.meeting[i].time_for_start, 'time_for_end': this.meetingDatas.body.meeting[i].time_for_end, 'date_for_start':this.meetingDatas.body.meeting[i].date_for_start})
              //   //this.getMeetingData(this.meetingDatas.body.meeting[i].m_id)
              // }
            })
        }
      })
  }

  openCase(data:any) {
    //this.data.changeMessage("Hello from Sibling")
    this.dialog.open(CaseDialogComponent, {
      data
    });
  }

  userCaseCount: any
  userCaseDatas: any
  userCaseList: any[] = []
  b2List: B2List[] = []
  selectedCountries: B2List[];
  A1List: any[] = []
  C2List: any[] = []
  AllList:any[] = []
  getUserCase(account: any, bonitaUserId: any) {
    this.HttpApiService.getUserCaseCount(account, bonitaUserId).subscribe(res => {
      this.userCaseDatas = res
      console.log("該使用者可執行的所有單據res", this.userCaseDatas)
      // console.log("該使用者可執行的所有單據", this.userCaseDatas.body)
      // console.log(this.userCaseList)
      this.userCaseCount = this.userCaseDatas.body.length

      for (let i in this.userCaseDatas.body) {
        if (this.userCaseDatas.body[i].category == "A1") {

          this.A1case(this.userCaseDatas.body[i].name, this.userCaseDatas.body[i].count)

        } else if (this.userCaseDatas.body[i].category == "B2") {

          this.B2case(this.userCaseDatas.body[i].name, this.userCaseDatas.body[i].count)

        } else if (this.userCaseDatas.body[i].category == "C2") {

          this.C2case(this.userCaseDatas.body[i].name, this.userCaseDatas.body[i].count)

        }

      }
      // console.log("A1List", this.A1List)
      // console.log("B2List", this.b2List)
      for(let i in this.A1List){
        this.AllList.push(this.A1List[i])
      }

      for(let i in this.b2List){
        this.AllList.push(this.b2List[i])
      }

      console.log("AllList",this.AllList)

      this.openCase(this.AllList)
    })
  }

  A1case(name: any, count: any): void {
    switch (name) {
      case "任務工作送審":
        this.A1List.push({ name: "客需單——任務回報作業", router: "/main/cr-task-return", count: count });
        break;
      case "任務完工送審":
        this.A1List.push({ name: "客需單——任務回報作業", router: "/main/cr-task-return", count: count });
        break;
      case "直屬主管審核":
        this.A1List.push({ name: "客需單—任務完工審核作業", router: "/main/cr-task-audit", count: count });
        break;
      case "業務經理審核":
        this.A1List.push({ name: "客需單—待審核", router: "/main/cr-return", count: count });
        break;
      case "回覆簽核意見並指定專案經理":
        this.A1List.push({ name: "客需單—待審核", router: "/main/cr-return-director", count: count });
        break;
      case "PM人選確認並負責RD部門勾選":
        this.A1List.push({ name: "客需單—待審核", router: "/main/cr-return-top", count: count });
        break;
      case "指派各部門人員(可能1人或多人)":
        this.A1List.push({ name: "客需單—待指派會簽人員", router: "/main/cr-countersign-director", count: count });
        break;
      case "送交評估報告":
        this.A1List.push({ name: "客需單—待回報", router: "/main/cr-countersign", count: count });
        break;
      case "主管審核":
        this.A1List.push({ name: "客需單—待完工", router: "/main/cr-countersign-director-confirm", count: count });
        break;
      case "提交評估報告":
        this.A1List.push({ name: "客需單—PM待回報", router: "/main/cr-pm-evalution", count: count });
        break;
      case "業務簽核":
        this.A1List.push({ name: "客需單—待簽核", router: "/main/cr-sign", count: count });
        break;
      case "業務經理簽核":
        this.A1List.push({ name: "客需單—待簽核", router: "/main/cr-sign-manager", count: count });
        break;
      case "副總簽核":
        this.A1List.push({ name: "客需單—待簽核", router: "/main/cr-sign-director", count: count });
        break;
      case "業務經理結案審核":
        this.A1List.push({ name: "客需單—待結案", router: "/main/cr-close", count: count });
        break;
      case "副總結案審核":
        this.A1List.push({ name: "客需單—待結案", router: "/main/cr-close-director", count: count });
        break;
      case "總經理結案審核":
        this.A1List.push({ name: "客需單—待結案", router: "/main/cr-close-top", count: count });
        break;
      case "回報製令完工":
        this.A1List.push({ name: "客需單—製令處理待回報", router: "/main/cr-close-inform", count: count });
        break;
      case "製造部主管通知":
        this.A1List.push({ name: "客需單—製令處理待回報", router: "/main/cr-close-prodution", count: count });
        break;
      case "製令結案":
        this.A1List.push({ name: "客需單—製令待結案", router: "/main/cr-close-manufacture", count: count });
        break;

      default:
        break;
    }
    console.log("A1List",this.A1List)
  }

  B2case(name: any, count: any): void {
    switch (name) {
      case "PM待回報專案":
        this.b2List.push({ name: "專案—PM待回報", router: "/main/pm-return", count: count });
        break;
      case "專案完工送審":
        this.b2List.push({ name: "專案—待完工", router: "/main/pm-audit", count: count });
        break;
      case "專案任務工作回報":
        this.b2List.push({ name: "專案—任務待回報", router: "/main/task-return", count: count });
        break;
      case "會簽":
        this.b2List.push({ name: "專案—任務待會簽", router: "/main/pm-task-return", count: count });
        break;
      case "專案任務完工送審":
        this.b2List.push({ name: "專案—任務待完工", router: "/main/task-audit", count: count });
        break;
      case "確認會簽內容":
        this.b2List.push({ name: "專案—任務待會簽確認", router: "/main/task-check", count: count });
        break;
      default:
        break;
    }

    console.log("B2List",this.b2List)
  }

  C2case(name: any, count: any): void {
    switch (name) {
      case "單位主管審核":
        this.b2List.push({ name: "製令單—待審核", router: "/main/project-C/project-infomanufacture-orderaudit", count: count });
        break;
      case "生管(製造)審核":
        this.b2List.push({ name: "製令單—待審核", router: "/main/manufacture-order-qc", count: count });
        break;
      case "總經理審核":
        this.b2List.push({ name: "製令單—待審核", router: "/main/manufacture-order-mg", count: count });
        break;
      case "確認單號開啟":
        this.b2List.push({ name: "製令單—待回覆", router: "/main/manufacture-order-sa", count: count });
        break;
      case "儲存製令單號":
        this.b2List.push({ name: "製令單—待回覆", router: "/main/manufacture-order-re", count: count });
        break;
      default:
        break;
    }

    console.log("C2List",this.C2List)
  }


  //取得主管異動工時審核
  labordirectCaseData: any
  labordirectCaseTotal: any
  getlabordirectCaseList(account: any, userId: any): void {
    this.HttpApiService.getLaborDirectBonitaCaseList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.labordirectCaseData = res
      // console.log("主管異動工時審核筆數", this.labordirectCaseData.body.length)
      this.labordirectCaseTotal = this.labordirectCaseData.body.length
      // console.log("主管異動工時審核", this.labordirectCaseData.body)
    })
  }

  //個人已提報異動工時
  userLaborHourModifyData: any
  userLaborHourModifyTotal: any
  getByUserIdList(userId: any) {
    this.HttpApiService.getByUserIdListRequest(userId).subscribe(res => {
      // console.log("labor_hour_modify res", res.body.labor_hour_modify)
      this.userLaborHourModifyData = res.body.labor_hour_modify
      // console.log("個人已提報異動工時", this.userLaborHourModifyData)
      this.userLaborHourModifyTotal = res.body.labor_hour_modify.length
      // console.log("個人已提報異動工時筆數", this.userLaborHourModifyTotal)
    })
  }

  //獲取使用者可執行的單 (異動紀錄重新送審)
  userReLaborHourModifyData: any
  userReLaborHourModifyTotal: any
  getByUserReIdList(account: any, bonita_case_id: any) {
    this.HttpApiService.getLaborBonitaCaseList(account, bonita_case_id).subscribe(res => {
      // console.log("labor_hour_modify res", res.body.labor_hour_modify)
      this.userReLaborHourModifyData = res.body.labor_hour_modify
      // console.log("個人異動紀錄重新送審", this.userReLaborHourModifyData)
      this.userReLaborHourModifyTotal = res.body.labor_hour_modify.length
      // console.log("個人異動紀錄重新送審", this.userReLaborHourModifyTotal)
    })
  }


  //B2==========================================================================================================
  userCaseData: any
  pmCaseTotal: any
  //獲取使用者可執行的單
  getUserCaseList(account: any, userId: any): void {
    // console.log(account, userId)
    this.HttpApiService.getUserCaseList(account, userId).subscribe(res => {
      // console.log("res", res)
      this.userCaseData = res
      // console.log("(PM)待回報筆數", this.userCaseData.body.length)
      this.pmCaseTotal = this.userCaseData.body.length
      // console.log("(PM)待回報", this.userCaseData.body)
      this.showData(this.projectDataSource, this.totalCount, this.userCaseData.body, this.paginator)
    })
  }

  //取得TM待回報專案任務筆數
  userTmReturnCaseData: any
  tmCaseTotal: any
  getUserTmCaseList(account: any, userId: any): void {
    this.HttpApiService.getUserTMCaseList(account, userId).subscribe(res => {
      // console.log("res", res)
      this.userTmReturnCaseData = res
      // console.log("TM待回報專案任務筆數", this.userTmReturnCaseData.body.length)
      this.tmCaseTotal = this.userTmReturnCaseData.body.length
      // console.log("TM待回報專案任務", this.userTmReturnCaseData.body)
      this.showData(this.taskReturnDataSource, this.taskReturnTotalCount, this.userTmReturnCaseData.body, this.paginator2)
    })
  }


  //TM待部門主管完工專案任務筆數
  userTmAuditCaseData: any
  tmAuditCaseTotal: any
  getUserTmAuditCaseList(account: any, userId: any): void {
    this.HttpApiService.getUserTMAuditCaseList(account, userId).subscribe(res => {
      // console.log("res", res)
      this.userTmAuditCaseData = res
      // console.log("TM待完工專案任務筆數", this.userTmAuditCaseData.body.length)
      this.tmAuditCaseTotal = this.userTmAuditCaseData.body.length
      // console.log("TM待完工專案任務", this.userTmAuditCaseData.body)
      this.showData(this.taskAuditDataSource, this.tmAuditCaseTotal, this.userTmAuditCaseData.body, this.paginator3)
    })
  }

  //取得最高主管待完工PM單(待完工)
  userPmAuditCaseData: any
  pmAuditCaseTotal: any
  getUserPmAuditCaseList(account: any, userId: any): void {
    this.HttpApiService.getUserAuditCaseList(account, userId).subscribe(res => {
      // console.log("res", res)
      this.userPmAuditCaseData = res
      // console.log("(PM)最高主管待完工筆數", this.userPmAuditCaseData.body.length)
      this.pmAuditCaseTotal = this.userPmAuditCaseData.body.length
      // console.log("(PM)最高主管待完工", this.userPmAuditCaseData.body)
      this.showData(this.projectAuditprojectDataSource, this.pmAuditCaseTotal, this.userPmAuditCaseData.body, '')
    })
  }

  // 顯示資料
  showData(dataSource: any, total: any, data: any, paginator: any) {
    // console.log(data)
    dataSource.data = data;//將資料帶入
    total = data.length;//計算資料長度
    dataSource.sort = this.sort;
    //dataSource.paginator = paginator;
  }

  //A1==========================================================================================================

  userCrReturnData_A1: any
  crRerurnTotal_A1: any
  //A1獲取使用者可執行的單 (業務經理審核)
  getCrReturnList_A1(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getCrReturnList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userCrReturnData_A1 = res
      //// console.log("A1筆數(業務經理審核)", this.userCrReturnData_A1.body.length)
      // if(this.userCrReturnData_A1 != null){

      // }
      this.crRerurnTotal_A1 = this.userCrReturnData_A1.body.length
      // console.log("A1(業務經理審核)", this.userCrReturnData_A1.body)

      this.showData(this.CRDataSource, this.crRerurnTotal_A1, this.userCrReturnData_A1.body, this.paginator6)
    })
  }

  userCrReturnData_A2: any
  crRerurnTotal_A2: any
  //A2獲取使用者可執行的單 (回覆簽核意見並指定專案經理)
  getCrReturnList_A2(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getDirectorCrReturnList(account, userId).subscribe(res => {
      console.log("res", res)
      this.userCrReturnData_A2 = res
      //// console.log("A2筆數(回覆簽核意見並指定專案經理)", this.userCrReturnData_A2.body.length)
      this.crRerurnTotal_A2 = this.userCrReturnData_A2.body.length
      // console.log("A2(回覆簽核意見並指定專案經理)", this.userCrReturnData_A2.body)

      this.showData(this.CRDataSource_A2, this.crRerurnTotal_A2, this.userCrReturnData_A2.body, this.paginator7)
    })
  }

  userCrReturnData_A3: any
  crRerurnTotal_A3: any
  //A3獲取使用者可執行的單 (PM人選確認並負責RD部門勾選)
  getCrReturnList_A3(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getTopCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_A3 = res
      //// console.log("A3筆數(PM人選確認並負責RD部門勾選)", this.userCrReturnData_A3.body.length)
      this.crRerurnTotal_A3 = this.userCrReturnData_A3.body.length
      // console.log("A3(PM人選確認並負責RD部門勾選)", this.userCrReturnData_A3.body)

      this.showData(this.CRDataSource_A3, this.crRerurnTotal_A3, this.userCrReturnData_A3.body, this.paginator8)
    })
  }

  userCrReturnData_C: any
  crRerurnTotal_C: any
  //C 獲取使用者可執行的單 (會簽主管指派各部門人員(可能1人或多人))
  getCrReturnList_C(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getDispatchCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_C = res
      //// console.log("C筆數(會簽主管指派各部門人員(可能1人或多人))", this.userCrReturnData_C.body.length)
      this.crRerurnTotal_C = this.userCrReturnData_C.body.length
      // console.log("C(會簽主管指派各部門人員(可能1人或多人))", this.userCrReturnData_C.body)

      this.showData(this.CRDataSource_C, this.crRerurnTotal_C, this.userCrReturnData_C.body, this.paginator8)
    })
  }

  userCrReturnData_D: any
  crRerurnTotal_D: any
  //D 獲取使用者可執行的單 (會簽人員送交評估報告)
  getCrReturnList_D(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getEvaluationCrReturnList(account, userId).subscribe(res => {
      // console.log("res", res)
      this.userCrReturnData_D = res
      //// console.log("D筆數(會簽人員送交評估報告)", this.userCrReturnData_D.body.length)
      this.crRerurnTotal_D = this.userCrReturnData_D.body.length
      console.log("D(會簽人員送交評估報告)", this.userCrReturnData_D.body)
      this.showData(this.CRDataSource_D, this.crRerurnTotal_D, this.userCrReturnData_D.body, this.paginator9)
    })
  }

  userCrReturnData_E: any
  crRerurnTotal_E: any
  //E 獲取使用者可執行的單 (會簽主管審核)
  getCrReturnList_E(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getCountersignCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_E = res
      //// console.log("E(會簽主管審核)", this.userCrReturnData_E.body.length)
      this.crRerurnTotal_E = this.userCrReturnData_E.body.length
      console.log("E(會簽主管審核)", this.userCrReturnData_E.body)
      this.showData(this.CRDataSource_E, this.crRerurnTotal_E, this.userCrReturnData_E.body, this.paginator10)
    })
  }

  userCrReturnData_F: any
  crRerurnTotal_F: any
  //F 獲取使用者可執行的單 (PM送審評估報告) Pm待回報客需單
  getCrReturnList_F(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getPMEvaluationCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_F = res
      //// console.log("F筆數(PM送審評估報告)", this.userCrReturnData_F.body.length)
      this.crRerurnTotal_F = this.userCrReturnData_F.body.length
      console.log("F(會簽主管審核)", this.userCrReturnData_F.body)
      this.showData(this.CRDataSource_F, this.crRerurnTotal_F, this.userCrReturnData_F.body, '')
    })
  }

  userCrReturnData_G: any
  crRerurnTotal_G: any
  //G 獲取使用者可執行的單 (業務簽核)
  getCrReturnList_G(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getBusinessCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_G = res
      // console.log("G筆數(業務簽核)", this.userCrReturnData_G.body.length)
      this.crRerurnTotal_G = this.userCrReturnData_G.body.length
      // console.log("G(業務簽核)", this.userCrReturnData_G.body)
      this.showData(this.CRDataSource_G, this.crRerurnTotal_G, this.userCrReturnData_G.body, '')
    })
  }

  userCrReturnData_H: any
  crRerurnTotal_H: any
  //H 獲取使用者可執行的單 (業務經理簽核)
  getCrReturnList_H(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getBusinessManagerCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_H = res
      // console.log("H筆數(業務經理簽核)", this.userCrReturnData_H.body.length)
      this.crRerurnTotal_H = this.userCrReturnData_H.body.length
      // console.log("H(業務經理簽核)", this.userCrReturnData_H.body)
      this.showData(this.CRDataSource_H, this.crRerurnTotal_H, this.userCrReturnData_H.body, '')
    })
  }

  userCrReturnData_I: any
  crRerurnTotal_I: any
  //I 獲取使用者可執行的單 (業務副總簽核)
  getCrReturnList_I(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getBusinessDirectorCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_I = res
      // console.log("I筆數(業務副總簽核)", this.userCrReturnData_I.body.length)
      this.crRerurnTotal_I = this.userCrReturnData_I.body.length
      // console.log("I(業務副總簽核)", this.userCrReturnData_I.body)
      this.showData(this.CRDataSource_I, this.crRerurnTotal_I, this.userCrReturnData_I.body, '')
    })
  }

  userCrReturnData_J: any
  crRerurnTotal_J: any
  //J 獲取使用者可執行的單 (業務經理結案審核)
  getCrReturnList_J(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getDepartmentCloseCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_J = res
      // console.log("J筆數(業務經理結案審核)", this.userCrReturnData_J.body.length)
      this.crRerurnTotal_J = this.userCrReturnData_J.body.length
      // console.log("J(業務經理結案審核)", this.userCrReturnData_J.body)
      this.showData(this.CRDataSource_J, this.crRerurnTotal_J, this.userCrReturnData_J.body, '')
    })
  }

  userCrReturnData_K: any
  crRerurnTotal_K: any
  //K 獲取使用者可執行的單 (業務副總結案審核)
  getCrReturnList_K(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getDirectorCloseCloseCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_K = res
      // console.log("K筆數 (業務副總結案審核)", this.userCrReturnData_K.body.length)
      this.crRerurnTotal_K = this.userCrReturnData_K.body.length
      // console.log("K (業務副總結案審核)", this.userCrReturnData_K.body)
      this.showData(this.CRDataSource_K, this.crRerurnTotal_K, this.userCrReturnData_K.body, '')
    })
  }

  userCrReturnData_L: any
  crRerurnTotal_L: any
  //L 獲取使用者可執行的單 (總經理結案審核)
  getCrReturnList_L(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getTopCloseCloseCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_L = res
      // console.log("L筆數 (總經理結案審核)", this.userCrReturnData_L.body.length)
      this.crRerurnTotal_L = this.userCrReturnData_L.body.length
      // console.log("L (總經理結案審核)", this.userCrReturnData_L.body)
      this.showData(this.CRDataSource_L, this.crRerurnTotal_L, this.userCrReturnData_L.body, '')
    })
  }

  userCrReturnData_M: any
  crRerurnTotal_M: any
  //M 獲取使用者可執行的單 (回報製令完工)
  getCrReturnList_M(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getCountersignCloseCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_M = res
      // console.log("M筆數 (回報製令完工)", this.userCrReturnData_M.body.length)
      this.crRerurnTotal_M = this.userCrReturnData_M.body.length
      // console.log("M (回報製令完工)", this.userCrReturnData_M.body)
      this.showData(this.CRDataSource_M, this.crRerurnTotal_M, this.userCrReturnData_M.body, '')
    })
  }

  userCrReturnData_N: any
  crRerurnTotal_N: any
  //N 獲取使用者可執行的單 (製令結案)
  getCrReturnList_N(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getPmCloseCrReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.userCrReturnData_N = res
      // console.log("N筆數 (製令結案)", this.userCrReturnData_N.body.length)
      this.crRerurnTotal_N = this.userCrReturnData_N.body.length
      // console.log("N (製令結案)", this.userCrReturnData_N.body)
      this.showData(this.CRDataSource_N, this.crRerurnTotal_N, this.userCrReturnData_N.body, '')
    })
  }

  userCrReturnData_O: any
  crRerurnTotal_O: any
  //O 獲取使用者可執行的單 
  getCrReturnList_O(account: any, userId: any): void {
    //console.log(account, userId)
    this.HttpApiService.getA1BonitaCaseListProductionClose(account, userId).subscribe(res => {
      //console.log("res", res)
      this.userCrReturnData_O = res
      // console.log("N筆數 ", this.userCrReturnData_N.body.length)
      this.crRerurnTotal_O = this.userCrReturnData_O.body.length
      // console.log("N ", this.userCrReturnData_N.body)

      this.showData(this.CRDataSource_O, this.crRerurnTotal_O, this.userCrReturnData_O.body, '')
    })
  }

  crTaskRerurnData: any
  crTaskRerurnTotal: any
  //A1獲取使用者可執行的單 (任務完工送審)
  getTaskFinishReturnList(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getTaskFinishReturnList(account, userId).subscribe(res => {
      // console.log("res", res)
      this.crTaskRerurnData = res
      // console.log("筆數 (任務完工送審)", this.crTaskRerurnData.body.length)
      this.crTaskRerurnTotal = this.crTaskRerurnData.body.length
      // console.log(" (任務完工送審)", this.crTaskRerurnData.body)
      this.showData(this.CRDataSource_task, this.crTaskRerurnTotal, this.crTaskRerurnData.body, '')
    })
  }

  crTaskManagerRerurnData: any
  crTaskManagerRerurnTotal: any
  //A1獲取使用者可執行的單 (任務直屬主管審核)
  getTaskFinishManagerReturnList(account: any, userId: any): void {
    //// console.log(account, userId)
    this.HttpApiService.getTaskFinishManagerReturnList(account, userId).subscribe(res => {
      //// console.log("res", res)
      this.crTaskManagerRerurnData = res
      // console.log("筆數 (任務直屬主管審核)", this.crTaskManagerRerurnData.body.length)
      this.crTaskManagerRerurnTotal = this.crTaskManagerRerurnData.body.length
      // console.log(" (任務直屬主管審核)", this.crTaskManagerRerurnData.body)
      this.showData(this.CRDataSource_task_manager, this.crTaskManagerRerurnTotal, this.crTaskManagerRerurnData.body, '')
    })
  }

  // //B2==========================================================================================================
  // userPmCaseData: any
  // pmCaseTotal: any
  // //獲取使用者可執行的單(PM待回報)
  // getUserCaseList(account: any, userId: any): void {
  //   //// console.log(account, userId)
  //   this.HttpApiService.getUserCaseList(account, userId).subscribe(res => {
  //     // console.log("res", res)
  //     this.userPmCaseData = res
  //     // console.log("(PM)待回報筆數", this.userPmCaseData.body.length)
  //     this.pmCaseTotal = this.userPmCaseData.body.length
  //     // console.log("(PM)待回報", this.userPmCaseData.body)

  //   })
  // }

  // //取得最高主管待完工PM單(待完工)
  // userPmAuditCaseData: any
  // pmAuditCaseTotal: any
  // getUserPmAuditCaseList(account: any, userId: any): void {
  //   this.HttpApiService.getUserAuditCaseList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.userPmAuditCaseData = res
  //     // console.log("(PM)最高主管待完工筆數", this.userPmAuditCaseData.body.length)
  //     this.pmAuditCaseTotal = this.userPmAuditCaseData.body.length
  //     // console.log("(PM)最高主管待完工", this.userPmAuditCaseData.body)
  //   })
  // }

  // //取得TM待回報專案任務筆數
  // userTmReturnCaseData: any
  // tmCaseTotal: any
  // getUserTmCaseList(account: any, userId: any): void {
  //   this.HttpApiService.getUserTMCaseList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.userTmReturnCaseData = res
  //     // console.log("TM待回報專案任務筆數", this.userTmReturnCaseData.body.length)
  //     this.tmCaseTotal = this.userTmReturnCaseData.body.length
  //     // console.log("TM待回報專案任務", this.userTmReturnCaseData.body)
  //   })
  // }

  // //TM待部門主管完工專案任務筆數
  // userTmAuditCaseData: any
  // tmAuditCaseTotal: any
  // getUserTmAuditCaseList(account: any, userId: any): void {
  //   this.HttpApiService.getUserTMAuditCaseList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.userTmAuditCaseData = res
  //     // console.log("TM待完工專案任務筆數", this.userTmAuditCaseData.body.length)
  //     this.tmAuditCaseTotal = this.userTmAuditCaseData.body.length
  //     // console.log("TM待完工專案任務", this.userTmAuditCaseData.body)
  //   })
  // }

  // //取得PM會簽任務列表
  // userPmCounterSignData: any
  // tmCounterSignTotal: any
  // getUserPmCounterSignList(account: any, userId: any): void {
  //   this.HttpApiService.getUserCounterSignList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.userPmCounterSignData = res
  //     // console.log("PM會簽任務筆數", this.userPmCounterSignData.body.length)
  //     this.tmCounterSignTotal = this.userPmCounterSignData.body.length
  //     // console.log("PM會簽任務", this.userPmCounterSignData.body)
  //   })
  // }

  // //取得專案任務會簽確認
  // taskCheckData: any
  // taskCheckTotal: any
  // getTaskCheckList(account: any, userId: any): void {
  //   this.HttpApiService.GetTaskCheckCaseList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.taskCheckData = res
  //     // console.log("專案任務會簽確認筆數", this.taskCheckData.body.length)
  //     this.taskCheckTotal = this.taskCheckData.body.length
  //     // console.log("專案任務會簽確認", this.taskCheckData.body)
  //   })
  // }

  // //C2--------------------------------------------------------------------------

  // userMReturnData: any
  // MRerurnTotal: any
  // //C2獲取使用者可執行的單 (單位主管審核)
  // getManufactureReturnList(account: any, userId: any): void {
  //   //// console.log(account, userId)
  //   this.HttpApiService.getManufactureReturnList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.userMReturnData = res
  //     // console.log("C2筆數 (單位主管審核)", this.userMReturnData.body.length)
  //     this.MRerurnTotal = this.userMReturnData.body.length
  //     // console.log("C2 (單位主管審核)", this.userMReturnData.body)

  //   })
  // }

  // userMMReturnData: any
  // MMRerurnTotal: any
  // //C2獲取使用者可執行的單 (生管-製造-審核)
  // getManufactureManufactureReturnList(account: any, userId: any): void {
  //   //// console.log(account, userId)
  //   this.HttpApiService.getManufactureManufactureReturnList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.userMMReturnData = res
  //     // console.log("C2筆數 (生管-製造-審核)", this.userMMReturnData.body.length)
  //     this.MMRerurnTotal = this.userMMReturnData.body.length
  //     // console.log("C2 (生管-製造-審核)", this.userMMReturnData.body)

  //   })
  // }

  // userTopMReturnData: any
  // TopMRerurnTotal: any
  // //C2獲取使用者可執行的單 (總經理審核)
  // getTopManufactureReturnList(account: any, userId: any): void {
  //   //// console.log(account, userId)
  //   this.HttpApiService.getTopManufactureReturnList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.userTopMReturnData = res
  //     // console.log("C2筆數 (總經理審核)", this.userTopMReturnData.body.length)
  //     this.TopMRerurnTotal = this.userTopMReturnData.body.length
  //     // console.log("C2 (總經理審核)", this.userTopMReturnData.body)

  //   })
  // }

  // userConfirmMReturnData: any
  // ConfirmMRerurnTotal: any
  // //C2獲取使用者可執行的單 (確認單號開啟)
  // getConfirmManufactureReturnList(account: any, userId: any): void {
  //   //// console.log(account, userId)
  //   this.HttpApiService.getConfirmManufactureReturnList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.userConfirmMReturnData = res
  //     // console.log("C2筆數 (確認單號開啟)", this.userConfirmMReturnData.body.length)
  //     this.ConfirmMRerurnTotal = this.userConfirmMReturnData.body.length
  //     // console.log("C2 (確認單號開啟)", this.userConfirmMReturnData.body)

  //   })
  // }

  // userSaveMReturnData: any
  // SaveMRerurnTotal: any
  // //C2獲取使用者可執行的單 (儲存製令單號)
  // getSaveManufactureReturnList(account: any, userId: any): void {
  //   //// console.log(account, userId)
  //   this.HttpApiService.getSaveManufactureReturnList(account, userId).subscribe(res => {
  //     //// console.log("res", res)
  //     this.userSaveMReturnData = res
  //     // console.log("C2筆數 (儲存製令單號)", this.userSaveMReturnData.body.length)
  //     this.SaveMRerurnTotal = this.userSaveMReturnData.body.length
  //     // console.log("C2 (儲存製令單號)", this.userSaveMReturnData.body)

  //   })
  // }


  projectManagerRequests: any;
  projectDatas: any;
  // totalCount: number;
  //取得project資料---------------------------------------
  getProjectManagerRequsts(): void {
    this.HttpApiService.getProjectRequest()
      .subscribe(projectManagerRequests => {
        // console.log(projectManagerRequests)
        this.projectDatas = projectManagerRequests.result;
        //this.showData(projectManagerRequests.result);
      },
        (err: any) => {
          // console.log('err:', err);
        }
      );
  }

  p_id: any = ''
  //取得該id之project資料---------------------------------------
  getEditProject(): void {
    //取得id
    this.p_id = this.route.snapshot.paramMap.get('p_id');
    //print id
    //// console.log(this.p_id);
    //server getOne
    this.HttpApiService.getOneProjectRequest(this.p_id).
      subscribe(project => {
        this.projectDatas = project;
        // console.log("取得的id=")
        // console.log(this.projectDatas.message.p_id)
      },
        (err: any) => {
          // console.log('err:', err);
        }
      );
  }

  t_id: any = '';
  taskRequest: any;
  taskDatas: any;
  tasktotalCount: any;
  //取得任務task資料-----------------------------------------------------------------
  getEditTaskRequest(): void {
    //取得id

    this.HttpApiService.getOneTaskRequest("2")
      .subscribe(taskRequest => {
        // console.log("任務資料=")
        // console.log(taskRequest)
        this.taskDatas = taskRequest;
      },
        (err: any) => {
          // console.log('err:', err);
        }
      );
  }

  testAlert(): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '您是否確定要刪除?',
      text: "送出後即刪除且不可恢復!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除!',
      cancelButtonText: '取消!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '已刪除!',
          '此項目已成功刪除.',
          'success'
        )
        /*動作程式 */
        this.HttpApiService.getProjectRequest_t(1, 20).subscribe(res => {
          // console.log(res)
          // console.log("成功~~~~~~~~~~~~~")
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '已取消!',
          '此項目未被刪除',
          'error'
        )
      }
    })
  }

  //宣告任務的dataSource
  taskDataSource = new MatTableDataSource();
  teskcol = ['todo_status', 't_type', 't_name', 'remark', 'date_for_estimated_start', 'date_for_estimated_completion', 'landmark', 'action_edit', 'action_copy', 'action_delete'];

  //待辦事項
  //task表
  //t_id:any
  todo_type_id: any
  t_name: any
  remark: any
  date_for_estimated_start: any;
  date_for_estimated_completion: any;
  landmark: any = true;//暫時當重要性
  todo_status: any = false;
  origin_id = '05410602-165a-4eab-8938-54392fdd571f'
  //待辦事項
  getTaskRequest() {
    this.HttpApiService.getTaskByOriginIDAndUserID(this.origin_id, this.userJson.account_id).
      subscribe(res => {
        console.log(res)
        this.taskDatas = res.body.task
        console.log(this.taskDatas)
        this.showData(this.taskDataSource, this.totalCount, this.taskDatas, this.paginator)
      })

  }

  // showData(data: any) {
  //   this.taskDataSource.data = data;//將資料帶入
  //   this.totalCount = data.length;//計算資料長度
  //   this.taskDataSource.sort = this.sort;
  //   this.taskDataSource.paginator = this.paginator;
  // }

}
