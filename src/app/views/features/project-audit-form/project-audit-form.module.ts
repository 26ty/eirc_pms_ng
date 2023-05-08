import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectAuditFormComponent } from './project-audit-form.component';
import { ProjectAuditFormRoutingModule } from './project-audit-form-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';

@NgModule({
  declarations: [
    ProjectAuditFormComponent,
    EditDialogComponent,
    AddDialogComponent,
    ViewDialogComponent,
  ],
  imports: [
    CommonModule,
    ProjectAuditFormRoutingModule,
    SharedModule,
  ]
})
export class ProjectAuditFormModule { }
