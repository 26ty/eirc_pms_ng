import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { PmReturnEditRoutingModule } from './pm-return-edit-routing.module';
import { ReturnRecordDialogComponent } from './return-record-dialog/return-record-dialog.component';
import { ProjectInterviewDialogComponent } from './project-interview-dialog/project-interview-dialog.component';

@NgModule({
  declarations: [
    //PmReturnEditComponent

    ReturnRecordDialogComponent,
    ProjectInterviewDialogComponent
  ],
  imports: [
    CommonModule,
    PmReturnEditRoutingModule,
    SharedModule
  ]
})
export class PmReturnEditModule { }
