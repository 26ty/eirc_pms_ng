import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpApiService } from './../../../api/http-api.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print-component',
  templateUrl: './print-component.component.html',
  styleUrls: ['./print-component.component.scss']
})
export class PrintComponentComponent implements OnInit {


  constructor(
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,) {

  }
  ngOnInit(): void {
    //取得id
    this.c_id = this.route.snapshot.paramMap.get('c_id');
    //print id
    console.log(this.c_id);

    this.getOneCustomerRequest()
    //取得部門資料
    this.getDepartmentList_cs();

    //this.downloadAsPDF()
    //window.print()

  }

  c_id: any;

  crDatas: any;
  crRequest: any = ''

  old: boolean = false
  new: boolean = false
  no: boolean = false

  getOneCustomerRequest(): void {


    //server getOne
    this.HttpApiService.getOneCustomerRequest(this.c_id).
      subscribe(CR => {
        if (CR.code == 200) {
          this.crDatas = CR;
          this.crDatas = this.crDatas.body
          console.log(this.crDatas);

          if (this.crDatas.machine_status_id == 'b996906d-d38b-42ea-b3ea-002c2a6f41e4') {
            this.old = true
          } else if (this.crDatas.machine_status_id == '0707d4db-30fa-4053-85de-d8b837a3e22e') {
            this.new = true
          } else if (this.crDatas.machine_status_id == 'e3a5c393-bd97-4cb3-830d-6a59bb4fcd60') {
            this.no = true
          }

          // setTimeout(() => { this.downloadAsPDF() }, 500);
        }

      }
      );



  }

  //取得部門
  getDepartmentList_cs(): void {
    this.HttpApiService.getDepartmentList().subscribe(res => {
      //console.log('部門', res)
      this.departmentData = res.body.department
      this.getA1DepartmentList();

    })
  }

  A1departmentData: any;
  //取得A1部門
  getA1DepartmentList(): void {
    this.HttpApiService.getA1DepartmentList().subscribe(res => {
      console.log('A1部門', res)
      this.A1departmentData = res.body.department
      console.log('A1部門', this.A1departmentData)
      this.getCountersignRequest();

    })
  }

  csDatas: any;
  departmentData: any;
  CSdepartmentList: any[] = [];
  //取得會簽
  getCountersignRequest(): void {
    this.HttpApiService.getCountersignRequest(this.c_id).subscribe(
      csRequest => {
        this.CSdepartmentList = []
        this.csDatas = csRequest.body.countersign_user
        // this.countersignDataSource = csRequest.body.countersign_user
        //console.log('this.csDatas', this.csDatas)

        for (let i in this.A1departmentData) {
          let value: boolean = false
          let cs_id: any = ''
          let countersign_user: any[] = [];
          for (var j in this.csDatas) {
            if (this.csDatas[j].d_id == this.A1departmentData[i].d_id) {
              value = true
              cs_id = this.csDatas[j].cs_id
              countersign_user.push({ "name": this.csDatas[j].name })
            }
          }
          this.CSdepartmentList.push({
            "id": this.A1departmentData[i].d_id,
            "name": this.A1departmentData[i].name,
            "ckecked": value,
            "cs_id": cs_id,
            "countersign_user": countersign_user
          })
        }


        //console.log(this.CSdepartmentList)

      }
    );
  }

  downloadAsPDF(): void {
    let DATA = document.getElementById('content')!;

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('申請單.pdf');
    });
  }
}
