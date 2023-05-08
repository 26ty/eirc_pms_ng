import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDateListRoutingModule } from './project-date-list-routing.module';
import { ProjectDateListComponent } from './project-date-list.component';
import { SharedModule } from './../../../shared/shared.module';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';

@NgModule({
  declarations: [
    ProjectDateListComponent,
    ScheduleDialogComponent
  ],
  imports: [
    CommonModule,
    ProjectDateListRoutingModule,
    SharedModule
  ]
})
export class ProjectDateListModule { }
