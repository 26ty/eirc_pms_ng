import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTaskTemplateEditRoutingModule } from './project-task-template-edit-routing.module';
import { SharedModule } from './../../../../shared/shared.module';


@NgModule({
  declarations: [
    //ProjectTaskTemplateEditComponent
  ],
  imports: [
    CommonModule,
    ProjectTaskTemplateEditRoutingModule,
    SharedModule
  ]
})
export class ProjectTaskTemplateEditModule { }
