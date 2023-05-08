import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDailyWorksComponent } from './my-daily-works.component';
import { MyDailyWorksRoutingModule } from './my-daily-works-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { WorkSubmitDialogComponent } from './work-submit-dialog/work-submit-dialog.component';
import { WorkDetailDialogComponent } from './work-detail-dialog/work-detail-dialog.component';
import { WorkRecordDialogComponent } from './work-record-dialog/work-record-dialog.component';

@NgModule({
  declarations: [
    MyDailyWorksComponent,
    WorkSubmitDialogComponent,
    WorkDetailDialogComponent,
    WorkRecordDialogComponent
  ],
  imports: [
    CommonModule,
    MyDailyWorksRoutingModule,
    SharedModule
  ]
})
export class MyDailyWorksModule { }
