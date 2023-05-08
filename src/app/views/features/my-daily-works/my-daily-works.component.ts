import { WorkSubmitDialogComponent } from './work-submit-dialog/work-submit-dialog.component';

import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/api/http-api.service';
//swal
import Swal from 'sweetalert2'

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

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

interface worksItem {
  items: any,
  id?: any,
  p_id?: any,
  t_id?: any,
  labor_hour?: any,
  date_for_start?: any,
  category?: any

}

@Component({
  selector: 'app-my-daily-works',
  templateUrl: './my-daily-works.component.html',
  styleUrls: ['./my-daily-works.component.scss']
})
export class MyDailyWorksComponent implements OnInit {

  laborhour: any[] = [
    // { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
    { laborhour: 0 },
  ]

  worksItem: worksItem[] = [
    {
      items: '部門事務',
      id: '8203f5f9-5e90-4e71-b8c0-4ec37a31e283',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: 'Daily Report',
      id: 'eb7a4d6f-c6c7-41b5-9c3c-63dbf10360cc',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: '參與會議',
      id: 'e1494235-02a9-4a2f-b112-22661194e89a',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: '待辦事項',
      id: '05410602-165a-4eab-8938-54392fdd571f',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: '國定/例假',
      id: 'c140f6bc-5bb5-4976-b14b-4860bdcd8576',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: '特別休假',
      id: 'f78aceab-81bf-4118-8934-f1d379c9577b',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: '病假',
      id: '01203792-203d-4c0b-8268-b4662036281b',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: '事假',
      id: 'a149835a-dd04-408f-8576-850744c52f38',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: '其他(婚/喪)',
      id: '5d1f8cad-47e5-4587-8830-10d45e4cd8e7',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: '輪休',
      id: 'c1f2a4fd-54ff-4639-9180-553dcb76bf85',
      labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    },
    {
      items: '總計', labor_hour: [
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
        { laborhour: 0 },
      ]
    }
  ];
  
  testDay = [{day: 1},{day: 2},{day: 3},{day: 4},{day: 5},{day: 6},{day: 7},{day: 8},{day: 9},{day: 10},{day: 11},{day: 12},{day: 13},{day: 14},{day: 15},{day: 16},{day: 17},{day: 18},{day: 19},{day: 20},{day: 21},{day: 22},{day: 23},{day: 24},{day: 25},{day: 26},{day: 27},{day: 28}]
  August = [{ day: '01' }, { day: '02' }, { day: '03' }, { day: '04' }, { day: '05' }, { day: '06' }, { day: '07' }, { day: '08' }, { day: '09' }, { day: '10' },
  { day: '11' }, { day: '12' }, { day: '13' }, { day: '14' }, { day: '15' }, { day: '16' }, { day: '17' }, { day: '18' }, { day: '19' }, { day: '20' },
  { day: '21' }, { day: '22' }, { day: '23' }, { day: '24' }, { day: '25' }, { day: '26' }, { day: '27' }, { day: '28' }, { day: '29' }, { day: '30' }];

  test_day :any= [];
  // test_day = [{ day: "二" }, { day: "三" }, { day: "四" }, { day: "五" }, { day: "六" }, { day: "日" }, { day: "一" }, { day: "二" }, { day: "三" }, { day: "四" }, { day: "五" }, { day: "六" }, { day: "日" }, { day: "一" }
  //   , { day: "二" }, { day: "三" }, { day: "四" }, { day: "五" }, { day: "六" }, { day: "日" }, { day: "一" }, { day: "二" }, { day: "三" }, { day: "四" }, { day: "五" }, { day: "六" }, { day: "日" }, { day: "一" }, { day: "二" }, { day: "三" }];

  constructor(
    public dialog: MatDialog,
    public httpapiservice: HttpApiService
  ) { }

  @ViewChild('worksubmitDialog') worksubmitDialog!: TemplateRef<any>;
  @ViewChild('workdetailDialog') workdetailDialog!: TemplateRef<any>;
  @ViewChild('workrecordDialog') workrecordDialog!: TemplateRef<any>;

  td = new Date();
  newMonth: any = this.td.getMonth() + 1
  newYear: any = this.td.getFullYear()

  first_date : any= new Date(this.td.getFullYear(), this.td.getMonth(), 1);
  first_day : any= this.first_date.getDay()

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    //console.log(this.userJson)

    this.getMonth()

    if (this.newMonth < 10) {
      this.newMonth = `0${this.newMonth}`
    }
    //console.log(this.newYear)
    this.getUserMonthLabor(this.userJson.account_id, `${this.newYear}-${this.newMonth}-01`)

    //console.log(this.newMonth) 
    switch (this.newMonth) {
      case '01':
        this.bigMonth(this.first_day)
        break;
      case '02':
        this.FMonth(this.first_day)
        break;
      case '03':
        this.bigMonth(this.first_day)
        break;
      case '04':
        this.smallMonth(this.first_day)
        break;
      case '05':
        this.bigMonth(this.first_day)
        break;
      case '06':
        this.smallMonth(this.first_day)
        break;
      case '07':
        this.bigMonth(this.first_day)
        break;
      case '08':
        this.bigMonth(this.first_day)
        break;
      case '09':
        this.smallMonth(this.first_day)
        break;
      case 10:
        this.bigMonth(this.first_day)
        break;
      case 11:
        this.smallMonth(this.first_day)
        break;
      case 12:
        this.bigMonth(this.first_day)
        break;
      default:
        break;
    }

