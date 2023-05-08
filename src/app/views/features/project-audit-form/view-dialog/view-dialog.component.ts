import { HttpApiService } from './../../../../api/http-api.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//swal
import Swal from 'sweetalert2'
import { Console } from 'console';
import { SwalEventService } from 'src/app/api/swal-event.service';
//file
import { Filedata } from 'src/app/shared/models/model';
//test
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
interface Account {
  account_id: string;
  name: string;
  bonita_user_id: string;
  dep_name: string;
}

interface AccountGroup {
  disabled?: boolean;
  name: string;
  account: Account[];
}

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private taskdata: any
  ) { }


  viewForm: FormGroup; //編輯task
  
  starttime: any
  projectman_name: any
  code: any
  salesman_name: any
  serviceman_name: any
  status:any
  targe: any
  regulations: any
  date_for_start: any
  date_for_end: any
  date_for_check:any
  mechanism: any
  software: any

  userJson: any
  projectdata:any

  ngOnInit(): void {
    /*取得使用者資訊*/
    //console.log(window.localStorage.getItem(TOKEN_KEY))
    const tokenstring = window.localStorage.getItem(TOKEN_KEY)
    console.log("token", tokenstring)

    //console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log("userJson", this.userJson)
    //this.code = this.taskdata.data.code
    console.log(this.taskdata.data)
    
    this.addProjectData()
    setTimeout(() => { this.downloadAsPDF() }, 1000);
  }

  addProjectData(): void {
    this.projectdata = this.taskdata.data
    this.starttime = this.taskdata.data.create_time
    this.code = this.taskdata.data.code
    this.date_for_start = this.taskdata.data.date_for_start
    this.date_for_end = this.taskdata.data.date_for_end
    this.date_for_check = this.taskdata.data.date_for_check
    
    this.projectman_name = this.taskdata.data.salesman_id
    this.salesman_name = this.taskdata.data.salesman_id
    if(this.date_for_check != '0001-01-01T00:00:00Z'){
      this.serviceman_name = this.taskdata.data.serviceman_id//總經理
    }
    
    this.targe = this.taskdata.data.internal_order//目標
    this.regulations = this.taskdata.data.external_order//重點（規章）
    this.mechanism = this.taskdata.data.machine_finished_number//機構
    this.software = this.taskdata.data.machine_english//軟體
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

      PDF.save('專案授權書.pdf');
    });
  }
}
