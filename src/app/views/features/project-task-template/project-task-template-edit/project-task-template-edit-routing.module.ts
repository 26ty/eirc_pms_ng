import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTaskTemplateEditComponent } from './project-task-template-edit.component';

const routes : Routes = [{ path: '',component:ProjectTaskTemplateEditComponent}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectTaskTemplateEditRoutingModule { }
