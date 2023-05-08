import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpApiService } from './../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cd-interview-dialog',
  templateUrl: './cd-interview-dialog.component.html',
  styleUrls: ['./cd-interview-dialog.component.scss']
})
export class CdInterviewDialogComponent implements OnInit {

  @ViewChild('interviewSortSort') interviewSortSort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  //宣告訪問紀錄interview的dataSource
  interviewDataSource = new MatTableDataSource();

  interviewcol: string[] = ['create_time', 'creater_name', 'content', 'remark'];

  constructor(
    @Inject(MAT_DIALOG_DATA) private crdata: any,
    private httpApiService: HttpApiService
  ) { }

  crDatas: any;


  ngOnInit(): void {
    //取得interview資料
    this.getInterviewRequest();
  }

  //取得訪問紀錄interview資料--------------------------------------------------------
  interviewRequest: any;
  interviewDatas: any;
  getInterviewRequest(): void {

    this.httpApiService.getOneTransactionRecordRequest_t(this.crdata.c_id).subscribe(res => {
      this.interviewDatas = res.body.transaction_record
      //console.log(this.interviewDatas)
      this.interviewDataSource.data = this.interviewDatas
      this.interviewDataSource.sort = this.interviewSortSort
      this.interviewDataSource.paginator = this.paginator


      //console.log(this.department_interview)
    })
  }

}
