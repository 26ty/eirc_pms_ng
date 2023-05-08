import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTaskTemplateComponent } from './project-task-template.component';
import { CommonModule } from '@angular/common';

const routes : Routes = [{ path: '', component: ProjectTaskTemplateComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectTaskTemplateRoutingModule { }
