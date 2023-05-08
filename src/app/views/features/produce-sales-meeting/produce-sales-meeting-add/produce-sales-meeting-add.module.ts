import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduceSalesMeetingAddRoutingModule } from './produce-sales-meeting-add-routing.module';
import { ProduceSalesMeetingAddComponent } from './produce-sales-meeting-add.component';
import { SharedModule } from './../../../../shared/shared.module';
import { ProduceAddMeetingDialogComponent } from '../produce-add-meeting-dialog/produce-add-meeting-dialog.component';
import { ProduceAddAppendixDialogComponent } from '../produce-add-appendix-dialog/produce-add-appendix-dialog.component';
import { ProduceAddScheduleDialogComponent } from '../produce-add-schedule-dialog/produce-add-schedule-dialog.component';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
@NgModule({
  declarations: [
    ProduceSalesMeetingAddComponent,
    ProduceAddMeetingDialogComponent,
    ProduceAddAppendixDialogComponent,
    ProduceAddScheduleDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProduceSalesMeetingAddRoutingModule,
    TabViewModule,
    TabMenuModule,
  ]
})
export class ProduceSalesMeetingAddModule { }
