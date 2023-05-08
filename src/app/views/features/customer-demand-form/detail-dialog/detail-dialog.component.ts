import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpApiService } from './../../../../api/http-api.service';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss']
})
export class DetailDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private crdata: any,
    private httpApiService: HttpApiService
  ) { }

  ngOnInit(): void {
    this.getOneCustomerRequest()
  }

  //雙向綁訂------------------------------------------------
  c_id: any;

  //取得該id之CR資料---------------------------------------

  crDatas: any;
  crRequest: any = ''

  //取得單一客需單
  getOneCustomerRequest(): void {
    this.httpApiService.getOneCustomerRequest(this.crdata.c_id).
      subscribe(crRequest => {
        this.crDatas = crRequest;
        console.log(this.crDatas);
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

}
