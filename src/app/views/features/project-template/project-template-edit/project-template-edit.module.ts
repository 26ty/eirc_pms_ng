import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTemplateEditComponent } from './project-template-edit.component';
import { ProjectTemplateEditRoutingsModule } from './project-template-edit-routings.module';
import { SharedModule } from './../../../../shared/shared.module';


@NgModule({
  declarations: [
    ProjectTemplateEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectTemplateEditRoutingsModule
  ]
})
export class ProjectTemplateEditModule { }
