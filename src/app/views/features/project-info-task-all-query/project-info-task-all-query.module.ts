import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectInfoTaskAllQueryComponent } from './project-info-task-all-query.component';
import { ProjectInfoTaskAllQueryRoutingModule } from './project-info-task-all-query-routing.module';
import { SharedModule } from './../../../shared/shared.module';

import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { CustomerRequestDialogComponent } from './customer-request-dialog/customer-request-dialog.component';
import { CrmDialogComponent } from './crm-dialog/crm-dialog.component';
import { InternalContactDialogComponent } from './internal-contact-dialog/internal-contact-dialog.component';
import { LaborHourDialogComponent } from './labor-hour-dialog/labor-hour-dialog.component';
import { MeetDialogComponent } from './meet-dialog/meet-dialog.component';
import { LaborHourBreakDialogComponent } from './labor-hour-break-dialog/labor-hour-break-dialog.component';
import { LaborHourExtraDialogComponent } from './labor-hour-extra-dialog/labor-hour-extra-dialog.component';
import { CdInterviewDialogComponent } from './cd-interview-dialog/cd-interview-dialog.component';
import { CrLaborHourDialogComponent } from './cr-labor-hour-dialog/cr-labor-hour-dialog.component';


@NgModule({
  declarations: [
    ProjectInfoTaskAllQueryComponent,
    TaskDialogComponent,
    UserDialogComponent,
    CustomerRequestDialogComponent,
    CrmDialogComponent,
    InternalContactDialogComponent,
    LaborHourDialogComponent,
    MeetDialogComponent,
    FileUploadDialogComponent,
    LaborHourBreakDialogComponent,
    LaborHourExtraDialogComponent,
    CdInterviewDialogComponent,
    CrLaborHourDialogComponent
  ],
  imports: [
    CommonModule,
    ProjectInfoTaskAllQueryRoutingModule,
    SharedModule
  ]
})
export class ProjectInfoTaskAllQueryModule { }


