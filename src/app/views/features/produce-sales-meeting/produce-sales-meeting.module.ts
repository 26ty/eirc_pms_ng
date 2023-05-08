import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduceSalesMeetingRoutingModule } from './produce-sales-meeting-routing.module';
import { ProduceSalesMeetingComponent } from './produce-sales-meeting.component';
import { SharedModule } from './../../../shared/shared.module';
import { ProduceAddDialogComponent } from './produce-add-dialog/produce-add-dialog/produce-add-dialog.component';

import { MatTreeModule } from '@angular/material/tree';
import { TabViewModule } from 'primeng/tabview';
import { TemplateAddDialogComponent } from './template-add-dialog/template-add-dialog.component';
import { RepeatOrderComponent } from './repeat-order/repeat-order.component';
import { FormalprojectAddDialogComponent } from './formalproject-add-dialog/formalproject-add-dialog.component';
@NgModule({
  declarations: [
    ProduceSalesMeetingComponent,
    ProduceAddDialogComponent,
    TemplateAddDialogComponent,
    RepeatOrderComponent,
    FormalprojectAddDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProduceSalesMeetingRoutingModule,
    MatTreeModule,
    TabViewModule,
  ]
})
export class ProduceSalesMeetingModule { }
