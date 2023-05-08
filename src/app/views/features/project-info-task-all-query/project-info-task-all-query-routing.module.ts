import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectInfoTaskAllQueryComponent } from './project-info-task-all-query.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ProjectInfoTaskAllQueryComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectInfoTaskAllQueryRoutingModule { }