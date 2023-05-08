import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTaskTemplateAddComponent } from './project-task-template-add.component';

const routes : Routes = [{ path: '',component:ProjectTaskTemplateAddComponent}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectTaskTemplateAddRoutingModule { }
