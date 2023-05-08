import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRequestEditRoutingModule } from './project-request-edit-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ProjectRequestEditComponent } from './project-request-edit.component';

import { FileUpdateDialogComponent } from './file-update-dialog/file-update-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { AddMeetDialogComponent } from './add-meet-dialog/add-meet-dialog.component';
import { EditMeetDialogComponent } from './edit-meet-dialog/edit-meet-dialog.component';
import { MeetDialogComponent } from './meet-dialog/meet-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';



@NgModule({
  declarations: [
    ProjectRequestEditComponent,
    AddDialogComponent,
    FileUpdateDialogComponent,
    TaskDialogComponent,
    UserDialogComponent,
    AddMeetDialogComponent,
    EditMeetDialogComponent,
    MeetDialogComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    ProjectRequestEditRoutingModule,
    ButtonModule,
    TreeTableModule,
    SharedModule,
  ]
})


export class ProjectRequestEditModule { }
