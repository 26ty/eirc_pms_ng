import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpApiService } from './../../../api/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cr-pm-return',
  templateUrl: './cr-pm-return.component.html',
  styleUrls: ['./cr-pm-return.component.scss']
})
export class CrPmReturnComponent implements OnInit {

  displayedColumns: string[] = ['code', 'subject', 'salesman_id', 'create_time', 'action_edit'];
  projectDataSource = new MatTableDataSource();
  totalCount!: number;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCustomerRequests();
  }

  projectManagerRequests: any;
  projectDatas: any;

  //取得project資料---------------------------------------
  getCustomerRequests(): void {
    this.HttpApiService.getCustomerRequest(1, 20)
      .subscribe(customerRequests => {
        console.log(customerRequests.result)
        this.showData(customerRequests.result);
        /*this.projectManagerRequests = projectManagerRequests.object;//---一般寫法
        console.log(this.projectManagerRequests);*///console資料
        //console.log(this.B1B2DataSource);///console資料
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  // 顯示資料
  showData(data: any) {
    console.log(data)
    this.projectDataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.projectDataSource.sort = this.sort;
    this.projectDataSource.paginator = this.paginator;
  }



}
