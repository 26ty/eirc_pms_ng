import { Component, OnInit, Inject } from '@angular/core';
import { HttpApiService } from './../../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-meet-dialog',
  templateUrl: './edit-meet-dialog.component.html',
  styleUrls: ['./edit-meet-dialog.component.scss']
})
export class EditMeetDialogComponent implements OnInit {

  toppings = new FormControl();

  toppingList: string[] = ['營運部', '業務部', '生產部', '財務部', '總經理', '董事長'];

  editMeetForm: FormGroup; //編輯會議

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private meetdata: any
  ) {
    this.editMeetForm = this.fb.group({
      name: new FormControl(),
      start_date: new FormControl(),
      end_date: new FormControl(),
      chairman: new FormControl(),
      room: new FormControl(),
      attendees: new FormControl()
    });
  }

  //雙向綁訂------------------------------------------------------
  m_id: any;
  name: any = '';
  start_date: any = '';
  end_date: any = '';
  chairman: any = '';
  room: any = '';
  attendees: any = '';

  p_id: any;
  ngOnInit(): void {
    this.p_id = this.route.snapshot.paramMap.get('p_id');
    this.editMeetForm = new FormGroup({
      name: new FormControl(),
      start_date: new FormControl(),
      end_date: new FormControl(),
      chairman: new FormControl(),
      room: new FormControl(),
      attendees: new FormControl()
    });
    this.getOneMeetRequest();
  }

  //接Meet資料------------------------------------
  meetRequest: any;
  meetDatas: any;

  //取得單一Meet資料
  getOneMeetRequest(): void {
    this.HttpApiService.getOneMeetingRequest(this.meetdata.m_id)
      .subscribe(meetRequest => {
        this.meetDatas = meetRequest;

      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //接更改後的Meet資料----------------------------
  newMeetDatas: any;
  updateMeetRequest(): void {
    let newMeetDatas: any = {};
    newMeetDatas['m_id'] = this.meetDatas.message.m_id;
    newMeetDatas['name'] = this.meetDatas.message.name;
    newMeetDatas['start_date'] = this.meetDatas.message.start_date;
    newMeetDatas['end_date'] = this.meetDatas.message.end_date;
    newMeetDatas['chairman'] = this.meetDatas.message.chairman;
    newMeetDatas['room'] = this.meetDatas.message.room;
    newMeetDatas['attendees'] = this.meetDatas.message.attendees;
    console.log("修改會議陣列=")
    console.log(newMeetDatas);

    this.HttpApiService.updateMeetingRequest(newMeetDatas)
      .subscribe(file => {

      },
        (err: any) => {
          console.log('err:', err);
        }
      );
    //const backUrl=`main/projectinfo/project-manager-edit/${this.p_id}`
    //location.href=backUrl;
  }
}
