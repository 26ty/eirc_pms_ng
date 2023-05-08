import { Component, OnInit, Inject } from '@angular/core';
import { HttpApiService } from './../../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-meet-dialog',
  templateUrl: './meet-dialog.component.html',
  styleUrls: ['./meet-dialog.component.scss']
})
export class MeetDialogComponent implements OnInit {

  constructor(
    private HttpApiService:HttpApiService,
    @Inject(MAT_DIALOG_DATA) private meetdata:any
  ) { }

  ngOnInit(): void {
    this.getOneTaskRequest();
  }

  m_id:any;
  name:any = '';
  start_date:any = '';
  end_date:any = '';
  chairman:any = '';
  attendees:any = '';
  room:any = '';

  meetRequest:any;
  meetDatas:any;


  getOneTaskRequest() : void {
    this.HttpApiService.getOneMeetingRequest(this.meetdata.m_id)
      .subscribe(meetRequest => {
        this.meetDatas = meetRequest;
        console.log(this.meetDatas)
      },
      (err: any) => {
        console.log('err:', err);
        }
      );
  }

}
