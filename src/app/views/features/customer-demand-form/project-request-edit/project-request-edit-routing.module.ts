

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectRequestEditComponent } from './project-request-edit.component';

const routes: Routes = [{ path: '', component: ProjectRequestEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ProjectRequestEditRoutingModule { }


