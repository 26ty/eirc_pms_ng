import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../../../shared/shared.module';
import { ProjectTemplateAddRoutingModule } from './project-template-add-routing.module';

@NgModule({
  declarations: [
    //ProjectTemplateAddComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectTemplateAddRoutingModule
  ]
})
export class ProjectTemplateAddModule { }
