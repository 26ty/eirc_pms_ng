import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from './../../../../api/http-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-meet-dialog',
  templateUrl: './meet-dialog.component.html',
  styleUrls: ['./meet-dialog.component.scss']
})
export class MeetDialogComponent implements OnInit {

  constructor(
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private meetdata: any
  ) { }

  ngOnInit(): void {
    this.m_id = this.meetdata.m_id
    console.log(this.meetdata.m_id)
    this.getOneMeetingRequest();
    this.getAllAttendeeRequest()
    // this.getAttendeeReqest();
    // this.getAllUserName();
  }

  m_id: any;
  name: any = '';
  start_date: any = '';
  end_date: any = '';
  chairman: any = '';
  attendees: any = '';
  room: any = '';

  //接Meet資料-------------------------------------------------------
  meetRequest: any;
  meetDatas: any;
  getOneMeetingRequest(): void {
    this.HttpApiService.getOneMeetingUserRequest(this.m_id)
      .subscribe(meetRequest => {
        this.meetDatas = meetRequest;
        console.log(this.meetDatas)
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  attendeeUserDatas: any
  userList: any[] = []
  getAllAttendeeRequest(): void {
    this.HttpApiService.getMeetingListUserByMidRequest(this.m_id, 1)
      .subscribe(attendeeRequest => {
        this.attendeeUserDatas = attendeeRequest.body.meeting
        console.log(this.attendeeUserDatas[0].chairman)

        for (let i in this.attendeeUserDatas) {
          this.userList.push({ name: this.attendeeUserDatas[i].name })
          //console.log(this.attendeeUserDatas[i].name)
        }
        console.log(this.userList)
      })
  }


  // //列出所有username
  // userList: any[] = []
  // getAllUserName(): void {
  //   for (var pagenum = 1; pagenum <= 92; pagenum++) {
  //     this.HttpApiService.getAccountRequest_t(pagenum, 1)
  //       .subscribe(userRequest => {
  //         this.userList.push({ id: userRequest.body.accounts[0].account_id, name: userRequest.body.accounts[0].name })
  //       })
  //       //console.log("userList",this.userList)
  //   }
  //   console.log("userList",this.userList)
  // }

  // //取得全部會議參與人員
  // attendeeDatas:any
  // attendeeRequest:any;
  // attendeeUserIdList:any[] = []
  // attendeeChairmanIdList:any[] = []
  // attendeeUserNameList:any[] = []
  // attendeeChairmanNameList:any[] = []
  // getAttendeeReqest() : void {
  //   this.HttpApiService.getAttendeeRequest_t(1,10)
  //   .subscribe(attendeeRequest => {
  //     this.attendeeDatas = attendeeRequest.body.attendee
  //     console.log(this.attendeeDatas)

  //     for(let i in this.attendeeDatas){
  //       if(this.m_id == this.attendeeDatas[i].meet_id){
  //         if(this.attendeeDatas[i].chairman == true){
  //           this.attendeeChairmanIdList.push(this.attendeeDatas[i].user_id)
  //         }else{
  //           this.attendeeUserIdList.push(this.attendeeDatas[i].user_id)
  //         }
  //       }
  //     }
  //     console.log("參與人員",this.attendeeUserIdList)
  //     console.log("主席",this.attendeeChairmanIdList)

  //     // for(let i in this.attendeeUserIdList){
  //     //   this.getOneUserRequest(this.attendeeUserIdList[i])
  //     // }

  //     for(let i = 0;i <= this.attendeeUserIdList.length-1;i++){
  //       for(let j = 0 ; j <= this.userList.length-1;j++){
  //         if(this.attendeeUserIdList[i] == this.userList[j].id){

  //           this.attendeeUserNameList.push(this.userList[j].name)
  //           //console.log("參與人員",this.attendeeUserIdList[i])
  //         }
  //         console.log(this.userList[j].id)
  //       }
  //       console.log(this.attendeeUserIdList[i])
  //     }

  //     for(let i = 0;i <= this.attendeeChairmanIdList.length-1;i++){
  //       for(let j = 0 ; j <= this.userList.length-1;j++){
  //         if(this.attendeeChairmanIdList[i] == this.userList[j].id){

  //           this.attendeeChairmanNameList.push(this.userList[j].name)
  //         }
  //       }
  //     }

  //     console.log("參與人員",this.attendeeUserNameList)
  //     console.log("主席",this.attendeeChairmanNameList)
  //   },
  //   (err: any) => {
  //     console.log('err:', err);
  //     }
  //   )
  // }

  // oneAttendeeDatas:any;
  // getOneUserRequest(id:string):void{
  //   this.HttpApiService.getAccountOneRequest_t(id)
  //   .subscribe(OneAttendee =>{
  //     this.oneAttendeeDatas = OneAttendee.body.name
  //     console.log(this.oneAttendeeDatas)
  //   })
  // }


}