    this.leap_year(2023)

    this.leap_year(2024)
  }

  //大月
  bigMonth(day?:any) {
    this.worksItem= [
      {
        items: '部門事務',
        id: '8203f5f9-5e90-4e71-b8c0-4ec37a31e283',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: 'Daily Report',
        id: 'eb7a4d6f-c6c7-41b5-9c3c-63dbf10360cc',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '參與會議',
        id: 'e1494235-02a9-4a2f-b112-22661194e89a',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '待辦事項',
        id: '05410602-165a-4eab-8938-54392fdd571f',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '國定/例假',
        id: 'c140f6bc-5bb5-4976-b14b-4860bdcd8576',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '特別休假',
        id: 'f78aceab-81bf-4118-8934-f1d379c9577b',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '病假',
        id: '01203792-203d-4c0b-8268-b4662036281b',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '事假',
        id: 'a149835a-dd04-408f-8576-850744c52f38',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '其他(婚/喪)',
        id: '5d1f8cad-47e5-4587-8830-10d45e4cd8e7',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '輪休',
        id: 'c1f2a4fd-54ff-4639-9180-553dcb76bf85',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '總計', labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      }
    ];
    this.testDay = [{day: 1},{day: 2},{day: 3},{day: 4},{day: 5},{day: 6},{day: 7},{day: 8},{day: 9},{day: 10},{day: 11},{day: 12},{day: 13},{day: 14},{day: 15},{day: 16},{day: 17},{day: 18},{day: 19},{day: 20},{day: 21},{day: 22},{day: 23},{day: 24},{day: 25},{day: 26},{day: 27},{day: 28}]
    this.test_day = [];
    var d:number
    for(d = 29 ; d <= 31 ; d++){
      this.testDay.push({day : d})
    }
    //console.log("big",this.testDay)

    for(let i in this.worksItem){ //29
      for(let k = 0 ; k<= 3 ; k++){ 
        this.worksItem[i].labor_hour.push({ laborhour: 0 })
      }
    }

    for(let i in this.test_workItem){
      for(let k = 0 ; k<= 3 ; k++){
        this.test_workItem[i].labor_hour.push({ laborhour: 0 })
      }
    }

    var a = `${this.newYear},${day}`
    var current_month = new Date(`${this.newYear}, ${day}`);
    var current_month_first_date = new Date(current_month.getFullYear(), current_month.getMonth(), 1);
    var current_month_day = current_month_first_date.getDay()
    // this.month = this.month +1
    console.log("當月第一天禮拜",current_month_day);

    for(let d = 0 ; d < 31;d++){
      
      var test = current_month_day ++
      //console.log("索引",test)
      var f = test % 7
      console.log("星期",f)

      var c_day:string = '-'
      if(f == 1){
        //console.log(111111)
        c_day = '一'
      }else if(f == 2){
        console.log(222222)
        c_day = '二'
      }else if(f == 3){
        c_day = '三'
      }else if(f == 4){
        c_day = '四'
      }else if(f == 5){
        c_day = '五'
      }else if(f == 6){
        c_day = '六'
      }else if(f == 0){
        c_day = '日'
      }
      if(this.test_day.length<31){
        this.test_day.push(c_day)
      }
    }
    console.log(this.test_day)
    //console.log(this.test_workItem)
  }

  //小月
  smallMonth(day?:any){
    this.worksItem= [
      {
        items: '部門事務',
        id: '8203f5f9-5e90-4e71-b8c0-4ec37a31e283',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: 'Daily Report',
        id: 'eb7a4d6f-c6c7-41b5-9c3c-63dbf10360cc',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '參與會議',
        id: 'e1494235-02a9-4a2f-b112-22661194e89a',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '待辦事項',
        id: '05410602-165a-4eab-8938-54392fdd571f',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '國定/例假',
        id: 'c140f6bc-5bb5-4976-b14b-4860bdcd8576',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '特別休假',
        id: 'f78aceab-81bf-4118-8934-f1d379c9577b',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '病假',
        id: '01203792-203d-4c0b-8268-b4662036281b',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '事假',
        id: 'a149835a-dd04-408f-8576-850744c52f38',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '其他(婚/喪)',
        id: '5d1f8cad-47e5-4587-8830-10d45e4cd8e7',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '輪休',
        id: 'c1f2a4fd-54ff-4639-9180-553dcb76bf85',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '總計', labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      }
    ];
    this.testDay = [{day: 1},{day: 2},{day: 3},{day: 4},{day: 5},{day: 6},{day: 7},{day: 8},{day: 9},{day: 10},{day: 11},{day: 12},{day: 13},{day: 14},{day: 15},{day: 16},{day: 17},{day: 18},{day: 19},{day: 20},{day: 21},{day: 22},{day: 23},{day: 24},{day: 25},{day: 26},{day: 27},{day: 28}]
    this.test_day = [];
    var d:number
    for(d = 29 ; d <= 30 ; d++){
      this.testDay.push({day : d})
    }
    //console.log("small",this.testDay)

    for(let i in this.worksItem){
      for(let k = 0 ; k<= 2 ; k++){
        this.worksItem[i].labor_hour.push({ laborhour: 0 })
      }
    }

    for(let i in this.test_workItem){
      for(let k = 0 ; k<= 2 ; k++){
        this.test_workItem[i].labor_hour.push({ laborhour: 0 })
      }
    }


    var a = `${this.newYear},${day}`
    var current_month = new Date(`${this.newYear}, ${day}`);
    var current_month_first_date = new Date(current_month.getFullYear(), current_month.getMonth(), 1);
    var current_month_day = current_month_first_date.getDay()
    // this.month = this.month +1
    console.log("當月第一天禮拜",current_month_day);

    for(let d = 0 ; d < 30;d++){
      
      var test = current_month_day ++
      //console.log("索引",test)
      var f = test % 7
      console.log("星期",f)

      var c_day:string = '-'
      if(f == 1){
        //console.log(111111)
        c_day = '一'
      }else if(f == 2){
        c_day = '二'
      }else if(f == 3){
        c_day = '三'
      }else if(f == 4){
        c_day = '四'
      }else if(f == 5){
        c_day = '五'
      }else if(f == 6){
        c_day = '六'
      }else if(f == 0){
        c_day = '日'
      }
      if(this.test_day.length<30){
        this.test_day.push(c_day)
      }
    }
    console.log(this.test_day)
  }

  // 判斷是否閏年
  leap_year(year:any){
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
      console.log(year + " 是閏年<br>");
    } else {
      console.log(year + " 不是閏年<br>");
    }
  }
  //2月
  FMonth(day?:any){
    this.worksItem= [
      {
        items: '部門事務',
        id: '8203f5f9-5e90-4e71-b8c0-4ec37a31e283',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: 'Daily Report',
        id: 'eb7a4d6f-c6c7-41b5-9c3c-63dbf10360cc',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '參與會議',
        id: 'e1494235-02a9-4a2f-b112-22661194e89a',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '待辦事項',
        id: '05410602-165a-4eab-8938-54392fdd571f',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '國定/例假',
        id: 'c140f6bc-5bb5-4976-b14b-4860bdcd8576',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '特別休假',
        id: 'f78aceab-81bf-4118-8934-f1d379c9577b',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '病假',
        id: '01203792-203d-4c0b-8268-b4662036281b',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '事假',
        id: 'a149835a-dd04-408f-8576-850744c52f38',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '其他(婚/喪)',
        id: '5d1f8cad-47e5-4587-8830-10d45e4cd8e7',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '輪休',
        id: 'c1f2a4fd-54ff-4639-9180-553dcb76bf85',
        labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      },
      {
        items: '總計', labor_hour: [
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
          { laborhour: 0 },
        ]
      }
    ];
    this.testDay = [{day: 1},{day: 2},{day: 3},{day: 4},{day: 5},{day: 6},{day: 7},{day: 8},{day: 9},{day: 10},{day: 11},{day: 12},{day: 13},{day: 14},{day: 15},{day: 16},{day: 17},{day: 18},{day: 19},{day: 20},{day: 21},{day: 22},{day: 23},{day: 24},{day: 25},{day: 26},{day: 27},{day: 28}]
    this.test_day = [];

    // 判斷是否潤年 是則29天 否則28天
    if ((this.newYear % 4 == 0 && this.newYear % 100 != 0) || (this.newYear % 400 == 0)) {
      console.log(this.newYear + " 是閏年")
      
      //新增第29天
      this.testDay.push({day : 29})
  
      for(let i in this.worksItem){
        this.worksItem[i].labor_hour.push({ laborhour: 0 })
      }
  
      for(let i in this.test_workItem){
        this.test_workItem[i].labor_hour.push({ laborhour: 0 })
      }
  
      //抓今年、當月份
      var current_month = new Date(`${this.newYear}, ${day}`);
      //抓今年、當月份第一天
      var current_month_first_date = new Date(current_month.getFullYear(), current_month.getMonth(), 1);
      //抓今年、當月份第一天是禮拜幾
      var current_month_day = current_month_first_date.getDay()
      
      console.log("當月第一天禮拜",current_month_day);
  
      /*四年跑一次29天 其餘28天 */
      for(let d = 0 ; d < 29;d++){
        
        var test = current_month_day ++
        var f = test % 7
        console.log("星期",f)
  
        var c_day:string = '-'
        if(f == 1){
          c_day = '一'
        }else if(f == 2){
          c_day = '二'
        }else if(f == 3){
          c_day = '三'
        }else if(f == 4){
          c_day = '四'
        }else if(f == 5){
          c_day = '五'
        }else if(f == 6){
          c_day = '六'
        }else if(f == 0){
          c_day = '日'
        }
        if(this.test_day.length<28){
          this.test_day.push(c_day)
        }
      }
      console.log(this.test_day)

    } else { //28天
      console.log(this.newYear + " 不是閏年")
  
      for(let i in this.worksItem){
        this.worksItem[i].labor_hour.push({ laborhour: 0 })
      }
  
      for(let i in this.test_workItem){
        this.test_workItem[i].labor_hour.push({ laborhour: 0 })
      }
  
      // var a = `${this.newYear},${day}`
      var current_month = new Date(`${this.newYear}, ${day}`);
      var current_month_first_date = new Date(current_month.getFullYear(), current_month.getMonth(), 1);
      var current_month_day = current_month_first_date.getDay()
      // this.month = this.month +1
      console.log("一月第一天禮拜",current_month_day);
  
      /*四年跑一次29天 其餘28天 */
      for(let d = 0 ; d < 28;d++){
        
        var test = current_month_day ++
        var f = test % 7
        console.log("星期",f)
  
        var c_day:string = '-'
        if(f == 1){
          c_day = '一'
        }else if(f == 2){
          c_day = '二'
        }else if(f == 3){
          c_day = '三'
        }else if(f == 4){
          c_day = '四'
        }else if(f == 5){
          c_day = '五'
        }else if(f == 6){
          c_day = '六'
        }else if(f == 0){
          c_day = '日'
        }
        if(this.test_day.length<28){
          this.test_day.push(c_day)
        }
      }
      console.log(this.test_day)
    }

    // //console.log("2月",this.testDay)

    // for(let i in this.worksItem){
    //   this.worksItem[i].labor_hour.push({ laborhour: 0 })
    // }

    // for(let i in this.test_workItem){
    //   this.test_workItem[i].labor_hour.push({ laborhour: 0 })
    // }


    // var a = `${this.newYear},${day}`
    // var current_month = new Date(`${this.newYear}, ${day}`);
    // var current_month_first_date = new Date(current_month.getFullYear(), current_month.getMonth(), 1);
    // var current_month_day = current_month_first_date.getDay()
    // // this.month = this.month +1
    // console.log("一月第一天禮拜",current_month_day);

    // /*四年跑一次29天 其餘28天 */
    // for(let d = 0 ; d < 28;d++){
      
    //   var test = current_month_day ++
    //   //console.log("索引",test)
    //   var f = test % 7
    //   console.log("星期",f)

    //   var c_day:string = '-'
    //   if(f == 1){
    //     //console.log(111111)
    //     c_day = '一'
    //   }else if(f == 2){
    //     c_day = '二'
    //   }else if(f == 3){
    //     c_day = '三'
    //   }else if(f == 4){
    //     c_day = '四'
    //   }else if(f == 5){
    //     c_day = '五'
    //   }else if(f == 6){
    //     c_day = '六'
    //   }else if(f == 0){
    //     c_day = '日'
    //   }
    //   if(this.test_day.length<28){
    //     this.test_day.push(c_day)
    //   }
    // }
    // console.log(this.test_day)
  }

  month: any
  //first_day:any //當月第一天禮拜幾
  getMonth() {
    let dt = new Date();
    ////console.log(dt)
    this.month = dt.getMonth() + 1
    console.log("當月份",this.month)
    var first_date = new Date(dt.getFullYear(), dt.getMonth(), 1);
    console.log("當月第一天",first_date)

    this.first_day = first_date.getDay()
    console.log("當月第一天禮拜幾",this.first_day)
    console.log("禮拜",dt.getDay())

    // var current_month = new Date("2023, 10");
    // var first_date = new Date(current_month.getFullYear(), current_month.getMonth(), 1);
    // var current_month_day = first_date.getDay()
    // this.month = this.month +1
    console.log("10月",first_date);
    // console.log("一月第一天禮拜",current_month_day);

  }

  addMonth() {
    //this.getMonth()

    this.newMonth = this.month += 1
    if (this.newMonth < 10) {
      this.newMonth = `0${this.newMonth}`
    }

    console.log(this.newMonth)
    var c_month
    var d_month
    if(this.newMonth == '01'){
      c_month = '1'
    }else if(this.newMonth == '02'){
      c_month = '2'
    }else if(this.newMonth =='03'){
      c_month = '3'
    }else if(this.newMonth == '04'){
      c_month = '4'
    }else if(this.newMonth == '05'){
      c_month = '5'
    }else if(this.newMonth == '06'){
      c_month = '6'
    }else if(this.newMonth == '07'){
      c_month = '7'
    }else if(this.newMonth == '08'){
      c_month = '8'
    }else if(this.newMonth == '09'){
      c_month = '9'
    }else if(this.newMonth == 10){
      c_month = '10'
    }else if(this.newMonth == 11){
      c_month = '11'
    }else if(this.newMonth == 12){
      c_month = '12'
    }

    //console.log(this.newMonth)
    switch (this.newMonth) {
      case '01':
        this.bigMonth(c_month)
        break;
      case '02':
        this.FMonth(c_month)
        break;
      case '03':
        this.bigMonth(c_month)
        break;
      case '04':
        this.smallMonth(c_month)
        break;
      case '05':
        this.bigMonth(c_month)
        break;
      case '06':
        this.smallMonth(c_month)
        break;
      case '07':
        this.bigMonth(c_month)
        break;
      case '08':
        this.bigMonth(c_month)
        break;
      case '09':
        this.smallMonth(c_month)
        break;
      case 10:
        this.bigMonth(c_month)
        break;
      case 11:
        this.smallMonth(c_month)
        break;
      case 12:
        this.bigMonth(c_month)
        break;
      default:
        break;
    }
    ////console.log("new+月份",this.newMonth)
    this.getUserMonthLabor(this.userJson.account_id, `${this.newYear}-${this.newMonth}-01`)
  }

  reduceMonth() {
    this.newMonth = this.month -= 1
    if (this.newMonth < 10) {
      this.newMonth = `0${this.newMonth}`
    }

    var c_month
    var d_month
    if(this.newMonth == '01'){
      c_month = 'Jan'
    }else if(this.newMonth == '02'){
      console.log(222222)
      c_month = 'Feb'
    }else if(this.newMonth =='03'){
      c_month = 'Mar'
    }else if(this.newMonth == '04'){
      c_month = 'Apr'
    }else if(this.newMonth == '05'){
      c_month = 'May'
    }else if(this.newMonth == '06'){
      c_month = 'Jun'
    }else if(this.newMonth == '07'){
      c_month = 'Jul'
    }else if(this.newMonth == '08'){
      c_month = 'Aug'
    }else if(this.newMonth == '09'){
      c_month = 'Sep'
    }else if(this.newMonth == 10){
      c_month = 'Oct'
    }else if(this.newMonth == 11){
      c_month = 'Nov'
    }else if(this.newMonth == 12){
      c_month = 'Dec'
    }

    //console.log(this.newMonth)
    switch (this.newMonth) {
      case '01':
        this.bigMonth(c_month)
        break;
      case '02':
        this.FMonth(c_month)
        break;
      case '03':
        this.bigMonth(c_month)
        break;
      case '04':
        this.smallMonth(c_month)
        break;
      case '05':
        this.bigMonth(c_month)
        break;
      case '06':
        this.smallMonth(c_month)
        break;
      case '07':
        this.bigMonth(c_month)
        break;
      case '08':
        this.bigMonth(c_month)
        break;
      case '09':
        this.smallMonth(c_month)
        break;
      case 10:
        this.bigMonth(c_month)
        break;
      case 11:
        this.smallMonth(c_month)
        break;
      case 12:
        this.bigMonth(c_month)
        break;
      default:
        break;
    }
    ////console.log("new-月份",this.newMonth)
    this.getUserMonthLabor(this.userJson.account_id, `${this.newYear}-${this.newMonth}-01`)
  }

  ShowTime() {
    var NowDate = new Date();
    var d = NowDate.getDay();
    var dayNames = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var date
    //document.getElementById('showbox').innerHTML = '目前時間：' + NowDate.toLocaleString() + '（' + dayNames[d] + '）';
    setTimeout('ShowTime()', 1000);
  }

  dateOfSum: any
  laborHourData: any
  new_workItem: worksItem[] = []
  test_workItem: worksItem[] = []
  laborhour_total: any[] = [] //總計時數
  sumNum: any //有總計工時的日期數量
  monthNum: any = 30 //一個月有幾天

  workNum: any//有累計工時的日期數量
  workHour_total: any[] = []
  all_total: any = 0
  test: any = 0
  todo_hour_total:number
  meet_hour_total:number
  //取得該使用者當月工時
  getUserMonthLabor(userID: any, firstdate: any) {
    this.all_total=0
    this.meet_hour_total = 0
    this.todo_hour_total = 0
    //console.log("firstdate",firstdate)
    this.httpapiservice.getByUserMonthLaobrList(userID, firstdate).subscribe(
      res => {
        ////console.log(res.body)
        this.dateOfSum = res.body.date_of_sum
        this.laborHourData = res.body.labor_hour
        console.log("dateOfSum", this.dateOfSum)
        console.log("laborHourData", this.laborHourData)

        if (this.dateOfSum == null || this.laborHourData == null) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'error',
            title: '工時讀取失敗',
            text: '請聯繫網管人員'
          })
        }
        if (this.dateOfSum.length == 0 && this.laborHourData.length == 0) {
          this.laborhour_total = []
          this.test_workItem = this.worksItem
          //console.log("this.test_workItem",this.test_workItem)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'warning',
            title: '該月份未提報工時'
          })

        } else {
          this.laborhour_total = []
          //有總工時的天數
          this.sumNum = this.dateOfSum.length
          ////console.log("sumNum",this.sumNum)

          //把沒有總工時的天數補0
          for (let i = 1; i <= this.testDay.length; i++) {
            this.laborhour_total.push({ laborhour: 0 })
          }
          for (let i in this.dateOfSum) {
            //插入總工時的位置
            this.laborhour_total.splice(new Date(this.dateOfSum[i].date_for_start).getDate() - 1, 1, { laborhour: this.dateOfSum[i].sum_laborhour })

            this.all_total = parseFloat(String(this.all_total)) + parseFloat(String(this.dateOfSum[i].sum_laborhour))
          }
          this.laborhour_total.push({ laborhour: parseFloat(String(this.all_total)) })

          //console.log(parseFloat(String(this.all_total)))
          ////console.log("laborhour_total",this.laborhour_total) //插入sum_laborhour的總計工時

          /*項目列表 */
          this.test_workItem = [
            {
              items: '部門事務',
              id: '8203f5f9-5e90-4e71-b8c0-4ec37a31e283',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: 'Daily Report',
              id: 'eb7a4d6f-c6c7-41b5-9c3c-63dbf10360cc',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: '參與會議',
              id: 'e1494235-02a9-4a2f-b112-22661194e89a',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: '待辦事項',
              id: '05410602-165a-4eab-8938-54392fdd571f',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: '國定/例假',
              id: 'c140f6bc-5bb5-4976-b14b-4860bdcd8576',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: '特別休假',
              id: 'f78aceab-81bf-4118-8934-f1d379c9577b',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: '病假',
              id: '01203792-203d-4c0b-8268-b4662036281b',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: '事假',
              id: 'a149835a-dd04-408f-8576-850744c52f38',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: '其他(婚/喪)',
              id: '5d1f8cad-47e5-4587-8830-10d45e4cd8e7',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: '輪休',
              id: 'c1f2a4fd-54ff-4639-9180-553dcb76bf85',
              labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
            {
              items: '總計', labor_hour: [
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
                { laborhour: 0 },
              ]
            },
          ];

          this.test_workItem = this.worksItem
          //console.log("worksItem",this.worksItem)
          //console.log("test_workItem",this.test_workItem)
          //插入有提報工時的專案任務項目

          console.log(this.newMonth)
          for (let i in this.laborHourData) {
            /*插入專案任務工時項目 */
            if (this.laborHourData[i].p_name != undefined && this.laborHourData[i].t_name != undefined) {
              if(this.newMonth == '01' || this.newMonth == '03'|| this.newMonth == '05'|| this.newMonth == '07'|| this.newMonth == '08'|| this.newMonth == '10'|| this.newMonth == '12'){ // 大月
                console.log(this.newMonth)
                this.test_workItem.splice(1, 0,
                  {
                    items: `${this.laborHourData[i].p_name}-${this.laborHourData[i].t_name}`,
                    p_id: this.laborHourData[i].p_id,
                    t_id: this.laborHourData[i].t_id,
                    category: this.laborHourData[i].category,
                    id: '1e6913f5-55be-413a-94a5-68f8cc67d5b2',
                    labor_hour: [
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 }, //32個
                    ],
                    date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
                  })
              }else if(this.newMonth == '04'|| this.newMonth == '06'|| this.newMonth == '09'|| this.newMonth == '11'){ // 小月
                console.log(this.newMonth)
                this.test_workItem.splice(1, 0,
                  {
                    items: `${this.laborHourData[i].p_name}-${this.laborHourData[i].t_name}`,
                    p_id: this.laborHourData[i].p_id,
                    t_id: this.laborHourData[i].t_id,
                    category: this.laborHourData[i].category,
                    id: '1e6913f5-55be-413a-94a5-68f8cc67d5b2',
                    labor_hour: [
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },//31個
                    ],
                    date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
                  })
              }else{ //2月
                console.log(this.newMonth)
                this.test_workItem.splice(1, 0,
                  {
                    items: `${this.laborHourData[i].p_name}-${this.laborHourData[i].t_name}`,
                    p_id: this.laborHourData[i].p_id,
                    t_id: this.laborHourData[i].t_id,
                    category: this.laborHourData[i].category,
                    id: '1e6913f5-55be-413a-94a5-68f8cc67d5b2',
                    labor_hour: [
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },//29
                    ],
                    date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
                  })

                  console.log(12233333)
              }
              
            }
            /*插入客需單工時項目 */
            if (this.laborHourData[i].cd_code_task != undefined) {
              if(this.newMonth == '01' || this.newMonth == '03'|| this.newMonth == '05'|| this.newMonth == '07'|| this.newMonth == '08'|| this.newMonth == '10'|| this.newMonth == '12'){ // 大月
                this.test_workItem.splice(1, 0,
                  {
                    items: `${this.laborHourData[i].cd_code_task}-${this.laborHourData[i].t_name}`,
                    p_id: this.laborHourData[i].cd_projectman_id_task,
                    t_id: this.laborHourData[i].t_id,
                    category: this.laborHourData[i].category,
                    id: '443bd223-d750-409c-961a-93375052b186',
                    labor_hour: [
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 }, //32個
                    ],
                    date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
                  })
              }else if(this.newMonth == '04'|| this.newMonth == '06'|| this.newMonth == '09'|| this.newMonth == '11'){ // 小月
                this.test_workItem.splice(1, 0,
                  {
                    items: `${this.laborHourData[i].cd_code_task}-${this.laborHourData[i].t_name}`,
                    p_id: this.laborHourData[i].cd_projectman_id_task,
                    t_id: this.laborHourData[i].t_id,
                    category: this.laborHourData[i].category,
                    id: '443bd223-d750-409c-961a-93375052b186',
                    labor_hour: [
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },//31個
                    ],
                    date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
                  })
              }else{ //2月
                this.test_workItem.splice(1, 0,
                  {
                    items: `${this.laborHourData[i].cd_code_task}-${this.laborHourData[i].t_name}`,
                    p_id: this.laborHourData[i].cd_projectman_id_task,
                    t_id: this.laborHourData[i].t_id,
                    category: this.laborHourData[i].category,
                    id: '443bd223-d750-409c-961a-93375052b186',
                    labor_hour: [
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },//29
                    ],
                    date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
                  })
              }
              // this.test_workItem.splice(1, 0,
              //   {
              //     items: `${this.laborHourData[i].cd_code_task}-${this.laborHourData[i].t_name}`,
              //     p_id: this.laborHourData[i].cd_projectman_id_task,
              //     t_id: this.laborHourData[i].t_id,
              //     category: this.laborHourData[i].category,
              //     id: '443bd223-d750-409c-961a-93375052b186',
              //     labor_hour: [
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //     ],
              //     date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
              //   })
            }

            /**會簽工時項目 */
            if (this.laborHourData[i].cd_code_countersign != undefined) {
              if(this.newMonth == '01' || this.newMonth == '03'|| this.newMonth == '05'|| this.newMonth == '07'|| this.newMonth == '08'|| this.newMonth == '10'|| this.newMonth == '12'){ // 大月
                this.test_workItem.splice(1, 0,
                  {
                    items: `${this.laborHourData[i].cd_code_countersign}`,
                    p_id: this.laborHourData[i].cd_projectman_id_countersign,
                    //t_id: this.laborHourData[i].t_id,
                    category: this.laborHourData[i].category,
                    id: '9CB49D83-74CF-4E14-9288-3B735EA0687E',
                    labor_hour: [
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 }, //32個
                    ],
                    date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
                  })
              }else if(this.newMonth == '04'|| this.newMonth == '06'|| this.newMonth == '09'|| this.newMonth == '11'){ // 小月
                this.test_workItem.splice(1, 0,
                  {
                    items: `${this.laborHourData[i].cd_code_countersign}`,
                    p_id: this.laborHourData[i].cd_projectman_id_countersign,
                    //t_id: this.laborHourData[i].t_id,
                    category: this.laborHourData[i].category,
                    id: '9CB49D83-74CF-4E14-9288-3B735EA0687E',
                    labor_hour: [
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },//31個
                    ],
                    date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
                  })
              }else{ //2月
                this.test_workItem.splice(1, 0,
                  {
                    items: `${this.laborHourData[i].cd_code_countersign}`,
                    p_id: this.laborHourData[i].cd_projectman_id_countersign,
                    //t_id: this.laborHourData[i].t_id,
                    category: this.laborHourData[i].category,
                    id: '9CB49D83-74CF-4E14-9288-3B735EA0687E',
                    labor_hour: [
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },
                      { laborhour: 0 },//29
                    ],
                    date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
                  })
              }
              // this.test_workItem.splice(1, 0,
              //   {
              //     items: `${this.laborHourData[i].cd_code_countersign}`,
              //     p_id: this.laborHourData[i].cd_projectman_id_countersign,
              //     //t_id: this.laborHourData[i].t_id,
              //     category: this.laborHourData[i].category,
              //     id: '9CB49D83-74CF-4E14-9288-3B735EA0687E',
              //     labor_hour: [
              //       // { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //       { laborhour: 0 },
              //     ],
              //     date_for_start: this.laborHourData[i].date_of_laborhour[0].date_for_start
              //   })
            }
          }

          //console.log("test_workItem", this.test_workItem)

          //總計
          for (let i in this.test_workItem) {
            if (this.test_workItem[i].items == '總計') {
              for (let j in this.laborhour_total) {

                this.test_workItem[i] = { items: '總計', labor_hour: this.laborhour_total }
              }
            }
            // if(this)

          }

          //插入工時時數
          setTimeout(() => {
            for (let i in this.test_workItem) { //13
              for (let j in this.laborHourData) { //   
                //專案任務工時插入
                if ( this.test_workItem[i].items == `${this.laborHourData[j].p_name}-${this.laborHourData[j].t_name}` && this.test_workItem[i].id == '1e6913f5-55be-413a-94a5-68f8cc67d5b2') {
                  //console.log(this.test_workItem[i].items,this.laborHourData[j].p_name,this.laborHourData[j].t_name)
                  
                  // setTimeout(() => {
                  //   if(this.newMonth == '01','03','05','07','08','10','12'){ // 大月
                  //     this.test_workItem[i].labor_hour[31] = { laborhour: this.laborHourData[j].sum_of_laborhour }
                  //   }else if(this.newMonth == '04','06','09','11'){ // 小月
                  //     this.test_workItem[i].labor_hour[30] = { laborhour: this.laborHourData[j].sum_of_laborhour }
                  //   }else if(this.newMonth == '02'){ //2月
                  //     this.test_workItem[i].labor_hour[28] = { laborhour: this.laborHourData[j].sum_of_laborhour }
                  //   }
                  // });
                  this.test_workItem[i].labor_hour[this.test_workItem[i].labor_hour.length -1] = { laborhour: this.laborHourData[j].sum_of_laborhour }

                  for (let k in this.laborHourData[j].date_of_laborhour) {
                    var day: number = new Date(this.laborHourData[j].date_of_laborhour[k].date_for_start).getDate() - 1
                    //console.log(i, j, k, day) // 1 1 0 22
                    this.test_workItem[i].labor_hour[day] = { laborhour: this.laborHourData[j].date_of_laborhour[k].laborhour }

                  }

                  
                }

                /**客需單會簽工時插入 */
                if (`${this.laborHourData[j].cd_code_countersign}` == this.test_workItem[i].items && this.test_workItem[i].id == '9CB49D83-74CF-4E14-9288-3B735EA0687E') {
                  //console.log(this.test_workItem[i].items)

                  for (let k in this.laborHourData[j].date_of_laborhour) {
                    var day: number = new Date(this.laborHourData[j].date_of_laborhour[k].date_for_start).getDate() - 1
                    //console.log("客需單會簽",i, j, k, day) // 1 1 0 22
                    this.test_workItem[i].labor_hour[day] = { laborhour: this.laborHourData[j].date_of_laborhour[k].laborhour }
                  }

                  this.test_workItem[i].labor_hour[this.test_workItem[i].labor_hour.length -1] = { laborhour: this.laborHourData[j].sum_of_laborhour }
                  
                }

                /**客需單任務工時插入 */
                if (`${this.laborHourData[j].cd_code_task}-${this.laborHourData[j].t_name}` == this.test_workItem[i].items  && this.test_workItem[i].id == '443bd223-d750-409c-961a-93375052b186') {
                  //console.log(this.test_workItem[i].items)

                  for (let k in this.laborHourData[j].date_of_laborhour) {
                    var day: number = new Date(this.laborHourData[j].date_of_laborhour[k].date_for_start).getDate() - 1
                    //console.log("客需單",i, j, k, day) // 1 1 0 22
                    this.test_workItem[i].labor_hour[day] = { laborhour: this.laborHourData[j].date_of_laborhour[k].laborhour }
                  }
                  
                  this.test_workItem[i].labor_hour[this.test_workItem[i].labor_hour.length -1] = { laborhour: this.laborHourData[j].sum_of_laborhour }
                  
                }
                /**待辦事項插入 */
                if (this.test_workItem[i].id ==  `${this.laborHourData[j].t_origin_id}` && this.test_workItem[i].items == '待辦事項') {
      
                  for (let k in this.laborHourData[j].date_of_laborhour) {
                    var day: number = new Date(this.laborHourData[j].date_of_laborhour[k].date_for_start).getDate() - 1
                    var todo_total:any = this.test_workItem[i].labor_hour[day].laborhour
                    this.test_workItem[i].labor_hour[day] = { laborhour: Number(todo_total) + Number(this.laborHourData[j].date_of_laborhour[k].laborhour) }

                  }
                  this.todo_hour_total = this.todo_hour_total + Number(this.laborHourData[j].sum_of_laborhour)
                  this.test_workItem[i].labor_hour[this.test_workItem[i].labor_hour.length -1] = { laborhour: this.todo_hour_total }
                
                }
                /**會議事項插入 */
                if (this.test_workItem[i].id ==  `${this.laborHourData[j].m_origin_id}` && this.test_workItem[i].items == '參與會議') {
                  
                  for (let k in this.laborHourData[j].date_of_laborhour) {
                    var day: number = new Date(this.laborHourData[j].date_of_laborhour[k].date_for_start).getDate() - 1
                    var meet_total:any = this.test_workItem[i].labor_hour[day].laborhour
                    this.test_workItem[i].labor_hour[day] = { laborhour: Number(meet_total) + Number(this.laborHourData[j].date_of_laborhour[k].laborhour )}
                    
                  }
                  this.meet_hour_total = this.meet_hour_total + Number(this.laborHourData[j].sum_of_laborhour)
                  this.test_workItem[i].labor_hour[this.test_workItem[i].labor_hour.length -1] = { laborhour: this.meet_hour_total }
                  
                } 
                /**部門插入 */
                
                /**其他 */
                // if (this.laborHourData[j].category == this.test_workItem[i].id) {
                //   for (let k in this.laborHourData[j].date_of_laborhour) {
                //     var day: number = new Date(this.laborHourData[j].date_of_laborhour[k].date_for_start).getDate() - 1
                //     this.test_workItem[i].labor_hour[day] = { laborhour: this.laborHourData[j].date_of_laborhour[k].laborhour }
                //     // this.test_workItem[i].labor_hour[31] = {laborhour: this.laborHourData[j].sum_of_laborhour}
                //   }
                //   // var day: number = new Date(this.laborHourData[j].date_of_laborhour[0].date_for_start).getDate() - 1
                //   // //console.log(i, j, day)
                //   // this.test_workItem[i].labor_hour[day] = { laborhour: this.laborHourData[j].date_of_laborhour[0].laborhour }
                //   this.test_workItem[i].labor_hour[30] = { laborhour: this.laborHourData[j].sum_of_laborhour }
                // }

                // if (this.laborHourData[j].t_origin_id == this.test_workItem[i].id) {
                //   for (let k in this.laborHourData[j].date_of_laborhour) {
                //     var day: number = new Date(this.laborHourData[j].date_of_laborhour[k].date_for_start).getDate() - 1
                //     this.test_workItem[i].labor_hour[day] = { laborhour: this.laborHourData[j].date_of_laborhour[k].laborhour }
                //   }
                //   this.test_workItem[i].labor_hour[30] = { laborhour: this.laborHourData[j].sum_of_laborhour }
                // }

                // if (this.laborHourData[j].m_origin_id == this.test_workItem[i].id) {
                //   for (let k in this.laborHourData[j].date_of_laborhour) {
                //     var day: number = new Date(this.laborHourData[j].date_of_laborhour[k].date_for_start).getDate() - 1
                //     this.test_workItem[i].labor_hour[day] = { laborhour: this.laborHourData[j].date_of_laborhour[k].laborhour }
                //   }
                //   this.test_workItem[i].labor_hour[30] = { laborhour: this.laborHourData[j].sum_of_laborhour }
                // }

              }
            }
          }, 1000);

          console.log(this.test_workItem)

        }
      }
    )
  }

  prjectDetail(p_id: any) {
    if (p_id == undefined) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'warning',
        title: '無可觀看細項'
      })
    } else {
      location.href = 'main/projectinfo/project-manager-edit/' + p_id
    }

  }

  testwork(day: any, item?: any) {
    //console.log(day)
    //console.log(item)
  }

  doPostWorkSubmit(day: any, item?: any, id?: any, cat?: any) {
    //this.data.changeMessage("Hello from Sibling")
    this.dialog.open(WorkSubmitDialogComponent, {
      data: {
        month: this.month,
        day: day,
        items: item,
        workId: id,
        cat: cat
      }
    });
  }

  workSubmit() {
    const dialogRef = this.dialog.open(this.worksubmitDialog);
  }

  workDetail() {
    const dialogRef = this.dialog.open(this.workdetailDialog);
  }

  workRecord() {
    const dialogRef = this.dialog.open(this.workrecordDialog);
  }


}
