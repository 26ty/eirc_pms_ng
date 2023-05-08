import { Component, OnInit, Inject } from '@angular/core';
import { HttpApiService } from './../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-request-dialog',
  templateUrl: './customer-request-dialog.component.html',
  styleUrls: ['./customer-request-dialog.component.scss']
})
export class CustomerRequestDialogComponent implements OnInit {


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
