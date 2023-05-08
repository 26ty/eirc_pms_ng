import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixtureScheduleQueryComponent } from './fixture-schedule-query.component';
import { FixtureScheduleQueryRoutingModule } from './fixture-schedule-query-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { OpenDetailDialogComponent } from './open-detail-dialog/open-detail-dialog.component';


@NgModule({
  declarations: [
    FixtureScheduleQueryComponent,
    OpenDetailDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FixtureScheduleQueryRoutingModule
  ]
})
export class FixtureScheduleQueryModule { }
