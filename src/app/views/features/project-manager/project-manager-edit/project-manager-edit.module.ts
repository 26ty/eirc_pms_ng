import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagerEditRoutingModule } from './project-manager-edit-routing.module';
import { ProjectManagerEditComponent } from './project-manager-edit.component';
import { SharedModule } from './../../../../shared/shared.module';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { AddMeetDialogComponent } from './add-meet-dialog/add-meet-dialog.component';
import { WorktimeDialogComponent } from './worktime-dialog/worktime-dialog.component';
import { CaseDialogComponent } from './case-dialog/case-dialog.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { MeetDialogComponent } from './meet-dialog/meet-dialog.component';
import { EditMeetDialogComponent } from './edit-meet-dialog/edit-meet-dialog.component';
import { SourceDialogComponent } from './source-dialog/source-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { HintDialogComponent } from './hint-dialog/hint-dialog.component';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { GanttDialogComponent } from './gantt-dialog/gantt-dialog.component';

//NGX
import { NgxGanttModule } from '@worktile/gantt';
@NgModule({
  declarations: [
    ProjectManagerEditComponent,
    EditDialogComponent,
    AddDialogComponent,
    AddMeetDialogComponent,
    WorktimeDialogComponent,
    CaseDialogComponent,
    AuthDialogComponent,
    MeetDialogComponent,
    EditMeetDialogComponent,
    SourceDialogComponent,
    FileUploadDialogComponent,
    HintDialogComponent,
    GanttDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectManagerEditRoutingModule,
    ChartsModule,
    TableModule,
    ButtonModule,
    TreeTableModule,
    DialogModule,
    MultiSelectModule,
    InputTextModule,
    ToastModule,
    ContextMenuModule,
    NgxGanttModule
  ]
})
export class ProjectManagerEditModule { }
