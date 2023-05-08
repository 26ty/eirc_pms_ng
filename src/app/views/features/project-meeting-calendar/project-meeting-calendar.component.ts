import { CalendarAddDialogComponent } from './calendar-add-dialog/calendar-add-dialog.component';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ChangeDetectionStrategy, ComponentFactoryResolver } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
// import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from "@fullcalendar/timegrid"; // 就是你在搞
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { HttpApiService } from './../../../api/http-api.service';
import Swal from 'sweetalert2'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import esLocale from '@fullcalendar/core/locales/es';

// let calendar = new Calendar(calendarEl, {
//   locale: esLocale
// });
// import {EventService} from '../../service/eventservice';
// FullCalendarModule.registerPlugins([
//   timeGridPlugin,
// ]);

// const calendarEl = document.getElementById('calendar')
// const calendar = new Calendar(calendarEl, {
//   plugins: [timeGridPlugin],
//   initialView: 'timeGridWeek',
//   events: [
//     { title: 'Meeting', start: new Date() }
//   ]
// })

@Component({
  selector: 'app-project-meeting-calendar',
  templateUrl: './project-meeting-calendar.component.html',
  styleUrls: ['./project-meeting-calendar.component.scss']
})
export class ProjectMeetingCalendarComponent implements OnInit {

