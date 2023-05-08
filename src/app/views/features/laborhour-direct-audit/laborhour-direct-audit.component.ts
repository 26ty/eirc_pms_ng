import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpApiService } from './../../../api/http-api.service';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-laborhour-direct-audit',
  templateUrl: './laborhour-direct-audit.component.html',
  styleUrls: ['./laborhour-direct-audit.component.scss']
})
export class LaborhourDirectAuditComponent implements OnInit {

  laborhourauditDataSource = new MatTableDataSource();
  displayedColumns: string[] = ['p_code', 'p_name', 't_code', 't_name', 'creater_name','title', 'create_time', 'action_edit'];
  totalCount!: number;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private HttpApiService: HttpApiService,
  ) { }

  ngOnInit(): void {
    this.getUserJson()

    //取得工時異動
    this.getlabordirectCaseList(this.userJson.account, this.userJson.bonita_user_id)
  }

  userJson: any
  getUserJson(): void {
    console.log(window.localStorage.getItem(TOKEN_KEY))
    console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
  }

  /** 
  * @brief 取得主管待審核異動工時資料&筆數
  * @param account 使用者帳號
  * @param userId 使用者id
  * @return 回傳有無成功取得. */
  labordirectCaseData: any
  labordirectCaseTotal: any
  getlabordirectCaseList(account: any, userId: any): void {
    this.HttpApiService.getLaborDirectBonitaCaseList(account, userId).subscribe(res => {
      //console.log("res", res)
      this.labordirectCaseData = res
      console.log("主管異動工時審核筆數", this.labordirectCaseData.body.length)
      this.labordirectCaseTotal = this.labordirectCaseData.body.length
      console.log("主管異動工時審核", this.labordirectCaseData.body)

      this.showData(this.labordirectCaseData.body)
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
}
