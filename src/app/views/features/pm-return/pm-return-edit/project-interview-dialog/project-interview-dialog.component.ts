import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpApiService } from 'src/app/api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-project-interview-dialog',
  templateUrl: './project-interview-dialog.component.html',
  styleUrls: ['./project-interview-dialog.component.scss']
})
export class ProjectInterviewDialogComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private pmDatas: any
  ) { }

  ngOnInit(): void {
    this.getInterviewRequest()
  }

  //宣告訪問紀錄interview的dataSource  PM
  interviewDataSource = new MatTableDataSource();
  interviewcol: string[] = ['create_time' , 'creater_name', 'actor','content' ];
  //取得訪問紀錄interview資料 PM -------------------------------------------------------
  interviewRequest: any;
  interviewDatas: any;
  getInterviewRequest(): void {
    this.HttpApiService.getOneTransactionRecordRequest_t(this.pmDatas.p_id).subscribe(res =>{
      this.interviewDatas = res.body.transaction_record
      console.log(this.interviewDatas)
      this.interviewDataSource.data = this.interviewDatas
      this.interviewDataSource.sort = this.sort
      this.interviewDataSource.paginator = this.paginator
    })
  }
}
