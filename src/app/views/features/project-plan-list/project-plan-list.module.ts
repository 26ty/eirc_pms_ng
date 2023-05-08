import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectPlanListComponent } from './project-plan-list.component'
import { ProjectPlanListRoutingModule } from './project-plan-list-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { FileUpdateDialogComponent } from './file-update-dialog/file-update-dialog.component';

import { SourceDialogComponent } from './source-dialog/source-dialog.component';
import { WorktimeDialogComponent } from './worktime-dialog/worktime-dialog.component'

@NgModule({
  declarations: [
    ProjectPlanListComponent,
    FileUpdateDialogComponent,
    SourceDialogComponent,
    WorktimeDialogComponent,
    //EditDialogComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectPlanListRoutingModule
  ]
})
export class ProjectPlanListModule { }
