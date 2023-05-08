import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrFollowWorkRoutingModule } from './cr-follow-work-routing.module';
import { CrFollowWorkComponent } from './cr-follow-work.component';
import { SharedModule } from './../../../shared/shared.module';
import { CrLaborHourDialogComponent } from './cr-labor-hour-dialog/cr-labor-hour-dialog.component';
import { CdInterviewDialogComponent } from './cd-interview-dialog/cd-interview-dialog.component';


@NgModule({
  declarations: [
    CrFollowWorkComponent,
    CrLaborHourDialogComponent,
    CdInterviewDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule, //sidenav
    CrFollowWorkRoutingModule
  ]
})
export class CrFollowWorkModule {

}
