import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpApiService } from './../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-cr-labor-hour-dialog',
  templateUrl: './cr-labor-hour-dialog.component.html',
  styleUrls: ['./cr-labor-hour-dialog.component.scss']
})
export class CrLaborHourDialogComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['nature', 'h_title', 'time_for_start', 'time_for_end', 'action_delete', 'action_file'];
  laborHourDataSource = new MatTableDataSource();
  totalCount!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private crdata: any,
    private httpApiService: HttpApiService
  ) { }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
    //取得工時資料
    this.getLaborHourRequest()
  }

  //取得全部laborhour參數設定---------------------------------
  laborHourRequest: any;
  laborHourDatas: any;
  getLaborHourRequest(): void {
    if (this.crdata.cu_id) {
      this.httpApiService.getLaborHourByCUId(this.crdata.cu_id)
        .subscribe(laborHourRequest => {
          console.log(laborHourRequest)
          this.laborHourDatas = laborHourRequest.body.labor_hour
          this.showData(this.laborHourDatas);
          console.log(this.laborHourDatas)
          //console.log(typeof (this.laborHourDatas[0].time_for_start))
        });
    } else if (this.crdata.t_id) {
      this.httpApiService.getLaborHourListByUserId(this.userJson.account_id, this.crdata.t_id)
        .subscribe(laborHourRequest => {
          this.laborHourDatas = laborHourRequest.body.labor_hour
          this.showData(this.laborHourDatas);
          console.log(this.laborHourDatas)
          //console.log(typeof (this.laborHourDatas[0].time_for_start))
        });
    }

  }

  // 顯示資料
  labortotalCount: any;
  showData(data: any) {
    console.log(data)
    this.laborHourDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.laborHourDataSource.sort = this.sort;
    this.laborHourDataSource.paginator = this.paginator;
  }

}
