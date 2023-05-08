import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTemplateComponent } from './project-template.component'
import { ProjectTemplateRoutingModule } from './project-template-routing.module'
import { SharedModule } from './../../../shared/shared.module';
import { ProjectTemplateAddComponent } from './project-template-add/project-template-add.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@NgModule({
  declarations: [
    ProjectTemplateComponent,
    ProjectTemplateAddComponent,
    AddDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectTemplateRoutingModule
  ]
})
export class ProjectTemplateModule { }
