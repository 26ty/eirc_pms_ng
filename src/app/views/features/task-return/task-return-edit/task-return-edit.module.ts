import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';

import { TaskReturnEditRoutingModule } from './task-return-edit-routing.module';
import { TaskReturnEditComponent } from './task-return-edit.component';
import { WorkSubmitDialogComponent } from './work-submit-dialog/work-submit-dialog.component';
import { InterviewDialogComponent } from './interview-dialog/interview-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
//import { LaborhourSubmitDialogComponent } from './laborhour-submit-dialog/laborhour-submit-dialog.component';
@NgModule({
  declarations: [
    TaskReturnEditComponent,
    WorkSubmitDialogComponent,
    InterviewDialogComponent,
    FileUploadDialogComponent,
    //LaborhourSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    TaskReturnEditRoutingModule,
    SharedModule
  ]
})
export class TaskReturnEditModule { }
