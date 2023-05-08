import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpApiService } from './../../../api/http-api.service';
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Component({
  selector: 'app-laborhour-return',
  templateUrl: './laborhour-return.component.html',
  styleUrls: ['./laborhour-return.component.scss']
})
export class LaborhourReturnComponent implements OnInit {

  laborhourauditDataSource = new MatTableDataSource();
  displayedColumns: string[] = ['status','project_code', 'title', 'nature', 'task_user_name','date_for_start', 'time_for_start','time_for_end','laborhour', 'create_time', 'action_edit'];
  totalCount!: number;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private HttpApiService: HttpApiService,
  ) { }

  ngOnInit(): void {
    this.getUserJson()

    //取得個人已提報異動工時
    this.getByUserLaborIdList(this.userJson.account_id)
  }

  userJson: any
  getUserJson(): void {
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
  }


  userLaborHourModifyData:any
  userLaborHourModifyTotal:any
  /** 
  * @brief 取得個人已提報異動工時
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  getByUserLaborIdList(userId:any){
    this.HttpApiService.getByUserIdListRequest(userId).subscribe(res => {
      console.log("labor_hour_modify res",res.body.labor_hour_modify)
      this.userLaborHourModifyData = res.body.labor_hour_modify
      console.log("個人已提報異動工時", this.userLaborHourModifyData)
      this.userLaborHourModifyTotal = res.body.labor_hour_modify.length
      console.log("個人已提報異動工時筆數", this.userLaborHourModifyTotal)

      for(let i in this.userLaborHourModifyData){
        console.log("bonita_case_id",this.userLaborHourModifyData[i].bonita_case_id)
        this.getByUserReIdList(this.userJson.account,this.userLaborHourModifyData[i].bonita_case_id)
      }
      this.showData(this.userLaborHourModifyData)
    })
  }

  /** 
  * @brief 顯示表格資料
  *
  * @param data 表格資料
  * @return 回傳有無成功顯示. */
  showData(data: any) {
    //console.log(data)
    this.laborhourauditDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.laborhourauditDataSource.sort = this.sort;
    this.laborhourauditDataSource.paginator = this.paginator;
  }

  //
  /** 
  * @brief 獲取使用者可執行的單 (取得異動紀錄重新送審的工時資料)
  * @param account 使用者帳號
  * @param bonita_case_id bonita重送任務id
  * @return 回傳有無成功取得. */
  userReLaborHourModifyData:any
  userReLaborHourModifyTotal:any
  getByUserReIdList(account:any,bonita_case_id:any){
    this.HttpApiService.getLaborBonitaCaseList(account,bonita_case_id).subscribe(res => {
      console.log("labor_hour_modify res",res.body)
      // this.userReLaborHourModifyData = res.body.labor_hour_modify
      // console.log("個人異動紀錄重新送審", this.userReLaborHourModifyData)
      // this.userReLaborHourModifyTotal = res.body.labor_hour_modify.length
      // console.log("個人異動紀錄重新送審", this.userReLaborHourModifyTotal)
    })
  }

}
