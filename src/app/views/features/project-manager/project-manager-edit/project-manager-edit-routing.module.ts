import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagerEditComponent } from './project-manager-edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ProjectManagerEditComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectManagerEditRoutingModule { }
