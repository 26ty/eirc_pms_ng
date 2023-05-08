import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTaskTemplateComponent } from './project-task-template.component';
import { ProjectTaskTemplateRoutingModule } from './project-task-template-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { ProjectTaskTemplateEditComponent } from './project-task-template-edit/project-task-template-edit.component';
import { ProjectTaskTemplateAddComponent } from './project-task-template-add/project-task-template-add.component';

@NgModule({
  declarations: [
    ProjectTaskTemplateComponent,
    ProjectTaskTemplateEditComponent,
    ProjectTaskTemplateAddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectTaskTemplateRoutingModule
  ]
})
export class ProjectTaskTemplateModule { }
