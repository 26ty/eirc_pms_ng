import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';
import { SharedModule } from './../../../../shared/shared.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

import { FileUpdateDialogComponent } from './file-update-dialog/file-update-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component'
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { EditMeetDialogComponent } from './edit-meet-dialog/edit-meet-dialog.component';
import { MeetDialogComponent } from './meet-dialog/meet-dialog.component';


@NgModule({
  declarations: [
    AddComponent,
    AddDialogComponent,
    FileUpdateDialogComponent,
    TaskDialogComponent,
    UserDialogComponent,
    EditTaskDialogComponent,
    EditMeetDialogComponent,
    MeetDialogComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    SharedModule,
  ]
})
export class AddModule { }