  @ViewChild('addDialog') addDialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private httpApiService: HttpApiService,
    //private eventService: EventService
  ) { }

  events: any[] = [];
  totalevents: any[] = [];
  // options: any;
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth'
  // };

  header: any;

  principal_option: any[] = [];
  place_option: any[] = [];
  time_option: any[] = [];

  options: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  ngOnInit(): void {

    //this.getAllMeeting()
    this.getmeeting()

  }

  totalmeeting: any[] = []
  meetingDatas: any
  principalDatas: any
  participantsDatas: any

  //會議table
  //宣告會議的dataSource
  meetDataSource = new MatTableDataSource();
  display_meet: string[] = ['m_name', 'name', 'time_for_start', 'date_for_start', 'room', 'action_edit', 'action_delete'];

  meetDatas: any[] = [];
  meet_total: any
  totalmeet: any[] = []


  meetingDataSource = new MatTableDataSource;
  meetingDataname: string[] = ['m_name', 'name', 'time_for_start', 'date_for_start', 'room'];
  meetingDataSort: any
  meetingData: any

  /** 
  * @brief 取得所有會議資料
  * @param meetingDataSource 會議的 MatTableDataSource
  * */
  // getAllMeeting(): void {
  //   this.httpApiService.getMeetingUserRequest_t(1, 20)
  //     .subscribe(meetingRequest => {
  //       this.meetingData = meetingRequest
  //       // console.log(this.meetingData)
  //       this.meetingDataSource.data = this.meetingData.body.meeting
  //       this.meetingDataSource.sort = this.meetingData.body.total
  //       this.meetingDataSource.paginator = this.MatPaginator
  //       //setTimeout(() => this.meetingDataSource.paginator = this.MatPaginator);
  //       // console.log(this.meetingDataSource)
  //     })
  // }


  /** 
  * @brief 取得所有會議資料轉換行事曆格式
  * @param totalmeeting 所有會議的暫存陣列
  * * @param totalmeet 所有會議的Json資料
  * */
  getmeeting(): void {
    this.meetDatas = []
    this.httpApiService.getMeetingRequest_t(1, 20)
      .subscribe(meetRequest => {
        this.meetingDatas = meetRequest
        for (var i in this.meetingDatas.body.meeting) {
          if (String(this.meetingDatas.body.meeting[i].time_for_start).indexOf('.') == 1) {
            var converttime = String(this.meetingDatas.body.meeting[i].time_for_start).split('.')
            this.meetingDatas.body.meeting[i].time_for_start = '0' + String(converttime[0]) + ':30'
          }
          else if (String(this.meetingDatas.body.meeting[i].time_for_start).indexOf('.') == 2) {
            var converttime = String(this.meetingDatas.body.meeting[i].time_for_start).split('.')
            this.meetingDatas.body.meeting[i].time_for_start = String(converttime[0]) + ':30'
          }
          else {
            this.meetingDatas.body.meeting[i].time_for_start = String(this.meetingDatas.body.meeting[i].time_for_start) + ':00'
          }
          if (String(this.meetingDatas.body.meeting[i].time_for_end).indexOf('.') == 1) {
            var converttime = String(this.meetingDatas.body.meeting[i].time_for_end).split('.')
            this.meetingDatas.body.meeting[i].time_for_end = '0' + String(converttime[0]) + ':30'
          }
          else if (String(this.meetingDatas.body.meeting[i].time_for_end).indexOf('.') == 2) {
            var converttime = String(this.meetingDatas.body.meeting[i].time_for_end).split('.')
            this.meetingDatas.body.meeting[i].time_for_end = String(converttime[0]) + ':30'
          }
          else {
            this.meetingDatas.body.meeting[i].time_for_end = String(this.meetingDatas.body.meeting[i].time_for_end) + ':00'
          }
          this.totalmeeting.push({ 'm_id': this.meetingDatas.body.meeting[i].m_id })
          this.totalmeet.push({ 'room': this.meetingDatas.body.meeting[i].room, 'time_for_start': this.meetingDatas.body.meeting[i].time_for_start, 'time_for_end': this.meetingDatas.body.meeting[i].time_for_end, 'date_for_start': this.meetingDatas.body.meeting[i].date_for_start })
          this.getMeetingData(this.meetingDatas.body.meeting[i].m_id)
        }
        for (var j = 0; j < (this.meetingDatas.body.total / 20); j++) {
          this.httpApiService.getMeetingRequest_t(j + 2, 20)
            .subscribe(meetRequest => {
              this.meetingDatas = meetRequest
              for (var i in this.meetingDatas.body.meeting) {
                if (String(this.meetingDatas.body.meeting[i].time_for_start).indexOf('.') == 1) {
                  var converttime = String(this.meetingDatas.body.meeting[i].time_for_start).split('.')
                  this.meetingDatas.body.meeting[i].time_for_start = '0' + String(converttime[0]) + ':30'
                }
                else if (String(this.meetingDatas.body.meeting[i].time_for_start).indexOf('.') == 2) {
                  var converttime = String(this.meetingDatas.body.meeting[i].time_for_start).split('.')
                  this.meetingDatas.body.meeting[i].time_for_start = String(converttime[0]) + ':30'
                }
                else {
                  this.meetingDatas.body.meeting[i].time_for_start = String(this.meetingDatas.body.meeting[i].time_for_start) + ':00'
                }
                if (String(this.meetingDatas.body.meeting[i].time_for_end).indexOf('.') == 1) {
                  var converttime = String(this.meetingDatas.body.meeting[i].time_for_end).split('.')
                  this.meetingDatas.body.meeting[i].time_for_end = '0' + String(converttime[0]) + ':30'
                }
                else if (String(this.meetingDatas.body.meeting[i].time_for_end).indexOf('.') == 2) {
                  var converttime = String(this.meetingDatas.body.meeting[i].time_for_end).split('.')
                  this.meetingDatas.body.meeting[i].time_for_end = String(converttime[0]) + ':30'
                }
                else {
                  this.meetingDatas.body.meeting[i].time_for_end = String(this.meetingDatas.body.meeting[i].time_for_end) + ':00'
                }
                this.totalmeeting.push({ 'm_id': this.meetingDatas.body.meeting[i].m_id })
                this.totalmeet.push({ 'room': this.meetingDatas.body.meeting[i].room, 'time_for_start': this.meetingDatas.body.meeting[i].time_for_start, 'time_for_end': this.meetingDatas.body.meeting[i].time_for_end, 'date_for_start': this.meetingDatas.body.meeting[i].date_for_start })
                this.getMeetingData(this.meetingDatas.body.meeting[i].m_id)
              }
            })
        }
        // console.log(this.meetDatas)
        setTimeout(() => { this.showData(this.meetDatas, this.meetingDatas.body.total) }, 1000);
        this.meet_total = this.meetingDatas.body.total
        this.sortmeeting()
        //// console.log(this.meetDatas)
      })
  }

  showData(data: any, totalcount: any) {
    // for (var i in data) {
    //   if (data[i].status != "建檔中" && data[i].status != "已中止") {
    //     data[i].status = "專案已啟動"
    //   }
    // }
    this.meetDataSource.data = data;//將資料帶入
    //this.meet_total = totalcount;//計算資料長度
    this.meetDataSource.sort = this.sort;
    this.meetDataSource.paginator = this.paginator;
  }

  getMeetingData(m_id: any): void {
    this.httpApiService.getOneMeetingUserRequest(m_id)
      .subscribe(meetingRequest => {
        var meetingDatas: any = meetingRequest
        // console.log(meetingDatas.body)
        if (String(meetingDatas.body.time_for_start).indexOf('.') == 1) {
          var converttime = String(meetingDatas.body.time_for_start).split('.')
          meetingDatas.body.time_for_start = '0' + String(converttime[0]) + ':30'
        }
        else if (String(meetingDatas.body.time_for_start).indexOf('.') == 2) {
          var converttime = String(meetingDatas.body.time_for_start).split('.')
          meetingDatas.body.time_for_start = String(converttime[0]) + ':30'
        }
        else {
          meetingDatas.body.time_for_start = String(meetingDatas.body.time_for_start) + ':00'
        }
        if (String(meetingDatas.body.time_for_end).indexOf('.') == 1) {
          var converttime = String(meetingDatas.body.time_for_end).split('.')
          meetingDatas.body.time_for_end = '0' + String(converttime[0]) + ':30'
        }
        else if (String(meetingDatas.body.time_for_end).indexOf('.') == 2) {
          var converttime = String(meetingDatas.body.time_for_end).split('.')
          meetingDatas.body.time_for_end = String(converttime[0]) + ':30'
        }
        else {
          meetingDatas.body.time_for_end = String(meetingDatas.body.time_for_end) + ':00'
        }
        this.meetDatas.push(meetingDatas.body)
        this.principal_option.push(meetingDatas.body.name)
        this.principal_option = [...new Set(this.principal_option)]
        this.place_option.push(meetingDatas.body.room)
        this.place_option = [...new Set(this.place_option)]
        this.time_option.push(meetingDatas.body.date_for_start)
        this.time_option = [...new Set(this.time_option)]
      })
  }

  /** 
  * @brief 轉換會議資料時間格式
  * @param converttime 暫存是否為半小時
  * */
  sortmeeting(): void {
    for (var i in this.totalmeeting) {
      this.httpApiService.getOneMeetingUserRequest(this.totalmeeting[i].m_id)
        .subscribe(meetRequest => {
          this.meetingDatas = meetRequest
          console.log(this.meetingDatas.body.date_for_start)
          var start = new Date(this.meetingDatas.body.date_for_start)
          var converttime = String(this.meetingDatas.body.time_for_start).split('.')
          start.setHours(Number(this.meetingDatas.body.time_for_start))
          if (converttime[1]) {
            start.setMinutes(30)
          }
          var starttime = start.toISOString()
          var end = new Date(this.meetingDatas.body.date_for_start)
          converttime = String(this.meetingDatas.body.time_for_end).split('.')
          end.setHours(Number(this.meetingDatas.body.time_for_end))
          if (converttime[1]) {
            end.setMinutes(30)
          }
          var endtime = end.toISOString()
          // console.log(starttime, endtime)
          this.events.push({
            'm_id': this.meetingDatas.body.m_id, 'start': starttime, 'end': endtime, 'title': this.meetingDatas.body.m_name + ' - ' + this.meetingDatas.body.room,
            'date_for_start': starttime, 'date_for_end': endtime,
            'principal_name': this.meetingDatas.body.name, 'participants_name': this.meetingDatas.body.Participant
          })
        })
    }
    setTimeout(() => { this.showcalendar() }, 700);
  }

  /** 
  * @brief 行事曆設定及帶入會議資料
  * @param options 行事曆格式
  * * @param eventClick 行事曆點擊事件中的會議資料
  * */
  test: any
  showcalendar(): void {
    var hrs = -(new Date().getTimezoneOffset() / 60)
    this.httpApiService.deleteMeetingRequest_t('test').subscribe()
    this.options = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      plugins: [
        timeGridPlugin,
        interactionPlugin,
        dayGridPlugin,
      ],
      //Boolean, default: false,
      locale: 'zh-tw',
      editable: false,
      selectable: false,
      slotMinTime: '08:00:00',
      //slotMaxTime: '19:00:00',
      selectMirror: false,
      //Boolean,default: false, //sloteventoverlap
      dayMaxEvents: false,
      //eventClick: this.testfun(),
      eventClick: function (info: { event: any; jsEvent: { preventDefault: () => void; }; },) {
        var eventObj = info.event;
        // console.log(eventObj)
        var starttime: any = new Date(eventObj.extendedProps.date_for_start)
        // console.log(starttime, eventObj.extendedProps.date_for_start)
        //starttime.setHours(starttime.getHours() + hrs);
        starttime = new Date(starttime).toLocaleString()
        let endtime: any = new Date(eventObj.extendedProps.date_for_end)
        //endtime.setHours(endtime.getHours() + hrs);
        endtime = new Date(endtime).toLocaleString()
        let participantDate: any[] = []
        if (eventObj.extendedProps.participants_name != '') {
          for (var i in eventObj.extendedProps.participants_name) {
            participantDate.push(eventObj.extendedProps.participants_name[i].participant_name + '\n')
          }
        }
        Swal.fire({
          title: eventObj.title,
          html: `
          開始時間：${starttime}<br>
          結束時間：${endtime}<br>
          會議主席：${eventObj.extendedProps.principal_name}<br>
          參與人員：${participantDate}<br>
          `,
          icon: 'info',
          confirmButtonText: `確定!`,
          confirmButtonColor: '#64c270',
          // showCancelButton: true,
          // confirmButtonText: `刪除!`,
          // confirmButtonColor: '#FF5151',
          // cancelButtonText: '確定!',
          // cancelButtonColor: '#64c270',
          reverseButtons: true,
        }).then((result) => {
          // if (result.isConfirmed) {
          //   Swal.fire({
          //     text: "確定要刪除嗎",
          //     icon: 'question',
          //     showCancelButton: true,
          //     cancelButtonText: '取消!',
          //     confirmButtonText: `確定!`,
          //     reverseButtons: true,
          //     confirmButtonColor: '#64c270',
          //     cancelButtonColor: '#FF5151',
          //     //allowOutsideClick: () => !Swal.isLoading()
          //   }).then((result) => {
          //     if (result.isConfirmed) {
          //       this.test = eventObj.extendedProps.m_id
          //       //this.testtt()
          //       //return this.test
          //       //this.HttpApiService.deleteMeetingRequest_t(eventObj.extendedProps.m_id).subscribe()
          //     }
          //   })
          // }
        })
      },
    };
    this.options = { ...this.options, ...{ events: this.events } };
    //setTimeout(() => { this.testtt() }, 5000);
    // console.log()
  }


  deleteMeet(m_id: any): void {
    Swal.fire({
      text: "確定要刪除嗎",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: '取消!',
      confirmButtonText: `確定!`,
      reverseButtons: true,
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      //allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpApiService.deleteMeetingRequest_t(m_id).subscribe()
        this.getmeeting()
      }
    })
  }

  //建立會議
  doPostMeetAdd(totalmeet: any): void {
    // console.log(totalmeet)
    this.dialog.open(CalendarAddDialogComponent, {
      data: totalmeet
    })
  }

  doPostMeetEdit(mData: any): void {
    // console.log(mData)
    this.dialog.open(CalendarDetailComponent, {
      data: mData
    })
  }

  //建立會議
  MeetDetail(item: any): void {
    this.dialog.open(CalendarDetailComponent, {
      data: {
        m_id: item
      }
    })
  }



  //搜尋資料
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.meetDataSource.filter = filterValue.trim().toLowerCase();
  }

  // 設定分頁器參數--------------------------------------------------------
  setPaginator() {
    // 設定顯示筆數資訊文字
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `第 ${startIndex + 1} - ${endIndex} 筆、共 ${length} 筆`;
    };
    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }
  // 過濾資料
  filterData() {
    this.meetDataSource.filterPredicate = (data: any, filter: string): boolean => {
      return this.getCheckIncludes(data, ['ObjectID', 'ID', 'InvoiceNO_KUT'], filter);
    };
  }
  // 取得要過濾哪些欄位 array資料  titles要過濾的欄位名稱 keyword關鍵字
  getCheckIncludes(array: any, titles: string[], keyword: string) {
    return titles.some(i => {
      return array[i].toLowerCase().includes(keyword.toLowerCase());
    });
  }
  // filter 輸入關鍵字
  keyupSearch(event: any) {
    this.meetDataSource.filter = event.toLowerCase();
  }





  //搜尋資料
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.meetingDataSource.filter = filterValue.trim().toLowerCase();
  }

  // 設定分頁器參數--------------------------------------------------------
  setPaginator2() {
    // 設定顯示筆數資訊文字
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `第 ${startIndex + 1} - ${endIndex} 筆、共 ${length} 筆`;
    };
    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }
  // 過濾資料
  filterData2() {
    this.meetingDataSource.filterPredicate = (data: any, filter: string): boolean => {
      return this.getCheckIncludes(data, ['ObjectID', 'ID', 'InvoiceNO_KUT'], filter);
    };
  }
  // 取得要過濾哪些欄位 array資料  titles要過濾的欄位名稱 keyword關鍵字
  getCheckIncludes2(array: any, titles: string[], keyword: string) {
    return titles.some(i => {
      return array[i].toLowerCase().includes(keyword.toLowerCase());
    });
  }
  // filter 輸入關鍵字
  keyupSearch2(event: any) {
    this.meetingDataSource.filter = event.toLowerCase();
  }
}
