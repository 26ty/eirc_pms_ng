import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduceSalesMeetingEditRoutingModule } from './produce-sales-meeting-edit-routing.module';
import { ProduceSalesMeetingEditComponent } from './produce-sales-meeting-edit.component';
import { SharedModule } from './../../../../shared/shared.module';
import { ProduceEditDialogComponent } from '../produce-edit-dialog/produce-edit-dialog/produce-edit-dialog.component';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [
    ProduceSalesMeetingEditComponent,
    ProduceEditDialogComponent,
    // ProduceAddMeetingDialogComponent,
    // ProduceAddAppendixDialogComponent,
    // ProduceAddScheduleDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TabViewModule,
    TabMenuModule,
    // AccordionModule,
    // SplitButtonModule,
    ProduceSalesMeetingEditRoutingModule,

  ]
})
export class ProduceSalesMeetingEditModule { }
