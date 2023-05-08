import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpApiService } from './../../../api/http-api.service';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(
    private HttpApiService: HttpApiService,
  ) { }


  array = [
    {id:'C108118217',name:'陳念歆'},
    {id:'C108118213',name:'林彥東'}
  ]
  //宣告projectmanager dataSource
  B1B2DataSource = new MatTableDataSource();
  userCol=['account','name','role_id']
  ngOnInit(): void {
    this.getAllUser()
  }

  userData:any
  getAllUser(): void {
      this.HttpApiService.getAccountRequest_t(4,20)
        .subscribe(userRequest => {
          this.userData = userRequest.body.accounts
          console.log(this.userData)
          this.showData(this.userData)
      })
  }

  // 顯示資料
  showData(data: any) {
    this.B1B2DataSource.data = data;//將資料帶入
  }

}
